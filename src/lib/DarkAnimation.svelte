<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let width = 0;
	let height = 0;
	let particles: { x: number; y: number; vx: number; vy: number }[] = [];

	let PARTICLE_COUNT = 100;
	const MAX_DISTANCE = 100;

	// Choose count based on screen size
	function getResponsiveParticleCount(width: number) {
		if (width <= 480) return 40;
		if (width <= 768) return 70;
		return 200;
	}

	// Initialize particles
	function initParticles() {
		particles = Array.from({ length: PARTICLE_COUNT }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			vx: (Math.random() - 0.5) * 1.5,
			vy: (Math.random() - 0.5) * 1.5
		}));
	}

	function animate() {
		ctx.clearRect(0, 0, width, height);

		for (let p of particles) {
			p.x += p.vx;
			p.y += p.vy;
			if (p.x < 0 || p.x > width) p.vx *= -1;
			if (p.y < 0 || p.y > height) p.vy *= -1;

			ctx.beginPath();
			ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
			ctx.fillStyle = '#ffffff';
			ctx.fill();
		}

		for (let i = 0; i < particles.length; i++) {
			for (let j = i + 1; j < particles.length; j++) {
				const a = particles[i];
				const b = particles[j];
				const dx = a.x - b.x;
				const dy = a.y - b.y;
				const dist = Math.sqrt(dx * dx + dy * dy);

				if (dist < MAX_DISTANCE) {
					ctx.beginPath();
					ctx.moveTo(a.x, a.y);
					ctx.lineTo(b.x, b.y);
					ctx.strokeStyle = `rgba(255,255,255,${1 - dist / MAX_DISTANCE})`;
					ctx.stroke();
				}
			}
		}

		requestAnimationFrame(animate);
	}

	onMount(() => {
		width = window.innerWidth;
		height = window.innerHeight;

		PARTICLE_COUNT = getResponsiveParticleCount(width);

		canvas.width = width;
		canvas.height = height;

		ctx = canvas.getContext('2d')!;
		initParticles();
		animate();

		const handleResize = () => {
			width = window.innerWidth;
			height = window.innerHeight;

			PARTICLE_COUNT = getResponsiveParticleCount(width);
			canvas.width = width;
			canvas.height = height;
			initParticles();
		};

		window.addEventListener('resize', handleResize);
		onDestroy(() => {
			window.removeEventListener('resize', handleResize);
		});
	});
</script>

<canvas bind:this={canvas} class="w-full h-full fixed top-0 left-0 z-[-1] hidden dark:block"></canvas>

<style>

</style>
