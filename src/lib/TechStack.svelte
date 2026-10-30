<script lang="ts">
	import { flip } from 'svelte/animate';
	import { scale, fly } from 'svelte/transition';
	import { backOut, cubicOut } from 'svelte/easing';
	import { reveal } from '$lib/reveal';

	type Tech = {
		name: string;
		description: string;
		link: string;
		group: string;
		expertise?: string;
	};

	let { techStack }: { techStack: Tech[] } = $props();

	const filters = [
		{ id: 'all', label: 'Everything' },
		{ id: 'frontend', label: 'Frontend' },
		{ id: 'backend', label: 'Backend' },
		{ id: 'database', label: 'Data' },
		{ id: 'deployment', label: 'Deployment' }
	];

	let filter = $state('all');
	let order = $state<string[]>([]);
	let selected = $state<string | null>(null);

	// The original order until someone hits shuffle; names are the keys so the
	// flip animation can follow each tile to its new place.
	const ordered = $derived.by(() => {
		if (!order.length) return techStack;
		const byName = new Map(techStack.map((t) => [t.name, t]));
		return order.map((n) => byName.get(n)).filter((t): t is Tech => !!t);
	});

	const visible = $derived(
		filter === 'all' ? ordered : ordered.filter((t) => t.group === filter)
	);

	const current = $derived(techStack.find((t) => t.name === selected) ?? null);

	function count(id: string) {
		return id === 'all' ? techStack.length : techStack.filter((t) => t.group === id).length;
	}

	function shuffle() {
		close();
		const names = ordered.map((t) => t.name);
		for (let i = names.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[names[i], names[j]] = [names[j], names[i]];
		}
		order = names;
	}

	// Tilt toward the pointer. Written straight to the element's style so a
	// mouse move does not re-render anything.
	function tilt(event: PointerEvent) {
		if (event.pointerType !== 'mouse') return;
		const el = event.currentTarget as HTMLElement;
		const r = el.getBoundingClientRect();
		const x = (event.clientX - r.left) / r.width - 0.5;
		const y = (event.clientY - r.top) / r.height - 0.5;
		el.style.setProperty('--rx', `${(-y * 18).toFixed(1)}deg`);
		el.style.setProperty('--ry', `${(x * 18).toFixed(1)}deg`);
	}

	function untilt(event: PointerEvent) {
		const el = event.currentTarget as HTMLElement;
		el.style.setProperty('--rx', '0deg');
		el.style.setProperty('--ry', '0deg');
	}

	/*
	 * Details open in a floating card instead of a panel under the grid. On a
	 * phone the panel sat below the fold, so tapping an icon near the top of
	 * the grid changed something you could not see. Now the card comes to you:
	 * a bottom sheet on small screens, a popover above the tile on desktop.
	 *
	 * The card is moved to <body> so no ancestor's transform or backdrop-filter
	 * can capture its fixed positioning.
	 */
	let anchor: HTMLElement | null = null;
	let pinned = $state(false);
	let placement = $state('');

	function portal(node: HTMLElement) {
		document.body.appendChild(node);
	}

	function place() {
		if (!anchor) return;
		const r = anchor.getBoundingClientRect();
		// Scrolled away from the grid: the card has nothing left to describe.
		if (r.bottom < 0 || r.top > window.innerHeight) {
			close();
			return;
		}
		if (!window.matchMedia('(min-width: 64rem)').matches) {
			placement = '';
			return;
		}
		const half = 168; // half the card width plus a margin
		const x = Math.min(window.innerWidth - half, Math.max(half, r.left + r.width / 2));
		// Flip below the tile when there is no room above it (under the nav).
		const above = r.top > 260;
		const y = above ? r.top - 12 : r.bottom + 12;
		placement = `left:${x}px;top:${y}px;transform:translate(-50%,${above ? '-100%' : '0'})`;
	}

	function open(name: string, el: HTMLElement, pin: boolean) {
		selected = name;
		anchor = el;
		pinned = pin;
		place();
	}

	function close() {
		selected = null;
		pinned = false;
		anchor = null;
	}

	function toggle(event: MouseEvent, name: string) {
		const el = event.currentTarget as HTMLElement;
		if (selected === name && pinned) close();
		else open(name, el, true);
	}

	function preview(event: PointerEvent, name: string) {
		if (event.pointerType === 'mouse' && !pinned) open(name, event.currentTarget as HTMLElement, false);
	}

	function unpreview(event: PointerEvent) {
		untilt(event);
		if (event.pointerType === 'mouse' && !pinned) close();
	}

	function onWindowPointerDown(event: PointerEvent) {
		if (!selected) return;
		const target = event.target as Element | null;
		if (target?.closest('.tech-card, .tile')) return;
		close();
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && selected) {
			const el = anchor;
			close();
			el?.focus();
		}
	}

	function setFilter(id: string) {
		close();
		filter = id;
	}
</script>

<svelte:window
	onpointerdown={onWindowPointerDown}
	onkeydown={onKeydown}
	onresize={place}
	onscroll={() => selected && place()}
/>

<div class="flex w-full flex-col items-center gap-6">
	<div class="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter technologies">
		{#each filters as f (f.id)}
			<button
				type="button"
				onclick={() => setFilter(f.id)}
				aria-pressed={filter === f.id}
				class="chip rounded-full border px-4 py-1.5 font-head text-sm transition-all duration-300
				       {filter === f.id
					? 'border-transparent bg-background-2 text-ink shadow-md dark:text-secondary-900'
					: 'border-line bg-surface text-ink hover:-translate-y-0.5 hover:border-background-2 dark:border-white/15 dark:bg-white/5 dark:text-white'}"
			>
				{f.label}
				<span class="ml-1 text-xs opacity-60">{count(f.id)}</span>
			</button>
		{/each}

		<button
			type="button"
			onclick={shuffle}
			class="shuffle rounded-full border border-dashed border-line px-4 py-1.5 font-head text-sm text-ink transition-all duration-300
			       hover:border-background-2 dark:border-white/25 dark:text-white"
		>
			<span class="dice inline-block" aria-hidden="true">⚄</span> Shuffle
		</button>
	</div>

	<ul
		class="stack flex w-full max-w-4xl flex-wrap justify-center gap-3 rounded-lg border border-line bg-surface p-4 shadow-lg lg:gap-4
		       dark:border-white/10 dark:bg-surface/85 dark:shadow-black/40"
		data-reveal="scale"
		use:reveal
	>
		{#each visible as tech, i (tech.name)}
			<li
				class="flex w-[4.5rem] flex-col items-center gap-1.5 sm:w-20 lg:w-24"
				animate:flip={{ duration: 500, easing: cubicOut }}
				in:scale={{ duration: 400, start: 0.4, easing: backOut, delay: i * 25 }}
			>
				<button
					type="button"
					class="tile pop relative flex h-16 w-16 items-center sm:h-20 sm:w-20 lg:h-24 lg:w-24 justify-center rounded-xl
					       border border-line bg-primary-50/60 dark:border-white/10 dark:bg-white/5
					       {selected === tech.name ? 'is-selected' : ''}"
					style="--i: {i}; --dur: {(3 + ((i * 0.37) % 1.6)).toFixed(2)}s"
					aria-label="{tech.name}: what I use it for"
					aria-expanded={selected === tech.name}
					aria-controls="tech-card"
					onclick={(e) => toggle(e, tech.name)}
					onpointerenter={(e) => preview(e, tech.name)}
					onpointermove={tilt}
					onpointerleave={unpreview}
				>
					<span class="float pointer-events-none">{@html tech.link}</span>
				</button>
				<!-- Names under the icons: not everyone knows the Drizzle or
				     PocketBase logo on sight, and a recruiter should not have to
				     tap each one to find out. -->
				<span class="w-full truncate text-center font-head text-[0.6875rem] sm:text-xs text-muted dark:text-gray-400" aria-hidden="true">{tech.name}</span>
			</li>
		{/each}
	</ul>

	<p class="font-head text-sm text-muted dark:text-gray-400">
		<span class="wave inline-block" aria-hidden="true">👆</span>
		Tap or hover an icon to see what I use it for
	</p>
</div>

{#if current}
	<div
		use:portal
		id="tech-card"
		role="dialog"
		aria-label={current.name}
		class="tech-card fixed inset-x-3 bottom-24 z-[60] flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 text-left shadow-2xl
		       lg:inset-x-auto lg:bottom-auto lg:w-80
		       dark:border-white/10 dark:bg-surface dark:shadow-black/70"
		style={placement}
		transition:fly={{ y: 12, duration: 220, easing: cubicOut }}
	>
		<div class="spot shrink-0">{@html current.link}</div>
		<div class="flex min-w-0 flex-1 flex-col gap-1.5">
			<p class="font-head text-lg font-bold text-ink dark:text-white">{current.name}</p>
			<p class="text-sm leading-relaxed text-muted dark:text-gray-300">{current.description}</p>
		</div>
		<button
			type="button"
			onclick={close}
			aria-label="Close"
			class="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted hover:bg-line hover:text-ink lg:hidden
			       dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
		>✕</button>
	</div>
{/if}

<style>
	.tile {
		transform: perspective(600px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
		transition:
			transform 200ms ease-out,
			background-color 300ms,
			box-shadow 300ms;
	}

	.tile:hover,
	.tile:focus-visible,
	.tile.is-selected {
		background-color: color-mix(in srgb, var(--color-background-2) 35%, transparent);
		box-shadow: 0 0 0 2px var(--color-background-2), 0 10px 30px -10px var(--color-background-2);
		outline: none;
	}

	.float :global(svg) {
		width: 2rem;
		height: 2rem;
	}

	@media (min-width: 64rem) {
		.float :global(svg) {
			width: 3rem;
			height: 3rem;
		}
	}

	.tile.is-selected .float {
		animation: bounce 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	/* Each icon bobs on its own rhythm, so the wall breathes instead of
	   marching in step. */
	.float {
		display: inline-flex;
		animation: bob var(--dur, 3s) ease-in-out infinite;
		animation-delay: calc(var(--i) * -0.41s);
	}

	@keyframes bob {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-6px) rotate(-3deg);
		}
	}

	@keyframes bounce {
		0% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.3) rotate(8deg);
		}
		100% {
			transform: scale(1);
		}
	}

	/* When the grid scrolls into view, the tiles pop in one after another. */
	.stack:global(.is-revealed) .pop {
		animation: pop 500ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
		animation-delay: calc(var(--i) * 40ms + 150ms);
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: scale(0.3) rotate(-20deg);
		}
	}

	.spot :global(svg) {
		width: 3rem;
		height: 3rem;
		animation: bounce 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.shuffle:hover .dice {
		animation: roll 600ms ease-in-out;
	}

	@keyframes roll {
		to {
			transform: rotate(360deg);
		}
	}

	.wave {
		animation: wave 1.6s ease-in-out infinite;
	}

	@keyframes wave {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-4px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tile {
			transform: none;
		}

		.float,
		.wave,
		.spot :global(svg),
		.tile.is-selected .float,
		.stack:global(.is-revealed) .pop {
			animation: none;
		}
	}
</style>
