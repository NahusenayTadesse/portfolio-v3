
/**
 * @param {HTMLHeadingElement} node
 */
export function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent ?? "";
		const duration = text.length / (speed * 0.05);

		return {
			duration,
			tick: (t = 5) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}

/* In light mode the page ground is near-white and mint is the accent, so a
   button earns attention with a border and a mint hover rather than by being
   another gradient among gradients. Dark mode keeps its gradient treatment. */
export let link = `inline-flex flex-row items-center justify-center gap-3 rounded-lg px-6 py-3 text-lg font-medium
    border border-line bg-surface text-ink shadow-sm
    hover:border-background-2 hover:bg-background-2/40 hover:shadow-md
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background-2
    dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:shadow-none
    dark:hover:border-background-2/60 dark:hover:bg-background-2/10 dark:hover:text-background-2
    transition-all duration-300`;

/* Primary action. Mint is the accent, so the one button that matters is the
   one that gets filled with it. */
export let primary = `inline-flex flex-row items-center justify-center gap-3 rounded-lg px-6 py-3 text-lg font-semibold
    bg-background-2 text-ink border border-background-2 shadow-sm
    hover:brightness-95 hover:shadow-md
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink
    dark:bg-background-2 dark:text-secondary-900 dark:border-transparent
    dark:shadow-[0_0_24px_-4px_rgb(168_237_234/0.45)] dark:hover:shadow-[0_0_32px_-2px_rgb(168_237_234/0.6)]
    dark:hover:brightness-105
    transition-all duration-300`;

/* Quiet tertiary action - a link, not a button. */
export let quiet = `inline-flex flex-row items-center justify-center gap-2 text-base font-medium
    text-muted underline-offset-4 hover:text-ink hover:underline
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background-2
    dark:text-gray-300 dark:hover:text-white transition-colors duration-200`;

export let button = ``

export let svgClass = `w-8 h-8 text-ink dark:text-white transform hover:scale-110 transition-transform ease-in-out duration-300`;

export let popClass = `w-64 text-sm text-ink dark:text-white bg-surface border border-line shadow-lg rounded-lg p-4 text-center
    dark:border-white/10 dark:bg-surface/90 dark:backdrop-blur-md`;

export let classer = `w-12 h-12 lg:w-20 lg:h-20 text-ink dark:text-white dark:fill-white transform hover:scale-110 transition-transform ease-in-out duration-300`;

export let toast = `fixed bottom-20 lg:bottom-0 right-0 p-4 rounded-lg shadow-lg
    bg-surface border border-line text-ink
    dark:bg-surface dark:border-white/10 dark:text-white`;

/* Shared card surface: white with a hairline in light, translucent in dark. */
export let card = `bg-surface border border-line rounded-xl shadow-sm
    dark:bg-surface/85 dark:border-white/10 dark:shadow-none dark:backdrop-blur-sm`;

/* ---------------------------------------------------------------------------
   Type scale
   ---------------------------------------------------------------------------
   Four heading steps used everywhere, so a section title is the same size on
   every page and a card heading never outranks a section. Body copy is
   text-base, stepping up to text-lg on large screens; text-sm is for meta
   only (captions, labels, dates).

   display   hero and page titles          36 / 48 / 72 px
   h2        section titles                30 / 36 / 48 px
   h3        sub-sections and card titles  20 / 24 px
   eyebrow   small label above an h2       12 px, tracked caps
--------------------------------------------------------------------------- */
export let display = `font-head text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-7xl dark:text-white`;

export let h2 = `font-head text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl dark:text-white`;

export let h3 = `font-head text-xl font-bold text-ink lg:text-2xl dark:text-white`;

export let eyebrow = `font-head text-xs font-semibold uppercase tracking-[0.2em] text-muted dark:text-background-2/80`;

export let body = `text-base leading-relaxed text-ink/85 lg:text-lg dark:text-gray-300`;
