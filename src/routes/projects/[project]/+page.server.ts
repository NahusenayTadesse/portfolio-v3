// src/routes/+page.server.ts
import { db } from '$lib/firebase-admin';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params}) => {

  const { project } = params;
  if (!project)
    throw new Error("Project slug is required");

  let slug = project;

  try {
    const snapshot = await db.collection("projects")
      .where("slug", "==", slug) 
      .limit(1) 
      .get();

    let project = null; // Initialize project as null

    if (!snapshot.empty) {
      const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(), 
      technology: doc.data().technology ?? []
    }));
    project = projects[0] || null; 
    return { project }; 
    }

  } catch (error) {
    console.error('Failed to load project:', error);
    return { project: null };
  }
};