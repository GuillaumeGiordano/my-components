import type { Snippet, Component } from "svelte";
type NavItem = {
    icon: Component;
    label: string;
    href: string;
};
type $$ComponentProps = {
    items: NavItem[];
    moreLabel?: string;
    moreIcon?: Component;
    moreItems?: Snippet<[() => void]>;
    fixed?: boolean;
};
declare const NavbarMobile: Component<$$ComponentProps, {}, "">;
type NavbarMobile = ReturnType<typeof NavbarMobile>;
export default NavbarMobile;
