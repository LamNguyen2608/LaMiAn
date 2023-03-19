import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBfhZ8k_POV1b1VsqOxhMi5Jfvf7sDsuog',
  authDomain: 'enterpriseprojectdemo.firebaseapp.com',
  projectId: 'enterpriseprojectdemo',
  storageBucket: 'enterpriseprojectdemo.appspot.com',
  messagingSenderId: '40842552018',
  appId: '1:40842552018:web:e1871ee91a89b61907430b',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { app, firestore, auth, storage };
