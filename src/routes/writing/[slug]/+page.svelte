<script lang="ts">
	import Seo from '$lib/Seo.svelte';
	import { jsonLd, SITE_URL, AUTHOR, DEFAULT_IMAGE } from '$lib/seo';
	import { link, quiet } from '$lib/global.svelte';

	let { data } = $props();
	const a = $derived(data.article);

	const schema = $derived(
		jsonLd({
			'@context': 'https://schema.org',
			'@type': 'TechArticle',
			'@id': `${SITE_URL}/writing/${a.slug}#article`,
			headline: a.title,
			description: a.description,
			url: `${SITE_URL}/writing/${a.slug}`,
			datePublished: a.date,
			dateModified: a.date,
			keywords: a.tags.join(', '),
			image: DEFAULT_IMAGE,
			inLanguage: 'en',
			author: { '@id': `${SITE_URL}/#person` },
			publisher: { '@id': `${SITE_URL}/#person` },
			mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/writing/${a.slug}` }
		})
	);
</script>

<Seo title="{a.title} | {AUTHOR}" description={a.description} type="article" {schema} />

<div class="px-4 py-12">
<article
	class="mx-auto flex max-w-3xl flex-col gap-8 rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-10
	       dark:border-white/10 dark:bg-[rgb(22,28,38)]/85 dark:shadow-none dark:backdrop-blur-sm"
>
	<header class="flex flex-col gap-4">
		<a href="/writing" class="{quiet} self-start">&larr; All notes</a>

		<h1 class="font-head text-4xl font-bold text-ink lg:text-5xl dark:text-white">{a.title}</h1>

		<p class="text-sm text-muted dark:text-gray-400">
			{new Date(a.date).toLocaleDateString('en-GB', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})}
			· {a.readingMinutes} min read
		</p>

		<ul class="flex flex-wrap gap-2">
			{#each a.tags as tag}
				<li
					class="rounded-full border border-line bg-surface px-3 py-1 text-xs text-ink shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-gray-100"
				>
					{tag}
				</li>
			{/each}
		</ul>
	</header>

	<!-- Body is authored in src/lib/writing.ts, not user input. -->
	<div
		class="prose prose-lg dark:prose-invert prose-headings:font-head prose-headings:text-ink dark:prose-headings:text-white
		       prose-a:text-ink dark:prose-a:text-background-2 prose-pre:border prose-pre:border-line
		       dark:prose-pre:border-white/10 max-w-none"
	>
		{@html a.body}
	</div>

	<a href="/writing" class="{link} self-start">More notes</a>
</article>
</div>
