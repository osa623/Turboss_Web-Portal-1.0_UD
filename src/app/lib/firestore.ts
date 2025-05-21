import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection,
  query,
  orderBy,
  limit,
  where,
  increment,
  onSnapshot,
  addDoc,
  serverTimestamp,
  Timestamp,
  DocumentReference,
  arrayUnion,
  getDocs,
  enableNetwork,
  disableNetwork,
  connectFirestoreEmulator
} from "firebase/firestore";
import { app } from "./firebase";

// Initialize Firestore
const db = getFirestore(app);

// Max retry attempts for operations
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 2000; // 2 seconds between retries

// Connection state tracking
let isFirestoreConnected = true;
let networkRetryTimer: NodeJS.Timeout | null = null;

// Function to check if Firestore is connected
export const isFirestoreOnline = () => isFirestoreConnected;

// Enable/disable network for testing
export const setFirestoreNetwork = async (enabled: boolean) => {
  try {
    if (enabled) {
      await enableNetwork(db);
      isFirestoreConnected = true;
      console.log("Firestore network enabled");
    } else {
      await disableNetwork(db);
      isFirestoreConnected = false;
      console.log("Firestore network disabled");
    }
    return true;
  } catch (error) {
    console.error("Error changing Firestore network state:", error);
    return false;
  }
};

// Enhanced retry mechanism for Firestore operations
const retryOperation = async <T>(
  operation: () => Promise<T>, 
  operationName: string,
  maxAttempts = MAX_RETRY_ATTEMPTS
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // Only retry for network-related errors
      if (error.code === 'unavailable' || 
          error.code === 'failed-precondition' ||
          error.message?.includes('offline') ||
          error.message?.includes('network')) {
            
        console.warn(`Attempt ${attempt}/${maxAttempts} failed for ${operationName} - retrying...`);
        isFirestoreConnected = false;
        
        // Signal the connection status that we're offline
        window.dispatchEvent(new CustomEvent('firestoreConnectionChanged', { 
          detail: { connected: false }
        }));
        
        // Wait before next attempt
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * attempt));
        }
      } else {
        // Non-network error, don't retry
        break;
      }
    }
  }
  
  // All retries failed
  console.error(`All ${maxAttempts} attempts failed for ${operationName}`);
  throw lastError;
};

// Enhanced error handling with detailed error information
const handleFirestoreError = (error: any, operationName: string) => {
  // Check for offline errors
  if (error.code === 'unavailable' || 
      error.code === 'failed-precondition' ||
      error.message?.includes('offline')) {
    console.warn(`Firestore ${operationName} failed - client is offline`);
    isFirestoreConnected = false;
    
    // Signal the UI we're offline
    window.dispatchEvent(new CustomEvent('firestoreConnectionChanged', { 
      detail: { connected: false, operation: operationName }
    }));
    
    // Schedule a network status check to recover when online
    if (!networkRetryTimer) {
      networkRetryTimer = setTimeout(() => {
        console.log("Checking network status after offline error...");
        checkNetworkAndReconnect();
        networkRetryTimer = null;
      }, 5000);
    }
    
    // Return a specific offline error that UI can handle
    throw new Error(`OFFLINE_ERROR: Unable to ${operationName} because you appear to be offline. Your data will sync when connection is restored.`);
  } else {
    console.error(`Error in ${operationName}:`, error);
    throw error;
  }
};

// Function to check network and reconnect
const checkNetworkAndReconnect = async () => {
  if (navigator.onLine) {
    try {
      // Try to enable network
      await enableNetwork(db);
      isFirestoreConnected = true;
      console.log("✅ Reconnected to Firestore successfully");
      
      // Signal UI we're back online
      window.dispatchEvent(new CustomEvent('firestoreConnectionChanged', { 
        detail: { connected: true, recovered: true }
      }));
    } catch (error) {
      console.error("Failed to reconnect to Firestore:", error);
    }
  } else {
    console.log("Still offline, will retry connection later...");
  }
};

// Add a new user to Firestore with offline handling
export const addUserToFirestore = async (
  userId: string, 
  userData: { 
    firstName?: string; 
    lastName?: string; 
    email?: string;
    [key: string]: any; 
  }
) => {
  try {
    await setDoc(doc(db, "users", userId), {
      ...userData,
      createdAt: new Date().toISOString(),
    });
    isFirestoreConnected = true;
    return true;
  } catch (error) {
    return handleFirestoreError(error, "addUserToFirestore");
  }
};

// Get user data from Firestore with improved offline handling
export const getUserFromFirestore = async (userId: string) => {
  if (!userId) {
    console.error("Invalid userId provided to getUserFromFirestore");
    return null;
  }

  try {
    // Use a cached-first approach when possible
    const userRef = doc(db, "users", userId);
    
    try {
      const userDoc = await getDoc(userRef);
      isFirestoreConnected = true;
      
      if (userDoc.exists()) {
        console.log(`Successfully fetched user ${userId} from Firestore`);
        return userDoc.data();
      } else {
        console.log(`User ${userId} not found in Firestore`);
        return null;
      }
    } catch (error: any) {
      // Specific handling for the "client is offline" error
      if (error.message?.includes("offline") || 
          error.code === 'unavailable' || 
          error.code === 'failed-precondition') {
        
        console.warn("Failed to get user document because client is offline. Using cached data if available.");
        isFirestoreConnected = false;
        
        // Signal the UI about offline status
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('firestoreConnectionChanged', { 
            detail: { 
              connected: false, 
              errorMessage: error.message,
              specificError: 'OFFLINE_DOCUMENT',
              documentPath: `users/${userId}`
            } 
          }));
        }
        
        // Schedule a reconnection attempt
        if (!networkRetryTimer && typeof window !== 'undefined' && navigator.onLine) {
          networkRetryTimer = setTimeout(() => {
            checkNetworkAndReconnect();
            networkRetryTimer = null;
          }, 5000);
        }
        
        // Return a special object indicating offline status but with null data
        // This distinguishes between "no data" and "offline"
        return { _offline: true, _path: `users/${userId}` };
      }
      
      // For other errors, use standard error handling
      return handleFirestoreError(error, "getUserFromFirestore");
    }
  } catch (outerError) {
    console.error("Unexpected error in getUserFromFirestore:", outerError);
    return null;
  }
};

// Add a function to check if a result is an offline placeholder
export const isOfflineResult = (result: any): boolean => {
  return result && typeof result === 'object' && result._offline === true;
};

// Get Firestore collection data with improved offline handling
export const getCollectionData = async (collectionPath: string) => {
  try {
    const collectionRef = collection(db, collectionPath);
    
    try {
      const snapshot = await getDocs(collectionRef);
      isFirestoreConnected = true;
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error: any) {
      // Specific handling for offline errors
      if (error.message?.includes("offline") || 
          error.code === 'unavailable' || 
          error.code === 'failed-precondition') {
        
        console.warn(`Failed to get collection ${collectionPath} because client is offline. Using cached data if available.`);
        isFirestoreConnected = false;
        
        // Signal the UI
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('firestoreConnectionChanged', { 
            detail: { 
              connected: false, 
              errorMessage: error.message,
              specificError: 'OFFLINE_COLLECTION',
              collectionPath: collectionPath
            } 
          }));
        }
        
        // Try reconnecting
        if (!networkRetryTimer && typeof window !== 'undefined' && navigator.onLine) {
          networkRetryTimer = setTimeout(() => {
            checkNetworkAndReconnect();
            networkRetryTimer = null;
          }, 5000);
        }
        
        // Return an offline indicator
        return { _offline: true, _path: collectionPath };
      }
      
      throw error;
    }
  } catch (error) {
    console.error(`Error getting collection ${collectionPath}:`, error);
    throw error;
  }
};

// Update user data in Firestore with offline handling
export const updateUserInFirestore = async (
  userId: string, 
  userData: { [key: string]: any }
) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      ...userData,
      updatedAt: new Date().toISOString()
    });
    isFirestoreConnected = true;
    return true;
  } catch (error) {
    return handleFirestoreError(error, "updateUserInFirestore");
  }
};

// Get Firestore collection reference
export const getCollection = (collectionName: string) => {
  return collection(db, collectionName);
};

// ==================== COMMUNITY Q&A FUNCTIONS ==================== //

// Types for Community Q&A
export interface QuestionData {
  id?: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL: string;
  content: string;
  timestamp: any;
  upvotes: number;
  upvotedBy?: string[];
  expanded?: boolean;
  answerCount: number;
  _fromCache?: boolean;
}

export interface AnswerData {
  id?: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL: string;
  content: string;
  timestamp: any;
  upvotes: number;
  upvotedBy?: string[];
  specialty?: string;
}

// Badge levels based on reputation
export const BADGE_LEVELS = {
  LEVEL_3: 20000,
  LEVEL_2: 30000,
  TOP_LEVEL: 50000,
  EXPERT: 100000
};

// Get user's badge level based on reputation
export const getUserBadgeLevel = (reputation: number): string => {
  if (reputation >= BADGE_LEVELS.EXPERT) return 'Expert';
  if (reputation >= BADGE_LEVELS.TOP_LEVEL) return 'Top-Level Contributor';
  if (reputation >= BADGE_LEVELS.LEVEL_2) return 'Level 2 Contributor';
  if (reputation >= BADGE_LEVELS.LEVEL_3) return 'Level 3 Contributor';
  return 'Member';
};

// Add a new question - always public
export const addQuestion = async (questionData: Omit<QuestionData, 'timestamp' | 'upvotes' | 'answerCount'>) => {
  try {
    console.log("Attempting to add question to Firestore:", questionData);
    
    // Validate required fields
    if (!questionData.userId || !questionData.userDisplayName || !questionData.content) {
      throw new Error("Missing required question fields");
    }
    
    // Always set isPublic to true - community chat is entirely public
    const questionsRef = collection(db, 'questions');
    const docRef = await addDoc(questionsRef, {
      ...questionData,
      timestamp: serverTimestamp(),
      upvotes: 0,
      upvotedBy: [],
      answerCount: 0,
      isPublic: true, // Always public in community chat
      createdAt: new Date().toISOString()
    });
    
    console.log(`Question successfully added with ID: ${docRef.id}`);
    isFirestoreConnected = true;
    
    // Store the question in the user's personal questions collection too
    try {
      const userQuestionsRef = collection(db, `users/${questionData.userId}/userQuestions`);
      await addDoc(userQuestionsRef, {
        questionId: docRef.id,
        content: questionData.content,
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      });
    } catch (innerError) {
      // Don't fail the whole operation if this part fails
      console.warn("Failed to save question to user's collection:", innerError);
    }
    
    return docRef.id;
  } catch (error) {
    console.error("Error adding question:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    
    // Check if this is an offline error
    if (error.code === 'unavailable' || 
        error.code === 'failed-precondition' ||
        error.message?.includes('offline')) {
      isFirestoreConnected = false;
      throw new Error("You appear to be offline. Your question will be saved when connection is restored.");
    }
    
    throw error;
  }
};

// Get questions with realtime updates - with improved offline handling
export const getQuestionsRealtime = (
  callback: (questions: QuestionData[], offlineStatus?: boolean) => void,
  errorCallback?: (error: any) => void,
  sortBy = 'timestamp',
  descending = true,
  limitTo = 150
) => {
  try {
    console.log("Setting up FULLY PUBLIC community chat feed with offline support");
    
    const questionsRef = collection(db, 'questions');
    
    // Create a query without any filters on userId or isPublic
    let q = query(
      questionsRef,
      orderBy(sortBy, descending ? 'desc' : 'asc'),
      limit(limitTo)
    );

    return onSnapshot(
      q, 
      { includeMetadataChanges: true }, // Add this to track offline status
      (snapshot) => {
        const fromCache = snapshot.metadata.fromCache;
        console.log(`Received public feed with ${snapshot.docs.length} questions (connection: ${isFirestoreConnected ? 'online' : 'offline'}, from cache: ${fromCache})`);
        
        // We're getting data, so we're connected (even if from cache)
        if (!fromCache) {
          isFirestoreConnected = true;
          
          // Signal we're connected if this data isn't just from cache
          window.dispatchEvent(new CustomEvent('firestoreConnectionChanged', { 
            detail: { connected: true }
          }));
        }
        
        if (snapshot.empty) {
          console.log("No questions found in community feed");
        } else {
          // Log the first few questions with their userIds for debugging
          const sampleQuestions = snapshot.docs.slice(0, 3);
          console.log("Sample questions from feed:", 
            sampleQuestions.map(doc => ({
              id: doc.id,
              content: doc.data().content.substring(0, 30) + "...",
              userId: doc.data().userId,
              userName: doc.data().userDisplayName,
            }))
          );
        }
        
        const questions = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            isPublic: true, // Ensure all questions are treated as public
            _fromCache: fromCache
          } as QuestionData;
        });
        
        // Pass both the questions and whether they're from cache
        callback(questions, fromCache);
      }, 
      (error) => {
        console.error("Error getting questions:", error);
        
        // Check if offline
        if (error.code === 'unavailable' || 
            error.code === 'failed-precondition' ||
            error.message?.includes('offline')) {
          isFirestoreConnected = false;
          console.warn("Firestore is offline, but cached data should still be available");
          
          // Signal we're offline
          window.dispatchEvent(new CustomEvent('firestoreConnectionChanged', { 
            detail: { connected: false, errorMessage: error.message }
          }));
          
          // Schedule reconnect attempt
          if (!networkRetryTimer) {
            networkRetryTimer = setTimeout(() => {
              checkNetworkAndReconnect();
              networkRetryTimer = null;
            }, 5000);
          }
        }
        
        if (errorCallback) errorCallback(error);
      }
    );
  } catch (error) {
    console.error("Error setting up questions listener:", error);
    if (errorCallback) errorCallback(error);
    return () => {};
  }
};

// Get answers for a question with realtime updates
export const getAnswersRealtime = (
  questionId: string,
  callback: (answers: AnswerData[]) => void
) => {
  try {
    const answersRef = collection(db, `questions/${questionId}/answers`);
    const q = query(answersRef, orderBy('upvotes', 'desc'), orderBy('timestamp', 'asc'));

    return onSnapshot(q, (snapshot) => {
      const answers = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Don't transform the timestamp
          timestamp: data.timestamp
        } as AnswerData;
      });
      callback(answers);
    }, (error) => {
      console.error("Error getting answers:", error);
    });
  } catch (error) {
    console.error("Error setting up answers listener:", error);
    return () => {};
  }
};

// Add an answer to a question with user tracking
export const addAnswer = async (
  questionId: string,
  answerData: Omit<AnswerData, 'timestamp' | 'upvotes'>
) => {
  try {
    console.log(`Adding answer to question ${questionId} by user ${answerData.userId}`);
    
    // Validate required answer data
    if (!answerData.userId || !answerData.userDisplayName || !answerData.content) {
      throw new Error("Missing required answer fields");
    }
    
    // Add the answer to the question's answers collection
    const answersRef = collection(db, `questions/${questionId}/answers`);
    const docRef = await addDoc(answersRef, {
      ...answerData,
      timestamp: serverTimestamp(),
      upvotes: 0,
      upvotedBy: [],
      isPublic: true // Always public
    });

    // Update answer count on question
    await updateDoc(doc(db, 'questions', questionId), {
      answerCount: increment(1)
    });
    
    // Store the answer in the user's personal answers collection too
    const userAnswersRef = collection(db, `users/${answerData.userId}/userAnswers`);
    await addDoc(userAnswersRef, {
      answerId: docRef.id,
      questionId: questionId,
      content: answerData.content,
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp()
    });

    console.log(`Answer successfully added with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("Error adding answer:", error);
    throw error;
  }
};

// Get user's activity - useful for profile or dashboard page
export const getUserActivity = async (userId: string) => {
  try {
    // Get user's questions
    const userQuestionsRef = collection(db, `users/${userId}/userQuestions`);
    const userQuestionsQuery = query(userQuestionsRef, orderBy('timestamp', 'desc'));
    const userQuestionsSnapshot = await getDocs(userQuestionsQuery);
    
    // Get user's answers
    const userAnswersRef = collection(db, `users/${userId}/userAnswers`);
    const userAnswersQuery = query(userAnswersRef, orderBy('timestamp', 'desc'));
    const userAnswersSnapshot = await getDocs(userAnswersQuery);
    
    return {
      questions: userQuestionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })),
      answers: userAnswersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    };
  } catch (error) {
    console.error("Error getting user activity:", error);
    throw error;
  }
};

// Upvote a question
export const upvoteQuestion = async (questionId: string, userId: string) => {
  try {
    const questionRef = doc(db, 'questions', questionId);
    const questionDoc = await getDoc(questionRef);
    
    if (questionDoc.exists()) {
      const questionData = questionDoc.data();
      const upvotedBy: string[] = questionData.upvotedBy || [];
      
      // If user hasn't already upvoted
      if (!upvotedBy.includes(userId)) {
        await updateDoc(questionRef, {
          upvotes: increment(1),
          upvotedBy: arrayUnion(userId)
        });
        
        // Increase author's reputation
        const authorId = questionData.userId;
        await updateUserReputation(authorId, 1);
      }
    }
  } catch (error) {
    console.error("Error upvoting question:", error);
    throw error;
  }
};

// Upvote an answer
export const upvoteAnswer = async (questionId: string, answerId: string, userId: string) => {
  try {
    const answerRef = doc(db, `questions/${questionId}/answers`, answerId);
    const answerDoc = await getDoc(answerRef);
    
    if (answerDoc.exists()) {
      const answerData = answerDoc.data();
      const upvotedBy: string[] = answerData.upvotedBy || [];
      
      // If user hasn't already upvoted
      if (!upvotedBy.includes(userId)) {
        await updateDoc(answerRef, {
          upvotes: increment(1),
          upvotedBy: arrayUnion(userId)
        });
        
        // Increase author's reputation
        const authorId = answerData.userId;
        await updateUserReputation(authorId, 1);
      }
    }
  } catch (error) {
    console.error("Error upvoting answer:", error);
    throw error;
  }
};

// Update user's reputation and check for badge changes
export const updateUserReputation = async (userId: string, amount: number) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const currentReputation = userData.reputation || 0;
      const currentBadge = userData.badgeLevel || 'Member';
      
      const newReputation = currentReputation + amount;
      const newBadge = getUserBadgeLevel(newReputation);
      
      // Update user document
      await updateDoc(userRef, {
        reputation: newReputation,
        badgeLevel: newBadge
      });
      
      // If badge level changed, we could add a notification or other logic here
      if (currentBadge !== newBadge) {
        console.log(`User ${userId} upgraded to ${newBadge}!`);
        // Could implement notification or celebration logic
      }
    }
  } catch (error) {
    console.error("Error updating user reputation:", error);
    throw error;
  }
};

// Get user profile with reputation and badge
export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        ...userData,
        badgeLevel: userData.badgeLevel || getUserBadgeLevel(userData.reputation || 0)
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Export db instance for direct access if needed
export { 
  db,
  getUserProfile,
  getUserBadgeLevel,
  isFirestoreConnected,
  isOfflineResult
};
