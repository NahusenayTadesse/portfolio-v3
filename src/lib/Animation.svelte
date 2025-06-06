<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let particles: Array = [];
  const numParticles = 80;

  // Mouse
  const mouse = { x: 0, y: 0 };

  // Resize support
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  onMount(() => {
    resize();
    ctx = canvas.getContext('2d')!;
    initParticles();
    animate();
    window.addEventListener('resize', resize);
  });

  function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  function handleMouseMove(event: MouseEvent) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }
</script>

<style>
  

  @keyframes wave {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
    pointer-events: none;

  }


  @keyframes morph {
    0% {
      border-radius: 50% 40% 60% 50% / 50% 60% 40% 50%;
    }
    50% {
      border-radius: 40% 60% 40% 60% / 60% 40% 60% 40%;
    }
    100% {
      border-radius: 50% 40% 60% 50% / 50% 60% 40% 50%;
    }
  }
</style>

 <div class="hidden dark:block">
<canvas bind:this={canvas} onmousemove={handleMouseMove}  > </canvas>
</div>
