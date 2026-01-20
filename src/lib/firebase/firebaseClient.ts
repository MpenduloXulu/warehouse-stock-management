import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, Firestore, connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDXqREBE8FnGhnpp-b_atYABpRnFRxt65g",
  authDomain: "warehouse-be591.firebaseapp.com",
  projectId: "warehouse-be591",
  storageBucket: "warehouse-be591.firebasestorage.app",
  messagingSenderId: "533490049630",
  appId: "1:533490049630:web:0466dec80dbe53f9ee4acf",
  measurementId: "G-9JPSB7KK4L"
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Enable offline persistence for Firestore (optional, but helpful)
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence not available');
    }
  });
}

export default app;
