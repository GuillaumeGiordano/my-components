import type { Component } from "svelte";
export type RadialNavItem = {
    icon: Component;
    label: string;
    href?: string;
    active?: boolean;
    onclick?: () => void;
};
type $$ComponentProps = {
    items?: RadialNavItem[];
    activeHref?: string;
    radius?: number;
};
declare const NavbarMobileRadial: Component<$$ComponentProps, {}, "">;
type NavbarMobileRadial = ReturnType<typeof NavbarMobileRadial>;
export default NavbarMobileRadial;
