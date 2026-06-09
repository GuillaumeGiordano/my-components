import type { Snippet } from "svelte";
type $$ComponentProps = {
    children?: Snippet;
    particleCount?: number;
    /** Couleur des particules — accepte hex, rgb ou var(--css-var) */
    color?: string;
    /** Fond du conteneur — doit être opaque pour que les particules soient visibles */
    background?: string;
    speed?: number;
    connectionDistance?: number;
};
declare const ParticleBackground: import("svelte").Component<$$ComponentProps, {}, "">;
type ParticleBackground = ReturnType<typeof ParticleBackground>;
export default ParticleBackground;
