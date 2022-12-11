// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import {getFirestore} from "firebase/firestore"
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import Config from "react-native-config";
// Your web app's Firebase configuration
import { FIREBASE_MEASUREMENT_ID, FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, 
    FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKETt,
    FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID} from "@env"; 
    const firebaseConfig = {
        apiKey: FIREBASE_API_KEY,
        authDomain: FIREBASE_AUTH_DOMAIN,
        databaseURL: FIREBASE_DATABASE_URL,
        projectId: FIREBASE_PROJECT_ID,
        storageBucket: FIREBASE_STORAGE_BUCKETt,
        messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
        appId: FIREBASE_APP_ID,
        measurementId: FIREBASE_MEASUREMENT_ID
    };
// Initialize Firebase
console.log("Firebase Initialize.............", firebaseConfig)
const app = initializeApp(firebaseConfig);
console.log("Hello, App")
export default app;