<script >
    import { fly }  from  'svelte/transition'; 
    import { Popover } from 'flowbite-svelte';
      import { DownloadOutline, GithubSolid, LinkedinSolid, WhatsappSolid, EnvelopeSolid} from "flowbite-svelte-icons";

      
    import { typewriter, link, svgClass, popClass } from '$lib/global.svelte.js';
    
</script>


<div class="flex flex-col items-center justify-center p-2 pt-16 h-auto lg:h-[100vh] lg:p-0 lg:pt-0  ">
  <h1 in:typewriter={{ speed: 1 }} class="text-5xl lg:text-8xl font-bold mb-4 font-head text-center text-primary-900 dark:text-white leading-16 lg:leading-none">
    Design. Develop. Deploy.</h1>
  <p class="text-xl lg:text-2xl font-body text-center text-wrap w-full lg:w-2/3">
    I am Nahusenay, a fullstack website developer. I handle everything from design and development to security, deployment, and SEO.</p>
  <div class="text-center flex flex-row gap-6 align-center justify-center center flex-wrap pt-4 font-head">
    

    <a href="/CV.pdf" download="Nahusenay_CV" 
    class={link}
    transition:fly={{ x: 200, duration: 200 }}>
    Download CV <DownloadOutline class="inline-block ml-2 w-8 h-8 animate-bounce"  /></a>

  </div>

  <div class="flex flex-row flex-wrap justify-center shadow-lg items-center mt-8 gap-4 p-4 rounded-lg bg-gradient-to-br from-bg-gray-300 to-background-2 
  " transition:fly={{ x: -200, duration: 200 }}>
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





