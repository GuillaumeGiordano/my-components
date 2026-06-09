import type { Component } from "svelte";
export type SpeedDialItem = {
    icon: Component;
    label: string;
    onclick?: () => void;
    active?: boolean;
};
type $$ComponentProps = {
    items?: SpeedDialItem[];
    icon?: Component;
};
declare const SpeedDial: Component<$$ComponentProps, {}, "">;
type SpeedDial = ReturnType<typeof SpeedDial>;
export default SpeedDial;
