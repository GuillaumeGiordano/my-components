<script lang="ts">
	import type { Snippet } from 'svelte';
	import {
		GRID_BREAKPOINTS,
		getGridContext,
		resolveResponsive,
		type GridBreakpoint,
		type Responsive
	} from './Grid.svelte';

	// One item's place in a <Grid>. Every value is plain or per tier and is clamped per tier against
	// the grid's column count: span 3 in a 2-column tier fills the row; `col` is dropped when the
	// item would not fit from there; `rows` is ignored on 1-column tiers (natural height when stacked).
	let {
		span = 1,
		rows = 1,
		col,
		row,
		fill = true,
		hideBelow,
		class: className = '',
		children
	}: {
		/** Width in columns. */
		span?: number | Responsive<number>;
		/** Height in rows (multiples of the grid's rowHeight). */
		rows?: number | Responsive<number>;
		/** Start column (1-based); automatic placement when omitted. */
		col?: number | Responsive<number>;
		/** Start row (1-based); automatic placement when omitted. */
		row?: number | Responsive<number>;
		/** The child takes the full height of the cell (cards of a row share the same height). */
		fill?: boolean;
		/** Hidden on the tiers below this one. */
		hideBelow?: Exclude<GridBreakpoint, 'base'>;
		class?: string;
		children: Snippet;
	} = $props();

	const TIERS = Object.keys(GRID_BREAKPOINTS) as GridBreakpoint[];
	const grid = getGridContext();

	const style = $derived.by(() => {
		const spans = resolveResponsive(span, 1);
		const heights = resolveResponsive(rows, 1);
		const cols = resolveResponsive<number | undefined>(col, undefined);
		const starts = resolveResponsive<number | undefined>(row, undefined);
		const hiddenUntil = hideBelow ? TIERS.indexOf(hideBelow) : 0;

		return TIERS.flatMap((bp, i) => {
			// Outside a <Grid>, nothing to clamp against.
			const gridCols = grid?.cols[bp] ?? Infinity;
			const s = Math.max(1, Math.min(spans[bp], gridCols));
			const c = cols[bp];
			const colStart = c !== undefined && c >= 1 && c + s - 1 <= gridCols ? String(c) : 'auto';
			const r = gridCols > 1 ? Math.max(1, heights[bp]) : 1;
			const rowStart = starts[bp] !== undefined ? String(starts[bp]) : 'auto';
			return [
				`--ui-gi-column-${bp}: ${colStart} / span ${s}`,
				`--ui-gi-row-${bp}: ${rowStart} / span ${r}`,
				`--ui-gi-display-${bp}: ${i < hiddenUntil ? 'none' : 'block'}`
			];
		}).join('; ');
	});
</script>

<div class="ui-grid-item {className}" class:fill {style}>
	{@render children()}
</div>

<style>
	/* The queries target the enclosing <Grid> (named container "ui-grid"). */
	.ui-grid-item {
		min-width: 0;
		grid-column: var(--ui-gi-column-base);
		grid-row: var(--ui-gi-row-base);
		display: var(--ui-gi-display-base);
	}
	@container ui-grid (min-width: 480px) {
		.ui-grid-item {
			grid-column: var(--ui-gi-column-sm);
			grid-row: var(--ui-gi-row-sm);
			display: var(--ui-gi-display-sm);
		}
	}
	@container ui-grid (min-width: 640px) {
		.ui-grid-item {
			grid-column: var(--ui-gi-column-md);
			grid-row: var(--ui-gi-row-md);
			display: var(--ui-gi-display-md);
		}
	}
	@container ui-grid (min-width: 1000px) {
		.ui-grid-item {
			grid-column: var(--ui-gi-column-lg);
			grid-row: var(--ui-gi-row-lg);
			display: var(--ui-gi-display-lg);
		}
	}
	@container ui-grid (min-width: 1280px) {
		.ui-grid-item {
			grid-column: var(--ui-gi-column-xl);
			grid-row: var(--ui-gi-row-xl);
			display: var(--ui-gi-display-xl);
		}
	}
	.ui-grid-item.fill > :global(*) {
		height: 100%;
	}
</style>
