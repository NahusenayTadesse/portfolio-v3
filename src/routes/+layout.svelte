<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	let {data, children } = $props();
	import { page } from '$app/state';
	import DarkAnimation from '$lib/DarkAnimation.svelte';
	import Animation from "$lib/Animation.svelte"
	
</script> 
<svelte:head>
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</svelte:head>

{#if page.url.pathname.startsWith('/dashboard') === false}
<Header user={data.user} />
{/if}
	

{@render children()}

<Footer />
<DarkAnimation />
<Animation />