// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8cEg86EHTNLuZDI139pRnIb5MEIm-I10",
  authDomain: "turboss.firebaseapp.com",
  projectId: "turboss",
  storageBucket: "turboss.firebasestorage.app",
  messagingSenderId: "688670834791",
  appId: "1:688670834791:web:803a261c686b475ce394c2",
  measurementId: "G-76ZEMQV3V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);