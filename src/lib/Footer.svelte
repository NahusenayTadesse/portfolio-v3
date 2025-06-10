
<script>
	import { BottomNav, BottomNavItem } from "flowbite-svelte";
    let currentYear = new Date().getFullYear();
    import { MessageCaptionSolid, EnvelopeSolid, PhoneSolid, WhatsappSolid, LinkedinSolid, HomeSolid, WalletSolid, UserCircleSolid } from "flowbite-svelte-icons";

</script>

<div class="block lg:hidden"> 


<BottomNav  position="fixed" innerClass="grid-cols-4 bg-gradient-to-br from-gray-50 to-background-2 dark:bg-gradient-to-r dark:from-primary-600 dark:to-secondary-600">

  <BottomNavItem btnName="Home" href="">
    <HomeSolid />
  </BottomNavItem>
  <BottomNavItem btnName="About" href="/#about">
    <UserCircleSolid  />
  </BottomNavItem>
  <BottomNavItem btnName="Projects" href="/projects">
    <WalletSolid   />
  </BottomNavItem>
  <BottomNavItem btnName="Contact" href="#contact">
    <MessageCaptionSolid  />
  </BottomNavItem>

</BottomNav>
</div>

<footer class="bg-transparent p-6 pb-12">
    <div class="container mx-auto text-center">
         <div class="flex flex-row flex-wrap justify-center">
            <a href="mailto:nahusenaytadesse75@gmail.com" class="mx-2 hover:scale-125 transition-transform duration-300">
                <EnvelopeSolid class="w-6 h-6 text-secondary-700 dark:text-white" />
            </a>
            <a href="tel:+251947340602" class="mx-2 hover:scale-125 transition-transform duration-300">
                <PhoneSolid class="w-6 h-6 text-secondary-700 dark:text-white" />
            </a>
            <a href="https://wa.me/+251947340602" class="mx-2 hover:scale-125 transition-transform duration-300">
                <WhatsappSolid class="w-6 h-6 text-secondary-700 dark:text-white" />
            </a>
            <a href="https://www.linkedin.com/in/nahusenay-tadesse-ba0375233?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BXDbv38FTQOGT31o4PqhzkQ%3D%3D" 
            class="mx-2 hover:scale-125 transition-transform duration-300">
                <LinkedinSolid class="w-6 h-6 text-secondary-700 dark:text-white" />
            </a>
            <a href="https://t.me/NahusenayTadesse" 
            class="mx-2 hover:scale-125 transition-transform duration-300"
            target="_blank" aria-label="Telegram">

      <svg role="img" class="w-6 h-6 text-secondary-700 dark:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Telegram</title>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 
      0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" 
      fill="currentColor"/>
    </svg> </a>
        </div>

        <p class="text-sm font-head">© {currentYear} Nahusenay . All rights reserved.</p>
        <p class="text-sm font-head">Built with 
            <a href="https://svelte.dev/" class="text-blue-700 dark:text-blue-400" target="_blank">Sveltekit</a> and 
            <a href="https://firebase.google.com/" class="text-blue-700 dark:text-blue-400" target="_blank">Firebase</a></p>
            <p class="text-sm from-head">
            Source
            <a href="https://github.com/NahusenayTadesse/portfolio-v3" class="text-blue-700 dark:text-blue-400" target="_blank">Code</a>
            for this site.
        </p>
    </div>
</footer>   