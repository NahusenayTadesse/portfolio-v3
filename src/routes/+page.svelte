
<script lang="ts">
import { fly } from "svelte/transition"
import Home from '$lib/pages/Home.svelte';
import About from '$lib/pages/About.svelte';
import Contact from './Contact.svelte';
import Carousel from '$lib/Carousel.svelte';
import {link} from '$lib/global.svelte';
import Seo from '$lib/Seo.svelte';
import { jsonLd, SITE_URL, SITE_NAME, AUTHOR, SAME_AS, DEFAULT_TITLE, DEFAULT_DESCRIPTION, DEFAULT_IMAGE } from '$lib/seo';


let { data, form} = $props();

// A Person entity is what lets Google answer "who is a Svelte developer" with
// a named human rather than just a page of text.
const personSchema = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: AUTHOR,
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    jobTitle: 'Svelte & SvelteKit Developer',
    description: DEFAULT_DESCRIPTION,
    email: 'mailto:nahusenaytadesse75@gmail.com',
    telephone: '+251947340602',
    sameAs: SAME_AS,
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Addis Ababa',
        addressCountry: 'ET'
    },
    knowsAbout: [
        'Svelte',
        'SvelteKit',
        'TypeScript',
        'JavaScript',
        'Web Development',
        'Firebase',
        'Supabase',
        'PostgreSQL',
        'Tailwind CSS',
        'WordPress'
    ],
    knowsLanguage: ['en', 'am'],
    // Says "hire me, from anywhere" in a form search engines can parse.
    seeks: {
        '@type': 'Demand',
        name: 'Freelance and contract Svelte / SvelteKit development'
    },
    worksFor: {
        '@type': 'Organization',
        name: 'Freelance'
    }
});

const websiteSchema = jsonLd({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#person` }
});
</script>
<Seo
    title={DEFAULT_TITLE}
    description={DEFAULT_DESCRIPTION}
    schema={personSchema + websiteSchema}
/>

<svelte:head>
    <!-- Local-intent signals for "… developer in Ethiopia" queries -->
    <meta name="geo.region" content="ET-AD" />
    <meta name="geo.placename" content="Addis Ababa, Ethiopia" />
    <meta name="geo.position" content="9.03;38.74" />
    <meta name="ICBM" content="9.03, 38.74" />
</svelte:head>

<div class="flex flex-col gap-6 lg:gap-8">

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
    <Contact success={form?.success} status={form?.status} />
</div>


</div>  





