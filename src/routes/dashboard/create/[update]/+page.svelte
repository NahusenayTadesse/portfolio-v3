<script lang="ts">
	import { enhance } from '$app/forms';

    let {data} = $props(); 
    let inputField = "p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-background-1 dark:bg-secondary-900 dark:text-white bg-transparent border-1 border-background-2 shadow-lg placeholder:text-secondary-700 dark:placeholder:text-white";

</script>

    <h1 class="mt-8 mb-4 text-center font-head font-bold text-5xl">{data.project?.name}</h1>

  <form   class="max-w-2xl w-full mx-auto p-8 shadow-lg rounded-lg flex flex-col gap-6 
         bg-transparent backdrop-blur-md transition 
         text-gray-800 dark:text-gray-100" enctype="multipart/form-data" use:enhance>

     <input type="text" name="name" value={data.project?.name} id="" class={inputField}>
     <input type="text" name="category" value={data.project?.category} id="" class={inputField}>
     <input type="url" name="link" value={data.project?.link} id=""class={inputField}>
     <textarea name="description" value={data.project?.description} id="" class={inputField} style="height: 350px;"></textarea>
     <input type="text" name="featured" value={data.project?.featured} id="" class={inputField}>
     <input type="file" name="newFeatured" id="" placeholder="New Featured" class={inputField}>

      <input type="text" name="technology" value={data.project?.technology.join(',  ')} id="" class={inputField}>
      <input type="text" name="screenshots" value={data.project?.screenshots.join(',  ')} id="" class={inputField}>
      <input type="text" name="screenshotsMobile" value={data.project?.screenshotsMobile.join(',  ')} id="" class={inputField}>

      <input type="file" name="newScreenshots" id="" placeholder="New Screenshots" multiple class={inputField}>


      
  
           <input type="file" name="newscreenshotsMobile" id="" placeholder="New Mobile Screenshots" multiple class={inputField}>

      

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