
<script lang="ts">
import Home from '$lib/pages/Home.svelte';
import About from '$lib/pages/About.svelte';
let { data } = $props();
function formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
  }
   
</script>

<div class="flex flex-col justify-center align-center gap-12">
 <div id="home" ><Home /></div>
 <div id="about"><About /></div>
    <div id="projects"> 
 {#if data.projects.length === 0}
   <p class="text-center text-secondary-900 dark:text-white font-head text-lg">No Projects Available</p>
 {:else}
   <div id="projects" class="flex flex-col items-center">
     {#each data.projects as project}
       <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6 w-full max-w-md">
         <h2 class="text-xl font-bold text-secondary-900 dark:text-white mb-2">{project.name}</h2>
         <p class="text-secondary-700 dark:text-gray-300 mb-4">{project.description}</p>
         <p class="text-secondary-700 dark:text-gray-300 mb-4">{project.link}</p>
         <p class="text-secondary-700 dark:text-gray-300 mb-4">{project.desktop}</p>
         <p class="text-secondary-700 dark:text-gray-300 mb-4">{project.mobile}</p>
         <p class="text-secondary-700 dark:text-gray-300 mb-4">{project.tablet}</p>
         <p class="text-secondary-700 dark:text-gray-300 mb-4">{project.challenges}</p>
         <p class="text-secondary-700 dark:text-gray-300 mb-4">{project.technologies}</p>
         <p>Created: {formatDate(project.created_at)}</p>
       </div>
     {/each}
   </div>
 {/if}


</div>

</div>