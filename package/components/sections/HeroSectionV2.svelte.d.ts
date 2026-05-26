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
    stats?: {
        value: string;
        label: string;
    }[];
    align?: 'left' | 'center';
    visual?: Snippet;
};
declare const HeroSectionV2: import("svelte").Component<$$ComponentProps, {}, "">;
type HeroSectionV2 = ReturnType<typeof HeroSectionV2>;
export default HeroSectionV2;
