<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let {
		text,
		frequency = 3,
		intensity = 1,
	}: {
		text:        string;
		frequency?:  number;
		/** 0 = subtil, 1 = normal, 2 = extrême */
		intensity?:  number;
	} = $props();

	let clip1    = $state('');
	let clip2    = $state('');
	let tx1      = $state(0);
	let tx2      = $state(0);
	let glitching = $state(false);
	let timer: ReturnType<typeof setInterval> | undefined;

	function triggerGlitch() {
		const top1 = Math.random() * 70;
		const h1   = 5 + Math.random() * 20;
		const top2 = Math.random() * 70;
		const h2   = 3 + Math.random() * 12;

		clip1     = `inset(${top1}% 0 ${100 - top1 - h1}% 0)`;
		clip2     = `inset(${top2}% 0 ${100 - top2 - h2}% 0)`;
		tx1       = (Math.random() - 0.5) * 8 * intensity;
		tx2       = (Math.random() - 0.5) * 5 * intensity;
		glitching = true;

		const dur = 60 + Math.random() * 120;
		setTimeout(() => { glitching = false; }, dur);
	}

	onMount(() => {
		timer = setInterval(() => {
			if (Math.random() < 0.55) triggerGlitch();
		}, 1000 / frequency);
	});

	onDestroy(() => clearInterval(timer));
</script>

<span class="gt">
	<span class="gt-base">{text}</span>
	{#if glitching}
		<span class="gt-clone gt-r" style="transform:translateX({tx1}px);clip-path:{clip1}" aria-hidden="true">{text}</span>
		<span class="gt-clone gt-b" style="transform:translateX({tx2}px);clip-path:{clip2}" aria-hidden="true">{text}</span>
	{/if}
</span>

<style>
	.gt {
		position: relative;
		display: inline-block;
	}

	.gt-clone {
		position: absolute;
		top: 0; left: 0;
		width: 100%;
		pointer-events: none;
	}

	.gt-r { color: #ff2060; mix-blend-mode: screen; }
	.gt-b { color: #00ccff; mix-blend-mode: screen; }
</style>
