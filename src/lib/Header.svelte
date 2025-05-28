
<script>
    import { DarkMode } from "flowbite-svelte";
    import { slide } from 'svelte/transition';
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

      const currentSection = writable('');

   
   let sections = [
      { name: 'Home', href: '#home' },
      { name: 'About Me', href: '#about' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' }
   ];


  let isOpen = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            currentSection.set(`#${entry.target.id}`);
          }
        }
      },
      {
        threshold: 0.6, // Adjust depending on when you want to trigger
      }
    );

    sections.forEach(({ href }) => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });

</script>

<nav class="bg-white dark:bg-gray-900 font-head mt-[10px] shadow-md p-4 rounded-3xl max-w-screen-md mx-auto mt-8 sticky top-[10px] z-50 transition-all duration-300">
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
        aria-current={$currentSection === section.href ? 'page' : undefined}

          href="/{section.href}"
          class="relative px-4 py-2 rounded-lg text-gray-700 dark:text-gray-200
                 hover:text-black dark:hover:text-white
                 hover:border-1 transition:all duration-300
                 ease-in-out aria-[current=page]:border-1"
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
         aria-current={$currentSection === section.href ? 'page' : undefined}
          href={section.href} 
          class="px-4 py-2 rounded-lg  rounded-lg   dark:text-gray-200
                 hover:text-black dark:hover:text-white
                 hover:border-1 transition:all duration-300
                 ease-in-out aria-[current=page]:border-1
                 aria-[current=page]:bg-primary-900 aria-[current=page]:text-white
                 dark:aria-[current-page]:bg-white dark:aria-[current-page]:text-primary-900"
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

