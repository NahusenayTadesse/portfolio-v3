
<script lang="ts">
import Home from '$lib/pages/Home.svelte';
import About from '$lib/pages/About.svelte';
import Contact from './Contact.svelte';
import ProjectCard from '$lib/ProjectCard.svelte';
import { reveal } from '$lib/reveal';
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
    jobTitle: 'SvelteKit Developer & Full-Stack Product Engineer',
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
        'SvelteKit',
        'Svelte 5',
        'TypeScript',
        'Drizzle ORM',
        'MySQL',
        'PostgreSQL',
        'SQLite',
        'Better Auth',
        'Tailwind CSS',
        'Playwright',
        'Vitest',
        'Linux server administration',
        'cPanel and LiteSpeed deployment',
        'Vercel',
        'ERP systems',
        'Payroll systems',
        'Multi-currency reconciliation',
        'Role-based access control'
    ],
    knowsLanguage: ['en', 'am'],
    // Says "hire me, from anywhere" in a form search engines can parse.
    seeks: {
        '@type': 'Demand',
        name: 'Freelance and contract SvelteKit development'
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
 <section aria-labelledby="projects-heading" id="projects" class="flex flex-col items-center gap-8 px-4 py-12 lg:px-16">
  <h2 id="projects-heading" class="font-head text-3xl font-bold lg:text-5xl" data-reveal use:reveal>My Projects</h2>

  <!-- A grid instead of a carousel: six projects visible at once rather than
       one behind an auto-advancing widget with 19 off-screen pagination dots. -->
  <div class="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Cards reveal in reading order. The stagger resets every three so the
         second row does not start a second and a half after the first. -->
    {#each data.projects.slice(0, 6) as project, i (project.slug)}
      <div data-reveal="scale" use:reveal={{ delay: (i % 3) * 90 }}>
        <ProjectCard {project} eager={i < 3} />
      </div>
    {/each}
  </div>

  {#if data.projects.length > 6}
    <a href="/projects" class={link} data-reveal use:reveal>
      See all {data.projects.length} projects
    </a>
  {/if}
 </section>

 <div id="contact" role="region" aria-label="Contact Section" >
    <Contact success={form?.success} status={form?.status} />
</div>


</div>  





