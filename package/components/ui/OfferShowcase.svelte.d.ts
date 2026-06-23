import type { Component } from "svelte";
type Offer = {
    label: string;
    price: number;
    tagline: string;
    href: string;
    accent?: string;
    icon?: Component;
};
type $$ComponentProps = {
    offers?: Offer[];
    prefix?: string;
    suffix?: string;
    /** Auto-rotation delay in ms. */
    interval?: number;
};
declare const OfferShowcase: Component<$$ComponentProps, {}, "">;
type OfferShowcase = ReturnType<typeof OfferShowcase>;
export default OfferShowcase;
