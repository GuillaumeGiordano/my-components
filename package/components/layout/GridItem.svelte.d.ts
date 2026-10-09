import type { Snippet } from 'svelte';
import { type GridBreakpoint, type Responsive } from './Grid.svelte';
type $$ComponentProps = {
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
};
declare const GridItem: import("svelte").Component<$$ComponentProps, {}, "">;
type GridItem = ReturnType<typeof GridItem>;
export default GridItem;
