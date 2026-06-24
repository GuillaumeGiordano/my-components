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
    buttonHref?: string;
    interval?: number;
};
declare const DeviceShowcase: import("svelte").Component<$$ComponentProps, {}, "">;
type DeviceShowcase = ReturnType<typeof DeviceShowcase>;
export default DeviceShowcase;
