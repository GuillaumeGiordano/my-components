<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let {
		prefix        = '',
		words         = [] as string[],
		typeSpeed     = 80,
		deleteSpeed   = 50,
		pauseDuration = 1500,
		cursor        = true,
		cursorChar    = '|',
	}: {
		prefix?:        string;
		words?:         string[];
		typeSpeed?:     number;
		deleteSpeed?:   number;
		pauseDuration?: number;
		cursor?:        boolean;
		cursorChar?:    string;
	} = $props();

	let displayed  = $state('');
	let wordIndex  = $state(0);
	let charIndex  = $state(0);
	let isDeleting = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	function tick() {
		if (!words.length) return;
		const current = words[wordIndex];

		if (!isDeleting) {
			charIndex++;
			displayed = current.slice(0, charIndex);
			if (charIndex >= current.length) {
				isDeleting = true;
				timer = setTimeout(tick, pauseDuration);
			} else {
				timer = setTimeout(tick, typeSpeed);
			}
		} else {
			charIndex--;
			displayed = current.slice(0, charIndex);
			if (charIndex <= 0) {
				isDeleting = false;
				wordIndex  = (wordIndex + 1) % words.length;
				timer = setTimeout(tick, typeSpeed);
			} else {
				timer = setTimeout(tick, deleteSpeed);
			}
		}
	}

	onMount(() => {
		if (words.length > 0) timer = setTimeout(tick, typeSpeed);
	});

	onDestroy(() => clearTimeout(timer));
</script>

<span class="tw"
	>{#if prefix}<span class="tw-prefix">{prefix}</span>{/if}<span class="tw-word">{displayed}</span>{#if cursor}<span class="tw-cursor" aria-hidden="true">{cursorChar}</span>{/if}</span
>

<style>
	.tw {
		display: inline;
		white-space: pre;
	}

	.tw-word {
		color: var(--primary);
	}

	.tw-cursor {
		color: var(--primary);
		margin-left: 1px;
		animation: tw-blink 1s step-end infinite;
		user-select: none;
	}

	@keyframes tw-blink {
		0%, 100% { opacity: 1; }
		50%       { opacity: 0; }
	}
</style>
