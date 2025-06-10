

<script lang="ts">
  import { fly } from "svelte/transition";
  

    let { data } = $props();
  import { typewriter, link } from "$lib/global.svelte";
  let searchQuery = $state('');

 

</script>
<svelte:head>
  <title>Projects</title>
   <meta property="og:title" content="Projects">
   <meta property="og:description" content="List and Details of all the projects I did">
</svelte:head>


<input type="text" 
 placeholder="Search Projects" 
 class="fixed right-0 lg:top-3 top-15  lg:right-2 max-w-md mx-auto mt-4 p-2 rounded-lg focus:outline-none focus:ring-2
  focus:ring-background-2 dark:bg-secondary-900 dark:text-white dark:border-gray-600 bg-transparent
   border-1 border-background-1 dark:shadow-white dark:shadow-sm shadow-lg" 
  bind:value={searchQuery} >

<h1 class="text-6xl font-head font-bold mt-8 text-center pt-8 text-secondary-700 dark:text-white m-4" transition:typewriter={{ speed: 1 }}>Projects</h1>


<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 lg:p-16">
{#each 
  searchQuery 
    ? data.projects.filter(project => 
        String(project?.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(project?.category ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(project?.description ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(project?.challenges ?? '').toLowerCase().includes(searchQuery.toLowerCase())
      ) 
    : data.projects 
  as project, index}
  <div class="max-w-full w-full gap-4 flex flex-col items-center justify-center rounded-2xl shadow-2xl dark:shadow-white dark:shadow-md p-2" 
  transition:fly={{ y: (index + 1) * 100, duration: 600, easing: t => t * (2 - t) }}>
    <a href="/projects/{project.slug}">
    <img src={project.featured} alt={project.name} class="rounded-lg w-full" loading="lazy"/>
    </a>
    <h1 class="font-head font-bold text-2xl">{project.name}</h1>
    <h3 class="text-sm">Category: {project.category}</h3>
    <a href="/projects/{project.slug}" class={link}>
            See Project Detail</a>

  </div>
{/each} 

</div>