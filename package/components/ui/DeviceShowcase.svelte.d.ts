type Offer = {
    label: string;
    price: number | string;
    accent?: string;
};
type $$ComponentProps = {
    offers?: Offer[];
    prefix?: string;
    suffix?: string;
    buttonLabel?: string;
    /** Where the call-to-action button links to (the page grouping every offer). */
    buttonHref?: string;
    /** Delay between two offers in the automatic loop, in ms. */
    interval?: number;
};
declare const DeviceShowcase: import("svelte").Component<$$ComponentProps, {}, "">;
type DeviceShowcase = ReturnType<typeof DeviceShowcase>;
export default DeviceShowcase;
