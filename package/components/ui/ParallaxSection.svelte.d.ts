import type { Snippet } from 'svelte';
type $$ComponentProps = {
    children?: Snippet;
    /** Snippet pour la couche de fond (défile plus lentement) */
    background?: Snippet;
    /** Vitesse du fond (0 = fixe, 1 = vitesse normale). Défaut 0.4 */
    speed?: number;
};
declare const ParallaxSection: import("svelte").Component<$$ComponentProps, {}, "">;
type ParallaxSection = ReturnType<typeof ParallaxSection>;
export default ParallaxSection;
