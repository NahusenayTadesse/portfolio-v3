<script lang="ts">
    import { enhance } from '$app/forms'; // For submitting form with SvelteKit actions

   
    let {form} = $props();
    let inputField = "p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-background-1 dark:bg-secondary-900 dark:text-white bg-transparent border-1 border-background-2 shadow-lg placeholder:text-secondary-700 dark:placeholder:text-white";

    


</script>

<div class="p-8 gap-4 flex flex-col">
    <h1 class="font-head font-bold text-5xl text-center">Login</h1>

    <!-- The `action` attribute targets the 'login' action in +page.server.js -->
    <form method="POST" action="?/login" class="max-w-2xl w-full lg:w-1/2 mx-auto p-8 shadow-lg rounded-lg flex flex-col gap-4 
         bg-transparent backdrop-blur-md transition 
         text-gray-800 dark:text-gray-100" use:enhance>
            <input type="email" id="email" name="email" required class={inputField} placeholder="Email" />

            <input type="password" id="password" name="password" required class={inputField} placeholder="Password"/>

        {#if form?.success === false}
            <p class="error-message">{form?.message}</p>
        {/if}
        {#if form?.success === true}
            <p class="success-message">{form?.message}</p>
        {/if}
         

        <button type="submit"  class="w-full text-black font-semibold p-4 rounded-lg transition duration-300 
           hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2 
           dark:hover:from-secondary-600 dark:hover:to-background-1 
           border-secondary-700 dark:border-background-2 dark:text-white border-1 shadow-2xl" >
          Login
        </button>
    </form>

    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
</div>

<style>
    /* Re-using the same styles as before for consistency */
    .error-message {
        color: #dc3545;
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
        text-align: center;
    }

    .success-message {
        color: #28a745;
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
        text-align: center;
    }

    p {
        text-align: center;
        margin-top: 20px;
        color: #666;
    }

    a {
        color: #007bff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>