// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDImNzrF48qI8flchtWneFs7tjOREup6rQ",
  authDomain: "interview-d3c33.firebaseapp.com",
  projectId: "interview-d3c33",
  storageBucket: "interview-d3c33.firebasestorage.app",
  messagingSenderId: "457088637823",
  appId: "1:457088637823:web:e4112fe413fdf3e013184a",
  measurementId: "G-KE6D9TYC85"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig): getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);