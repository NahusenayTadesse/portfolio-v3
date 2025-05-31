

<script>
    let test = [
        {name: "test", slug: "test", featured: "/images/aleksir-featured.png", category: "test"},
        {name: "test", slug: "test", featured: "/images/aleksir-featured.png", category: "test"},
        {name: "test", slug: "test", featured: "/images/aleksir-featured.png", category: "test"},
        {name: "test", slug: "test", featured: "/images/aleksir-featured.png", category: "test"},
        {name: "test", slug: "test", featured: "/images/aleksir-featured.png", category: "test"},
        {name: "test", slug: "test", featured: "/images/aleksir-featured.png", category: "test"}
    ];

    let { data } = $props();
    function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.03);

		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

<h1 class="text-6xl font-head font-bold mt-8 text-center pt-8 text-secondary-700 dark:text-white" transition:typewriter>Projects</h1>



<div class="flex flex-row flex-wrap justify-center items-center gap-4 p-8">
{#each data.projects as project} 
  <div class="max-w-full w-1/3 flex flex-col items-center justify-center rounded-2xl shadow-2xl p-2">
    <a href="/projects/{project.slug}">
    <img src={project.featured} alt={project.name} class="rounded-lg w-full" >
    </a>
    <h1 class="font-head font-bold text-2xl">{project.name}</h1>
    <h3 class="text-sm">Category: {project.category}</h3>
    <a href="/projects/{project.slug}" class="font-head font-bold text-secondary-900 shadow-2xl p-4
           dark:text-white hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2
            dark:hover:from-primary-700 dark:hover:to-secondary-900 rounded-lg transition-colors">
            See Project Detail</a>

  </div>
{/each}
</div>