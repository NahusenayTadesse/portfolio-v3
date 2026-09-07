
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
    dark:border-background-2/60 dark:bg-transparent dark:text-white dark:shadow-sm dark:shadow-white/20
    dark:hover:border-transparent dark:hover:bg-gradient-to-r dark:hover:from-primary-600 dark:hover:to-secondary-600 dark:hover:text-white
    transition-all duration-300`;

/* Primary action. Mint is the accent, so the one button that matters is the
   one that gets filled with it. */
export let primary = `inline-flex flex-row items-center justify-center gap-3 rounded-lg px-6 py-3 text-lg font-semibold
    bg-background-2 text-ink border border-background-2 shadow-sm
    hover:brightness-95 hover:shadow-md
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink
    dark:bg-background-2 dark:text-secondary-900 dark:border-transparent
    dark:hover:brightness-110
    transition-all duration-300`;

/* Quiet tertiary action - a link, not a button. */
export let quiet = `inline-flex flex-row items-center justify-center gap-2 text-base font-medium
    text-muted underline-offset-4 hover:text-ink hover:underline
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background-2
    dark:text-gray-300 dark:hover:text-white transition-colors duration-200`;

export let button = ``

export let svgClass = `w-8 h-8 text-ink dark:text-white transform hover:scale-110 transition-transform ease-in-out duration-300`;

export let popClass = `w-64 text-sm text-ink dark:text-white bg-surface border border-line shadow-lg rounded-lg p-4 text-center
    dark:border-0 dark:bg-gradient-to-r dark:from-primary-600 dark:to-secondary-600`;

export let classer = `w-12 h-12 lg:w-20 lg:h-20 text-ink dark:text-white dark:fill-white transform hover:scale-110 transition-transform ease-in-out duration-300`;

export let toast = `fixed bottom-20 lg:bottom-0 right-0 p-4 rounded-lg shadow-lg
    bg-surface border border-line text-ink
    dark:bg-secondary-800 dark:border-secondary-600 dark:text-white`;

/* Shared card surface: white with a hairline in light, translucent in dark. */
export let card = `bg-surface border border-line rounded-xl shadow-sm
    dark:bg-white/5 dark:border-white/10 dark:shadow-none`;
