<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let particles = [];
  const numParticles = 50;
  const fieldScale = 0.008;
  const speed = 1.2;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  onMount(() => {
    resizeCanvas();
    ctx = canvas.getContext('2d')!;
    initParticles();
    animate();
    window.addEventListener('resize', resizeCanvas);
  });

     

  function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        hue: Math.random() * 360
      });
    }
  }

  function animate() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      // Flow field angle
      const angle = Math.sin(p.y * fieldScale) + Math.cos(p.x * fieldScale);
      p.x += Math.cos(angle) * speed;
      p.y += Math.sin(angle) * speed;

      // Wrap around
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${p.hue}, 40%, 92.5%)`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

function restartAnimation() {
    // Clear the canvas before restarting
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initParticles();
}

setInterval(restartAnimation, 10000);
</script>

<style>
  canvas {
    position: fixed;
    inset: 0;
    z-index: -10;
  }
</style>

<canvas bind:this={canvas} class="dark:hidden bg-gradient-to-r from-background-2 to-background-1" > </canvas>

