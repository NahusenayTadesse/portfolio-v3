<script>
    import Tabs from '$lib/Tabs.svelte';
    import { reveal } from '$lib/reveal';

    // Grouped by the job each tool does on a project. Text rather than an icon
    // wall: the logos only explained themselves in hover popovers, which never
    // open on a phone, and the list stays to the tools these systems use.
    const stack = [
      {
        group: 'Core',
        items: [
          { name: 'SvelteKit & Svelte 5', note: 'Default for every new system' },
          { name: 'TypeScript', note: 'End to end, schema to UI' },
          { name: 'Tailwind CSS', note: 'Admin dashboards and public sites' }
        ]
      },
      {
        group: 'Data',
        items: [
          { name: 'Drizzle ORM', note: 'Schemas and migrations' },
          { name: 'MySQL, PostgreSQL, SQLite', note: 'All three in production' },
          { name: 'Better Auth', note: 'Sessions and role-based access' }
        ]
      },
      {
        group: 'Quality',
        items: [
          { name: 'Playwright', note: 'End-to-end tests' },
          { name: 'Vitest', note: 'Unit tests' }
        ]
      },
      {
        group: 'Deployment',
        items: [
          { name: 'Linux servers', note: 'Provisioning and administration' },
          { name: 'cPanel & LiteSpeed', note: 'SvelteKit on shared hosting' },
          { name: 'Vercel', note: 'Serverless, with ISR where it fits' },
          { name: 'Docker', note: 'Containerised services' },
          { name: 'Go', note: 'Small static tools, like nodetrack' }
        ]
      }
    ];
</script>


<h2 class="text-3xl lg:text-6xl font-head text-center font-bold mb-4" data-reveal use:reveal>About Me</h2>

<div class="flex flex-col justify-center items-center justify-self-center px-0 lg:px-24">
<div class="flex flex-row flex-wrap justify-center items-start text-center shadow-md rounded-lg dark:shadow-[rgba(255,255,255,0.1)] p-2 lg:p-8 gap-8">
      <div class="flex flex-col w-full lg:w-1/3 h-full justify-start align-center text-center shadow-md rounded-lg dark:shadow-[rgba(255,255,255,0.1)] p-4 lg:p-8 gap-4"
        data-reveal="left" use:reveal>
    <h3 class="font-bold font-head text-2xl text-center">Who Am I?</h3>
        
    <p class="text-left">
      I'm Nahusenay Tadesse, a SvelteKit developer and full-stack product engineer. I build the
      systems businesses actually run on: ERP platforms with 70 to 90 table schemas, payroll and
      leave-accrual engines, multi-currency reconciliation, role-based access control and audit
      logging. All of it is live and in daily use, not a demo.</p>
    
    <h3 class="font-bold font-head text-2xl text-center">Development Philosophy</h3>
        <p class="text-left">I own the parts most front-end developers hand off: schema design and
        migrations, session security, file storage and caching, SMTP, and the deployment itself.
        I run these apps on Linux servers, on shared cPanel and LiteSpeed hosting where Node is
        awkward to get working, and on Vercel where serverless fits. If it needs to ship, I can
        put it somewhere.</p>
  
  </div>
    <div class="flex flex-col w-full lg:w-1/2 justify-center align-center text-center shadow-md rounded-lg dark:shadow-[rgba(255,255,255,0.1)] p-4 lg:p-8 gap-4"
      data-reveal="right" use:reveal={{ delay: 120 }}>
        
         <div class="w-full text-center lg:text-center flex flex-col gap-4 rounded-lg">
            <h3 class="font-head font-bold text-2xl">What Do I Build?</h3>  

              <p class="text-left">Most of my work is custom business software rather than brochure
              sites. Each type below carries a different schema, a different permission model and a
              different timeline.</p>
            <Tabs />
          </div>
    </div>
     <div class="flex flex-col justify-center lg:justify-start items-center w-full shadow-md gap-4 p-4"
       data-reveal use:reveal>

     <h3 class="font-bold font-head text-2xl"> My Tech Stack</h3>
     <p class="w-full lg:w-1/2 text-left lg:text-left">SvelteKit and TypeScript are my default, with
     Drizzle over MySQL, PostgreSQL or SQLite depending on what the project needs, Better Auth for
     sessions, and Playwright and Vitest for tests. I have production apps running on all three
     databases and on three different hosting models.</p>

    <dl class="grid w-full grid-cols-1 gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
      {#each stack as column, i (column.group)}
        <div class="flex flex-col gap-3" data-reveal use:reveal={{ delay: i * 90 }}>
          <dt class="font-head text-xs font-bold uppercase tracking-wider text-muted dark:text-gray-400">{column.group}</dt>
          {#each column.items as item (item.name)}
            <dd class="rounded-lg border border-line bg-surface p-3 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p class="font-semibold text-ink dark:text-white">{item.name}</p>
              <p class="mt-0.5 text-sm text-muted dark:text-gray-300">{item.note}</p>
            </dd>
          {/each}
        </div>
      {/each}
    </dl>
</div>


</div>

</div>
