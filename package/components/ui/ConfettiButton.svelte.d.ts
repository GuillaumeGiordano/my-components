import type { Snippet } from 'svelte';
type $$ComponentProps = {
    children?: Snippet;
    colors?: string[];
    count?: number;
    /** Angle d'éparpillement en degrés (360 = tous sens) */
    spread?: number;
};
declare const ConfettiButton: import("svelte").Component<$$ComponentProps, {}, "">;
type ConfettiButton = ReturnType<typeof ConfettiButton>;
export default ConfettiButton;
