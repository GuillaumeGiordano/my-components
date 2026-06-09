import type { Snippet } from "svelte";
type $$ComponentProps = {
    children?: Snippet;
    background?: string;
    flameCount?: number;
    /** 0.5 = petite flamme, 1 = normale, 2 = brasier */
    intensity?: number;
};
declare const FireBackground: import("svelte").Component<$$ComponentProps, {}, "">;
type FireBackground = ReturnType<typeof FireBackground>;
export default FireBackground;
