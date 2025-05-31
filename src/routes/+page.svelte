
<script lang="ts">
import Home from '$lib/pages/Home.svelte';
import About from '$lib/pages/About.svelte';
import Carousel from '$lib/Carousel.svelte';
let { data } = $props();
   
</script>

<div class="flex flex-col justify-center align-center gap-12">
 <div id="home" ><Home /></div>
 <div id="about"><About /></div>
    <div id="projects"> 
<Carousel data = {data.projects} />


 </div>

</div>