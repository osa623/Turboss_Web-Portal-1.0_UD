// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8cEg86EHTNLuZDI139pRnIb5MEIm-I10",
  authDomain: "turboss.firebaseapp.com",
  projectId: "turboss",
  storageBucket: "turboss.appspot.com",
  messagingSenderId: "688670834791",
  appId: "1:688670834791:web:803a261c686b475ce394c2",
  measurementId: "G-76ZEMQV3V7"
};

// Initialize Firebase
const apps = getApps();
const app = apps.length === 0 ? initializeApp(firebaseConfig) : apps[0];

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore with enhanced offline persistence
export const db = getFirestore(app);

// Enable offline persistence with more robust configuration
if (typeof window !== 'undefined') {
  // Configure cache size and other settings
  const firestoreSettings = {
    cacheSizeBytes: 100 * 1024 * 1024, // Increase to 100MB for better offline support
  };

  // Use a more robust approach to enable persistence with retries
  const enablePersistence = async (retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        await enableIndexedDbPersistence(db);
        console.log("✅ Firestore offline persistence enabled successfully");
        window.dispatchEvent(new CustomEvent('firestoreOfflineReady'));
        return true;
      } catch (err: any) {
        if (err.code === 'failed-precondition') {
          console.warn('Multiple tabs open, persistence limited to one tab');
          window.dispatchEvent(new CustomEvent('firestoreOfflineLimited'));
          // No retry needed for this error - it's expected with multiple tabs
          return false;
        } else if (err.code === 'unimplemented') {
          console.warn('This browser doesn\'t support persistence');
          window.dispatchEvent(new CustomEvent('firestoreOfflineUnsupported'));
          // No retry needed - browser doesn't support it
          return false;
        } else {
          // For other errors, retry if we have attempts left
          console.error(`Persistence setup error (attempt ${attempt+1}/${retries}):`, err);
          if (attempt === retries - 1) {
            console.error("❌ Failed to enable offline persistence after multiple attempts");
            window.dispatchEvent(new CustomEvent('firestoreOfflineFailed', { 
              detail: { error: err } 
            }));
            return false;
          }
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    return false;
  };

  // Start the persistence enabling process
  enablePersistence()
    .then((success) => {
      if (success) {
        // Add an indicator in development to confirm persistence is working
        if (process.env.NODE_ENV === 'development') {
          console.info("%c 📱 Offline mode ready! ", "background: #4CAF50; color: white; padding: 4px; border-radius: 4px;");
        }
      }
    });

  // Dynamic import for analytics to prevent server-side rendering issues
  import('firebase/analytics').then(({ getAnalytics }) => {
    getAnalytics(app);
  }).catch(error => {
    console.error('Analytics failed to load:', error);
  });
}

// Log Firestore initialization for debugging
console.log("Firebase and Firestore initialized with public collections access");

// Export the Firebase app
export { app };