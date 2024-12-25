// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

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

export const db = getFirestore(app)
export const auth = getAuth(app)