<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let {
		children,
		background    = '#0a0000',
		flameCount    = 120,
		intensity     = 1,
	}: {
		children?:   Snippet;
		background?: string;
		flameCount?: number;
		/** 0.5 = petite flamme, 1 = normale, 2 = brasier */
		intensity?:  number;
	} = $props();

	type Flame = { x: number; y: number; vx: number; vy: number; size: number; life: number };

	let wrapEl:    HTMLDivElement;
	let canvas:    HTMLCanvasElement;
	let ctx:       CanvasRenderingContext2D;
	let flames:    Flame[] = [];
	let animFrame: number;
	let W = 0, H = 0;
	let ro:        ResizeObserver;
	let t = 0;

	function mkFlame(scatter = false): Flame {
		return {
			x:    Math.random() * W,
			y:    scatter ? H - Math.random() * H * 0.4 : H + 10,
			vx:   (Math.random() - 0.5) * 1.2,
			vy:   -(0.8 + Math.random() * 2.2) * intensity,
			size: (4 + Math.random() * 16) * intensity,
			life: scatter ? Math.random() : 0,
		};
	}

	function init() {
		W = canvas.width  = wrapEl.offsetWidth;
		H = canvas.height = wrapEl.offsetHeight;
		flames = Array.from({ length: flameCount }, (_, i) => mkFlame(i < flameCount * 0.8));
	}

	function draw() {
		t += 0.04;

		// Fade frame (creates trail effect)
		ctx.globalAlpha = 0.18;
		ctx.fillStyle   = background;
		ctx.fillRect(0, 0, W, H);
		ctx.globalAlpha = 1;

		for (const f of flames) {
			// Turbulence: slight horizontal sway
			f.x += f.vx + Math.sin(f.y * 0.04 + t + f.x * 0.01) * 0.6;
			f.y += f.vy;
			f.vx *= 0.98;
			f.life += 0.012 + Math.random() * 0.006;
			f.size  = Math.max(0, f.size - 0.08 * intensity);

			if (f.life >= 1 || f.size <= 0) {
				const nf = mkFlame(false);
				f.x = nf.x; f.y = nf.y; f.vx = nf.vx; f.vy = nf.vy;
				f.size = nf.size; f.life = 0;
				continue;
			}

			// Color: yellow → orange → red as life increases
			const hue   = 50 - f.life * 50;
			const lum   = 80 - f.life * 35;
			const alpha = f.life < 0.75 ? 0.65 : 0.65 * (1 - (f.life - 0.75) / 0.25);

			ctx.globalAlpha = alpha;
			ctx.fillStyle   = `hsl(${hue}, 100%, ${lum}%)`;
			ctx.beginPath();
			ctx.arc(f.x, f.y, f.size * (1 - f.life * 0.4), 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.globalAlpha = 1;
		animFrame = requestAnimationFrame(draw);
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		init();
		animFrame = requestAnimationFrame(draw);
		ro = new ResizeObserver(init);
		ro.observe(wrapEl);
	});

	onDestroy(() => {
		if (!browser) return;
		cancelAnimationFrame(animFrame);
		ro?.disconnect();
	});
</script>

<div class="fb" bind:this={wrapEl} style="background:{background}">
	<canvas bind:this={canvas} class="fb-canvas" aria-hidden="true"></canvas>
	{#if children}<div class="fb-content">{@render children()}</div>{/if}
</div>

<style>
	.fb         { position: relative; overflow: hidden; }
	.fb-canvas  { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
	.fb-content { position: relative; z-index: 1; }
</style>
