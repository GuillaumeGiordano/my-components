<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		maxTilt  = 15,
		scale    = 1.06,
		glare    = true,
		perspective = 1000,
	}: {
		children?:    Snippet;
		maxTilt?:     number;
		scale?:       number;
		glare?:       boolean;
		perspective?: number;
	} = $props();

	let cardEl: HTMLDivElement;
	let rx     = $state(0);
	let ry     = $state(0);
	let gx     = $state(50);
	let gy     = $state(50);
	let hover  = $state(false);

	function onmousemove(e: MouseEvent) {
		const rect = cardEl.getBoundingClientRect();
		const x    = (e.clientX - rect.left) / rect.width;
		const y    = (e.clientY - rect.top)  / rect.height;
		rx = (y - 0.5) * -maxTilt * 2;
		ry = (x - 0.5) *  maxTilt * 2;
		gx = x * 100;
		gy = y * 100;
	}

	function onmouseenter() { hover = true; }
	function onmouseleave() { rx = 0; ry = 0; gx = 50; gy = 50; hover = false; }
</script>

<div class="t3d-wrap" style="perspective:{perspective}px">
	<div
		class="t3d"
		bind:this={cardEl}
		{onmousemove}
		{onmouseenter}
		{onmouseleave}
		style="
			transform: rotateX({rx}deg) rotateY({ry}deg) scale({hover ? scale : 1});
			--gx:{gx}%;
			--gy:{gy}%;
		"
	>
		{#if children}{@render children()}{/if}
		{#if glare && hover}
			<div class="t3d-glare" aria-hidden="true"></div>
		{/if}
	</div>
</div>

<style>
	.t3d-wrap {
		display: inline-block;
	}

	.t3d {
		position: relative;
		transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
		transform-style: preserve-3d;
		will-change: transform;
	}

	.t3d-glare {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			circle at var(--gx) var(--gy),
			rgba(255,255,255,0.15) 0%,
			transparent 60%
		);
		pointer-events: none;
		z-index: 2;
		transition: opacity 200ms ease;
	}
</style>
