<script>
    import { onMount } from "svelte";
    import { fly, fade } from "svelte/transition";
    import { ArrowLeftOutline, ArrowRightOutline, LaptopCodeSolid } from "flowbite-svelte-icons";

  let current = $state(0);
   let autoplayInterval = $state(null);
  const autoplayDelay = 5000;


  let { data = [   { featured: '/images/aleksir-featured.png', name: 'Slide 1', link: 'https://test.com', slug: 'slug', category: 'This is the first slide' },
                    { featured: '/images/aleksir-featured.png', name: 'Slide 2', link: 'https://test.com', slug: 'slug', category: 'This is the second slide' },
                    { featured: '/images/aleksir-featured.png', name: 'Slide 3', link: 'https://test.com', slug: 'slug', category: 'This is the third slide' },             
                    { featured: '/images/aleksir-featured.png', name: 'Slide 4', link: 'https://test.com', slug: 'slug', category: 'This is the fourth slide' }
  ] } = $props();

  function next() {
    
    current = (current + 1) % data.length;
  }


  function prev() {
    current = (current - 1 + data.length) % data.length;
  }

   let startX = 0;
  let endX = 0
  function handleTouchStart(e) {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
  }

  function handleTouchEnd(e) {
    endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        prev();
      } else {
        next();
      }
    }
  }

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      next();
    }, autoplayDelay);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  onMount(() => {
    startAutoplay();
    return stopAutoplay;
  });

  function dots(index){
    current = index;
    stopAutoplay();
    startAutoplay();
  }
</script>

<div class="relative w-full lg:w-[750px] justify-self-center overflow-hidden">
  <div class="flex transition-transform duration-500 ease-in-out"
       style="transform: translateX(-{current * 100}%)"
        ontouchstart={handleTouchStart}
    ontouchend={handleTouchEnd}
    onpointerdown={handleTouchStart}
    onpointerup={handleTouchEnd}
    transition:fly={{ x: 200, duration: 300, easing: t => t * (2 - t) }}
       >
    {#each data as slide}
      <div class="relative min-w-full h-full flex flex-col items-center justify-center rounded-lg shadow-5xl border-1 border-background-1 dark:border-0">

        <a href="/projects/{slide.slug}" >
            <img src={slide.featured} alt={slide.name} class="w-full h-4/5 object-cover rounded-lg transition-all" />
        </a>
         <div class="w-full flex flex-col justify-center items-center gap-1 bg-gradient-to-r from-background-2 to-background-1 dark:from-primary-600
         dark:to-secondary-600 text-black dark:text-white p-2  shadow-lg text-center">
          <h2 class="text-lg font-bold font-head">{slide.name}</h2>
            <p class="text-sm"> Category: {slide.category}</p>
          <a href='/projects/{slide.slug}' class="font-head font-bold text-secondary-900 shadow-2xl p-4
           dark:text-white hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2
            dark:hover:from-secondary-700 dark:hover:to-background-2 rounded-lg transition-colors">
            Learn More</a>
        </div>
 
      </div>


    {/each}


  </div>

  <div class="absolute bottom-48 left-1/2 transform -translate-x-1/2 flex gap-2">
     {#each data as _, num}
       <button onclick={() => dots(num)} class="rounded-full transition-all duration-300">
        {#if current === num}
        <LaptopCodeSolid class="w-8 h-8 fill-black dark:text-white bg-[#0e0e0e31]shadow-indigo-200" />
        {:else}
        <LaptopCodeSolid class="w-8 h-8 fill-primary-600 hover:fill-black dark:text-gray-400 bg-[#0e0e0e31]shadow-indigo-200" />
        {/if}
    </button>
  {/each}
  </div>

  <button onclick={prev}  class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2 dark:bg-gradient-to-r dark:from-primary-600 dark:to-secondary-600 hover:text-black bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100">
    <ArrowLeftOutline class="w-6 h-6" />

  </button>
  <button onclick={next} class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2 dark:bg-gradient-to-r dark:from-primary-600 dark:to-secondary-600 hover:text-black bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100">
    <ArrowRightOutline class="w-6 h-6" />
    
  </button>

 
</div>

