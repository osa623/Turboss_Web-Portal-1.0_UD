import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  Timestamp,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  increment
} from 'firebase/firestore';
import { db } from './firebase';
import { User } from 'firebase/auth';

// Message type definition
export interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhotoURL?: string;
  timestamp: Timestamp;
  parentId: string | null;
  depth: number;
  path: string;
  upvotes: number;
  upvotedBy?: string[];
  // Client-side props for UI state (not stored in Firestore)
  replies?: Message[];
  isExpanded?: boolean;
}

// Get all top-level messages with real-time updates
export const getTopLevelMessagesRealtime = (callback: (messages: Message[], offlineStatus?: boolean) => void) => {
  const messagesRef = collection(db, 'messages');
  const topLevelQuery = query(
    messagesRef,
    where('parentId', '==', null),
    orderBy('timestamp', 'desc')
  );

  return onSnapshot(
    topLevelQuery,
    { includeMetadataChanges: true }, // Add metadata to track offline status
    (snapshot) => {
      const fromCache = snapshot.metadata.fromCache;
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        replies: [],
        isExpanded: false,
        _fromCache: fromCache
      } as Message));
      
      callback(messages, fromCache);
      
      console.log(`Loaded ${messages.length} top-level messages (${fromCache ? 'from cache' : 'from server'})`);
    },
    (error) => {
      console.error("Error getting messages:", error);
      // Still try to use cached data if available
      callback([], true);
    }
  );
};

// Get replies to a specific message with real-time updates
export const getRepliesRealtime = (parentId: string, callback: (replies: Message[]) => void) => {
  const messagesRef = collection(db, 'messages');
  const repliesQuery = query(
    messagesRef,
    where('parentId', '==', parentId),
    orderBy('timestamp', 'asc')
  );

  return onSnapshot(
    repliesQuery,
    { includeMetadataChanges: true },
    (snapshot) => {
      const replies = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        replies: [],
        isExpanded: false,
        _fromCache: snapshot.metadata.fromCache
      } as Message));
      
      callback(replies);
      console.log(`Loaded ${replies.length} replies for message ${parentId}`);
    },
    (error) => {
      console.error(`Error getting replies for message ${parentId}:`, error);
      callback([]);
    }
  );
};

// Get all messages in a thread based on path prefix
export const getThreadRealtime = (rootMessageId: string, callback: (messages: Message[]) => void) => {
  const messagesRef = collection(db, 'messages');
  const threadQuery = query(
    messagesRef,
    where('path', '>=', rootMessageId),
    where('path', '<', rootMessageId + '\uf8ff'), // This is a trick to get all strings starting with the path
    orderBy('path', 'asc'),
    orderBy('timestamp', 'asc')
  );

  return onSnapshot(threadQuery, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      replies: [],
      isExpanded: false
    } as Message));
    
    callback(messages);
    console.log(`Loaded ${messages.length} messages in thread ${rootMessageId}`);
  });
};

// Add a new top-level message
export const addMessage = async (text: string, user: User) => {
  try {
    const messagesRef = collection(db, 'messages');
    
    // Get user's display name and photo
    let userName = user.displayName || 'Anonymous User';
    let userPhotoURL = user.photoURL || '/placeholders/default-avatar.jpg';
    
    const messageData = {
      text,
      userId: user.uid,
      userName,
      userPhotoURL,
      timestamp: serverTimestamp(),
      parentId: null,
      depth: 0,
      path: '', // We'll update this after creating the document
      upvotes: 0,
      upvotedBy: []
    };
    
    const docRef = await addDoc(messagesRef, messageData);
    
    // Update the path with the new document ID
    await updateMessagePath(docRef.id, docRef.id);
    
    console.log(`Added new message with ID: ${docRef.id}`);
    
    // Also add to user's activity record
    try {
      const userMessagesRef = collection(db, `users/${user.uid}/userMessages`);
      await addDoc(userMessagesRef, {
        messageId: docRef.id,
        content: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.warn("Failed to record message in user activity:", err);
    }
    
    return docRef.id;
  } catch (error: any) {
    console.error('Error adding message:', error);
    // Provide a user-friendly error message for permission errors
    if (error.code === 'permission-denied') {
      throw new Error('You do not have permission to post messages. Please check your Firestore security rules.');
    }
    if (error.message?.includes('Missing or insufficient permissions')) {
      throw new Error('Failed to send message: Firestore permissions error. Please check your database rules.');
    }
    throw error;
  }
};

// Add a reply to an existing message
export const addReply = async (
  text: string, 
  parentId: string, 
  user: User
) => {
  try {
    const messagesRef = collection(db, 'messages');
    
    // Get parent message to determine depth and path
    const parentDocRef = doc(db, 'messages', parentId);
    const parentDoc = await getDoc(parentDocRef);
    
    if (!parentDoc.exists()) {
      throw new Error('Parent message not found');
    }
    
    const parentData = parentDoc.data();
    const newDepth = (parentData.depth || 0) + 1;
    
    // Get user info
    let userName = user.displayName || 'Anonymous User';
    let userPhotoURL = user.photoURL || '/placeholders/default-avatar.jpg';
    
    const replyData = {
      text,
      userId: user.uid,
      userName,
      userPhotoURL,
      timestamp: serverTimestamp(),
      parentId,
      depth: newDepth,
      path: '', // Will update after creating
      upvotes: 0,
      upvotedBy: []
    };
    
    const docRef = await addDoc(messagesRef, replyData);
    
    // Create the full path
    const newPath = parentData.path 
      ? `${parentData.path}/${docRef.id}`
      : docRef.id;
      
    await updateMessagePath(docRef.id, newPath);
    
    console.log(`Added reply to message ${parentId} with ID: ${docRef.id}`);
    
    // Also add to user's activity record
    try {
      const userRepliesRef = collection(db, `users/${user.uid}/userReplies`);
      await addDoc(userRepliesRef, {
        replyId: docRef.id,
        parentId: parentId,
        content: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
        createdAt: new Date().toISOString(),
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.warn("Failed to record reply in user activity:", err);
    }
    
    return docRef.id;
  } catch (error: any) {
    console.error('Error adding reply:', error);
    if (error.code === 'permission-denied') {
      throw new Error('You do not have permission to post replies. Please check your Firestore security rules.');
    }
    if (error.message?.includes('Missing or insufficient permissions')) {
      throw new Error('Failed to send reply: Firestore permissions error. Please check your database rules.');
    }
    throw error;
  }
};

// Helper to update message path
const updateMessagePath = async (messageId: string, path: string) => {
  try {
    const messageRef = doc(db, 'messages', messageId);
    await updateDoc(messageRef, { path });
  } catch (error) {
    console.error('Error updating message path:', error);
  }
};

// Upvote a message
export const upvoteMessage = async (messageId: string, userId: string) => {
  try {
    const messageRef = doc(db, 'messages', messageId);
    const messageDoc = await getDoc(messageRef);
    
    if (!messageDoc.exists()) {
      throw new Error('Message not found');
    }
    
    const messageData = messageDoc.data();
    const upvotedBy = messageData.upvotedBy || [];
    
    // If user hasn't already upvoted
    if (!upvotedBy.includes(userId)) {
      await updateDoc(messageRef, {
        upvotes: increment(1),
        upvotedBy: arrayUnion(userId)
      });
      
      console.log(`User ${userId} upvoted message ${messageId}`);
      
      // Increase author's reputation
      const authorId = messageData.userId;
      if (authorId !== userId) { // Don't reward self-upvotes
        try {
          const userRef = doc(db, 'users', authorId);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            await updateDoc(userRef, {
              reputation: increment(1)
            });
          }
        } catch (err) {
          console.warn("Failed to update user reputation:", err);
        }
      }
    }
  } catch (error) {
    console.error('Error upvoting message:', error);
    throw error;
  }
};

// Get user activity for their messages and replies
export const getUserCommunityActivity = async (userId: string) => {
  try {
    // Get user's messages
    const userMessagesRef = collection(db, `users/${userId}/userMessages`);
    const messagesQuery = query(userMessagesRef, orderBy('timestamp', 'desc'));
    const messagesSnapshot = await getDocs(messagesQuery);
    
    // Get user's replies
    const userRepliesRef = collection(db, `users/${userId}/userReplies`);
    const repliesQuery = query(userRepliesRef, orderBy('timestamp', 'desc'));
    const repliesSnapshot = await getDocs(repliesQuery);
    
    return {
      messages: messagesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })),
      replies: repliesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    };
  } catch (error) {
    console.error("Error getting user activity:", error);
    throw error;
  }
};

// Export for compatibility with existing code
export { upvoteMessage as upvoteQuestion };
export { upvoteMessage as upvoteAnswer };
