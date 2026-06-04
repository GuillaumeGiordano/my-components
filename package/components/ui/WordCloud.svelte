<script lang="ts">
	let {
		words   = [] as { text: string; weight: number }[],
		minSize = 13,
		maxSize = 52,
	}: {
		words?:   { text: string; weight: number }[];
		minSize?: number;
		maxSize?: number;
	} = $props();

	const minW = $derived(words.length ? Math.min(...words.map(w => w.weight)) : 0);
	const maxW = $derived(words.length ? Math.max(...words.map(w => w.weight)) : 1);

	function fontSize(weight: number): number {
		if (maxW === minW) return (minSize + maxSize) / 2;
		return minSize + ((weight - minW) / (maxW - minW)) * (maxSize - minSize);
	}

	function opacity(weight: number): number {
		if (maxW === minW) return 1;
		return 0.5 + ((weight - minW) / (maxW - minW)) * 0.5;
	}

	// Deterministic slight rotation from word hash to avoid reflow on each render
	const ANGLES = [-12, -8, -4, 0, 0, 0, 0, 4, 8, 12];
	function rotate(text: string): number {
		const hash = [...text].reduce((a, c) => a + c.charCodeAt(0), 0);
		return ANGLES[hash % ANGLES.length];
	}
</script>

<div class="wc" role="list">
	{#each words as { text, weight } (text)}
		<span
			class="wc-word"
			role="listitem"
			title="{text} ({weight})"
			style="font-size:{fontSize(weight)}px;opacity:{opacity(weight)};transform:rotate({rotate(text)}deg)"
		>
			{text}
		</span>
	{/each}
</div>

<style>
	.wc {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 10px 18px;
		padding: 24px;
		line-height: 1.2;
	}

	.wc-word {
		display: inline-block;
		color: var(--primary);
		font-weight: 600;
		cursor: default;
		transition:
			opacity 200ms ease,
			transform 200ms ease,
			color 200ms ease;
		user-select: none;

		&:hover {
			opacity: 1 !important;
			transform: rotate(0deg) scale(1.15) !important;
			color: var(--primary);
		}
	}
</style>
