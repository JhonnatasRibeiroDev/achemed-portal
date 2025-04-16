import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Sua configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDT0NgVrRIIwJWhi4ncbPYtL3dl-doDjSM",
  authDomain: "achemed-portal.firebaseapp.com",
  projectId: "achemed-portal",
  storageBucket: "achemed-portal.firebasestorage.app",
  messagingSenderId: "1036161185230",
  appId: "1:1036161185230:web:1d45b3b40deab6dc8aa79f",
  measurementId: "G-C89RGMDNMZ",
};

// Inicializa o Firebase de forma segura
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializa Auth e Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
