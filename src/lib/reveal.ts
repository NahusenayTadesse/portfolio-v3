import type { Action } from 'svelte/action';

/**
 * Scroll-reveal action.
 *
 * The hidden state lives in CSS (see app.css) and is gated on `.js-motion`,
 * a class set before first paint in app.html. That split matters: markup keeps
 * its `data-reveal` attribute through SSR, so an element that starts hidden is
 * already hidden on the very first frame instead of flashing in and then out
 * once hydration catches up. Visitors without JavaScript never get the class,
 * so they get the plain, fully visible page.
 *
 * Usage:
 *   <section data-reveal use:reveal>
 *   <li data-reveal="scale" use:reveal={{ delay: i * 60 }}>
 */

export type RevealOptions = {
	/** Milliseconds to hold before this element animates. Use for stagger. */
	delay?: number;
};

/**
 * One observer for the whole document rather than one per element. The
 * projects grid alone can mount three dozen revealed nodes, and each extra
 * observer is its own callback and its own set of tracked boxes.
 */
let observer: IntersectionObserver | null = null;

function sharedObserver(): IntersectionObserver {
	if (observer) return observer;

	observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-revealed');
				// Reveal is a one-way trip. Re-hiding on scroll-up reads as a
				// glitch on the way back up a long case study.
				observer?.unobserve(entry.target);
			}
		},
		{
			// Fire when the element's top edge has cleared the bottom tenth of
			// the viewport. A percentage threshold instead would never trigger
			// for a section taller than the screen.
			threshold: 0,
			rootMargin: '0px 0px -10% 0px'
		}
	);

	return observer;
}

export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	// Old browsers, and anything that stubs the API out, should see content
	// rather than an empty page.
	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('is-revealed');
		return;
	}

	// Callers normally put the attribute in the markup so the SSR html already
	// carries it; this is the fallback for the ones that forget.
	if (node.dataset.reveal === undefined) node.dataset.reveal = '';

	function applyDelay(next: RevealOptions | undefined) {
		if (next?.delay) {
			node.style.setProperty('--reveal-delay', `${next.delay}ms`);
		} else {
			node.style.removeProperty('--reveal-delay');
		}
	}

	applyDelay(options);

	const io = sharedObserver();
	io.observe(node);

	return {
		update(next) {
			applyDelay(next);
		},
		destroy() {
			io.unobserve(node);
		}
	};
};

/**
 * Tells the app.html watchdog that hydration happened, so it leaves the
 * hidden state in place. Called once from the root layout.
 */
export function markRevealReady() {
	document.documentElement.dataset.revealReady = 'true';
}
