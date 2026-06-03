<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		glowColor = 'var(--primary)',
		glowSize  = 350,
		padding   = '24px',
	}: {
		children:   Snippet;
		glowColor?: string;
		glowSize?:  number;
		padding?:   string;
	} = $props();

	let cardEl: HTMLDivElement;

	function onmousemove(e: MouseEvent) {
		const r = cardEl.getBoundingClientRect();
		cardEl.style.setProperty('--gx', `${e.clientX - r.left}px`);
		cardEl.style.setProperty('--gy', `${e.clientY - r.top}px`);
		cardEl.style.setProperty('--go', '1');
	}

	function onmouseleave() {
		cardEl.style.setProperty('--go', '0');
	}
</script>

<div
	class="gc"
	bind:this={cardEl}
	{onmousemove}
	{onmouseleave}
	style="--gc:{glowColor};--gs:{glowSize}px;--gp:{padding}"
>
	<div class="gc-inner">{@render children()}</div>
</div>

<style>
	.gc {
		position: relative;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--bg-base);
		overflow: hidden;
		--gx: 50%; --gy: 50%; --go: 0;
	}

	.gc::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(
			circle var(--gs) at var(--gx) var(--gy),
			color-mix(in srgb, var(--gc) 20%, transparent),
			transparent 70%
		);
		opacity: var(--go);
		transition: opacity 300ms ease;
	}

	.gc-inner {
		position: relative;
		z-index: 1;
		padding: var(--gp);
	}
</style>
