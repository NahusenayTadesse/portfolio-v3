
<script lang="ts">
import { fly } from "svelte/transition"
import Home from '$lib/pages/Home.svelte';
import About from '$lib/pages/About.svelte';
import Contact from './Contact.svelte';
import Carousel from '$lib/Carousel.svelte';


let { data, form} = $props();

function changer(message: string){

    message = "Thank your Message, i will get back to you quickly";
}
   
</script>

<div>

 <div id="home" role="region" aria-label="Home Section"> <Home /></div>
 <div id="about" role="region" aria-label="About Section" > <About /></div>
 <div role="region" aria-label="Projects Section" id="projects" class="flex flex-col items-center justify-center gap-4 p-8"> 
<Carousel data = {data.projects} />
<a href="/projects" 
    class="border-1 border-secondary-900  dark:border-1 dark:border-white dark:text-white bg-transparent text-secondary-900 
    px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2 hover:text-black hover:shadow-lg hover:border-0 
    dark:hover:border-0 dark:hover:shadow-lg dark:hover:bg-gradient-to-r dark:hover:from-secondary-600 dark:hover:to-background-1
    transition-colors duration-300  dark:hover:text-white justify-self-center"
    transition:fly={{ x: -200, duration: 1000 }}>
    See All Projects </a>


 </div>

 <div id="contact" role="region" aria-label="Projects Section" >
    <Contact success={form?.success} status={form?.status} />
</div>
    

</div>  





