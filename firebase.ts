// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvll9tKbnaBSqWB2ZOts_kvILIR-IMpZs",
  authDomain: "insta-clone-c33e6.firebaseapp.com",
  projectId: "insta-clone-c33e6",
  storageBucket: "insta-clone-c33e6.appspot.com",
  messagingSenderId: "328876975159",
  appId: "1:328876975159:web:9d267bf1b35a7e1759cbb2",
  measurementId: "G-S7J5434FDH"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig):getApp();
const db = getFirestore(app);
const storage = getStorage();

export { app, db, storage };
