<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount } from 'svelte';

	let {
		children,
		cover       = '#9ca3af',
		brushSize   = 28,
		threshold   = 55,
		label       = '🎁 Grattez pour révéler',
		onReveal,
	}: {
		children?:   Snippet;
		cover?:      string;
		brushSize?:  number;
		/** % de surface grattée pour révéler automatiquement */
		threshold?:  number;
		label?:      string;
		onReveal?:   () => void;
	} = $props();

	let canvas:      HTMLCanvasElement;
	let ctx:         CanvasRenderingContext2D;
	let revealed     = $state(false);
	let percent      = $state(0);
	let scratching   = false;

	function init() {
		const W = canvas.offsetWidth;
		const H = canvas.offsetHeight;
		canvas.width  = W;
		canvas.height = H;

		ctx.fillStyle = cover;
		ctx.fillRect(0, 0, W, H);

		// Label
		ctx.fillStyle    = 'rgba(255,255,255,0.7)';
		ctx.font         = `${Math.min(W * 0.045, 16)}px var(--font-sans, sans-serif)`;
		ctx.textAlign    = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(label, W / 2, H / 2);
	}

	function scratch(x: number, y: number) {
		if (revealed) return;
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.arc(x, y, brushSize, 0, Math.PI * 2);
		ctx.fill();

		// Sample alpha to estimate reveal %
		const W    = canvas.width;
		const H    = canvas.height;
		const step = 8;
		const data = ctx.getImageData(0, 0, W, H).data;
		let   transparent = 0;
		let   total = 0;
		for (let i = 3; i < data.length; i += 4 * step) {
			if (data[i] < 128) transparent++;
			total++;
		}
		percent = Math.round((transparent / total) * 100);
		if (percent >= threshold) { revealed = true; ctx.clearRect(0, 0, W, H); onReveal?.(); }
	}

	function onPointerDown(e: PointerEvent) {
		scratching = true;
		canvas.setPointerCapture(e.pointerId);
		const r = canvas.getBoundingClientRect();
		scratch(e.clientX - r.left, e.clientY - r.top);
	}
	function onPointerMove(e: PointerEvent) {
		if (!scratching) return;
		const r = canvas.getBoundingClientRect();
		scratch(e.clientX - r.left, e.clientY - r.top);
	}
	function onPointerUp() { scratching = false; }

	onMount(() => { ctx = canvas.getContext('2d')!; init(); });
</script>

<div class="sc-wrap">
	<div class="sc-content">{#if children}{@render children()}{/if}</div>
	{#if !revealed}
		<canvas
			bind:this={canvas}
			class="sc-canvas"
			onpointerdown={onPointerDown}
			onpointermove={onPointerMove}
			onpointerup={onPointerUp}
			onpointercancel={onPointerUp}
		></canvas>
		<div class="sc-pct" aria-live="polite">{percent}%</div>
	{/if}
</div>

<style>
	.sc-wrap    { position: relative; user-select: none; }
	.sc-content { border-radius: inherit; }
	.sc-canvas  {
		position: absolute; inset: 0;
		width: 100%; height: 100%;
		border-radius: inherit;
		cursor: crosshair;
		touch-action: none;
	}
	.sc-pct {
		position: absolute; bottom: 8px; right: 12px;
		font-size: 11px; color: rgba(255,255,255,0.5);
		pointer-events: none;
	}
</style>
