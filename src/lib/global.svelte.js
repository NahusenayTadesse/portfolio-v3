
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

export let link = `border-1 border-white dark:border-1 dark:border-background-2 dark:text-white bg-transparent text-secondary-900 
    px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2 hover:text-black hover:shadow-sm shadow-sm
     shadow-black dark:hover:border-0 dark:hover:shadow-sm dark:hover:bg-gradient-to-r dark:hover:from-secondary-500 dark:hover:to-background-1
    transition-colors duration-300  dark:hover:text-white text-lg dark:shadow-white dark:shadow-sm`;

export let button = ``

export let svgClass = `w-8 h-8 text-secondary-900 dark:text-white transform hover:scale-125 transition-transform ease-in-out duration-300`;
export let popClass = `w-64 text-sm text-secondary-900 dark:text-white bg-gradient-to-r from-background-2 to-background-1 dark:bg-gradient-to-r
 dark:from-primary-600 dark:to-secondary-600 shadow-lg rounded-lg p-4 text-center`;
export let classer = `w-12 h-12 lg:w-20 lg:h-20 text-secondary-900 dark:text-white dark:fill-white transform hover:scale-125 transition-transform ease-in-out duration-300`;
