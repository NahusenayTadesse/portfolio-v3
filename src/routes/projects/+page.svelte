

<script lang="ts">
  import { fly } from "svelte/transition";

    let { data } = $props();
    function typewriter(node: HTMLElement, { speed = 1 }: { speed?: number }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text: string = node.textContent;
		const duration = text.length / (speed * 0.03);

		return {
			duration,
			tick: (t: number) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
  let searchQuery = $state('');

 

</script>


<input type="text" 
 placeholder="Search Projects" 
 class="absolute right-0 lg:top-3 top-20  lg:right-2 max-w-md mx-auto mt-4 p-2 rounded-lg focus:outline-none focus:ring-2
  focus:ring-background-2 dark:bg-secondary-900 dark:text-white dark:border-gray-600 bg-transparent border-1 border-background-1 shadow-lg" 
  bind:value={searchQuery} >

<h1 class="text-6xl font-head font-bold mt-8 text-center pt-8 text-secondary-700 dark:text-white" transition:typewriter>Projects </h1>


<div class="flex flex-row flex-wrap justify-center items-center gap-4 p-8">
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
  <div class="max-w-full w-full lg:w-1/3 gap-4 flex flex-col items-center justify-center rounded-2xl shadow-2xl p-2" transition:fly={{ y: (index + 1) * 100, duration: 600, easing: t => t * (2 - t) }}>
    <a href="/projects/{project.slug}">
    <img src={project.featured} alt={project.name} class="rounded-lg w-full" >
    </a>
    <h1 class="font-head font-bold text-2xl">{project.name}</h1>
    <h3 class="text-sm">Category: {project.category}</h3>
    <a href="/projects/{project.slug}" class="font-head font-bold text-secondary-900 shadow-2xl p-5 border-1 border-background-1
           dark:text-white hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2
            dark:hover:from-primary-700 dark:hover:to-secondary-900 rounded-lg transition-colors">
            See Project Detail</a>

  </div>
{/each} 

</div>