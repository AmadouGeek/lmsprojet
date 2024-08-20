import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut} from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, addDoc, getDocs, updateDoc, orderBy, onSnapshot, deleteDoc, query, where, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = typeof window !== 'undefined' && 'measurementId' in firebaseConfig ? getAnalytics(app) : null;

const addNotification = async (userId, message) => {
  try {
    const notificationsCollection = collection(db, 'notifications');
    await addDoc(notificationsCollection, {
      userId,
      message,
      read: false,
      timestamp: new Date(),
    });
    console.log('Notification added successfully');
  } catch (error) {
    console.error('Error adding notification:', error);
  }
};

export { auth, signOut,db, storage, analytics, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, doc, setDoc, collection, addDoc, orderBy, onSnapshot, getDocs, updateDoc, deleteDoc, query, where, addNotification, ref, uploadBytes, getDownloadURL, getDoc };
