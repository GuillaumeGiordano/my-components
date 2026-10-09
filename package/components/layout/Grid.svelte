<script module lang="ts">
	import { getContext, setContext } from 'svelte';

	/** Container-width tiers, mobile-first. Fixed: a container query condition cannot use var(). */
	export const GRID_BREAKPOINTS = { base: 0, sm: 480, md: 640, lg: 1000, xl: 1280 } as const;
	export type GridBreakpoint = keyof typeof GRID_BREAKPOINTS;
	const TIERS = Object.keys(GRID_BREAKPOINTS) as GridBreakpoint[];

	/** A value per tier; a missing tier inherits the one below it (like Tailwind). */
	export type Responsive<T> = Partial<Record<GridBreakpoint, T>>;

	/** Resolves a plain value or a Responsive one into a value for EVERY tier. */
	export function resolveResponsive<T>(
		value: T | Responsive<T> | undefined,
		fallback: T
	): Record<GridBreakpoint, T> {
		const isMap = typeof value === 'object' && value !== null;
		const out = {} as Record<GridBreakpoint, T>;
		let current = fallback;
		for (const bp of TIERS) {
			const v = isMap ? (value as Responsive<T>)[bp] : bp === 'base' ? (value as T | undefined) : undefined;
			if (v !== undefined) current = v;
			out[bp] = current;
		}
		return out;
	}

	type GridContext = { readonly cols: Record<GridBreakpoint, number> };
	const KEY = Symbol('ui-grid');

	/** Used by <GridItem> to clamp its span to the column count of each tier. */
	export function getGridContext(): GridContext | undefined {
		return getContext<GridContext | undefined>(KEY);
	}
	function setGridContext(ctx: GridContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	// Layout grid with as many rows as needed; each child <GridItem> sets its own place (span, rows,
	// col, row). Responsive on the GRID's own width (container queries), so it adapts to the space
	// it really has (sidebar, split views…), not to the viewport. Rows are at least `rowHeight` high
	// on multi-column tiers and grow with their content.
	let {
		cols = { base: 1, md: 2, lg: 5 },
		gap = '20px',
		rowHeight = '180px',
		dense = true,
		class: className = '',
		children
	}: {
		/** Column count, plain or per tier. */
		cols?: number | Responsive<number>;
		/** Space between items (any CSS length). */
		gap?: string;
		/** Minimum row height — the unit of GridItem `rows`. 'auto' = content height only. */
		rowHeight?: string;
		/** Back-fills holes left by wide items with the smaller ones that come after. */
		dense?: boolean;
		class?: string;
		children: Snippet;
	} = $props();

	const resolvedCols = $derived(resolveResponsive(cols, 1));

	setGridContext({
		get cols() {
			return resolvedCols;
		}
	});

	// One CSS variable per tier; the container queries below pick the active one.
	const style = $derived(
		[
			`--ui-grid-gap: ${gap}`,
			...TIERS.flatMap((bp) => {
				const n = Math.max(1, Math.floor(resolvedCols[bp]));
				const rows = n > 1 && rowHeight !== 'auto' ? `minmax(${rowHeight}, auto)` : 'auto';
				return [`--ui-grid-cols-${bp}: ${n}`, `--ui-grid-rows-${bp}: ${rows}`];
			})
		].join('; ')
	);
</script>

<div class="ui-grid-host {className}" {style}>
	<div class="ui-grid" class:dense>
		{@render children()}
	</div>
</div>

<style>
	/* The host is what the queries measure (named, so nested containers don't interfere); an element
	   cannot query itself, hence the inner .ui-grid. Class names avoid Tailwind utilities
	   (.container / .grid). */
	.ui-grid-host {
		container: ui-grid / inline-size;
	}
	.ui-grid {
		display: grid;
		gap: var(--ui-grid-gap);
		grid-template-columns: repeat(var(--ui-grid-cols-base), minmax(0, 1fr));
		grid-auto-rows: var(--ui-grid-rows-base);
	}
	.ui-grid.dense {
		grid-auto-flow: dense;
	}
	@container ui-grid (min-width: 480px) {
		.ui-grid {
			grid-template-columns: repeat(var(--ui-grid-cols-sm), minmax(0, 1fr));
			grid-auto-rows: var(--ui-grid-rows-sm);
		}
	}
	@container ui-grid (min-width: 640px) {
		.ui-grid {
			grid-template-columns: repeat(var(--ui-grid-cols-md), minmax(0, 1fr));
			grid-auto-rows: var(--ui-grid-rows-md);
		}
	}
	@container ui-grid (min-width: 1000px) {
		.ui-grid {
			grid-template-columns: repeat(var(--ui-grid-cols-lg), minmax(0, 1fr));
			grid-auto-rows: var(--ui-grid-rows-lg);
		}
	}
	@container ui-grid (min-width: 1280px) {
		.ui-grid {
			grid-template-columns: repeat(var(--ui-grid-cols-xl), minmax(0, 1fr));
			grid-auto-rows: var(--ui-grid-rows-xl);
		}
	}
</style>
