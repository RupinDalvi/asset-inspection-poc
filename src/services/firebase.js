import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNtGIxGYjRWvpOJPfmIcN4An3w_aAYkY4",
  authDomain: "vibe-vibes.firebaseapp.com",
  projectId: "vibe-vibes",
  storageBucket: "vibe-vibes.firebasestorage.app",
  messagingSenderId: "542860983738",
  appId: "1:542860983738:web:6aa77981e3dbe089b93183"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export function initAuth(onUser) {
  signInAnonymously(auth).catch(console.error);
  onAuthStateChanged(auth, user => { if (user) onUser(user); });
}