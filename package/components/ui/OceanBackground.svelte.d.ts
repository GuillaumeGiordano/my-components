import type { Snippet } from 'svelte';
type $$ComponentProps = {
    children?: Snippet;
    /** Profondeur prédéfinie — ignorée si background est fourni */
    depth?: 'shallow' | 'deep' | 'abyss';
    /** Surcharge complète du fond */
    background?: string;
    particleCount?: number;
    enableRays?: boolean;
    enableCaustics?: boolean;
};
declare const OceanBackground: import("svelte").Component<$$ComponentProps, {}, "">;
type OceanBackground = ReturnType<typeof OceanBackground>;
export default OceanBackground;
