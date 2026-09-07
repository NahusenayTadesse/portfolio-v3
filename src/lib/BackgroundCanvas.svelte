<script lang="ts">
	import { onMount } from 'svelte';

	type Particle = { x: number; y: number; vx: number; vy: number; r: number };

	let canvas: HTMLCanvasElement;

	// Tuned per theme so the same effect reads as "constellation" on dark and as
	// a faint blueprint mesh on white, rather than dirty smudges.
	const PALETTE = {
		dark: { dot: '255,255,255', line: '255,255,255', dotAlpha: 0.75, lineAlpha: 0.45 },
		light: { dot: '38,110,110', line: '38,110,110', dotAlpha: 0.5, lineAlpha: 0.3 }
	};

	const LINK_DISTANCE = 130;
	const POINTER_RADIUS = 190;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let particles: Particle[] = [];
		let width = 0;
		let height = 0;
		let frame = 0;
		let running = true;
		const pointer = { x: -9999, y: -9999 };

		const isDark = () => document.documentElement.classList.contains('dark');

		// Density rather than a fixed count, so a phone is not asked to animate
		// the same load as a desktop. Capped so huge monitors stay cheap.
		function particleCount() {
			return Math.min(120, Math.round((width * height) / 16000));
		}

		function resize() {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

			const target = particleCount();
			particles = Array.from({ length: target }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.35,
				vy: (Math.random() - 0.5) * 0.35,
				r: Math.random() * 1.4 + 0.9
			}));
		}

		/**
		 * Neighbour lookup through a uniform grid. The naive version compares every
		 * pair, which is ~7k comparisons per frame at 120 particles; bucketing by
		 * link distance keeps it proportional to the number of actual neighbours.
		 */
		function drawLinks(colors: (typeof PALETTE)['dark']) {
			const cell = LINK_DISTANCE;
			const cols = Math.max(1, Math.ceil(width / cell));
			const rows = Math.max(1, Math.ceil(height / cell));
			const buckets: number[][] = Array.from({ length: cols * rows }, () => []);

			particles.forEach((p, i) => {
				const cx = Math.min(cols - 1, Math.max(0, Math.floor(p.x / cell)));
				const cy = Math.min(rows - 1, Math.max(0, Math.floor(p.y / cell)));
				buckets[cy * cols + cx].push(i);
			});

			for (let cy = 0; cy < rows; cy++) {
				for (let cx = 0; cx < cols; cx++) {
					const here = buckets[cy * cols + cx];
					if (!here.length) continue;

					// Only forward neighbours, so each pair is visited once.
					for (let dy = 0; dy <= 1; dy++) {
						for (let dx = -1; dx <= 1; dx++) {
							if (dy === 0 && dx < 0) continue;
							const nx = cx + dx;
							const ny = cy + dy;
							if (nx < 0 || nx >= cols || ny >= rows) continue;
							const there = buckets[ny * cols + nx];
							if (!there.length) continue;

							for (const i of here) {
								for (const j of there) {
									if (j <= i && dx === 0 && dy === 0) continue;
									if (i === j) continue;
									const a = particles[i];
									const b = particles[j];
									const ddx = a.x - b.x;
									const ddy = a.y - b.y;
									const distSq = ddx * ddx + ddy * ddy;
									if (distSq > LINK_DISTANCE * LINK_DISTANCE) continue;

									const alpha = (1 - Math.sqrt(distSq) / LINK_DISTANCE) * colors.lineAlpha;
									ctx!.strokeStyle = `rgba(${colors.line},${alpha.toFixed(3)})`;
									ctx!.beginPath();
									ctx!.moveTo(a.x, a.y);
									ctx!.lineTo(b.x, b.y);
									ctx!.stroke();
								}
							}
						}
					}
				}
			}
		}

		function render() {
			const colors = isDark() ? PALETTE.dark : PALETTE.light;
			ctx!.clearRect(0, 0, width, height);
			ctx!.lineWidth = 1;

			drawLinks(colors);

			ctx!.fillStyle = `rgba(${colors.dot},${colors.dotAlpha})`;
			for (const p of particles) {
				ctx!.beginPath();
				ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
				ctx!.fill();
			}
		}

		function step() {
			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;

				// Wrap instead of bounce: bouncing makes particles pile up on edges.
				if (p.x < -10) p.x = width + 10;
				if (p.x > width + 10) p.x = -10;
				if (p.y < -10) p.y = height + 10;
				if (p.y > height + 10) p.y = -10;

				// Gentle drift away from the cursor, so the field feels alive on hover.
				const dx = p.x - pointer.x;
				const dy = p.y - pointer.y;
				const d = Math.hypot(dx, dy);
				if (d < POINTER_RADIUS && d > 0.01) {
					const push = (1 - d / POINTER_RADIUS) * 0.6;
					p.x += (dx / d) * push;
					p.y += (dy / d) * push;
				}
			}
			render();
		}

		function loop() {
			if (!running) return;
			step();
			frame = requestAnimationFrame(loop);
		}

		function start() {
			cancelAnimationFrame(frame);
			if (reduceMotion.matches) {
				render(); // one static frame - the texture without the motion
				return;
			}
			running = true;
			frame = requestAnimationFrame(loop);
		}

		function stop() {
			running = false;
			cancelAnimationFrame(frame);
		}

		const onResize = () => {
			resize();
			if (reduceMotion.matches) render();
		};
		const onPointer = (e: PointerEvent) => {
			pointer.x = e.clientX;
			pointer.y = e.clientY;
		};
		const onPointerLeave = () => {
			pointer.x = -9999;
			pointer.y = -9999;
		};
		// A background animation has no business burning battery on a hidden tab.
		const onVisibility = () => (document.hidden ? stop() : start());
		const onMotionChange = () => start();
		// Repaint immediately on theme toggle instead of waiting for the next frame.
		const themeObserver = new MutationObserver(() => {
			if (reduceMotion.matches) render();
		});

		resize();
		start();

		window.addEventListener('resize', onResize);
		window.addEventListener('pointermove', onPointer, { passive: true });
		document.addEventListener('pointerleave', onPointerLeave);
		document.addEventListener('visibilitychange', onVisibility);
		reduceMotion.addEventListener('change', onMotionChange);
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

		return () => {
			stop();
			window.removeEventListener('resize', onResize);
			window.removeEventListener('pointermove', onPointer);
			document.removeEventListener('pointerleave', onPointerLeave);
			document.removeEventListener('visibilitychange', onVisibility);
			reduceMotion.removeEventListener('change', onMotionChange);
			themeObserver.disconnect();
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10"
></canvas>
