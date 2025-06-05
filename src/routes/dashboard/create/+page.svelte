<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';

    let {data, form} = $props();
let searchQuery = $state('');

  function onsubmit(){
    alert('Are Your sure you want to delete projects?')
  }
let inputField = "p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-background-1 dark:bg-secondary-900 dark:text-white bg-transparent border-1 border-background-2 shadow-lg placeholder:text-secondary-700 dark:placeholder:text-white";
let fileInput = " w-full px-3 py-2 shadow-lg rounded-lg text-sm bg-background-1 dark:bg-background-2 dark:text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-gray-200 file:text-gray-700 dark:file:bg-gray-700 dark:file:text-white hover:file:bg-gray-300 dark:hover:file:bg-gray-600";





  


</script>

<!-- <form method="post" action="?/test" enctype="multipart/form-data" >
  <input type="file" class={fileInput} name="image" multiple>
  <button type="submit" {onsubmit}>Submit</button>
   {#if form?.success}
   {#each form?.imageUrls as imageUrl}
  <img src={imageUrl} alt="Image" />
  {/each}
  {/if}
</form> -->

  


<input type="text" 
 placeholder="Search Projects" 
 class="absolute right-0 lg:top-3 top-20  lg:right-2 max-w-md mx-auto mt-4 p-2 rounded-lg focus:outline-none focus:ring-2
  focus:ring-background-2 dark:bg-secondary-900 dark:text-white dark:border-gray-600 bg-transparent border-1 border-background-1 shadow-lg" 
  bind:value={searchQuery} >





  <div class="flex min-h-[50vh] flex-row flex-wrap justify-center items-center gap-4 w-4/5 justify-self-center">
  
    {#each 
    
    
    searchQuery 
    ? data.projects.filter(project =>  
        String(project?.name ?? '').toLowerCase().includes(searchQuery.toLowerCase())) 
    : data.projects  as project}
    <div class="border-2 rounded-lg border-background-1 shadow-2xl p-4 w-1/4" transition:fly={{y:-200, duration: 500}}>

        <img src={project?.featured} alt={project?.name}>
      
      <h2 > Name: <a href="/create/{project?.slug}" target="_blank" class="text-blue-700"> {project?.name}</a></h2>
     <form method="POST" action="?/delete" use:enhance class="flex flex-col justify-center items-center">

     <input type="hidden" name="id" value={project?.id} >
       <button type="submit" class="w-48 justify-self-center p-4 bg-red-500 hover:bg-red-600 text-white  border-1 rounded-lg" name="delete"> Delete Selected</button>
       </form>
    </div>
  {/each}
  

   </div>


    <div class="w-full">
     <form action="?/create" method="post"
  class="max-w-2xl w-full mx-auto p-8 shadow-lg rounded-lg flex flex-col gap-6 
         bg-transparent backdrop-blur-md transition 
         text-gray-800 dark:text-gray-100" enctype="multipart/form-data" use:enhance>

  <h2 class="text-2xl font-bold text-center">Create Project</h2>

  <input 
    type="text" 
    name="name" 
    placeholder="Name" 
class={inputField}   />

  <input 
    type="text" 
    name="category" 
    placeholder="Category" 
class={inputField}   />

  <textarea 
    name="description" 
    placeholder="Description" 
    rows="4"
class={inputField}   ></textarea>

  <input 
    type="url" 
    name="link" 
    placeholder="Project Link" 
    class={inputField} 
  />

  <input 
    type="text" 
    name="technology" 
    placeholder="Technology (e.g. React, Node.js)" 
class={inputField}   />
<label for="featured">Featured Image</label>

  <input 
    type="file" 
    name="featured" 
class={inputField}   />
  <label for="screenshots">Desktop Screenshots</label>

  <input 
    type="file" 
    name="screenshots" 
    class={inputField}
    multiple
    placeholder="Desktop Screenshots"
  />
  <label for="screenshotsMobile">Mobile Screenshots</label>

  <input 
    type="file" 
    name="screenshotsMobile" 
   class={inputField}
    multiple
  />

  <button 
    {onsubmit}
    type="submit" 
    class="w-full text-black font-semibold p-4 rounded-lg transition duration-300 
           hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2 
           dark:hover:from-secondary-600 dark:hover:to-background-1 
           border-secondary-700 dark:border-background-2 dark:text-white border-1 shadow-2xl 
           "
  >
  {#if form?.loading === false}
  <svg xmlns="http://www.w3.org/2000/svg" class="fill-secondary-700 dark:fill-white animate-spin w-6 h-6" x="0px" y="0px" viewBox="0 0 50 50">
<path d="M 25 5 C 14.351563 5 5.632813 13.378906 5.054688 23.890625 C 5.007813 24.609375 5.347656 25.296875 5.949219 25.695313 C 6.550781 26.089844 7.320313 26.132813 7.960938 25.804688 C 8.601563 25.476563 9.019531 24.828125 9.046875 24.109375 C 9.511719 15.675781 16.441406 9 25 9 C 29.585938 9 33.699219 10.925781 36.609375 14 L 34 14 C 33.277344 13.988281 32.609375 14.367188 32.246094 14.992188 C 31.878906 15.613281 31.878906 16.386719 32.246094 17.007813 C 32.609375 17.632813 33.277344 18.011719 34 18 L 40.261719 18 C 40.488281 18.039063 40.71875 18.039063 40.949219 18 L 44 18 L 44 8 C 44.007813 7.460938 43.796875 6.941406 43.414063 6.558594 C 43.03125 6.175781 42.511719 5.964844 41.96875 5.972656 C 40.867188 5.988281 39.984375 6.894531 40 8 L 40 11.777344 C 36.332031 7.621094 30.964844 5 25 5 Z M 43.03125 23.972656 C 41.925781 23.925781 40.996094 24.785156 40.953125 25.890625 C 40.488281 34.324219 33.558594 41 25 41 C 20.414063 41 16.304688 39.074219 13.390625 36 L 16 36 C 16.722656 36.011719 17.390625 35.632813 17.753906 35.007813 C 18.121094 34.386719 18.121094 33.613281 17.753906 32.992188 C 17.390625 32.367188 16.722656 31.988281 16 32 L 9.71875 32 C 9.507813 31.96875 9.296875 31.96875 9.085938 32 L 6 32 L 6 42 C 5.988281 42.722656 6.367188 43.390625 6.992188 43.753906 C 7.613281 44.121094 8.386719 44.121094 9.007813 43.753906 C 9.632813 43.390625 10.011719 42.722656 10 42 L 10 38.222656 C 13.667969 42.378906 19.035156 45 25 45 C 35.648438 45 44.367188 36.621094 44.945313 26.109375 C 44.984375 25.570313 44.800781 25.039063 44.441406 24.636719 C 44.078125 24.234375 43.570313 23.996094 43.03125 23.972656 Z"></path>
</svg>
{/if}
    Create
  </button>
</form>




    </div>

   
 
