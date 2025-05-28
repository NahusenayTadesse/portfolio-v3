
<script>
    import { DarkMode } from "flowbite-svelte";
    import { slide } from 'svelte/transition';
   
   let sections = [
      { name: 'Home', href: '/#home' },
      { name: 'About Me', href: '/#about' },
      { name: 'Services', href: '/#services' },
      { name: 'Projects', href: '/#projects' },
      { name: 'Contact', href: '#contact' }
   ];


  let isOpen = false;

</script>

<nav class="bg-white dark:bg-gray-900 mt-[10px] shadow-md p-4 rounded-3xl max-w-screen-md mx-auto mt-8 sticky top-[10px] z-50 transition-all duration-300">
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

    <div class="hidden lg:flex gap-4 items-center">
      {#each sections as section}
        <a 
          href={section.href} 
          class="relative px-4 py-2 rounded-full text-gray-700 dark:text-gray-200 transition-all duration-300 
                 hover:text-black dark:hover:text-white
                 before:absolute before:inset-0 before:rounded-full before:border-2 
                 before:border-transparent before:transition-all before:duration-300 
                 hover:before:border-gradient-to-r hover:before:from-blue-500 hover:before:to-red-500
                 active:before:border-gradient-to-r active:before:from-blue-500 active:before:to-red-500
                 z-10 before:z-0"
        >
          <span class="relative z-10" >{section.name}</span>
        </a>
      {/each}
     
    </div>
     <DarkMode />
  </div>

  {#if isOpen}
    <div class="lg:hidden mt-4 flex flex-col gap-2 sticky top-0">
      {#each sections as section}
        <a 
          href={section.href} 
          class="px-4 py-2 rounded-xl text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-red-500 hover:text-white transition-all duration-300"
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
