import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Config del proyecto Firebase "ambar-hotel-boutique".
// El apiKey de una app web de Firebase no es un secreto — la seguridad real
// se controla con las reglas de Firestore/Storage, no ocultando esta config.
const firebaseConfig = {
  apiKey: "AIzaSyDj8ZV0bbeF-jydBzVH7F6MaM33DDFcAPw",
  authDomain: "ambar-hotel-boutique.firebaseapp.com",
  projectId: "ambar-hotel-boutique",
  storageBucket: "ambar-hotel-boutique.firebasestorage.app",
  messagingSenderId: "314837593958",
  appId: "1:314837593958:web:e251be61171550d79aa2a7",
  measurementId: "G-FB13REN0T5",
};

// Evita reinicializar la app en cada hot-reload / render en Next.js.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
