 

<script>
    import {slide, fly, fade} from 'svelte/transition'
    import { ArrowLeftOutline, ArrowDownOutline, ArrowUpOutline } from 'flowbite-svelte-icons';
	import { link } from '$lib/global.svelte.js';
    let { data, children } = $props();
    let visible = $state(false);

    function onclick(){
        visible= !visible;
    }   
    
</script>
<h1 class="hidden lg:block font-head font-bold text-2xl fixed top-6 right-2 z-10"> <button {onclick} class={link}>
            
            {#if visible}
            <ArrowUpOutline class="inline-block ml-2" />
            {:else}
            <ArrowDownOutline class="inline-block ml-2" />
            {/if}
           More Projects </button></h1>
{#if visible}

<div class="hidden lg:flex flex-col gap-4 p-4 pt-16 fixed top-12 right-0 justify-self-end w-1/5 z-1 h-full 
bg-background-2 dark:bg-secondary-900 shadow-lg dark:shadow-white rounded-lg overflow-auto" in:fly={{ y: -200, duration: 600}} out:fade>
    
    
    
    <a href="/projects" class="font-head font-bold text-secondary-900 shadow-5xl p-4 shadow-2xl hover:border-0 justify-self-center dark:border-1
           dark:text-white hover:bg-gradient-to-r hover:from-gray-300 hover:to-background-2
            dark:hover:from-secondary-900 dark:hover:to-background-2 rounded-lg transition-colors text-center dark:hover:border-background-2 dark:hover:border-1">
            <ArrowLeftOutline class="inline-block ml-2" />
           To Projects </a>

    
    <ul class="flex flex-col gap-6">
        {#each data.projects as project}
            <li  in:slide|global={{ duration:1000}} out:slide|global>
                <a href="/projects/{project.slug}" class="font-head font-bold text-sm hover:bg-gradient-to-r
                    hover:from-gray-50 hover:to-background-2
                   dark:hover:from-secondary-900 dark:hover:to-background-2
                    hover:shadow-2xl  transition-all p-4 rounded-lg 
                    dark:hover:border-background-2 dark:hover:border-1">
                    {project.name}
                </a>
            </li>
        {/each}
    </ul>
</div>
{/if}
{@render children()}
