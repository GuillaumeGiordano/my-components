import type { Component } from "svelte";
type Section = {
    icon?: Component;
    label: string;
    href: string;
};
type NavPage = {
    link: string;
    label: string;
    icon?: Component;
    section?: Section[];
};
type $$ComponentProps = {
    /** The whole site nav: each page carries its route (`link`) and its in-page anchors. */
    navItems?: NavPage[];
    /** Edge the dock sits on — controls tooltip + pages-menu direction. */
    side?: "left" | "right";
};
declare const NavbarMenu: Component<$$ComponentProps, {}, "">;
type NavbarMenu = ReturnType<typeof NavbarMenu>;
export default NavbarMenu;
