<script lang="ts">
	import type { Outcome } from '$lib/projects';

	let {
		project,
		/** The first row on a page should not lazy-load; it is the LCP candidate. */
		eager = false
	}: {
		project: {
			name: string;
			slug: string;
			category?: string;
			featured?: string | null;
			outcome?: Outcome | null;
		};
		eager?: boolean;
	} = $props();
</script>

<!-- The whole card is one link: a card with a separate "See detail" button gives
     keyboard users two stops for one destination, and gives everyone a large
     dead zone that looks clickable but isn't. -->
<a
	href="/projects/{project.slug}"
	class="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm
	       transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
	       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background-2
	       dark:border-white/10 dark:bg-surface/85 dark:shadow-none dark:hover:border-background-2/60"
>
	<!-- Fixed ratio: the uploads have wildly different intrinsic heights, which
	     used to leave every grid row ragged. object-cover crops instead. -->
	<div class="aspect-[16/10] w-full overflow-hidden bg-line/50 dark:bg-black/20">
		{#if project.featured}
			<img
				src={project.featured}
				alt="{project.name} project screenshot"
				loading={eager ? 'eager' : 'lazy'}
				fetchpriority={eager ? 'high' : 'auto'}
				decoding="async"
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		{/if}
	</div>

	<div class="flex flex-1 flex-col gap-1 p-4">
		<h3 class="font-head text-xl font-bold text-ink dark:text-white">{project.name}</h3>
		{#if project.category}
			<p class="text-sm text-muted dark:text-gray-300">{project.category}</p>
		{/if}
		{#if project.outcome}
			<p class="mt-2 flex items-baseline gap-2 border-t border-line pt-3 dark:border-white/10">
				<span class="shrink-0 whitespace-nowrap font-head text-2xl font-bold text-ink dark:text-white">{project.outcome.value}</span>
				<span class="text-sm text-muted dark:text-gray-300">{project.outcome.label}</span>
			</p>
		{/if}
		<span
			class="mt-auto pt-3 text-sm font-semibold text-ink underline-offset-4 group-hover:underline dark:text-background-2"
		>
			View project →
		</span>
	</div>
</a>
