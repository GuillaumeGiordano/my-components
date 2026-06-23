<script lang="ts">
	let {
		words,
		interval = 2800,
		duration = 400,
		index,
	}: {
		words:     string[];
		interval?: number;
		duration?: number;
		/** Controlled mode: when provided, shows words[index] and morphs on change instead of auto-cycling. */
		index?:    number;
	} = $props();

	const browser = typeof window !== 'undefined';

	let internal = $state(0);
	let shown    = $state(0);
	let blurring = $state(false);

	const display = $derived(index !== undefined ? shown : internal);

	// Uncontrolled: auto-cycle through the words
	$effect(() => {
		if (!browser || index !== undefined) return;
		const timer = setInterval(() => {
			blurring = true;
			setTimeout(() => {
				internal = (internal + 1) % words.length;
				blurring = false;
			}, duration / 2);
		}, interval);
		return () => clearInterval(timer);
	});

	// Controlled: blur out, swap to the new index, blur in
	$effect(() => {
		if (index === undefined) return;
		const target = index;
		blurring = true;
		const t = setTimeout(() => {
			shown    = target;
			blurring = false;
		}, duration / 2);
		return () => clearTimeout(t);
	});
</script>

<span
	class="mt"
	class:mt--blur={blurring}
	style="--mt-dur:{duration / 2}ms"
>
	{words[display]}
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
