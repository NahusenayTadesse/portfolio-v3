/**
 * Single source of truth for anything that needs an absolute URL.
 * Change SITE_URL here when a custom domain replaces the vercel.app one —
 * canonical tags, og:url, the sitemap and the JSON-LD all read from it.
 */
export const SITE_URL = 'https://nahusenaytadesse.vercel.app';

export const SITE_NAME = 'Nahusenay Tadesse';
export const AUTHOR = 'Nahusenay Tadesse';

export const DEFAULT_TITLE =
	'Nahusenay Tadesse — Svelte & SvelteKit Developer | TypeScript Developer in Ethiopia';

export const DEFAULT_DESCRIPTION =
	'Svelte and SvelteKit developer building fast, accessible, production web apps in TypeScript. ' +
	'Available worldwide and based in Addis Ababa, Ethiopia. Fullstack work across Firebase, Supabase and PostgreSQL.';

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
	elementor: 'Elementor'
};

export function techLabel(name: string): string {
	const key = name.trim().toLowerCase().replace(/[.\s-]/g, '');
	return TECH_CASING[key] ?? name.trim();
}
