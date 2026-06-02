import type { Component } from 'svelte';
export type SectionNavItem = {
    icon: Component;
    label: string;
    href?: string;
    active?: boolean;
    onclick?: () => void;
};
type $$ComponentProps = {
    items?: SectionNavItem[];
    activeHref?: string;
    size?: number;
};
declare const NavSectionWheel: Component<$$ComponentProps, {}, "">;
type NavSectionWheel = ReturnType<typeof NavSectionWheel>;
export default NavSectionWheel;
