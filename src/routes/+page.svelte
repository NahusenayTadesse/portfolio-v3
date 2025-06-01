
<script lang="ts">
import { fly } from "svelte/transition"
import Home from '$lib/pages/Home.svelte';
import About from '$lib/pages/About.svelte';
import Contact from './Contact.svelte';
import Carousel from '$lib/Carousel.svelte';
import { Toast } from "flowbite-svelte";
import { ThumbsUpSolid, ThumbsDownSolid } from "flowbite-svelte-icons";
let { data, form } = $props();
   
</script>



<div class="flex flex-col justify-center align-center gap-12">
 <div id="home" ><Home /></div>
 <div id="about"><About /></div>
    <div id="projects" class="flex flex-col items-center justify-center gap-4 p-8"> 
<Carousel data = {data.projects} />
<a href="/projects" 
    class="border-1 border-secondary-900  dark:border-1 dark:border-white dark:text-white bg-transparent text-secondary-900 
    px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2 hover:text-black hover:shadow-lg hover:border-0 
    dark:hover:border-0 dark:hover:shadow-lg dark:hover:bg-gradient-to-r dark:hover:from-primary-600 dark:hover:to-secondary-600
    transition-colors duration-300  dark:hover:text-white justify-self-center"
    transition:fly={{ x: -200, duration: 1000 }}>
    See All Projects </a>


 </div>

 <div id="contact"><Contact /></div>

</div>

{#if form?.success} 
<div transition:fly={{ x: -200, duration: 600 }} >
<Toast class="bg-gradient-to-r from-background-1 to-background-2 absolute top-0 right-0 p-4 rounded-lg shadow-lg">
    <ThumbsUpSolid class="text-green-500 w-12 h-1/2" />
    <h2 class="font-head text-2xl">Thank You for your Message, I will get back to you shortly!</h2>
</Toast>
</div>
{/if}

{#if form?.success === false}
<Toast class="bg-gradient-to-r from-background-1 to-background-2 absolute top-0 right-0 p-4 rounded-lg shadow-lg">
    <ThumbsDownSolid class="text-red-500" />
    <h2 class="font-head text-2xl">There was an error sending your message, please try again later.</h2>
</Toast>

{/if}