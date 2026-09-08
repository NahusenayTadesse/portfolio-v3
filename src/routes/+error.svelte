<script>
	import { page } from '$app/state';
</script>

<div class="flex flex-col justify-center items-center">
	<h1 class="enter-scale font-head font-bold text-6xl text-center text-red-400">{page.status}</h1>

	<p class="enter font-body text-lg text-center" style="--enter-delay: 160ms">{page.error?.message}</p>
</div>
