import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtqMqygfn-386dF7elMa8qbCZqr9YOZW8",
  authDomain: "week3-app.firebaseapp.com",
  projectId: "week3-app",
  storageBucket: "week3-app.firebasestorage.app",
  messagingSenderId: "151644307600",
  appId: "1:151644307600:web:235ca0bbd568aabbcad815",
  measurementId: "G-G0Q2W2PCYY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
