<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let {
		words,
		interval = 2800,
		duration = 400,
	}: {
		words:     string[];
		interval?: number;
		duration?: number;
	} = $props();

	let index    = $state(0);
	let blurring = $state(false);
	let timer: ReturnType<typeof setInterval> | undefined;

	onMount(() => {
		timer = setInterval(() => {
			blurring = true;
			setTimeout(() => {
				index    = (index + 1) % words.length;
				blurring = false;
			}, duration / 2);
		}, interval);
	});

	onDestroy(() => clearInterval(timer));
</script>

<span
	class="mt"
	class:mt--blur={blurring}
	style="--mt-dur:{duration / 2}ms"
>
	{words[index]}
</span>

<style>
	.mt {
		display: inline-block;
		filter: blur(0px);
		opacity: 1;
		transition:
			filter var(--mt-dur) ease,
			opacity var(--mt-dur) ease;
	}

	.mt--blur {
		filter: blur(8px);
		opacity: 0;
	}
</style>
