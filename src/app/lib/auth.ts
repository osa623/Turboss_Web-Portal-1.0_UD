import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  User
} from "firebase/auth";
import { auth } from "./firebase";
import { addUserToFirestore, updateUserInFirestore } from "./firestore";

// Register a new user
export const registerUser = async (
  email: string, 
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    // Create the user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Set display name in Auth profile
    const displayName = `${firstName} ${lastName}`;
    await updateProfile(user, { displayName });
    
    // Store additional user data in Firestore
    await addUserToFirestore(user.uid, {
      firstName,
      lastName,
      displayName,
      email: user.email,
      photoURL: user.photoURL || '/placeholders/default-avatar.jpg',
      createdAt: new Date().toISOString(),
      reputation: 0,
      badgeLevel: 'Member'
    });
    
    return user;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Login an existing user
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Logout the current user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

// Authentication state observer
export const onAuthChange = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback);

// Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: {
    displayName?: string;
    photoURL?: string;
    specialty?: string;
    [key: string]: any;
  }
) => {
  try {
    // If the current user is logged in and it's the same user
    if (auth.currentUser && auth.currentUser.uid === userId) {
      // Update Auth profile if needed
      if (updates.displayName || updates.photoURL) {
        await updateProfile(auth.currentUser, {
          displayName: updates.displayName,
          photoURL: updates.photoURL
        });
      }
    }
    
    // Update Firestore user document
    await updateUserInFirestore(userId, updates);
    
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
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
