
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
    let activeClass = "font-head font-bold text-ink dark:text-white bg-background-2/60 border border-background-2 shadow-sm rounded-lg p-2 lg:p-4 dark:border-0 dark:bg-gradient-to-br dark:from-primary-600 dark:to-background-2 dark:shadow-white dark:shadow-sm";
    let inactiveClass = "text-ink shadow-sm font-head dark:text-white hover:bg-background-2/40 rounded-lg dark:hover:from-primary-600 dark:hover:to-background-2 p-4 dark:shadow-white";
    let contentClass = "text-ink dark:text-white font-body text-sm bg-transparent shadow-lg rounded-lg p-4 text-left";

</script>




<div class="flex flex-row flex-wrap gap-1 lg:gap-4 ">

 <button onclick={() => toggle(0)} class={active[0] ? activeClass : inactiveClass}>
    Business systems
 </button> 

<button onclick={() => toggle(1)} class={active[1] ? activeClass : inactiveClass}>
    Platforms
 </button>
 

<button onclick={() => toggle(2)} class={active[2] ? activeClass : inactiveClass}>
    E-commerce
 </button>
    
  
  </div>

<div>
  {#if active[0]}
    <div class={contentClass} transition:slide|global>
     <div >
                    <h4 class="text-lg font-bold font-head">Business systems and ERP</h4>
                    Operations software a company runs its day on: staff records, payroll, contracts,
                    site billing, stock and approval queues, all under one permission model with an
                    audit log behind it. These are 70 to 90 table schemas with unit-tested accrual
                    and payroll logic. Typically <strong>6</strong> to <strong>12</strong> weeks.
                     </div>
    </div>
  {/if}

  {#if active[1]}
    <div class={contentClass} transition:slide|global>
     <h4 class="text-lg font-bold font-head">Platforms and portals</h4>
                    Multi-role platforms with a public face and an authenticated back office:
                    beneficiary and donor management, volunteer lifecycles, learning platforms,
                    built-in CMS and a form builder, with database-driven translations where a
                    second language is needed. Typically <strong>4</strong> to <strong>8</strong> weeks.
    </div>
  {/if}

  {#if active[2]}
    <div class={contentClass} transition:slide|global>
       <h4 class="text-lg font-bold font-head">E-commerce and inventory</h4>
                    Storefront plus the back office that keeps it honest: catalogue, discounts,
                    token-based checkout and customer accounts on the front, suppliers, stock
                    adjustments, damaged goods and fulfilment states behind it. Typically
                    <strong>4</strong> to <strong>10</strong> weeks.
    </div>
  {/if}
  </div>
