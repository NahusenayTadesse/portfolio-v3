
<script>
    let { data } = $props();

</script>
<h1>Fuck you {data.project?.name}</h1>
<p>{data.project?.description}</p>
{data.project?.technology.length}

  <ul>
    {#each data.project?.technology as tech}
      <li>{tech}</li>
    {/each}
  </ul>