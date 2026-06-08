import type { Component } from "svelte";
export type SheetNavItem = {
    icon: Component;
    label: string;
    href?: string;
    active?: boolean;
    badge?: number | string;
    onclick?: () => void;
    children?: SheetNavItem[];
};
type $$ComponentProps = {
    items?: SheetNavItem[];
    /** FAB trigger icon. */
    icon?: Component;
    /** Title displayed in the sheet header. */
    title?: string;
};
declare const NavbarMobileSheet: Component<$$ComponentProps, {}, "">;
type NavbarMobileSheet = ReturnType<typeof NavbarMobileSheet>;
export default NavbarMobileSheet;
