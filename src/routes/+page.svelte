
<script lang="ts">
import { fly } from "svelte/transition"
import Home from '$lib/pages/Home.svelte';
import About from '$lib/pages/About.svelte';
import Contact from './Contact.svelte';
import Carousel from '$lib/Carousel.svelte';
import {link} from '$lib/global.svelte';


let { data, form} = $props();

function changer(message: string){

    message = "Thank your Message, i will get back to you quickly";
}
   
</script>
<svelte:head>
    
<title>Nahusenay Tadesse | Fullstack Web Developer in Addis Ababa, Ethiopia</title>
<meta name="title" content="Nahusenay Tadesse | Fullstack Web Developer in Addis Ababa, Ethiopia">
<meta name="description" content="Nahusenay Tadesse is a fullstack web developer based in Addis Ababa, Ethiopia. Specialized in building fast, responsive, and user-friendly websites using SvelteKit and WordPress. Skilled in Supabase, Firebase, MySQL, PostgreSQL, and SQLite.">
<meta name="keywords" content="Nahusenay Tadesse, fullstack web developer, Addis Ababa developer, SvelteKit developer, WordPress expert, responsive websites, frontend backend developer, Supabase, Firebase, MySQL, PostgreSQL, SQLite, Ethiopian web developer, web development portfolio">
<meta name="author" content="Nahusenay Tadesse">
<meta name="robots" content="index, follow">
<meta name="language" content="en">
<meta name="geo.region" content="ET-AD">
<meta name="geo.placename" content="Addis Ababa, Ethiopia">
<meta name="geo.position" content="9.03;38.74">
<meta name="ICBM" content="9.03, 38.74">


<meta property="og:type" content="website">
<meta property="og:url" content="https://nahusenay.vercel.app/">
<meta property="og:title" content="Nahusenay Tadesse | Fullstack Web Developer">
<meta property="og:description" content="Explore the portfolio of Nahusenay Tadesse, a fullstack web developer based in Addis Ababa, Ethiopia. Specialized in SvelteKit, WordPress, and modern backend technologies.">
<meta property="og:image" content="/nahu.webp">

<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://nahusenay.vercel.app/">
<meta property="twitter:title" content="Nahusenay Tadesse | Fullstack Web Developer">
<meta property="twitter:description" content="Explore the portfolio of Nahusenay Tadesse, a SvelteKit and WordPress web developer with backend expertise in Supabase, Firebase, MySQL, and more.">
<meta property="twitter:image" content="/nahu.webp">

</svelte:head>

<div>

 <div id="home" role="region" aria-label="Home Section"> <Home /></div>
 <div id="about" role="region" aria-label="About Section" > <About /></div>
 <div role="region" aria-label="Projects Section" id="projects" class="flex flex-col items-center justify-center gap-4 p-8"> 
<Carousel data = {data.projects} />
<a href="/projects" 
    class={link}
    transition:fly={{ x: -200, duration: 1000 }}>
    See All Projects </a>


 </div>

 <div id="contact" role="region" aria-label="Projects Section" >
    <Contact success={form?.success} status={form?.status} loading={form?.loading}/>
</div>
    

</div>  





