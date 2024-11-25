import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, sendSignInLinkToEmail } from "firebase/auth";
import { writable, derived } from 'svelte/store';
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBj4aBX_Xv_3-21Ahp0xZH-bD1mvPJnGyU",
    authDomain: "codes-with-ai.firebaseapp.com",
    projectId: "codes-with-ai",
    storageBucket: "codes-with-ai.firebasestorage.app",
    messagingSenderId: "641583825990",
    appId: "1:641583825990:web:e9407128042187797c3647"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();

export const sendMagicLink = (email, redirectUrl) => {
  const auth = getAuth(app);

  const actionCodeSettings = {
  url: redirectUrl,
  handleCodeInApp: true,
  }

  return sendSignInLinkToEmail(auth, email, actionCodeSettings)
}

// user store

const userStore = () => {
  let unsubscribe = () => { };

  if (!auth || !globalThis.window) {

    console.warn('auth or window is not defined');

    const { subscribe } = writable(null);

    return {
      subscribe,
    }
  }


  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {

    onAuthStateChanged(auth, (user) => {

      set(user);

    })

    return () => unsubscribe();

  });

  return {

    subscribe,

  }
}
// doc store

export const docStore = (path) => {

  let unsubscribe = () => { };

  const docRef = doc(db, path);

  const { subscribe } = writable(null, (set) => {

    unsubscribe = onSnapshot(docRef, (doc) => {
      set((doc.data() ?? null));
    })

    return () => unsubscribe();

  });

  return {

    subscribe,
    ref: docRef,
    id: docRef.id,

  }

}

export const user = userStore();
export const userData = derived(user, ($user, set) => {

  if ($user) {

    return docStore(`users/${$user.uid}`).subscribe(set);

  } else {
    set(null);
  }
});