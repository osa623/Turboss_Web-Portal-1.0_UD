import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "./firebase";

// Registration - simplified to only use Firebase Authentication
export const registerUser = async (email: string, password: string, firstName: string, lastName: string) => {
  try {
    // First, create the user with email/password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Then set their display name to combine first and last name
    if (userCredential.user) {
      const displayName = `${firstName} ${lastName}`;
      
      try {
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
        console.log("Display name set successfully");
      } catch (profileError) {
        console.error("Error setting display name:", profileError);
        // Continue even if setting display name fails
      }
    }
    
    return userCredential;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Login
export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

// Logout
export const logoutUser = async () => {
  // Clear the auth cookie when logging out
  if (typeof window !== 'undefined') {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
  return signOut(auth);
};

// Authentication state observer
export const onAuthChange = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

// Update user profile
export const updateUserProfile = (displayName: string, photoURL?: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently signed in");
  
  return updateProfile(user, {
    displayName,
    photoURL: photoURL || user.photoURL,
  });
};

// Reset password
export const resetPassword = (email: string) => 
  sendPasswordResetEmail(auth, email);

// Update user email
export const updateUserEmail = (newEmail: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently signed in");
  
  return updateEmail(user, newEmail);
};

// Update user password
export const updateUserPassword = (newPassword: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently signed in");
  
  console.log("Updating password for user:", user.email);
  return updatePassword(user, newPassword);
};

// Re-authenticate user (needed for sensitive operations)
export const reauthenticate = (password: string) => {
  const user = auth.currentUser;
  if (!user || !user.email) throw new Error("No user is currently signed in");
  
  console.log("Re-authenticating user:", user.email);
  const credential = EmailAuthProvider.credential(user.email, password);
  return reauthenticateWithCredential(user, credential);
};

// Get current user
export const getCurrentUser = () => auth.currentUser;
