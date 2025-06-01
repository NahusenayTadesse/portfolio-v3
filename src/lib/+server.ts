// src/routes/your-page/+page.server.ts
import { db } from '$lib/firebase-admin'; // your firebase-admin setup
import { collection, addDoc } from 'firebase/firestore'; // Optional: if using firebase client on server

import type { Actions } from './$types';

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const message = formData.get('message')?.toString();

    if (!email || !message) {
      return {
        status: 400,
        body: {
          error: 'Missing fields'
        }
      };
    }

    try {
      // Writing to Firestore with Admin SDK
      await db.collection('contacts').add({
         email,
         message
      });

      return {
        success: true
      };
    } catch (err) {
      console.error('Firestore write error:', err);
      return {
        status: 500,
        body: {
          error: 'Server error'
        }
      };
    }
  }
};
