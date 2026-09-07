<script lang="ts">
	import Seo from '$lib/Seo.svelte';
	import { jsonLd, SITE_URL, AUTHOR } from '$lib/seo';
	import { sortedArticles } from '$lib/writing';
	import { link } from '$lib/global.svelte';

	const posts = sortedArticles();

	const schema = jsonLd({
		'@context': 'https://schema.org',
		'@type': 'Blog',
		'@id': `${SITE_URL}/writing#blog`,
		url: `${SITE_URL}/writing`,
		name: 'Engineering notes',
		author: { '@id': `${SITE_URL}/#person` },
		blogPost: posts.map((p) => ({
			'@type': 'BlogPosting',
			headline: p.title,
			url: `${SITE_URL}/writing/${p.slug}`,
			datePublished: p.date,
			description: p.description
		}))
	});
</script>

<Seo
	title="Engineering notes | {AUTHOR}"
	description="Write-ups on the parts of building business systems that are actually hard: payroll on a 13-month calendar, ledgers, access control and deployment."
	{schema}
/>

<div class="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-16 lg:px-8">
	<header class="flex flex-col gap-3">
		<h1 class="font-head text-4xl font-bold text-ink lg:text-6xl dark:text-white">
			Engineering notes
		</h1>
		<p class="text-lg text-muted dark:text-gray-300">
			The parts of these builds that were actually hard, written down while they were still fresh.
		</p>
	</header>

	<ul class="flex flex-col gap-6">
		{#each posts as post (post.slug)}
			<li>
				<a
					href="/writing/{post.slug}"
					class="group flex flex-col gap-2 rounded-xl border border-line bg-surface p-6 shadow-sm
					       transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
					       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background-2
					       dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:border-background-2/60"
				>
					<p class="text-sm text-muted dark:text-gray-400">
						{new Date(post.date).toLocaleDateString('en-GB', {
							day: 'numeric',
							month: 'long',
							year: 'numeric'
						})}
						· {post.readingMinutes} min read
					</p>
					<h2 class="font-head text-2xl font-bold text-ink dark:text-white">{post.title}</h2>
					<p class="text-muted dark:text-gray-300">{post.description}</p>
					<span
						class="mt-2 text-sm font-semibold text-ink underline-offset-4 group-hover:underline dark:text-background-2"
					>
						Read it →
					</span>
				</a>
			</li>
		{/each}
	</ul>

	<a href="/projects" class="{link} self-start">See the projects behind these</a>
</div>
