<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		background = '#020617',
		intensity  = 0.65,
	}: {
		children?:   Snippet;
		background?: string;
		intensity?:  number;
	} = $props();
</script>

<div class="aurora" style="background:{background};--intensity:{intensity}">
	<div class="aurora-layer aurora-1" aria-hidden="true"></div>
	<div class="aurora-layer aurora-2" aria-hidden="true"></div>
	<div class="aurora-layer aurora-3" aria-hidden="true"></div>
	<div class="aurora-layer aurora-4" aria-hidden="true"></div>
	{#if children}
		<div class="aurora-content">{@render children()}</div>
	{/if}
</div>

<style>
	.aurora {
		position: relative;
		overflow: hidden;
	}

	.aurora-layer {
		position: absolute;
		border-radius: 50%;
		filter: blur(72px);
		opacity: calc(var(--intensity) * 0.75);
		will-change: transform;
		pointer-events: none;
	}

	.aurora-1 {
		width: 70%; height: 55%;
		top: -8%; left: -8%;
		background: radial-gradient(ellipse, #4ade80, transparent 70%);
		animation: aurora-a 13s ease-in-out infinite alternate;
	}
	.aurora-2 {
		width: 55%; height: 65%;
		top: -12%; right: -5%;
		background: radial-gradient(ellipse, #818cf8, transparent 70%);
		animation: aurora-b 16s ease-in-out infinite alternate;
	}
	.aurora-3 {
		width: 60%; height: 45%;
		bottom: -8%; right: 8%;
		background: radial-gradient(ellipse, #22d3ee, transparent 70%);
		animation: aurora-c 11s ease-in-out infinite alternate;
	}
	.aurora-4 {
		width: 45%; height: 52%;
		bottom: 2%; left: 18%;
		background: radial-gradient(ellipse, #a855f7, transparent 70%);
		animation: aurora-d 19s ease-in-out infinite alternate;
	}

	@keyframes aurora-a {
		from { transform: translate(0, 0)      scale(1);    }
		to   { transform: translate(12%, 20%)  scale(1.2);  }
	}
	@keyframes aurora-b {
		from { transform: translate(0, 0)      scale(0.9);  }
		to   { transform: translate(-14%, 12%) scale(1.15); }
	}
	@keyframes aurora-c {
		from { transform: translate(0, 0)      scale(1.1);  }
		to   { transform: translate(-10%, -18%) scale(0.9); }
	}
	@keyframes aurora-d {
		from { transform: translate(0, 0)      scale(1);    }
		to   { transform: translate(20%, -12%) scale(1.18); }
	}

	.aurora-content {
		position: relative;
		z-index: 1;
	}
</style>
