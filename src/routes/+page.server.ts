// src/routes/+page.server.ts
import { db } from '$lib/firebase-admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const snapshot = await db.collection('projects').get();
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description,
      link: doc.data().link,
      desktop: doc.data().desktop,
      mobile: doc.data().mobile,
      tablet: doc.data().tablet,
      challenges: doc.data().challenges,
      technologies: doc.data().technologies,
      created_at: doc.data().created_at.toDate(),
    }));

    return { projects };

  } catch (error) {
    console.error('Failed to load projects:', error);
    return { projects: [] };
  }
};
