
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
    // Same box for both states, so switching tabs never shifts the row.
    const tabBase = "font-head text-sm lg:text-base px-4 py-2 rounded-lg border transition-colors duration-200";
    let activeClass = `${tabBase} font-bold text-ink bg-background-2/60 border-background-2 dark:bg-background-2/10 dark:border-background-2/40 dark:text-background-2`;
    let inactiveClass = `${tabBase} text-muted border-line hover:bg-background-2/30 hover:text-ink dark:text-gray-300 dark:border-white/10 dark:hover:bg-white/5 dark:hover:text-white`;
    let contentClass = "flex flex-col gap-2 text-ink/85 dark:text-gray-300 font-body text-base lg:text-lg leading-relaxed rounded-xl border border-line dark:border-white/10 p-4 lg:p-5 text-left";

</script>




<div class="flex flex-row flex-wrap gap-2" role="group" aria-label="Kinds of project">

 <button onclick={() => toggle(0)} aria-pressed={active[0]} class={active[0] ? activeClass : inactiveClass}>
    Business systems
 </button> 

<button onclick={() => toggle(1)} aria-pressed={active[1]} class={active[1] ? activeClass : inactiveClass}>
    Platforms
 </button>
 

<button onclick={() => toggle(2)} aria-pressed={active[2]} class={active[2] ? activeClass : inactiveClass}>
    E-commerce
 </button>
    
  
  </div>

<div>
  {#if active[0]}
    <div class={contentClass} transition:slide|global>
     <div >
                    <h4 class="text-lg font-bold font-head text-ink dark:text-white">Business systems and ERP</h4>
                    Operations software a company runs its day on: staff records, payroll, contracts,
                    site billing, stock and approval queues, all under one permission model with an
                    audit log behind it. These are 70 to 90 table schemas with unit-tested accrual
                    and payroll logic. Typically <strong>6</strong> to <strong>12</strong> weeks.
                     </div>
    </div>
  {/if}

  {#if active[1]}
    <div class={contentClass} transition:slide|global>
     <h4 class="text-lg font-bold font-head text-ink dark:text-white">Platforms and portals</h4>
                    Multi-role platforms with a public face and an authenticated back office:
                    beneficiary and donor management, volunteer lifecycles, learning platforms,
                    built-in CMS and a form builder, with database-driven translations where a
                    second language is needed. Typically <strong>4</strong> to <strong>8</strong> weeks.
    </div>
  {/if}

  {#if active[2]}
    <div class={contentClass} transition:slide|global>
       <h4 class="text-lg font-bold font-head text-ink dark:text-white">E-commerce and inventory</h4>
                    Storefront plus the back office that keeps it honest: catalogue, discounts,
                    token-based checkout and customer accounts on the front, suppliers, stock
                    adjustments, damaged goods and fulfilment states behind it. Typically
                    <strong>4</strong> to <strong>10</strong> weeks.
    </div>
  {/if}
  </div>
