// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFireStore, collection} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPwh6OlFQTqG2WCDDK5YlPWh9hwCIHRlE",
  authDomain: "mobile-chat-9b559.firebaseapp.com",
  projectId: "mobile-chat-9b559",
  storageBucket: "mobile-chat-9b559.firebasestorage.app",
  messagingSenderId: "392340888058",
  appId: "1:392340888058:web:f237647f7fe67d37d66c43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeApp(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFireStore(app);

export const usersRef = collection(db, 'users');
export const roomsRef = collection(db, 'rooms');
