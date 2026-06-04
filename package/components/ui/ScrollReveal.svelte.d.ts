import type { Snippet } from 'svelte';
type $$ComponentProps = {
    children?: Snippet;
    animation?: 'fade-up' | 'fade' | 'zoom' | 'slide-right' | 'flip';
    /** ms entre chaque enfant direct */
    stagger?: number;
    threshold?: number;
    /** Ne déclenche qu'une fois si true */
    once?: boolean;
    /** Délai global supplémentaire (ms) */
    delay?: number;
};
declare const ScrollReveal: import("svelte").Component<$$ComponentProps, {}, "">;
type ScrollReveal = ReturnType<typeof ScrollReveal>;
export default ScrollReveal;
