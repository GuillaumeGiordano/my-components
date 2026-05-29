import type { Snippet } from 'svelte';
type $$ComponentProps = {
    items: unknown[];
    item: Snippet<[unknown, number]>;
    autoplay?: boolean;
    interval?: number;
    loop?: boolean;
    showDots?: boolean;
    showArrows?: boolean;
};
declare const Carousel: import("svelte").Component<$$ComponentProps, {}, "">;
type Carousel = ReturnType<typeof Carousel>;
export default Carousel;
