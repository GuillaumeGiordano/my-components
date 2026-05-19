import type { Snippet } from 'svelte';
type $$ComponentProps = {
    badge?: string;
    title: string;
    highlight?: string;
    description: string;
    primaryCta?: {
        label: string;
        href: string;
    };
    secondaryCta?: {
        label: string;
        href: string;
    };
    align?: 'left' | 'center';
    visual?: Snippet;
};
declare const HeroSection: import("svelte").Component<$$ComponentProps, {}, "">;
type HeroSection = ReturnType<typeof HeroSection>;
export default HeroSection;
