 <script>
	import { enhance } from '$app/forms';
    import {link, typewriter} from '$lib/global.svelte';
    import { fly } from 'svelte/transition';
	import { Toast } from 'flowbite-svelte';
	import { ThumbsUpSolid, ExclamationCircleSolid } from 'flowbite-svelte-icons';
    let {success, status,  loading=false } = $props();

    
     function onsubmit(){
        loading = true;
     }
 </script> 
 

 

 <form method="POST" {onsubmit} use:enhance class="flex flex-col gap-4 p-8 max-w-md mx-auto rounded-lg shadow-lg
   bg-gradient-to-r from-background-2 to-background-1 dark:bg-gradient-to-r dark:from-[rgba(255,255,255,0)] dark:to-[rgba(255,255,255,0)]"
    transition:fly={{ y: -200, duration: 600 }} >

     {#if success}
     <h2 class="text-center text-head text-xl bg-green-400 p-4 rounded-lg">Thank you for your message</h2>
     {/if}


    <h1 class="text-3xl font-head font-bold text-secondary-900 dark:text-white text-center mb-4" transition:typewriter={{ speed: 1 }}>
        Send Me a Message
    </h1>
 
 
    <input type="email" name="email" placeholder="Your Email" 
    class="p-2 rounded-lg focus:outline-none focus:ring-2
  focus:ring-background-1 dark:bg-secondary-900 dark:text-white bg-transparent border-1 border-background-2 shadow-lg placeholder:text-secondary-700 dark:placeholder:text-white" required>


  <textarea name="message" placeholder="Your Message" class="h-[150px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-background-2 dark:bg-secondary-900 dark:text-white bg-transparent border-1 border-background-1 shadow-lg placeholder:text-secondary-700 dark:placeholder:text-white" required></textarea>


  <button   type="submit"
    class={link} style="display: flex; flex-direction:row; justify-content: center; align-items: center">{#if loading === true}
    <svg xmlns="http://www.w3.org/2000/svg" class="fill-secondary-700 dark:fill-white animate-spin w-6 h-6" x="0px" y="0px" viewBox="0 0 50 50">
<path d="M 25 5 C 14.351563 5 5.632813 13.378906 5.054688 23.890625 C 5.007813 24.609375 5.347656 25.296875 5.949219 25.695313 C 6.550781 26.089844 7.320313 26.132813 7.960938 25.804688 C 8.601563 25.476563 9.019531 24.828125 9.046875 24.109375 C 9.511719 15.675781 16.441406 9 25 9 C 29.585938 9 33.699219 10.925781 36.609375 14 L 34 14 C 33.277344 13.988281 32.609375 14.367188 32.246094 14.992188 C 31.878906 15.613281 31.878906 16.386719 32.246094 17.007813 C 32.609375 17.632813 33.277344 18.011719 34 18 L 40.261719 18 C 40.488281 18.039063 40.71875 18.039063 40.949219 18 L 44 18 L 44 8 C 44.007813 7.460938 43.796875 6.941406 43.414063 6.558594 C 43.03125 6.175781 42.511719 5.964844 41.96875 5.972656 C 40.867188 5.988281 39.984375 6.894531 40 8 L 40 11.777344 C 36.332031 7.621094 30.964844 5 25 5 Z M 43.03125 23.972656 C 41.925781 23.925781 40.996094 24.785156 40.953125 25.890625 C 40.488281 34.324219 33.558594 41 25 41 C 20.414063 41 16.304688 39.074219 13.390625 36 L 16 36 C 16.722656 36.011719 17.390625 35.632813 17.753906 35.007813 C 18.121094 34.386719 18.121094 33.613281 17.753906 32.992188 C 17.390625 32.367188 16.722656 31.988281 16 32 L 9.71875 32 C 9.507813 31.96875 9.296875 31.96875 9.085938 32 L 6 32 L 6 42 C 5.988281 42.722656 6.367188 43.390625 6.992188 43.753906 C 7.613281 44.121094 8.386719 44.121094 9.007813 43.753906 C 9.632813 43.390625 10.011719 42.722656 10 42 L 10 38.222656 C 13.667969 42.378906 19.035156 45 25 45 C 35.648438 45 44.367188 36.621094 44.945313 26.109375 C 44.984375 25.570313 44.800781 25.039063 44.441406 24.636719 C 44.078125 24.234375 43.570313 23.996094 43.03125 23.972656 Z"></path>
</svg>
    {/if}
   
    
    
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