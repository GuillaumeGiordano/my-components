<script lang="ts">
	import type { Snippet } from 'svelte';
	import { uniqueId } from '$lib/utils/id';

	let {
		tip,
		position = 'top',
		children
	}: {
		tip: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		children: Snippet;
	} = $props();

	const id = uniqueId('tooltip');
</script>

<!--
  The wrapper gets aria-describedby so screen readers announce the tooltip
  text when focus lands on the trigger inside.
  role="tooltip" on the bubble satisfies ARIA tooltip pattern.
-->
<div class="tooltip-wrapper" aria-describedby={id}>
	{@render children()}
	<span {id} role="tooltip" class="bubble {position}">{tip}</span>
</div>

<style>
	.tooltip-wrapper {
		position: relative;
		display: inline-flex;
	}

	/* ---- Bubble ---- */
	.bubble {
		position: absolute;
		z-index: 100;
		padding: 5px 10px;
		background: var(--text-heading);
		color: #fff;
		font-size: 12px;
		font-family: var(--font-sans);
		font-weight: 500;
		line-height: 1.4;
		/* Compact for short tips, but wrap long ones instead of nowrap: an
		   unwrappable bubble can exceed the mobile viewport and widen the whole
		   document (page-level horizontal scroll), even while opacity is 0. */
		width: max-content;
		max-width: min(90vw, 260px);
		white-space: normal;
		overflow-wrap: anywhere;
		border-radius: var(--radius-md);
		pointer-events: none;
		/* Hidden by default (visibility keeps it out of the a11y/hover tree) */
		opacity: 0;
		visibility: hidden;
		transition:
			opacity var(--transition-fast),
			visibility var(--transition-fast);
	}

	/* Show on hover or keyboard focus inside the wrapper */
	.tooltip-wrapper:hover .bubble,
	.tooltip-wrapper:focus-within .bubble {
		opacity: 1;
		visibility: visible;
	}

	/* ---- Positions ---- */
	.bubble.top {
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}

	.bubble.bottom {
		top: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
	}

	.bubble.left {
		right: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}

	.bubble.right {
		left: calc(100% + 8px);
		top: 50%;
		transform: translateY(-50%);
	}

	/* ---- Arrows via ::after ---- */
	.bubble::after {
		content: '';
		position: absolute;
		border: 5px solid transparent;
	}

	.bubble.top::after {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-top-color: var(--text-heading);
	}

	.bubble.bottom::after {
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		border-bottom-color: var(--text-heading);
	}

	.bubble.left::after {
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-left-color: var(--text-heading);
	}

	.bubble.right::after {
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		border-right-color: var(--text-heading);
	}
</style>
