// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJWu9HPmanavmypT0kPgm3K_byoPSq238",
  authDomain: "customer-management-d04fb.firebaseapp.com",
  projectId: "customer-management-d04fb",
  storageBucket: "customer-management-d04fb.appspot.com",
  messagingSenderId: "241597215115",
  appId: "1:241597215115:web:e23f390603294a32b27f8e",
  measurementId: "G-EWN1WJYVC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)

export {app,auth};