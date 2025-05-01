import { initializeApp, getApps } from "firebase/app";
import { getReactNativePersistence, initializeAuth, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAPwh6OlFQTqG2WCDDK5YlPWh9hwCIHRlE",
  authDomain: "mobile-chat-9b559.firebaseapp.com",
  projectId: "mobile-chat-9b559",
  storageBucket: "mobile-chat-9b559.firebasestorage.app",
  messagingSenderId: "392340888058",
  appId: "1:392340888058:web:f237647f7fe67d37d66c43",
};

// Initialize Firebase app 
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Auth
export const auth =
  getAuth(app) ||
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

// Firestore setup
export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const roomsRef = collection(db, "rooms");
