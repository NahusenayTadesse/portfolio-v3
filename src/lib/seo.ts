/**
 * Single source of truth for anything that needs an absolute URL.
 * Change SITE_URL here when a custom domain replaces the vercel.app one:
 * canonical tags, og:url, the sitemap and the JSON-LD all read from it.
 */
export const SITE_URL = 'https://nahusenaytadesse.vercel.app';

export const SITE_NAME = 'Nahusenay Tadesse';
export const AUTHOR = 'Nahusenay Tadesse';

export const DEFAULT_TITLE =
	'Nahusenay Tadesse | SvelteKit Developer & Full-Stack Product Engineer';

export const DEFAULT_DESCRIPTION =
	'SvelteKit developer and full-stack product engineer. I build complete business systems in TypeScript: ' +
	'ERP platforms, payroll engines, role-based access control and reporting, with Drizzle, MySQL and Better Auth. ' +
	'Over 20 SvelteKit applications in production. Based in Addis Ababa, Ethiopia and available worldwide.';

export const DEFAULT_IMAGE = `${SITE_URL}/nahu.webp`;

/** Profiles Google uses to connect a Person entity across the web. */
export const SAME_AS = [
	'https://github.com/NahusenayTadesse',
	'https://www.linkedin.com/in/nahusenay-tadesse-ba0375233',
	'https://t.me/NahusenayTadesse'
];

/** Turns a path into an absolute URL; passes absolute URLs through unchanged. */
export function absolute(path: string | null | undefined): string {
	if (!path) return SITE_URL;
	if (/^https?:\/\//i.test(path)) return path;
	return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * Serialises a JSON-LD object for embedding in a <script> tag.
 * Escaping `<` prevents a value containing "</script>" from closing the tag early.
 */
export function jsonLd(schema: Record<string, unknown>): string {
	return `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}<\/script>`;
}

/** Canonical casing for stack names, which arrive from Firestore lowercased. */
const TECH_CASING: Record<string, string> = {
	html: 'HTML',
	css: 'CSS',
	javascript: 'JavaScript',
	js: 'JavaScript',
	typescript: 'TypeScript',
	ts: 'TypeScript',
	svelte: 'Svelte',
	sveltekit: 'SvelteKit',
	php: 'PHP',
	wordpress: 'WordPress',
	mysql: 'MySQL',
	postgresql: 'PostgreSQL',
	sqlite: 'SQLite',
	firebase: 'Firebase',
	supabase: 'Supabase',
	tailwind: 'Tailwind CSS',
	tailwindcss: 'Tailwind CSS',
	nodejs: 'Node.js',
	node: 'Node.js',
	docker: 'Docker',
	drizzle: 'Drizzle',
	pocketbase: 'PocketBase',
	elementor: 'Elementor',
	playwright: 'Playwright',
	vitest: 'Vitest',
	betterauth: 'Better Auth',
	argon2: 'Argon2',
	paraglide: 'Paraglide i18n',
	stripe: 'Stripe',
	chapa: 'Chapa'
};

export function techLabel(name: string): string {
	const key = name.trim().toLowerCase().replace(/[.\s-]/g, '');
	return TECH_CASING[key] ?? name.trim();
}
