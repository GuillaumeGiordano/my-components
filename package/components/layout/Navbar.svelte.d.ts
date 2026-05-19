import type { Snippet } from "svelte";
type NavLink = {
    label: string;
    href: string;
};
type $$ComponentProps = {
    links?: NavLink[];
    ctaLabel?: string;
    brand?: Snippet;
};
declare const Navbar: import("svelte").Component<$$ComponentProps, {}, "">;
type Navbar = ReturnType<typeof Navbar>;
export default Navbar;
