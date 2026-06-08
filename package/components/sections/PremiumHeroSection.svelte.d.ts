import type { Component } from 'svelte';
export type PremiumCard = {
    icon: Component;
    title: string;
    description: string;
    accent?: string;
};
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
    stats?: Array<{
        value: string;
        suffix?: string;
        label: string;
    }>;
    cards?: PremiumCard[];
    withBackground?: "bg-base" | "";
};
declare const PremiumHeroSection: Component<$$ComponentProps, {}, "">;
type PremiumHeroSection = ReturnType<typeof PremiumHeroSection>;
export default PremiumHeroSection;
