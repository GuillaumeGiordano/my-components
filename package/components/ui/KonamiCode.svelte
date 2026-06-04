<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onMount, onDestroy } from 'svelte';

	const DEFAULT_SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

	let {
		sequence   = DEFAULT_SEQ,
		onactivate,
		children,
		duration   = 3000,
	}: {
		sequence?:   string[];
		onactivate?: () => void;
		children?:   Snippet;
		duration?:   number;
	} = $props();

	let progress  = $state(0);
	let activated = $state(false);
	let hideTimer: ReturnType<typeof setTimeout> | undefined;

	function onkeydown(e: KeyboardEvent) {
		if (e.key === sequence[progress]) {
			progress++;
			if (progress === sequence.length) {
				progress = 0;
				activated = true;
				onactivate?.();
				clearTimeout(hideTimer);
				hideTimer = setTimeout(() => (activated = false), duration);
			}
		} else {
			progress = e.key === sequence[0] ? 1 : 0;
		}
	}

	onMount(()  => window.addEventListener('keydown', onkeydown));
	onDestroy(() => {
		window.removeEventListener('keydown', onkeydown);
		clearTimeout(hideTimer);
	});
</script>

{#if activated && children}
	<div class="kk-reveal">
		{@render children()}
	</div>
{/if}

<style>
	.kk-reveal {
		animation: kk-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}

	@keyframes kk-pop {
		from { opacity: 0; transform: scale(0.5) rotate(-5deg); }
		to   { opacity: 1; transform: scale(1) rotate(0deg);   }
	}
</style>
