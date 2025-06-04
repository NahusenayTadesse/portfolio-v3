
<script lang="ts">
    import { slide } from 'svelte/transition';

    let active = $state([true, false, false]);

    function toggle(index: number) {
        
        // Close other tabs
        for (let i = 0; i < active.length; i++) {
            if (i !== index) {
                active[i] = false;
            }
        }
        active[index] = !active[index];
    }
    let activeClass = "font-head font-bold text-secondary-900 dark:text-white bg-gradient-to-r from-background-1 to-background-2 dark:from-secondary-600 dark:to-background-1 shadow-lg rounded-lg p-2 lg:p-4";
    let inactiveClass = "text-secondary-900 shadow-md font-head dark:text-white hover:bg-gradient-to-r hover:from-background-2 hover:to-background-1 rounded-lg dark:hover:from-secondary-600 dark:hover:to-background-1 p-4";
    let contentClass = "text-secondary-900 dark:text-white font-body text-sm bg-transparent shadow-lg rounded-lg p-4 text-left";

</script>




<div class="flex flex-row flex-wrap gap-1 lg:gap-4 ">

 <button onclick={() => toggle(0)} class={active[0] ? activeClass : inactiveClass}>
    Portfolio
 </button> 

<button onclick={() => toggle(1)} class={active[1] ? activeClass : inactiveClass}>
    Business
 </button>
 

<button onclick={() => toggle(2)} class={active[2] ? activeClass : inactiveClass}>
    E-commerce
 </button>
    
  
  </div>

<div>
  {#if active[0]}
    <div class={contentClass} transition:slide|global>
     <div >
                    <h1 class="text-lg font-bold font-head">Portfolio or Business Websites</h1>
                    These websites are designed to showcase your work or business. They typically include sections like About, Services, Portfolio, and Contact. I focus on creating visually appealing designs that reflect your brand identity and engage your audience.
                     These websites, depending on the number of pages and their complexity it will take me <strong>3</strong> to <strong>5</strong> days.
                     </div>
    </div>
  {/if}

  {#if active[1]}
    <div class={contentClass} transition:slide|global>
     <h1 class="text-lg font-bold font-head">Blogging Websites</h1>
                    Blogging websites are designed for content creators to share their thoughts, ideas, and expertise. I ensure that these sites are user-friendly, with features like categories, tags, and comment sections to enhance user engagement.
                    These websites, depending on the number of pages and their complexity it will take me <strong>5</strong> to <strong>10</strong> days.
    </div>
  {/if}

  {#if active[2]}
    <div class={contentClass} transition:slide|global>
       <h1 class="text-lg font-bold font-head">E-commerce Websites</h1>
                    E-commerce websites are built to facilitate online sales. 
                    I focus on creating secure, user-friendly shopping experiences that drive conversions. 
                    These sites often include product catalogs, shopping carts, and payment gateways.
                    These websites, depending on the number of pages and their complexity it will take me <strong>10</strong> to <strong>25</strong> days.
    </div>
  {/if}
  </div>
