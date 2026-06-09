import type { Snippet } from "svelte";
type $$ComponentProps = {
    children?: Snippet;
    /** Scale de départ (avant entrée dans le viewport) */
    fromScale?: number;
    /** Position viewport (0-1) où l'animation commence */
    startAt?: number;
    /** Position viewport (0-1) où l'animation se termine */
    endAt?: number;
};
declare const ZoomReveal: import("svelte").Component<$$ComponentProps, {}, "">;
type ZoomReveal = ReturnType<typeof ZoomReveal>;
export default ZoomReveal;
