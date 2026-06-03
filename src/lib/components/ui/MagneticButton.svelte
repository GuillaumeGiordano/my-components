<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount, onDestroy } from 'svelte';

	let {
		children,
		strength = 0.45,
		radius   = 100,
		class:    cls = '',
	}: {
		children:  Snippet;
		strength?: number;
		radius?:   number;
		class?:    string;
	} = $props();

	let btnEl: HTMLButtonElement;
	let tx = $state(0);
	let ty = $state(0);
	let active = $state(false);

	function onMouseMove(e: MouseEvent) {
		if (!btnEl) return;
		const rect = btnEl.getBoundingClientRect();
		const cx   = rect.left + rect.width  / 2;
		const cy   = rect.top  + rect.height / 2;
		const dx   = e.clientX - cx;
		const dy   = e.clientY - cy;
		const dist = Math.sqrt(dx * dx + dy * dy);

		if (dist < radius) {
			const pull = 1 - dist / radius;
			tx     = dx * strength * pull;
			ty     = dy * strength * pull;
			active = true;
		} else if (active) {
			tx = 0; ty = 0; active = false;
		}
	}

	function onMouseLeave() { tx = 0; ty = 0; active = false; }

	onMount(()  => window.addEventListener('mousemove', onMouseMove));
	onDestroy(() => window.removeEventListener('mousemove', onMouseMove));
</script>

<button
	class="mb {cls}"
	class:mb--active={active}
	bind:this={btnEl}
	onmouseleave={onMouseLeave}
	style="transform:translate({tx}px,{ty}px)"
>
	{@render children()}
</button>

<style>
	.mb {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 10px 24px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		background: var(--bg-base);
		color: var(--text-base);
		font-size: 14px;
		font-weight: 600;
		font-family: var(--font-sans);
		cursor: pointer;
		transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
		will-change: transform;
	}

	.mb--active {
		transition: transform 80ms linear;
		background: var(--bg-hover);
		border-color: var(--primary);
		color: var(--primary);
	}
</style>
