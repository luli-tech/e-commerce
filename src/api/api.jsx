// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXRtP54_6WKpuZ60C8a57tTcO9IIsyI2o",
    authDomain: "cartnew-362d7.firebaseapp.com",
    projectId: "cartnew-362d7",
    storageBucket: "cartnew-362d7.firebasestorage.app",
    messagingSenderId: "289395852602",
    appId: "1:289395852602:web:5855e51ac3a5ee3cbd7c03",
    measurementId: "G-BT6ZX2GG0W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);