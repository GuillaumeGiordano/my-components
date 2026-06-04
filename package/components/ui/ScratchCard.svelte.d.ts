import type { Snippet } from 'svelte';
type $$ComponentProps = {
    children?: Snippet;
    cover?: string;
    brushSize?: number;
    /** % de surface grattée pour révéler automatiquement */
    threshold?: number;
    label?: string;
    onReveal?: () => void;
};
declare const ScratchCard: import("svelte").Component<$$ComponentProps, {}, "">;
type ScratchCard = ReturnType<typeof ScratchCard>;
export default ScratchCard;
