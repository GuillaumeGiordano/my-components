import type { Snippet } from 'svelte';
type $$ComponentProps = {
    children?: Snippet;
    color?: string;
    headColor?: string;
    background?: string;
    fontSize?: number;
    /** 1 = lent, 2 = normal, 3 = rapide */
    speed?: number;
};
declare const MatrixBackground: import("svelte").Component<$$ComponentProps, {}, "">;
type MatrixBackground = ReturnType<typeof MatrixBackground>;
export default MatrixBackground;
