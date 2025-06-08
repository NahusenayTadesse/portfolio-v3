<script>
  import { onMount } from 'svelte';

  let smokes = [];

  function createSmoke() {
    const id = Date.now();
    smokes = [...smokes, { id, left: Math.random() * 100 }];
    setTimeout(() => {
      smokes = smokes.filter(smoke => smoke.id !== id);
    }, 4000); // remove after animation
  }

  onMount(() => {
    const interval = setInterval(createSmoke, 300);
    return () => clearInterval(interval);
  });
</script>

<style>
  .smoke-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    pointer-events: none;
  }

  .smoke {
    position: absolute;
    bottom: 0;
    width: 30px;
    height: 30px;
    background: radial-gradient(circle, var(--color-blue-300), transparent);
    opacity: 0.7;
    border-radius: 50%;
    animation: rise 4s ease-out forwards;
  }

  @keyframes rise {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0.7;
    }
    50% {
      transform: translateY(-50vh) scale(1.5);
      opacity: 0.4;
    }
    100% {
      transform: translateY(-100vh) scale(2);
      opacity: 0;
    }
  }
</style>

<div class="smoke-container dark:hidden block">
  {#each smokes as smoke (smoke.id)}
    <div class="smoke" style="left: {smoke.left}vw;"></div>
  {/each}
</div>
