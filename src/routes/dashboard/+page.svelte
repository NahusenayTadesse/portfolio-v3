
<script lang="ts">
	import { page } from '$app/state';


 let { data} = $props();
</script>
<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<h1 class="text-center font-head font-bold text-5xl">Welcome, {data.user.email} {page.url.pathname}</h1>


