<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	let { children } = $props();
	import { page } from '$app/state';
	import BackgroundCanvas from '$lib/BackgroundCanvas.svelte';
	
</script> 

{#if page.url.pathname.startsWith('/dashboard') === false}
<Header />
{/if}
	

{@render children()}

<Footer />
<BackgroundCanvas />