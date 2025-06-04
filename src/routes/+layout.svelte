<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	let {data, children } = $props();


</script>
<Header user={data.user} />

{@render children()}


<Footer />
