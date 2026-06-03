<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let {
		children,
		background    = 'linear-gradient(to bottom, #0a0a14 0%, #12121e 60%, #1a1a10 100%)',
		boltColor     = '#d0e8ff',
		minInterval   = 2000,
		maxInterval   = 6000,
	}: {
		children?:     Snippet;
		background?:   string;
		boltColor?:    string;
		minInterval?:  number;
		maxInterval?:  number;
	} = $props();

	type Point = { x: number; y: number };

	let wrapEl:    HTMLDivElement;
	let canvas:    HTMLCanvasElement;
	let ctx:       CanvasRenderingContext2D;
	let animFrame: number;
	let W = 0, H = 0;
	let ro:        ResizeObserver;

	let bolt:      Point[] = [];
	let flashAlpha = 0;
	let nextFlash  = 0;
	let elapsed    = 0;
	let lastTs     = 0;

	function generateBolt(startX: number): Point[] {
		const pts: Point[] = [{ x: startX, y: 0 }];
		let cx = startX;
		let cy = 0;
		while (cy < H * 0.85) {
			cy += 15 + Math.random() * 35;
			cx += (Math.random() - 0.5) * 70;
			pts.push({ x: cx, y: cy });
			// Branch occasionally
			if (Math.random() > 0.75 && pts.length > 3) {
				const bx = cx + (Math.random() - 0.5) * 60;
				const by = cy + 30 + Math.random() * 60;
				pts.push({ x: bx, y: by });
				pts.push({ x: cx, y: cy }); // return to main bolt
			}
		}
		return pts;
	}

	function drawBolt() {
		if (!bolt.length) return;

		// Outer glow
		ctx.shadowBlur    = 20;
		ctx.shadowColor   = boltColor;
		ctx.strokeStyle   = boltColor;
		ctx.lineWidth     = 1.5;
		ctx.globalAlpha   = flashAlpha;
		ctx.beginPath();
		ctx.moveTo(bolt[0].x, bolt[0].y);
		for (const p of bolt) ctx.lineTo(p.x, p.y);
		ctx.stroke();

		// Core (bright white)
		ctx.lineWidth  = 0.6;
		ctx.strokeStyle = '#ffffff';
		ctx.beginPath();
		ctx.moveTo(bolt[0].x, bolt[0].y);
		for (const p of bolt) ctx.lineTo(p.x, p.y);
		ctx.stroke();

		ctx.shadowBlur  = 0;
		ctx.globalAlpha = 1;
	}

	function draw(ts: number) {
		const dt = lastTs ? ts - lastTs : 16;
		lastTs    = ts;
		elapsed  += dt;

		ctx.clearRect(0, 0, W, H);

		// Flash overlay
		if (flashAlpha > 0) {
			ctx.globalAlpha = flashAlpha * 0.2;
			ctx.fillStyle   = '#8899bb';
			ctx.fillRect(0, 0, W, H);
			ctx.globalAlpha = 1;
			drawBolt();
			flashAlpha = Math.max(0, flashAlpha - 0.08);
		}

		// Schedule next lightning
		if (elapsed >= nextFlash) {
			bolt       = generateBolt(W * (0.2 + Math.random() * 0.6));
			flashAlpha = 0.7 + Math.random() * 0.3;
			elapsed    = 0;
			nextFlash  = minInterval + Math.random() * (maxInterval - minInterval);
		}

		animFrame = requestAnimationFrame(draw);
	}

	function init() {
		W = canvas.width  = wrapEl.offsetWidth;
		H = canvas.height = wrapEl.offsetHeight;
	}

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		nextFlash = 800 + Math.random() * 1500;
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

<div class="tb" bind:this={wrapEl} style="background:{background}">
	<canvas bind:this={canvas} class="tb-canvas" aria-hidden="true"></canvas>
	{#if children}<div class="tb-content">{@render children()}</div>{/if}
</div>

<style>
	.tb         { position: relative; overflow: hidden; }
	.tb-canvas  { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
	.tb-content { position: relative; z-index: 1; }
</style>
