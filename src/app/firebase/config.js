import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDEiOv1TgZcjFWHV8jEllFZbu3UrpoaTYQ",
  authDomain: "exercisetutorialapp.firebaseapp.com",
  projectId:"exercisetutorialapp",
  storageBucket: "exercisetutorialapp.firebasestorage.app",
  messagingSenderId:"289892405363",
  appId: "1:289892405363:web:f1c3ce4f242cace6691a06",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
