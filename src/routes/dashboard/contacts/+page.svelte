<script lang='ts'>
	import { enhance } from '$app/forms';
    import { fly } from 'svelte/transition';

    let { data } = $props();
   

    let ids = $state<string[]>([]);
  

  function pushId(id: string) {
     ids.push(id);
  }

  function onsubmit(){
    alert('Are Your sure you want to delete ' + ids.length + ' messags?')
  }

 function formatDateTime(input: string) {
  if (typeof input !== 'string' || !input.includes('_')) {
    return 'Invalid date';
  }

  try {
    // Split date and time
    const [datePart, timePart] = input.split('_');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hourRaw, minute, second] = timePart.split('-').map(Number);

    const ampm = hourRaw >= 12 ? 'PM' : 'AM';
    const hour = hourRaw % 12 || 12;

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return `${monthNames[month - 1]} ${day}, ${year}, ${hour}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')} ${ampm}`;
  } catch (err) {
    return 'Invalid date';
  }
}

let searchQuery = $state('');

  
</script>
<svelte:head>
  <title>Contacts</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>


<input type="text" 
 placeholder="Search Projects" 
 class="absolute right-0 lg:top-3 top-20  lg:right-2 max-w-md mx-auto mt-4 p-2 rounded-lg focus:outline-none focus:ring-2
  focus:ring-background-2 dark:bg-secondary-900 dark:text-white dark:border-gray-600 bg-transparent border-1 border-background-1 shadow-lg" 
  bind:value={searchQuery} >





<form method="POST" action="?/delete" use:enhance class="flex flex-col justify-center items-center mt-16">
  <div class="grid gap-4 w-4/5 justify-self-center min-h-[100px] grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    {#each 
      searchQuery 
        ? data.contacts.filter(project => 
            String(project?.email ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(project?.message ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            String(formatDateTime(project?.createdAt) ?? '').toLowerCase().includes(searchQuery.toLowerCase()) 
          ) 
        : data.contacts  as contact}
      <div class="border-2 rounded-lg border-background-1 shadow-2xl p-4" transition:fly={{y:-200, duration: 500}}>
        <input
          type="checkbox"
          onchange={() => pushId(contact.id)}
        />
        <h2 > Email: <a href="mailto:{contact?.email}" target="_blank" class="text-blue-700"> {contact?.email}</a></h2>
  <h3>Created At:  {formatDateTime(contact.createdAt)} </h3>
  <p> Message:  {contact?.message}</p>
    </div>
  {/each}
  {#each ids as id}

   <input type="hidden" name="ids" value={id} >
   {/each}
   </div>

  <button type="submit" name="delete" onclick={onsubmit}
  class="w-48 justify-self-center p-4 bg-red-500 hover:bg-red-600 text-white  border-1 rounded-lg mt-8">
 
  
  Delete Selected</button>
</form>