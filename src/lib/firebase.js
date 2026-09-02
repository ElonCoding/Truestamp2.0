import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase safely
let app = null;
let db = null;
let auth = null;
let analytics = null;

const hasValidConfig = 
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes('api_key_here') &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY.length > 5;

if (hasValidConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    auth = getAuth(app);
    if (typeof window !== "undefined") {
      isSupported().then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    }
  } catch (err) {
    console.warn("Firebase initialization error (falling back to mock mode):", err);
    app = null;
    db = null;
    auth = null;
  }
}

export { app, db, auth, analytics };
