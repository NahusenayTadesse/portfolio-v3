// src/routes/+page.server.ts
import { db } from '$lib/firebase-admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const snapshot = await db.collection("projects")
  .select("name", "slug", "category", "featured", "technologies")
  .get();

    const projects = snapshot.docs.map(doc => ({
      name: doc.data().name,
      slug: doc.data().slug,
      category: doc.data().category,
      featured: doc.data().featured,
      technologies: doc.data().technologies
    }));

    return { projects };

  } catch (error) {
    console.error('Failed to load projects:', error);
    return { projects: [] };
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
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
import type { Actions } from './$types';
