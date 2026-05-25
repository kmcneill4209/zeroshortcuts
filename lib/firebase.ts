import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Guard: don't initialize Firebase during SSR/build without env vars
const canInit = typeof window !== 'undefined' || !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _auth: any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _db: any;

if (canInit && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  _auth = getAuth(app);
  _db = getFirestore(app);
}

export const auth = _auth;
export const db = _db;
