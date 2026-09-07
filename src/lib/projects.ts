/**
 * Older project documents stored `featured` as a single-element array, newer
 * ones store a plain URL string. Normalise both to a string (or null) so the
 * templates and the og:image meta tag always get something they can render.
 */
export function featuredUrl(value: unknown): string | null {
	if (Array.isArray(value)) value = value[0];
	return typeof value === 'string' && value ? value : null;
}
