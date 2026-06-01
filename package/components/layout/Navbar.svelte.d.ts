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
};
declare const Navbar: Component<$$ComponentProps, {}, "">;
type Navbar = ReturnType<typeof Navbar>;
export default Navbar;
