import { db } from '$lib/firebase-admin';
import { featuredUrl } from '$lib/projects';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  try {
    const snapshot = await db.collection("projects")
  .select("name", "slug", "category", "featured", "technology", "description", "challenges")
  .get();

    const projects = snapshot.docs.map(doc => ({
      name: doc.data().name,
      slug: doc.data().slug,
      category: doc.data().category,
      featured: featuredUrl(doc.data().featured),
      technology: doc.data().technology,
      description: doc.data().description,
      challenges: doc.data().challenges
    }));

    return { projects };

  } catch (error) {
    console.error('Failed to load projects:', error);
    return { projects: [] };
  }
};
