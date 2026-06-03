<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	let {
		cards      = $bindable([] as T[]),
		renderCard,
		onswipe,
		threshold  = 80,
	}: {
		cards?:     T[];
		renderCard: Snippet<[T, number]>;
		onswipe?:   (card: T, direction: 'left' | 'right') => void;
		threshold?: number;
	} = $props();

	let deltaX   = $state(0);
	let dragging = $state(false);
	let leaving  = $state<'left' | 'right' | null>(null);
	let startX   = 0;

	const topIndex = $derived(cards.length - 1);
	const rotation = $derived(deltaX * 0.08);
	const hint     = $derived(
		Math.abs(deltaX) > threshold / 2
			? (deltaX > 0 ? 'right' : 'left')
			: null
	);

	function pointerdown(e: PointerEvent) {
		if (leaving) return;
		startX   = e.clientX;
		dragging = true;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function pointermove(e: PointerEvent) {
		if (!dragging) return;
		deltaX = e.clientX - startX;
	}

	function release() {
		if (!dragging) return;
		dragging = false;
		const dir = deltaX > threshold ? 'right' : deltaX < -threshold ? 'left' : null;
		if (dir) {
			leaving = dir;
			setTimeout(() => {
				onswipe?.(cards[topIndex], dir);
				cards   = cards.slice(0, -1);
				leaving = null;
				deltaX  = 0;
			}, 300);
		} else {
			deltaX = 0;
		}
	}

	function getTransform(i: number): string {
		const isTop  = i === topIndex;
		const offset = topIndex - i;
		const ty     = offset * -10;
		const sc     = 1 - offset * 0.05;

		if (isTop) {
			if (leaving === 'left')  return `translateX(-140%) rotate(-22deg)`;
			if (leaving === 'right') return `translateX(140%) rotate(22deg)`;
			return `translate(${deltaX}px, ${ty}px) rotate(${rotation}deg)`;
		}
		return `translateY(${ty}px) scale(${sc})`;
	}

	function getTransition(i: number): string {
		const isTop = i === topIndex;
		if (isTop && dragging) return 'none';
		return 'transform 300ms ease, opacity 300ms ease';
	}
</script>

<div class="sc">
	{#each cards as card, i (card)}
		<div
			class="sc-card"
			class:sc-card--top={i === topIndex}
			style:transform={getTransform(i)}
			style:transition={getTransition(i)}
			style:z-index={i}
			style:opacity={i === topIndex && leaving ? '0' : '1'}
			onpointerdown={i === topIndex ? pointerdown : undefined}
			onpointermove={i === topIndex ? pointermove : undefined}
			onpointerup={i === topIndex ? release : undefined}
			onpointercancel={i === topIndex ? release : undefined}
		>
			{#if i === topIndex && hint}
				<span class="sc-hint sc-hint--{hint}">
					{hint === 'right' ? '✓' : '✕'}
				</span>
			{/if}
			{@render renderCard(card, i)}
		</div>
	{/each}

	{#if cards.length === 0}
		<div class="sc-empty">Plus de cartes</div>
	{/if}
</div>

<style>
	.sc {
		position: relative;
		height: 320px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sc-card {
		position: absolute;
		width: 280px;
		min-height: 180px;
		border-radius: 16px;
		background: var(--bg-base);
		border: 1px solid var(--border);
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
		overflow: hidden;
	}

	.sc-card--top {
		cursor: grab;
		box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
		touch-action: none;

		&:active { cursor: grabbing; }
	}

	.sc-hint {
		position: absolute;
		top: 14px;
		font-size: 22px;
		font-weight: 800;
		padding: 3px 10px;
		border-radius: 8px;
		border: 3px solid;
		z-index: 10;
		animation: hint-pop 0.15s ease both;
	}

	.sc-hint--right { right: 14px; color: #22c55e; border-color: #22c55e; }
	.sc-hint--left  { left: 14px;  color: #ef4444; border-color: #ef4444; }

	@keyframes hint-pop {
		from { transform: scale(0.6); }
		to   { transform: scale(1); }
	}

	.sc-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 280px;
		height: 180px;
		border: 2px dashed var(--border);
		border-radius: 16px;
		color: var(--text-subtle);
		font-size: 14px;
	}
</style>
