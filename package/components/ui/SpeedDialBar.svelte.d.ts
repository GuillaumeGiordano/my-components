import type { Component } from "svelte";
export type SpeedDialBarSubItem = {
    icon: Component;
    label: string;
    onclick?: () => void;
};
export type SpeedDialBarItem = {
    icon: Component;
    label: string;
    onclick?: () => void;
    active?: boolean;
    children?: SpeedDialBarSubItem[];
};
export type SpeedDialBarAction = {
    icon: Component;
    label: string;
    onclick?: () => void;
};
type $$ComponentProps = {
    items?: SpeedDialBarItem[];
    /** Buttons that appear vertically above the FAB when open. */
    actions?: SpeedDialBarAction[];
    /** FAB trigger icon. */
    icon?: Component;
    /** Number of item slots visible simultaneously. */
    nVisible?: number;
};
declare const SpeedDialBar: Component<$$ComponentProps, {}, "">;
type SpeedDialBar = ReturnType<typeof SpeedDialBar>;
export default SpeedDialBar;
