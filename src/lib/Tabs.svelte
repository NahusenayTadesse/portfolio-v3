
<script lang="ts">
    import { slide } from 'svelte/transition';
    let active1 = $state(false);
    let active2 = $state(false);
    let active3 = $state(false);

    let active = $state([false, false, false]);

    function toggle(index: number) {
        
        // Close other tabs
        for (let i = 0; i < active.length; i++) {
            if (i !== index) {
                active[i] = false;
            }
        }
        active[index] = !active[index];
    }

</script>


 <button onclick={() => toggle(0)}>
    Portfolio
 </button> 
  {#if active[0]}
    <div class="portfolio-content" transition:slide|global>
        <!-- Portfolio content goes here -->
        <p>Portfolio content is displayed here.</p>
    </div>
  {/if}

<button onclick={() => toggle(1)}>
    Business
 </button>
  {#if active[1]}
    <div class="business-content">
        <!-- Business content goes here -->
        <p>Business content is displayed here.</p>
    </div>
  {/if}

<button onclick={() => toggle(2)}>
    E-commerce
 </button>
  {#if active[2]}
    <div class="ecommerce-content">
        <!-- E-commerce content goes here -->
        <p>E-commerce content is displayed here.</p>
    </div>
  {/if}
