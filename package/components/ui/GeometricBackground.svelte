<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		count      = 14,
		color      = 'var(--primary)',
		background = 'var(--bg-subtle)',
		opacity    = 0.1,
	}: {
		children?:   Snippet;
		count?:      number;
		color?:      string;
		background?: string;
		opacity?:    number;
	} = $props();

	// Deterministic hash — identical on server and client (no hydration mismatch)
	function h(n: number): number {
		n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
		n = Math.imul(n ^ (n >>> 16), 0x45d9f3b);
		return ((n ^ (n >>> 16)) >>> 0) / 0xFFFFFFFF;
	}

	const TYPES   = ['circle', 'square', 'circle', 'ring', 'square'] as const;
	const ANIMS   = ['geo-a', 'geo-b', 'geo-c', 'geo-d'];

	const shapes = Array.from({ length: count }, (_, i) => ({
		type:     TYPES[Math.floor(h(i * 7 + 1) * TYPES.length)],
		x:        h(i * 7 + 2) * 95,
		y:        h(i * 7 + 3) * 95,
		size:     18 + h(i * 7 + 4) * 52,
		duration: 9 + h(i * 7 + 5) * 14,
		delay:   -(h(i * 7 + 6) * 22),
		anim:     ANIMS[i % ANIMS.length],
	}));
</script>

<div class="geo" style="background:{background};--geo-color:{color};--geo-op:{opacity}">
	{#each shapes as s}
		<span
			class="geo-shape geo-shape--{s.type}"
			style="
				left:{s.x}%;
				top:{s.y}%;
				width:{s.size}px;
				height:{s.size}px;
				animation:{s.anim} {s.duration}s ease-in-out {s.delay}s infinite;
			"
			aria-hidden="true"
		></span>
	{/each}
	{#if children}
		<div class="geo-content">{@render children()}</div>
	{/if}
</div>

<style>
	.geo {
		position: relative;
		overflow: hidden;
	}

	.geo-shape {
		position: absolute;
		border: 2px solid var(--geo-color);
		opacity: var(--geo-op);
		pointer-events: none;
		will-change: transform;
	}

	.geo-shape--circle { border-radius: 50%; }
	.geo-shape--square { border-radius: 3px; }
	.geo-shape--ring   { border-radius: 50%; border-width: 4px; opacity: calc(var(--geo-op) * 0.6); }

	@keyframes geo-a {
		0%, 100% { transform: translateY(0);           }
		50%       { transform: translateY(-20px);       }
	}
	@keyframes geo-b {
		0%, 100% { transform: translate(0, 0) rotate(0deg);         }
		40%       { transform: translate(14px, -14px) rotate(20deg); }
		70%       { transform: translate(-8px, -6px) rotate(-10deg); }
	}
	@keyframes geo-c {
		0%, 100% { transform: scale(1) translateY(0);         }
		50%       { transform: scale(1.12) translateY(-10px); }
	}
	@keyframes geo-d {
		0%, 100% { transform: translateX(0) rotate(0deg);          }
		50%       { transform: translateX(-16px) rotate(-18deg);    }
	}

	.geo-content {
		position: relative;
		z-index: 1;
	}
</style>
