<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import BackgroundCanvas from '$lib/BackgroundCanvas.svelte';
	import { markRevealReady } from '$lib/reveal';

	let { children } = $props();

	// Tells the pre-paint watchdog in app.html that hydration happened, so it
	// leaves the scroll-reveal hidden state alone.
	onMount(markRevealReady);
</script>

{#if page.url.pathname.startsWith('/dashboard') === false}
	<Header />
{/if}

{@render children()}

<Footer />
<BackgroundCanvas />
