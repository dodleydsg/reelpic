// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7W7JySpnD9RaYpe13HJDSXGaM5ci2tSM",
  authDomain: "reelpic.firebaseapp.com",
  projectId: "reelpic",
  storageBucket: "reelpic.appspot.com",
  messagingSenderId: "938282491569",
  appId: "1:938282491569:web:b4a9a469e43559451f8c90",
  measurementId: "G-3F4HZVZD5W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
