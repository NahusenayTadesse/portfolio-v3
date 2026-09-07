import { db } from '$lib/firebase-admin';
import { featuredUrl } from '$lib/projects';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type ProjectImage = { url: string; caption: string | null; alt: string };
type Outcome = { value: string; label: string };
type StackItem = { name: string; group: string; note: string };

export const load: PageServerLoad = async ({ params }) => {
	const slug = params.project;
	if (!slug) throw error(404, 'Project not found');

	try {
		// Documents are keyed by slug, so this is a direct read rather than a query.
		const doc = await db.collection('projects').doc(slug).get();
		if (!doc.exists) throw error(404, 'Project not found');

		const d = doc.data() ?? {};

		return {
			project: {
				id: doc.id,
				slug: (d.slug as string) ?? doc.id,
				name: (d.name as string) ?? '',
				client: (d.client as string | null) ?? null,
				category: (d.category as string | null) ?? null,
				year: (d.year as string | null) ?? null,
				description: (d.description as string) ?? '',
				body: (d.body as string) ?? '',
				link: (d.link as string | null) ?? null,
				featured: featuredUrl(d.featured),
				coverAlt: (d.coverAlt as string | null) ?? null,
				images: (d.images as ProjectImage[]) ?? [],
				services: (d.services as string[]) ?? [],
				outcomes: (d.outcomes as Outcome[]) ?? [],
				technology: (d.technology as string[]) ?? [],
				stack: (d.stack as StackItem[]) ?? []
			}
		};
	} catch (err) {
		// Re-throw SvelteKit's own HttpError; only a genuine failure is a 500.
		if (err && typeof err === 'object' && 'status' in err) throw err;
		console.error('Failed to load project:', err);
		throw error(500, 'Could not load this project');
	}
};
