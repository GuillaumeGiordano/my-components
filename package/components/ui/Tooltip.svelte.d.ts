import type { Snippet } from 'svelte';
type $$ComponentProps = {
    tip: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    children: Snippet;
};
declare const Tooltip: import("svelte").Component<$$ComponentProps, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
