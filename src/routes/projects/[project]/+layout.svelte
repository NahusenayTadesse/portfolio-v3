 

<script>
    import {slide, fly, fade} from 'svelte/transition'
    import { ArrowLeftOutline } from 'flowbite-svelte-icons';
    let { data, children } = $props();
</script>


<div class="hidden lg:flex flex-col gap-4 p-4 pt-0 fixed top-12 right-0 justify-self-end w-1/5 z-0 h-full 
bg-transparent shadow-lg dark:shadow-white rounded-lg" in:fly={{ y: -200, duration: 600}} out:fade>
    
    
    
    <a href="/projects" class="font-head font-bold text-secondary-900 shadow-5xl p-4 w-[280px] shadow-2xl hover:border-0 justify-self-center dark:border-1
           dark:text-white hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2
            dark:hover:from-secondary-900 dark:hover:to-background-2 rounded-lg transition-colors text-center dark:hover:border-background-2 dark:hover:border-1">
            <ArrowLeftOutline class="inline-block ml-2" />
            Back to Projects </a>

    <h1 class="font-head font-bold text-2xl">More Posts</h1>
    <ul class="flex flex-col gap-6">
        {#each data.projects as project}
            <li  in:slide|global={{ duration:1000}} out:slide|global>
                <a href="/projects/{project.slug}" class="font-head font-bold text-md hover:bg-gradient-to-r
                    hover:from-background-1 hover:to-background-2
                   dark:hover:from-secondary-900 dark:hover:to-background-2
                    hover:shadow-2xl  transition-all p-4 rounded-lg 
                    dark:hover:border-background-2 dark:hover:border-1">
                    {project.name}
                </a>
            </li>
        {/each}
    </ul>
</div>
{@render children()}