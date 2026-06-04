import type { Snippet } from 'svelte';
type $$ComponentProps = {
    children: Snippet;
    speed?: number;
    direction?: 'left' | 'right';
    gap?: number;
    pauseOnHover?: boolean;
};
declare const Marquee: import("svelte").Component<$$ComponentProps, {}, "">;
type Marquee = ReturnType<typeof Marquee>;
export default Marquee;
