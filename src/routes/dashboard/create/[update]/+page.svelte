<script lang="ts">
	import { enhance } from '$app/forms';
  

    let {data, form} = $props(); 
    let inputField = "p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-background-1 dark:bg-secondary-900 dark:text-white bg-transparent border-1 border-background-2 shadow-lg placeholder:text-secondary-700 dark:placeholder:text-white";
    let screenshots = $state(data.project?.screenshots || []);
    let screenshotsMobile = $state(data.project?.screenshotsMobile || []);
</script>
<svelte:head>
  <title>Update Projects</title>
</svelte:head>

    <h1 class="text-center text-lg font-head"> {form?.success ? 'Form submitted' : 'form Failed'} </h1>
    <h1 class="text-center text-lg font-head"> {form?.error ? form?.message : ''} </h1>
    
   




  <form   class="max-w-2xl w-full mx-auto p-8 shadow-lg rounded-lg flex flex-col gap-6 
         bg-transparent backdrop-blur-md transition 
         text-gray-800 dark:text-gray-100" action="?/update" method="post" enctype="multipart/form-data" use:enhance>

     <input type="text" name="name" value={data.project?.name} id="" class={inputField}>
     <input type="text" name="category" value={data.project?.category} id="" class={inputField}>
     <input type="url" name="link" value={data.project?.link} id=""class={inputField}>
     <textarea name="description" value={data.project?.description} id="" class={inputField} style="height: 350px;"></textarea>
     <input type="text" name="featured" value={data.project?.featured} id="" class={inputField}>
     <label for="newFeatured">New Featured</label>
     <input type="file" name="newFeatured" id="" placeholder="New Featured" class={inputField}>

     <label for="technology">Technology</label>

      <input type="text" name="technology" value={data.project?.technology.join(',  ')} id="" class={inputField}>
      <label for="screenshots">Desktop Screenshots</label>
      <div class="flex flex-row flex-wrap">
     {#each screenshots as screenshot, index}
     <div>
       <button class="text-red-700 text-2xl text-left" onclick={() => screenshots = screenshots.filter((_, i) => i !== index)}>X</button>
       <img src={screenshot} alt="Desktop Screenshots">
       </div>
      {/each}
      </div>
       <label for="newScreenshots">New Screenshots for Desktop</label>

      <input type="file" name="newScreenshots[]" id="" placeholder="New Screenshots" multiple class={inputField}>

      <label for="technology">Mobile Screenshots</label>
       <div class="flex flex-row flex-wrap">
        {#each screenshotsMobile as screenshot, index}
        <div>
       <button class="text-red-700 text-2xl text-left" onclick={() => screenshotsMobile = screenshotsMobile.filter((_, i) => i !== index)}>X</button>
       <img src={screenshot} class="" alt="Mobile Screenshots">
       </div>
      {/each}
</div>

     
      <label for="newScreenshotsMobile">New Screenshots for Mobile</label>
      <input type="file" name="newScreenshotsMobile[]" id="" placeholder="New Mobile Screenshots" multiple class={inputField}>
      {#each screenshots as screenshot}
  <input type="hidden" name="screenshots" value={screenshot}>
{/each}

{#each screenshotsMobile as screenshot}
  <input type="hidden" name="screenshotsMobile" value={screenshot}>
{/each}

      <button 
      type="submit" 
    class="w-full text-black font-semibold p-4 rounded-lg transition duration-300 
           hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2 
           dark:hover:from-secondary-600 dark:hover:to-background-1 
           border-secondary-700 dark:border-background-2 dark:text-white border-1 shadow-2xl 
           "
  >
    Update
  </button>
      

  </form>