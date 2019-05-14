import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig';
export function initializeFirebaseApp() {
    return initializeApp(firebaseConfig);
};