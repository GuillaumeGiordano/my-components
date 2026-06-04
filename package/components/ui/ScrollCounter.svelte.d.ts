type $$ComponentProps = {
    from?: number;
    to: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    /** Position viewport (0-1) où le compteur commence à bouger */
    startAt?: number;
    /** Position viewport (0-1) où le compteur atteint sa valeur finale */
    endAt?: number;
};
declare const ScrollCounter: import("svelte").Component<$$ComponentProps, {}, "">;
type ScrollCounter = ReturnType<typeof ScrollCounter>;
export default ScrollCounter;
