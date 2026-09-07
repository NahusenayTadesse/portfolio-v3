import { SITE_URL } from '$lib/seo';

export const prerender = true;

const body = `User-agent: *
Allow: /

# Admin surface - nothing here belongs in the index
Disallow: /dashboard
Disallow: /login

Sitemap: ${SITE_URL}/sitemap.xml
`;

export function GET() {
	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
}
