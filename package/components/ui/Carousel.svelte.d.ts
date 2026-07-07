import type { Snippet } from 'svelte';
type $$ComponentProps = {
    items: unknown[];
    item: Snippet<[unknown, number]>;
    autoplay?: boolean;
    interval?: number;
    loop?: boolean;
    showDots?: boolean;
    showArrows?: boolean;
    /**
     * Optional width/height ratio for each slide. When provided, the carousel
     * height adapts to the current slide's real aspect ratio (media shown in
     * its true format, no crop). Omit for the default fixed behavior.
     */
    aspectRatios?: number[];
};
declare const Carousel: import("svelte").Component<$$ComponentProps, {}, "">;
type Carousel = ReturnType<typeof Carousel>;
export default Carousel;
