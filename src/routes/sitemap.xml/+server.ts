import { db } from '$lib/firebase-admin';
import { SITE_URL } from '$lib/seo';

/** XML text nodes must not contain raw &, < or >. */
function xml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function url(path: string, priority: string, changefreq: string): string {
	return `  <url>
    <loc>${xml(SITE_URL + path)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
	let slugs: string[] = [];

	try {
		const snapshot = await db.collection('projects').select('slug').get();
		slugs = snapshot.docs
			.map((doc) => doc.data().slug)
			.filter((slug): slug is string => typeof slug === 'string' && slug.length > 0);
	} catch (error) {
		// A Firestore outage should still leave a valid sitemap of static routes
		// rather than a 500, which search engines treat as a fetch failure.
		console.error('sitemap: failed to load project slugs', error);
	}

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[
	url('/', '1.0', 'weekly'),
	url('/projects', '0.9', 'weekly'),
	...slugs.map((slug) => url(`/projects/${encodeURIComponent(slug)}`, '0.8', 'monthly'))
].join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
}
