import type { Component } from "svelte";
export type WheelNavItem = {
    icon: Component;
    label: string;
    href?: string;
    active?: boolean;
    onclick?: () => void;
};
type $$ComponentProps = {
    items?: WheelNavItem[];
    activeHref?: string;
    radius?: number;
};
declare const NavbarMobileWheel: Component<$$ComponentProps, {}, "">;
type NavbarMobileWheel = ReturnType<typeof NavbarMobileWheel>;
export default NavbarMobileWheel;
