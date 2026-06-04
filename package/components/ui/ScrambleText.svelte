<script lang="ts">
	import { onMount } from 'svelte';

	let {
		text,
		speed    = 40,
		chars    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&',
		autoplay = true,
		stagger  = 60,
	}: {
		text:      string;
		speed?:    number;
		chars?:    string;
		autoplay?: boolean;
		stagger?:  number;
	} = $props();

	let displayed = $state(text);
	let running   = $state(false);

	export function scramble() {
		if (running) return;
		running = true;
		const target = text;
		const STEPS  = 8;
		let start: number | null = null;

		function frame(ts: number) {
			if (!start) start = ts;
			const elapsed = ts - start;

			displayed = [...target].map((ch, i) => {
				if (ch === ' ') return ' ';
				const revealAt = i * stagger + STEPS * speed;
				if (elapsed >= revealAt) return ch;
				return chars[Math.floor(Math.random() * chars.length)];
			}).join('');

			if (elapsed < target.length * stagger + STEPS * speed) {
				requestAnimationFrame(frame);
			} else {
				displayed = target;
				running   = false;
			}
		}

		requestAnimationFrame(frame);
	}

	onMount(() => { if (autoplay) scramble(); });
</script>

<span class="scr" class:scr--running={running} onclick={scramble} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && scramble()}>
	{displayed}
</span>

<style>
	.scr {
		display: inline-block;
		font-variant-numeric: tabular-nums;
		cursor: pointer;
	}

	.scr--running {
		color: var(--primary);
	}
</style>
