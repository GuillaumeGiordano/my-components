/** Container-width tiers, mobile-first. Fixed: a container query condition cannot use var(). */
export declare const GRID_BREAKPOINTS: {
    readonly base: 0;
    readonly sm: 480;
    readonly md: 640;
    readonly lg: 1000;
    readonly xl: 1280;
};
export type GridBreakpoint = keyof typeof GRID_BREAKPOINTS;
/** A value per tier; a missing tier inherits the one below it (like Tailwind). */
export type Responsive<T> = Partial<Record<GridBreakpoint, T>>;
/** Resolves a plain value or a Responsive one into a value for EVERY tier. */
export declare function resolveResponsive<T>(value: T | Responsive<T> | undefined, fallback: T): Record<GridBreakpoint, T>;
type GridContext = {
    readonly cols: Record<GridBreakpoint, number>;
};
/** Used by <GridItem> to clamp its span to the column count of each tier. */
export declare function getGridContext(): GridContext | undefined;
import type { Snippet } from 'svelte';
type $$ComponentProps = {
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
};
declare const Grid: import("svelte").Component<$$ComponentProps, {}, "">;
type Grid = ReturnType<typeof Grid>;
export default Grid;
