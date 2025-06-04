<script lang="ts">
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';

    let {data} = $props();
let searchQuery = $state('');

  function onsubmit(){
    alert('Are Your sure you want to delete projects?')
  }
let inputField = "p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-background-1 dark:bg-secondary-900 dark:text-white bg-transparent border-1 border-background-2 shadow-lg placeholder:text-secondary-700 dark:placeholder:text-white";
let fileInput = " w-full px-3 py-2 shadow-lg rounded-lg text-sm bg-background-1 dark:bg-background-2 dark:text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:bg-gray-200 file:text-gray-700 dark:file:bg-gray-700 dark:file:text-white hover:file:bg-gray-300 dark:hover:file:bg-gray-600";
  
</script>


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
     <form action="?/create" 
  class="max-w-2xl w-full mx-auto p-8 shadow-lg rounded-lg flex flex-col gap-6 
         bg-transparent backdrop-blur-md transition 
         text-gray-800 dark:text-gray-100">

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

  <input 
    type="file" 
    name="featured" 
class={fileInput}   />

  <input 
    type="file" 
    name="screenshots" 
    class={fileInput}
    multiple
  />

  <input 
    type="file" 
    name="screenshotsMobile" 
   class={fileInput}
    multiple
  />

  <button 
    type="submit" 
    class="w-full text-black font-semibold p-4 rounded-lg transition duration-300 
           hover:bg-gradient-to-r hover:from-background-1 hover:to-background-2 
           dark:hover:from-secondary-600 dark:hover:to-background-1 
           border-secondary-700 dark:border-background-2 dark:text-white border-1 shadow-2xl 
           "
  >
    Create
  </button>
</form>




    </div>

   
 
