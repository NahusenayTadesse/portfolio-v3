

<script lang="ts">
  import { fly } from "svelte/transition";
  

    let { data } = $props();

  // An ItemList tells Google these are discrete works, which is what surfaces
  // individual projects as sitelinks under the main result.
  const listSchema = $derived(jsonLd({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/projects#collection`,
    url: `${SITE_URL}/projects`,
    name: 'Projects',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: data.projects.map((project, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/projects/${project.slug}`,
        name: project.name
      }))
    }
  }));
  import { typewriter } from "$lib/global.svelte";
  import ProjectCard from '$lib/ProjectCard.svelte';
  import Seo from '$lib/Seo.svelte';
  import { jsonLd, SITE_URL } from '$lib/seo';
  let searchQuery = $state('');

  const filtered = $derived.by(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return data.projects;
    return data.projects.filter((p) =>
      [p?.name, p?.category, p?.description, p?.challenges]
        .some((field) => String(field ?? '').toLowerCase().includes(q))
    );
  });

 

</script>
<Seo
  title="Svelte & SvelteKit Projects — Portfolio of Nahusenay Tadesse"
  description="Case studies from a Svelte and SvelteKit developer: production web apps built with TypeScript, Firebase, Supabase and WordPress, with the problems solved on each build."
  schema={listSchema}
/>


<div class="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pt-12 lg:px-16">
  <h1 class="font-head text-5xl font-bold text-ink dark:text-white lg:text-6xl" transition:typewriter={{ speed: 1 }}>Projects</h1>

  <label class="w-full max-w-md">
    <span class="sr-only">Search projects</span>
    <input
      type="search"
      placeholder="Search by name, category or technology"
      bind:value={searchQuery}
      class="w-full rounded-lg border border-line bg-surface p-3 text-ink shadow-sm
             placeholder:text-muted focus:outline-2 focus:outline-offset-2 focus:outline-background-2
             dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-400"
    />
  </label>
</div>


<div class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 lg:p-16">
{#each filtered as project, index (project.slug)}
  <div transition:fly={{ y: 40, duration: 400, delay: Math.min(index, 5) * 60 }}>
    <ProjectCard {project} eager={index < 3} />
  </div>
{:else}
  <p class="col-span-full text-center text-muted dark:text-gray-300">
    No projects match "{searchQuery}".
  </p>
{/each}
</div>