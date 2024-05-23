// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAXhKyD7iMq-pyQd0ot6eOf44JZaDDOOaQ',
  authDomain: 'buybusy-b3e97.firebaseapp.com',
  projectId: 'buybusy-b3e97',
  storageBucket: 'buybusy-b3e97.appspot.com',
  messagingSenderId: '380611081244',
  appId: '1:380611081244:web:4ba5b9bb83e23616c71bd9'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
