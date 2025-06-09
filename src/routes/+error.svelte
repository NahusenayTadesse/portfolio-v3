<script>
	import { page } from '$app/state';
</script>
<div class="flex flex-col justify-center items-center">
<h1 class="font-head font-bold text-6xl text-center text-red-400">{page.status}</h1>

 <p class="font-body text-lg text-center">{page.error?.message}</p>

</div>