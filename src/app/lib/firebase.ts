// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

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

// Export the Firebase app
export { app };

// Initialize Analytics only on client side
if (typeof window !== 'undefined') {
  // Dynamic import for analytics to prevent server-side rendering issues
  import('firebase/analytics').then(({ getAnalytics }) => {
    getAnalytics(app);
  }).catch(error => {
    console.error('Analytics failed to load:', error);
  });
}