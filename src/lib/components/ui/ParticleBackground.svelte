<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount, onDestroy } from 'svelte';

	let {
		children,
		particleCount      = 60,
		color              = 'var(--primary)',
		speed              = 0.6,
		connectionDistance = 120,
	}: {
		children?:           Snippet;
		particleCount?:      number;
		/** Couleur des particules — accepte hex, rgb ou var(--css-var) */
		color?:              string;
		speed?:              number;
		connectionDistance?: number;
	} = $props();

	type Particle = { x: number; y: number; vx: number; vy: number };

	let wrapEl:    HTMLDivElement;
	let canvas:    HTMLCanvasElement;
	let ctx:       CanvasRenderingContext2D;
	let particles: Particle[] = [];
	let animFrame: number;
	let W = 0, H = 0;
	let resolvedColor = '#6366f1';

	function init() {
		W = canvas.width  = wrapEl.offsetWidth;
		H = canvas.height = wrapEl.offsetHeight;
		particles = Array.from({ length: particleCount }, () => ({
			x:  Math.random() * W,
			y:  Math.random() * H,
			vx: (Math.random() - 0.5) * speed * 2,
			vy: (Math.random() - 0.5) * speed * 2,
		}));
	}

	function draw() {
		ctx.clearRect(0, 0, W, H);
		ctx.fillStyle   = resolvedColor;
		ctx.strokeStyle = resolvedColor;

		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];
			p.x += p.vx; p.y += p.vy;
			if (p.x < 0 || p.x > W) p.vx *= -1;
			if (p.y < 0 || p.y > H) p.vy *= -1;

			ctx.globalAlpha = 0.8;
			ctx.beginPath();
			ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
			ctx.fill();

			for (let j = i + 1; j < particles.length; j++) {
				const q    = particles[j];
				const dist = Math.hypot(p.x - q.x, p.y - q.y);
				if (dist < connectionDistance) {
					ctx.globalAlpha = (1 - dist / connectionDistance) * 0.35;
					ctx.lineWidth   = 1;
					ctx.beginPath();
					ctx.moveTo(p.x, p.y);
					ctx.lineTo(q.x, q.y);
					ctx.stroke();
				}
			}
		}
		ctx.globalAlpha = 1;
		animFrame = requestAnimationFrame(draw);
	}

	let ro: ResizeObserver;

	onMount(() => {
		ctx = canvas.getContext('2d')!;

		if (color.startsWith('var(')) {
			const name = color.match(/var\((--[^,)]+)/)?.[1] ?? '';
			resolvedColor = getComputedStyle(wrapEl).getPropertyValue(name).trim() || '#6366f1';
		} else {
			resolvedColor = color;
		}

		init();
		animFrame = requestAnimationFrame(draw);

		ro = new ResizeObserver(init);
		ro.observe(wrapEl);
	});

	onDestroy(() => {
		cancelAnimationFrame(animFrame);
		ro?.disconnect();
	});
</script>

<div class="pb" bind:this={wrapEl}>
	<canvas bind:this={canvas} class="pb-canvas" aria-hidden="true"></canvas>
	{#if children}
		<div class="pb-content">{@render children()}</div>
	{/if}
</div>

<style>
	.pb {
		position: relative;
		overflow: hidden;
	}

	.pb-canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.pb-content {
		position: relative;
		z-index: 1;
	}
</style>
