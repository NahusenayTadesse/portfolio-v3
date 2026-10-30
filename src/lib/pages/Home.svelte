<script >
    import { Popover } from 'flowbite-svelte';
    import { reveal } from '$lib/reveal';
      import { DownloadOutline, GithubSolid, LinkedinSolid, WhatsappSolid, EnvelopeSolid} from "flowbite-svelte-icons";

      
    import { typewriter, link, primary, quiet, svgClass, popClass } from '$lib/global.svelte.js';
    
</script>


<div class="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-4 pb-24 pt-8 lg:min-h-[85vh] lg:flex-row lg:gap-16 lg:pb-0 lg:pt-0">

  <!-- Text first in the DOM so it is what a screen reader and a crawler meet
       first; the photo is ordered above it visually on small screens only. -->
  <div class="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
    <!-- The typewriter types the line out; the CSS entrance lifts it into
         place, and still runs on the hydrated page where an intro transition
         would not. -->
    <h1 in:typewriter={{ speed: 1 }} style="--enter-delay: 80ms" class="enter mb-3 font-head text-4xl font-bold leading-tight text-ink dark:text-white sm:text-5xl lg:text-7xl">
      I build the software businesses run on.</h1>

    <p class="enter max-w-xl font-body text-lg sm:text-xl lg:text-2xl" style="--enter-delay: 260ms">
      I am Nahusenay, a SvelteKit developer and full-stack product engineer. I build ERPs with 70 to 90 table schemas, payroll on the Ethiopian calendar and multi-currency reconciliation end to end on my own, then deploy them onto Linux, cPanel or Vercel. Over 20 applications in production; most are private client systems, so the ones below are the ones I can show.</p>

    <!-- One primary action that keeps people on the site, one secondary, and
         the CV demoted to a quiet link. It used to be the only call to action,
         which asked for commitment before showing any work. -->
    <div class="enter mt-6 flex w-full flex-col items-stretch gap-3 font-head sm:w-auto sm:flex-row sm:items-center lg:mt-8 lg:items-start" style="--enter-delay: 400ms">
      <a href="/projects" class={primary}>View my work</a>
      <a href="/#contact" class={link}>Get in touch</a>
    </div>

    <a href="/Nahusenay%20Tadesse%20CV.pdf" download="Nahusenay_Tadesse_CV" class="{quiet} enter mt-4 lg:mt-5" style="--enter-delay: 520ms">
      <DownloadOutline class="h-5 w-5" />
      Download CV (PDF, 2 pages)
    </a>
  </div>

  <div class="enter-scale order-1 shrink-0 lg:order-2" style="--enter-delay: 120ms">
    <img
      src="/nahusenay-headshot.webp"
      alt="Nahusenay Tadesse"
      width="460"
      height="460"
      fetchpriority="high"
      decoding="async"
      class="h-32 w-32 rounded-2xl border border-line object-cover shadow-lg sm:h-48 sm:w-48 lg:h-72 lg:w-72
             dark:border-white/15 dark:shadow-black/40"
    />
  </div>
</div>

<div class="flex flex-col items-center px-4">
  <!-- The bar sits at the fold on most screens, so it reveals on scroll
       rather than firing an intro nobody is looking at. -->
  <div class="flex flex-row flex-wrap justify-center items-center mt-8 gap-5 p-4 rounded-xl bg-surface border border-line shadow-sm
  dark:bg-white/5 dark:border-white/10 dark:shadow-none 
  " data-reveal="scale" use:reveal>
   <a href="https://www.linkedin.com/in/nahusenay-tadesse-ba0375233?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BXDbv38FTQOGT31o4PqhzkQ%3D%3D" target="_blank" aria-label="LinkedIn">
      <LinkedinSolid class={svgClass} />
    </a>
    <Popover class={popClass} title="LinkedIn">Connect with me in LinkedIn, be part of my professional network.</Popover>

    <a href="https://wa.me/+251947340602" target="_blank" aria-label="WhatsApp">
      <WhatsappSolid class={svgClass} />
    </a>
    <Popover class={popClass} title="WhatsApp">Chat with me on WhatsApp, I will respond as soon as possible.</Popover>

    <a href="mailto:nahusenaytadesse75@gmail.com" target="_blank" aria-label="Email">
      <EnvelopeSolid class={svgClass} />
    </a>
    <Popover class={popClass} title="Email">Send me an email, I will respond as soon as possible.</Popover>

   <a href="https://t.me/NahusenayTadesse" target="_blank" aria-label="Telegram">

      <svg role="img" class={svgClass} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 
      0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" 
      fill="currentColor"/>
    </svg> </a>
    <Popover class={popClass} title="Telegram">Chat with me on Telegram, I will respond as soon as possible.</Popover> <a href="https://github.com/NahusenayTadesse" target="_blank" aria-label="GitHub">
      <GithubSolid class={svgClass} />
    </a>
    <Popover class={popClass} title="GitHub">Check out my GitHub, see my projects.</Popover>
      
  </div>    
</div>





