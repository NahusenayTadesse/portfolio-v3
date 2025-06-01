 

<script>
    import {slide, fly, fade} from 'svelte/transition'
    import { ArrowLeftOutline } from 'flowbite-svelte-icons';
    let { data, children } = $props();
</script>


<div class="hidden lg:flex flex-col gap-4 p-4 pt-0 fixed top-12 right-0 justify-self-end w-1/5 z-0 h-full 
bg-transparent dark:bg-secondary-900 shadow-lg rounded-lg" transition:fly={{ y: -200, duration: 600}}>
    
    
    
    <a href="/projects" class="font-head font-bold text-secondary-900 shadow-5xl p-4 w-[280px] shadow-2xl hover:border-0 justify-self-center dark:border-1
           dark:text-white hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2
            dark:hover:from-primary-700 dark:hover:to-secondary-900 rounded-lg transition-colors text-center">
            <ArrowLeftOutline class="inline-block ml-2" />
            Back to Projects </a>

    <h1 class="font-head font-bold text-2xl">More Posts</h1>
    <ul>
        {#each data.projects as project}
            <li  transition:slide|global={{ duration:300}}>
                <a href="/projects/{project.slug}" class="font-head font-bold text-lg hover:bg-gradient-to-r
                    hover:from-background-1 hover:to-background-2
                    dark:hover:from-primary-700 dark:hover:to-secondary-900 
                    hover:shadow-2xl hover:mr-4 transition-all p-4 rounded-lg">
                    {project.name}
                </a>
            </li>
        {/each}
    </ul>
</div>
{@render children()}