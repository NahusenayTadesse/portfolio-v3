
 <script>
    import {typewriter} from '$lib/global';
    import { fly, fade } from 'svelte/transition';
    
 </script> 


 <form method="POST" class="flex flex-col gap-4 p-8 max-w-md mx-auto rounded-lg shadow-lg"
    transition:fly={{ y: -200, duration: 600 }}>

    <h1 class="text-3xl font-head font-bold text-secondary-900 dark:text-white text-center mb-4">
        Send Me a Message
    </h1>
 
 
    <input type="email" name="email" placeholder="Your Email" 
    class="p-2 rounded-lg focus:outline-none focus:ring-2
  focus:ring-background-1 dark:bg-secondary-900 dark:text-white dark:border-gray-600 bg-transparent border-1 border-background-1 shadow-lg" required>
  
  
  
  <textarea name="message" placeholder="Your Message" class="h-[150px] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-background-2 dark:bg-secondary-900 dark:text-white bg-transparent border-1 border-background-1 shadow-lg" required></textarea>
 
 
 
 
  <button   type="submit"
    class="dark:text-white bg-transparent text-secondary-900 shadow-lg
    px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2 hover:text-black hover:shadow-lg hover:border-0 
    dark:hover:border-0 dark:hover:shadow-lg dark:hover:bg-gradient-to-r dark:hover:from-primary-600 dark:hover:to-secondary-600
    transition-colors duration-300  dark:hover:text-white justify-self-center font-head text-lg"
    transition:fly={{ x: -200, duration: 1000 }}>
    Submit </button>
</form> 

