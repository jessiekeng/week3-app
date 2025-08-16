import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtqMqygfn-386dF7elMa8qbCZqr9YOZW8",
  authDomain: "week3-app.firebaseapp.com",
  projectId: "week3-app",
  storageBucket: "week3-app.appspot.com",
  messagingSenderId: "151644307600",
  appId: "1:151644307600:web:235ca0abcdef1234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
