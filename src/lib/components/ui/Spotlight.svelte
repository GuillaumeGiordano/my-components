<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		size  = 500,
		color = 'rgba(255,255,255,0.07)',
	}: {
		children: Snippet;
		size?:    number;
		color?:   string;
	} = $props();

	let el: HTMLElement;

	function onmousemove(e: MouseEvent) {
		const r = el.getBoundingClientRect();
		el.style.setProperty('--sx', `${e.clientX - r.left}px`);
		el.style.setProperty('--sy', `${e.clientY - r.top}px`);
		el.style.setProperty('--so', '1');
	}

	function onmouseleave() {
		el.style.setProperty('--so', '0');
	}
</script>

<section
	class="sp"
	bind:this={el}
	{onmousemove}
	{onmouseleave}
	style="--ss:{size}px;--sc:{color}"
>
	{@render children()}
</section>

<style>
	.sp {
		position: relative;
		background: #0f172a;
		color: #f8fafc;
		overflow: hidden;
		--sx: 50%; --sy: 50%; --so: 0;
	}

	.sp::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(
			circle var(--ss) at var(--sx) var(--sy),
			var(--sc),
			transparent 70%
		);
		opacity: var(--so);
		transition: opacity 400ms ease;
	}
</style>
