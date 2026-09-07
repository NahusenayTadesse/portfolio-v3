import { db } from '$lib/firebase-admin';
import { featuredUrl } from '$lib/projects';
import type { LayoutServerLoad } from './$types';

/**
 * Incremental Static Regeneration: Vercel serves a cached HTML response and
 * refreshes it in the background at most once an hour, so a visit no longer
 * costs a Firestore round trip. Full prerendering is not an option here - the
 * project list is edited from /dashboard at runtime, so a build-time snapshot
 * would go stale until the next deploy.
 */
export const config = {
	isr: {
		expiration: 3600
	}
};

export const load: LayoutServerLoad = async () => {
  try {
    const snapshot = await db.collection("projects")
  .select("name", "slug", "category", "featured", "description", "year", "client", "services", "sortOrder")
  .get();

    const projects = snapshot.docs.map(doc => ({
      name: doc.data().name,
      slug: doc.data().slug,
      category: doc.data().category,
      featured: featuredUrl(doc.data().featured),
      description: doc.data().description ?? '',
      year: doc.data().year ?? null,
      client: doc.data().client ?? null,
      services: doc.data().services ?? [],
      sortOrder: doc.data().sortOrder ?? 0
    }));


    projects.sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));

    return { projects };

  } catch (error) {
    console.error('Failed to load projects:', error);
    return { projects: [] };
  }
};
