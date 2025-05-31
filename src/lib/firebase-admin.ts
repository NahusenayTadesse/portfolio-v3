
// src/lib/server/firebase-admin.ts
import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { FIREBASE_ADMIN_SDK_CONFIG } from '$env/static/private';

let app;

// Parse JSON string from environment
const serviceAccount = JSON.parse(FIREBASE_ADMIN_SDK_CONFIG);

if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  app = getApp();
}

const db = getFirestore(app);

export { db };
