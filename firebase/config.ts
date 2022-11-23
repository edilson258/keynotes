// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq6Zq6joDL1rXpMLuAs_Kgp1egMbUYkm0",
  authDomain: "notesapp-7eba5.firebaseapp.com",
  projectId: "notesapp-7eba5",
  storageBucket: "notesapp-7eba5.appspot.com",
  messagingSenderId: "875201009254",
  appId: "1:875201009254:web:994773348fcd51e9a0bfa7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
