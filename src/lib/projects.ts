/**
 * Older project documents stored `featured` as a single-element array, newer
 * ones store a plain URL string. Normalise both to a string (or null) so the
 * templates and the og:image meta tag always get something they can render.
 */
export function featuredUrl(value: unknown): string | null {
	if (Array.isArray(value)) value = value[0];
	return typeof value === 'string' && value ? value : null;
}

export type Outcome = { value: string; label: string };

/**
 * The first outcome on a project is its headline figure; cards show that one
 * so a visitor has a reason to click before they read the case study.
 */
export function leadOutcome(value: unknown): Outcome | null {
	const first = Array.isArray(value) ? value[0] : null;
	return first && typeof first.value === 'string' && typeof first.label === 'string'
		? { value: first.value, label: first.label }
		: null;
}
