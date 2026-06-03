<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let {
		children,
		animation = 'fade-up' as 'fade-up' | 'fade' | 'zoom' | 'slide-right' | 'flip',
		stagger   = 80,
		threshold = 0.12,
		once      = true,
		delay     = 0,
	}: {
		children?:   Snippet;
		animation?:  'fade-up' | 'fade' | 'zoom' | 'slide-right' | 'flip';
		/** ms entre chaque enfant direct */
		stagger?:    number;
		threshold?:  number;
		/** Ne déclenche qu'une fois si true */
		once?:       boolean;
		/** Délai global supplémentaire (ms) */
		delay?:      number;
	} = $props();

	let containerEl: HTMLDivElement;
	let revealed    = $state(false);
	let observer:   IntersectionObserver;

	onMount(() => {
		if (!browser) return;

		// Appliquer --i sur chaque enfant direct pour le stagger
		const kids = Array.from(containerEl.children) as HTMLElement[];
		kids.forEach((child, i) => child.style.setProperty('--i', String(i)));

		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					revealed = true;
					if (once) observer.disconnect();
				} else if (!once) {
					revealed = false;
				}
			},
			{ threshold }
		);
		observer.observe(containerEl);
	});

	onDestroy(() => observer?.disconnect());
</script>

<div
	class="sr sr--{animation}"
	class:sr--revealed={revealed}
	bind:this={containerEl}
	style="--sr-stagger:{stagger}ms;--sr-delay:{delay}ms"
>
	{#if children}{@render children()}{/if}
</div>

<style>
	/* ── Base : chaque enfant direct commence masqué ── */
	.sr :global(> *) {
		transition-property: opacity, transform;
		transition-duration: 0.65s;
		transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
		transition-delay: calc(var(--i, 0) * var(--sr-stagger, 80ms) + var(--sr-delay, 0ms));
	}

	/* ── fade-up ── */
	.sr--fade-up :global(> *)          { opacity: 0; transform: translateY(28px); }
	.sr--fade-up.sr--revealed :global(> *) { opacity: 1; transform: translateY(0); }

	/* ── fade ── */
	.sr--fade :global(> *)             { opacity: 0; }
	.sr--fade.sr--revealed :global(> *)    { opacity: 1; }

	/* ── zoom ── */
	.sr--zoom :global(> *)             { opacity: 0; transform: scale(0.82); }
	.sr--zoom.sr--revealed :global(> *)    { opacity: 1; transform: scale(1); }

	/* ── slide-right ── */
	.sr--slide-right :global(> *)      { opacity: 0; transform: translateX(-32px); }
	.sr--slide-right.sr--revealed :global(> *) { opacity: 1; transform: translateX(0); }

	/* ── flip ── */
	.sr--flip { perspective: 900px; }
	.sr--flip :global(> *)             { opacity: 0; transform: rotateX(-50deg); transform-origin: top center; }
	.sr--flip.sr--revealed :global(> *)    { opacity: 1; transform: rotateX(0); }
</style>
