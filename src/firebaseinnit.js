// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwV-qbf_pOuwt1mxQm2j18OvtezmfUfh4",
  authDomain: "buybusy-36c6a.firebaseapp.com",
  projectId: "buybusy-36c6a",
  storageBucket: "buybusy-36c6a.appspot.com",
  messagingSenderId: "410120097584",
  appId: "1:410120097584:web:38775be537f3d6497d42f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);