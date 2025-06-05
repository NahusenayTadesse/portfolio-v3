
<script lang="ts">
	import { page } from '$app/state';


 let { data} = $props();
</script>

<h1>Welcome, {data.user.email} {page.url.pathname}</h1>