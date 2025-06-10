
<script>
    import { DarkMode } from "flowbite-svelte";
    import { slide } from 'svelte/transition';
    import { page, navigating } from '$app/state';
	import { UserCircleSolid } from 'flowbite-svelte-icons';

   let sections = [
      { name: 'Home', href: '' },
      { name: 'About Me', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' }
   ];


  let isOpen = $state(false);
  let { user } = $props();

   

</script>

<nav class="bg-gradient-to-br from-gray-50 to-background-2 dark:bg-gradient-to-r dark:from-primary-600 dark:to-secondary-600 dark:bg-gray-900 font-head mt-[10px] shadow-md p-4 rounded-3xl max-w-screen-md mx-auto sticky top-[10px] z-50 transition-all duration-300">
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
          class="relative text-lg px-4 py-2 rounded-lg text-gray-700 hover:text-black dark:hover:text-white
                 hover:shadow-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-background-2
                 dark:hover:from-secondary-600 dark:hover:to-background-2
                  transition:all duration-300
                 ease-in-out aria-[current=page]:shadow-lg dark:aria-[current=page]:shadow-white-2xl
                 aria-[current=page]:bg-gradient-to-r aria-[current=page]:from-gray-50 aria-[current=page]:to-background-2
                dark:aria-[current=page]:bg-gradient-to-r dark:aria-[current=page]:from-primary-600 dark:aria-[current=page]:to-background-2
                dark:text-white
                dark:aria-[current=page]:text-white dark:aria-[current=page]:shadow-sm dark:aria-[current=page]:shadow-white
                "
        >
          <span class="relative z-10" >{section.name}</span>
        </a>
      {/each}

      {#if navigating.to}

      <h2 class="text-secondary-700 dark:text-white text-lg"> 
        <svg xmlns="http://www.w3.org/2000/svg" class="fill-secondary-700 dark:fill-white animate-spin w-6 h-6" x="0px" y="0px" viewBox="0 0 50 50">
<path d="M 25 5 C 14.351563 5 5.632813 13.378906 5.054688 23.890625 C 5.007813 24.609375 5.347656 25.296875 5.949219 25.695313 C 6.550781 26.089844 7.320313 26.132813 7.960938 25.804688 C 8.601563 25.476563 9.019531 24.828125 9.046875 24.109375 C 9.511719 15.675781 16.441406 9 25 9 C 29.585938 9 33.699219 10.925781 36.609375 14 L 34 14 C 33.277344 13.988281 32.609375 14.367188 32.246094 14.992188 C 31.878906 15.613281 31.878906 16.386719 32.246094 17.007813 C 32.609375 17.632813 33.277344 18.011719 34 18 L 40.261719 18 C 40.488281 18.039063 40.71875 18.039063 40.949219 18 L 44 18 L 44 8 C 44.007813 7.460938 43.796875 6.941406 43.414063 6.558594 C 43.03125 6.175781 42.511719 5.964844 41.96875 5.972656 C 40.867188 5.988281 39.984375 6.894531 40 8 L 40 11.777344 C 36.332031 7.621094 30.964844 5 25 5 Z M 43.03125 23.972656 C 41.925781 23.925781 40.996094 24.785156 40.953125 25.890625 C 40.488281 34.324219 33.558594 41 25 41 C 20.414063 41 16.304688 39.074219 13.390625 36 L 16 36 C 16.722656 36.011719 17.390625 35.632813 17.753906 35.007813 C 18.121094 34.386719 18.121094 33.613281 17.753906 32.992188 C 17.390625 32.367188 16.722656 31.988281 16 32 L 9.71875 32 C 9.507813 31.96875 9.296875 31.96875 9.085938 32 L 6 32 L 6 42 C 5.988281 42.722656 6.367188 43.390625 6.992188 43.753906 C 7.613281 44.121094 8.386719 44.121094 9.007813 43.753906 C 9.632813 43.390625 10.011719 42.722656 10 42 L 10 38.222656 C 13.667969 42.378906 19.035156 45 25 45 C 35.648438 45 44.367188 36.621094 44.945313 26.109375 C 44.984375 25.570313 44.800781 25.039063 44.441406 24.636719 C 44.078125 24.234375 43.570313 23.996094 43.03125 23.972656 Z"></path>
</svg>
        Loading {navigating.to.url.pathname.slice(1).toUpperCase()}</h2>

      {/if}

      {#if user}
      <a href="/dashboard">
       <UserCircleSolid  class="w-6 h-6 hover:w-8 hover:h-8 transition-all fill-secondary-700 dark:fill-white"/>
       </a>
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




