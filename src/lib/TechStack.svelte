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
		expertise: string;
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

	function preview(event: PointerEvent, name: string) {
		if (event.pointerType === 'mouse') selected = name;
	}
</script>

<div class="flex w-full flex-col items-center gap-6">
	<div class="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Filter technologies">
		{#each filters as f (f.id)}
			<button
				type="button"
				onclick={() => (filter = f.id)}
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
		       dark:border-transparent dark:bg-gradient-to-br dark:from-primary-600 dark:to-secondary-600"
		data-reveal="scale"
		use:reveal
	>
		{#each visible as tech, i (tech.name)}
			<li
				class="flex items-center justify-center"
				animate:flip={{ duration: 500, easing: cubicOut }}
				in:scale={{ duration: 400, start: 0.4, easing: backOut, delay: i * 25 }}
			>
				<button
					type="button"
					class="tile pop relative flex h-16 w-16 items-center sm:h-20 sm:w-20 lg:h-24 lg:w-24 justify-center rounded-xl
					       border border-line bg-primary-50/60 dark:border-white/10 dark:bg-white/5
					       {selected === tech.name ? 'is-selected' : ''}"
					style="--i: {i}; --dur: {(3 + ((i * 0.37) % 1.6)).toFixed(2)}s"
					aria-label="{tech.name}: {tech.expertise}"
					aria-pressed={selected === tech.name}
					onclick={() => (selected = selected === tech.name ? null : tech.name)}
					onpointerenter={(e) => preview(e, tech.name)}
					onpointermove={tilt}
					onpointerleave={untilt}
				>
					<span class="float pointer-events-none">{@html tech.link}</span>
				</button>
			</li>
		{/each}
	</ul>

	<div class="relative grid min-h-36 w-full max-w-xl" aria-live="polite">
		{#key current?.name}
			<div
				class="col-start-1 row-start-1 flex items-center gap-5 rounded-xl border border-line bg-surface p-5 text-left shadow-md
				       dark:border-white/10 dark:bg-white/5"
				in:fly={{ y: 16, duration: 350, easing: backOut }}
				out:fly={{ y: -10, duration: 200 }}
			>
				{#if current}
					<div class="spot shrink-0">{@html current.link}</div>
					<div class="flex min-w-0 flex-1 flex-col gap-2">
						<p class="font-head text-xl font-bold text-ink dark:text-white">{current.name}</p>
						<p class="text-sm text-muted dark:text-gray-300">{current.description}</p>
						<div class="flex items-center gap-3">
							<div class="h-2 flex-1 overflow-hidden rounded-full bg-line dark:bg-white/10">
								<div
									class="meter h-full rounded-full bg-background-2"
									style="--level: {current.expertise === 'expert' ? '100%' : '66%'}"
								></div>
							</div>
							<span class="font-head text-xs uppercase tracking-wider text-muted dark:text-gray-300">
								{current.expertise}
							</span>
						</div>
					</div>
				{:else}
					<p class="w-full text-center font-head text-muted dark:text-gray-300">
						<span class="wave inline-block" aria-hidden="true">👆</span>
						Tap any icon to see what I use it for
					</p>
				{/if}
			</div>
		{/key}
	</div>
</div>

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
		width: 4rem;
		height: 4rem;
		animation: bounce 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.meter {
		animation: fill 700ms 150ms cubic-bezier(0.22, 1, 0.36, 1) both;
		width: var(--level);
	}

	@keyframes fill {
		from {
			width: 0;
		}
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
		.meter,
		.tile.is-selected .float,
		.stack:global(.is-revealed) .pop {
			animation: none;
		}
	}
</style>
