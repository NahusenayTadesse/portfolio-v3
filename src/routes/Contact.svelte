
 <script>
	import { enhance } from '$app/forms';
    import {link, typewriter} from '$lib/global.svelte';
    import { fly } from 'svelte/transition';
	import { Toast } from 'flowbite-svelte';
	import { ThumbsUpSolid, ExclamationCircleSolid } from 'flowbite-svelte-icons';
    let {success, status } = $props();
 </script> 
 

 

 <form method="POST" use:enhance class="flex flex-col gap-4 p-8 max-w-md mx-auto rounded-lg shadow-lg
   bg-gradient-to-r from-background-2 to-background-1 dark:bg-gradient-to-r dark:from-[rgba(255,255,255,0)] dark:to-[rgba(255,255,255,0)]"
    transition:fly={{ y: -200, duration: 600 }} >

     {#if success}
     <h2>Thank you for your message</h2>
     {/if}


    <h1 class="text-3xl font-head font-bold text-secondary-900 dark:text-white text-center mb-4" transition:typewriter={{ speed: 1 }}>
        Send Me a Message
    </h1>
 
 
    <input type="email" name="email" placeholder="Your Email" 
    class="p-2 rounded-lg focus:outline-none focus:ring-2
  focus:ring-background-1 dark:bg-secondary-900 dark:text-white bg-transparent border-1 border-background-2 shadow-lg placeholder:text-secondary-700 dark:placeholder:text-white" required>


  <textarea name="message" placeholder="Your Message" class="h-[150px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-background-2 dark:bg-secondary-900 dark:text-white bg-transparent border-1 border-background-1 shadow-lg placeholder:text-secondary-700 dark:placeholder:text-white" required></textarea>


  <button   type="submit"
    class={link}
    transition:fly={{ x: -200, duration: 1000 }}>
    Submit </button>
   

    
</form> 

{#if success} 
<div >
<Toast class="bg-gradient-to-r from-background-1 to-background-2 fixed bottom-0 right-0 p-4 rounded-lg shadow-lg">
    <ThumbsUpSolid class="text-green-500 w-12 h-1/2" />
    <h2 class="font-head text-2xl">Thank You for your Message, I will get back to you shortly!</h2>
</Toast>
</div>
{/if}

{#if status === 400}
    <Toast class="bg-gradient-to-r from-background-1 to-background-2 fixed bottom-0 right-0 p-4 rounded-lg shadow-lg">
    <ExclamationCircleSolid class="text-red-500 w-15 h-15" />
    <h2 class="font-head text-2xl text-red-700 dark:text-red-400">There was an error sending your message, please fill all the fields.</h2>
</Toast>
{:else if status === 500}

<Toast class="bg-gradient-to-r from-background-1 to-background-2 fixed bottom-0 right-0 p-4 rounded-lg shadow-lg">
    <ExclamationCircleSolid class="text-red-500 w-15 h-15" />
    <h2 class="font-head text-2xl text-red-700 dark:text-red-400">There was an error sending your message, please try again.</h2>
</Toast>


{/if}


