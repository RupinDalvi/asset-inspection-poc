import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
export const storage = getStorage(app);

export function initAuth(onUser) {
  signInAnonymously(auth).catch(console.error);
  onAuthStateChanged(auth, user => { if (user) onUser(user); });
}

export async function uploadMedia(rootPath, mediaArray) {
  const urls = [];
  for (const item of mediaArray) {
    const fileRef = ref(storage, `${rootPath}/${item.timestamp}`);
    await uploadBytes(fileRef, item.blob);
    urls.push(await getDownloadURL(fileRef));
  }
  return urls;
}

