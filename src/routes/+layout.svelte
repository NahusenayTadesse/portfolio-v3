<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	let {data, children } = $props();
	import { page } from '$app/state';
	import BackgroundCanvas from '$lib/BackgroundCanvas.svelte';
	
</script> 

{#if page.url.pathname.startsWith('/dashboard') === false}
<Header user={data.user} />
{/if}
	

{@render children()}

<Footer />
<BackgroundCanvas />