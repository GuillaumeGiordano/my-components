<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		colors   = ['#6366f1', '#ec4899', '#f97316', '#06b6d4'] as string[],
		duration = 8,
		angle    = -45,
	}: {
		children?: Snippet;
		colors?:   string[];
		duration?: number;
		angle?:    number;
	} = $props();
</script>

<div
	class="gb"
	style="
		--gb-gradient: {colors.join(', ')};
		--gb-angle: {angle}deg;
		--gb-duration: {duration}s;
	"
>
	{#if children}
		<div class="gb-content">{@render children()}</div>
	{/if}
</div>

<style>
	.gb {
		position: relative;
		overflow: hidden;
		background: linear-gradient(var(--gb-angle), var(--gb-gradient));
		background-size: 400% 400%;
		animation: gb-shift var(--gb-duration) ease infinite;
	}

	@keyframes gb-shift {
		0%   { background-position: 0% 50%;   }
		50%  { background-position: 100% 50%; }
		100% { background-position: 0% 50%;   }
	}

	.gb-content {
		position: relative;
		z-index: 1;
	}
</style>
