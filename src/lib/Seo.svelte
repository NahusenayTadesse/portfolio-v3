<script lang="ts">
	import { page } from '$app/state';
	import {
		SITE_NAME,
		DEFAULT_TITLE,
		DEFAULT_DESCRIPTION,
		DEFAULT_IMAGE,
		absolute
	} from '$lib/seo';

	let {
		title = DEFAULT_TITLE,
		description = DEFAULT_DESCRIPTION,
		image = DEFAULT_IMAGE,
		type = 'website',
		noindex = false,
		/** Extra <script type="application/ld+json"> blocks, built with jsonLd(). */
		schema = ''
	}: {
		title?: string;
		description?: string;
		image?: string | null;
		type?: string;
		noindex?: boolean;
		schema?: string;
	} = $props();

	// Canonical always points at the path without query strings, on the canonical
	// host, so the vercel.app preview aliases never compete in the index.
	const canonical = $derived(absolute(page.url.pathname));
	const ogImage = $derived(absolute(image ?? DEFAULT_IMAGE));
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content={SITE_NAME} />
	<link rel="canonical" href={canonical} />

	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow, max-image-preview:large" />
	{/if}

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonical} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	{@html schema}
</svelte:head>
