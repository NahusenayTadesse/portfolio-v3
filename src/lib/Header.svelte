
<script>
    import { DarkMode } from "flowbite-svelte";
    import { slide } from 'svelte/transition';
    import { page, navigating } from '$app/state';

   let sections = [
      { name: 'Home', href: '' },
      { name: 'About Me', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' }
   ];


  let isOpen = false;

   

</script>

<nav class="bg-gradient-to-r from-background-2 to-background-1 dark:from-primary-700 dark:to-secondary-900 dark:bg-gray-900 font-head mt-[10px] shadow-md p-4 rounded-3xl max-w-screen-md mx-auto mt-8 sticky top-[10px] z-50 transition-all duration-300">
  <div class="flex justify-between items-center">
    <button 
      class="lg:hidden text-black dark:text-white focus:outline-none" 
      onclick={() => (isOpen = !isOpen)}
      aria-label="Toggle Menu"
      aria-expanded={isOpen ? 'true' : 'false'}
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} 
          aria-label="Toggle Menu"
          aria-expanded={isOpen ? 'true' : 'false'}
        />
      </svg>
    </button>

    <div class="hidden lg:flex gap-4 items-center ">
      {#each sections as section}
        <a 
        aria-current={page.url.hash === section.href ? 'page' : undefined}

          href="/{section.href}"
          class="relative px-4 py-2 rounded-lg text-gray-700 hover:text-black dark:hover:text-white
                 hover:shadow-lg hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2
                 dark:hover:from-primary-600 dark:hover:to-secondary-600
                  transition:all duration-300
                 ease-in-out aria-[current=page]:shadow-lg dark:aria-[current=page]:shadow-white-2xl
                 aria-[current=page]:bg-gradient-to-r aria-[current=page]:from-background-1 aria-[current=page]:to-background-2
                dark:aria-[current=page]:bg-gradient-to-r dark:aria-[current=page]:from-primary-600 dark:aria-[current=page]:to-secondary-600
                dark:text-white
                dark:aria-[current=page]:text-white
                "
        >
          <span class="relative z-10" >{section.name}</span>
        </a>
      {/each}

      {#if navigating.to}

      <h2 class="text-secondary-700 dark:text-white text-lg"> Loading {navigating.to.url.pathname.slice(1).toUpperCase()}</h2>

      {/if}

      
    </div>
     <DarkMode />
  </div>

  {#if isOpen}
    <div class="lg:hidden mt-4 flex flex-col gap-2 sticky top-0">
      {#each sections as section}
        <a 
         aria-current={page.url.hash === section.href ? 'page' : undefined}
          href="/{section.href}" 
          class="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200
                 hover:text-black dark:hover:text-white
                 hover:shadow-lg hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2
                 dark:hover:from-secondary-900 dark:hover:to-secondary-700
                  transition:all duration-300
                 ease-in-out aria-[current=page]:shadow-lg dark:aria-[current=page]:shadow-white-2xl
                aria-[current=page]:bg-gradient-to-r aria-[current=page]:from-background-1 aria-[current=page]:to-background-2
                dark:aria-[current=page]:from-secondary-900 dark:aria-[current=page]:to-secondary-700"
         transition:slide|global
          >
          {section.name}
        </a>
      {/each}
      <div class="mt-2">
      </div>
    </div>
  {/if}
</nav>




