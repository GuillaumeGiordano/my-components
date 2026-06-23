import type { Snippet } from "svelte";
type FooterLink = {
    label: string;
    href: string;
};
type FooterColumn = {
    heading: string;
    links: FooterLink[];
};
type $$ComponentProps = {
    brand?: Snippet;
    tagline?: string;
    columns?: FooterColumn[];
    copyright?: string;
};
declare const Footer: import("svelte").Component<$$ComponentProps, {}, "">;
type Footer = ReturnType<typeof Footer>;
export default Footer;
