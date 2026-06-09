import type { Component } from "svelte";
export type RadialScrollItem = {
    icon: Component;
    label: string;
    href?: string;
    active?: boolean;
    onclick?: () => void;
};
type $$ComponentProps = {
    items?: RadialScrollItem[];
    activeHref?: string;
    /** Arc radius in px. */
    radius?: number;
};
declare const NavbarMobileRadialScroll: Component<$$ComponentProps, {}, "">;
type NavbarMobileRadialScroll = ReturnType<typeof NavbarMobileRadialScroll>;
export default NavbarMobileRadialScroll;
