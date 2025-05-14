import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc,
  collection
} from "firebase/firestore";
import { app } from "./firebase";

// Initialize Firestore
const db = getFirestore(app);

// Add a new user to Firestore
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
    return true;
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
    throw error;
  }
};

// Get user data from Firestore
export const getUserFromFirestore = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user from Firestore:", error);
    throw error;
  }
};

// Update user data in Firestore
export const updateUserInFirestore = async (
  userId: string, 
  userData: { [key: string]: any }
) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      ...userData,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error("Error updating user in Firestore:", error);
    throw error;
  }
};

// Get Firestore collection reference
export const getCollection = (collectionName: string) => {
  return collection(db, collectionName);
};

// Export db instance for direct access if needed
export { db };
