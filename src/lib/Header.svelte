<script>
    import { DarkMode } from "flowbite-svelte";
    import { page, navigating } from '$app/state';
    import { HomeSolid, UserCircleSolid, WalletSolid, MessageCaptionSolid } from "flowbite-svelte-icons";

   // Projects is a real route, not a homepage anchor - linking it to #projects
   // meant the nav could never reach /projects at all.
   const sections = [
      { name: 'Home', href: '/', icon: HomeSolid },
      { name: 'About', href: '/#about', icon: UserCircleSolid },
      { name: 'Projects', href: '/projects', icon: WalletSolid },
      { name: 'Contact', href: '/#contact', icon: MessageCaptionSolid }
   ];

   /**
    * The old check compared page.url.hash against the href, so with an empty
    * hash "Home" matched on every page, including /projects.
    * @param {string} href
    */
   function isCurrent(href) {
      const path = page.url.pathname;
      if (path === '/') {
         // On the homepage the highlight follows the section being read, not
         // the last anchor clicked, so scrolling to About lights up About.
         if (href === '/') return !homeSection;
         if (href === '/#about') return homeSection === 'about';
         if (href === '/#contact') return homeSection === 'contact';
         if (href === '/projects') return homeSection === 'projects';
         return false;
      }
      return !href.startsWith('/#') && href !== '/' && (path === href || path.startsWith(href + '/'));
   }

   /** Which homepage section sits under the upper third of the viewport. */
   let homeSection = $state('');

   $effect(() => {
      if (page.url.pathname !== '/') return;
      const ids = ['about', 'projects', 'contact'];
      const update = () => {
         const line = window.innerHeight * 0.35;
         let current = '';
         for (const id of ids) {
            const el = document.getElementById(id);
            if (el && el.getBoundingClientRect().top <= line) current = id;
         }
         homeSection = current;
      };
      update();
      window.addEventListener('scroll', update, { passive: true });
      return () => window.removeEventListener('scroll', update);
   });
</script>

<!-- One navigation, two shapes. On desktop the links live in the top bar; on
     a phone they move to a bar at the bottom, where a thumb can reach them,
     and the top bar keeps only the name and the theme switch. There used to
     be a hamburger menu as well, which put the same four links in two places. -->
<nav aria-label="Main" class="enter-fall sticky top-[10px] z-50 mt-[10px] flex max-w-4xl items-center justify-between gap-4
     rounded-2xl border border-line bg-surface/90 px-4 py-3 font-head shadow-md backdrop-blur-md
     dark:border-white/10 dark:bg-canvas/60 dark:shadow-black/50 mx-3 lg:mx-auto ">

  <a href="/" class="group flex items-center gap-2 text-lg font-bold text-ink dark:text-white">
    <span class="star text-background-2 transition-transform duration-500 group-hover:rotate-180" aria-hidden="true">✦</span>
    Nahusenay
  </a>

  <ul class="hidden items-center gap-1 lg:flex">
    {#each sections as section, i}
      <li>
        <a
          aria-current={isCurrent(section.href) ? 'page' : undefined}
          href={section.href}
          style="--enter-delay: {150 + i * 70}ms"
          class="enter-fade block rounded-lg px-4 py-2 text-base text-muted transition-colors duration-200
                 hover:bg-background-2/30 hover:text-ink
                 aria-[current=page]:bg-background-2/50 aria-[current=page]:text-ink
                 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white
                 dark:aria-[current=page]:bg-background-2/10 dark:aria-[current=page]:text-background-2
                 dark:aria-[current=page]:ring-1 dark:aria-[current=page]:ring-background-2/30"
        >
          {section.name}
        </a>
      </li>
    {/each}
  </ul>

  <DarkMode />

  <!-- Page loads show as a thin line along the bar's lower edge rather than a
       "Loading PROJECTS" label that shoves the links sideways. -->
  {#if navigating.to}
    <span class="progress pointer-events-none absolute inset-x-4 bottom-0 h-0.5 overflow-hidden rounded-full" aria-hidden="true"></span>
  {/if}
</nav>

<nav aria-label="Main (mobile)" class="fixed inset-x-3 bottom-4 z-50 lg:hidden">
  <ul class="grid grid-cols-4 rounded-2xl border border-line bg-surface/90 p-1.5 shadow-lg backdrop-blur-md
             dark:border-white/10 dark:bg-canvas/70 dark:shadow-black/50">
    {#each sections as section}
      {@const Icon = section.icon}
      <li>
        <a
          href={section.href}
          aria-current={isCurrent(section.href) ? 'page' : undefined}
          class="flex flex-col items-center gap-0.5 rounded-xl py-2 font-head text-xs text-muted transition-colors
                 aria-[current=page]:bg-background-2/50 aria-[current=page]:text-ink
                 dark:text-gray-400 dark:aria-[current=page]:bg-background-2/10 dark:aria-[current=page]:text-background-2"
        >
          <Icon class="h-5 w-5" />
          {section.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .progress::after {
    content: '';
    position: absolute;
    inset-block: 0;
    width: 40%;
    border-radius: inherit;
    background: var(--color-background-2);
    animation: sweep 1.1s ease-in-out infinite;
  }

  @keyframes sweep {
    from { left: -40%; }
    to { left: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .progress::after {
      animation: none;
      left: 0;
      width: 100%;
      opacity: 0.6;
    }
  }
</style>
