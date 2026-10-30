import { error } from '@sveltejs/kit';
import { getArticle } from '$lib/writing';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const article = getArticle(params.slug);
	// A real 404, not a 200 carrying a "not found" body.
	if (!article) throw error(404, 'Article not found');
	return { article };
};
