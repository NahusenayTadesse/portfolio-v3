// place files you want to import through the `$lib` alias in this folder.
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, deleteApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FIREBASE_ADMIN_SDK_CONFIG } from '$env/static/private'; // Access server-side env vars

import { PUBLIC_API_KEY, PUBLIC_APP_ID, PUBLIC_AUTH_DOMAIN, PUBLIC_MEASUREMENT_ID, PUBLIC_PROJECT_ID, PUBLIC_MESSAGING_SENDER_ID, PUBLIC_STORAGE_BUCKET } from '$env/static/public';
import { browser } from '$app/environment'; // <-- Import 'browser' from SvelteKit

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: PUBLIC_API_KEY,
  authDomain: PUBLIC_AUTH_DOMAIN,
  projectId: PUBLIC_PROJECT_ID,
  storageBucket: PUBLIC_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
  appId: PUBLIC_APP_ID,
  measurementId: PUBLIC_MEASUREMENT_ID
};



// Initialize Firebase
let firebaseApp;
let db: Firestore;
// let auth;
// let storage;

// Only initialize Firebase client SDK in the browser
if (browser) { // <-- This is the key change!
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    console.log('Firebase App Initialized (client-side)!');
  } else {
    firebaseApp = getApp();
    console.log('Firebase App already initialized. Using existing app (client-side).');
  }

  db = getFirestore(firebaseApp);
  console.log('Firestore DB instance obtained (client-side):', db);

  // auth = getAuth(firebaseApp); // Uncomment if needed
  // storage = getStorage(firebaseApp); // Uncomment if needed
}

export {
  firebaseApp, // This will be undefined on the server, which is fine if you're not using it there
  db,
  // auth,
  // storage,
};