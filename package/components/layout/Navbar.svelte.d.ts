import type { Component, Snippet } from "svelte";
export type NavSubItem = {
    label: string;
    href: string;
    icon?: Component;
    active?: boolean;
};
export type NavItem = {
    icon?: Component;
    label: string;
    href?: string;
    active?: boolean;
    badge?: number | string;
    children?: NavSubItem[];
};
type $$ComponentProps = {
    items?: NavItem[];
    brand?: Snippet;
    actionBtn?: Snippet;
    mobileMenu?: "drawer" | "popover" | "fullscreen";
    /** Enable scroll spy: highlight the item whose `#anchor` section crosses the viewport center. */
    spy?: boolean;
    /** Show the mobile hamburger button. Set false to hide the mobile menu trigger. */
    burger?: boolean;
    /** Anchor the bar at the top (sticky) or fixed to the bottom of the screen. */
    position?: "top" | "bottom";
};
declare const Navbar: Component<$$ComponentProps, {}, "">;
type Navbar = ReturnType<typeof Navbar>;
export default Navbar;
