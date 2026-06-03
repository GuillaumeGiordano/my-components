<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let {
		to,
		from      = 0,
		duration  = 2000,
		decimals  = 0,
		prefix    = '',
		suffix    = '',
		separator = ',',
	}: {
		to:          number;
		from?:       number;
		duration?:   number;
		decimals?:   number;
		prefix?:     string;
		suffix?:     string;
		separator?:  string;
	} = $props();

	let value    = $state(from);
	let started  = $state(false);
	let el:       HTMLSpanElement;
	let observer: IntersectionObserver;

	function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

	function animate() {
		const start = performance.now();
		function frame(now: number) {
			const p = Math.min((now - start) / duration, 1);
			value   = from + (to - from) * easeOut(p);
			if (p < 1) requestAnimationFrame(frame);
			else value = to;
		}
		requestAnimationFrame(frame);
	}

	function format(n: number): string {
		const str   = n.toFixed(decimals);
		if (!separator) return prefix + str + suffix;
		const parts = str.split('.');
		parts[0]    = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
		return prefix + parts.join('.') + suffix;
	}

	onMount(() => {
		observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !started) {
				started = true;
				animate();
				observer.disconnect();
			}
		}, { threshold: 0.4 });
		observer.observe(el);
	});

	onDestroy(() => observer?.disconnect());
</script>

<span bind:this={el} class="cu">{format(value)}</span>

<style>
	.cu { font-variant-numeric: tabular-nums; }
</style>
