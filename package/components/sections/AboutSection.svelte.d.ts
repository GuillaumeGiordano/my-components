import type { Component, Snippet } from "svelte";
type $$ComponentProps = {
    badge?: string;
    eyebrow?: string;
    title: string;
    description: string;
    values?: Array<{
        icon: Component;
        label: string;
        description?: string;
    }>;
    primaryCta?: {
        label: string;
        href: string;
    };
    secondaryCta?: {
        label: string;
        href: string;
    };
    imagePosition?: "right" | "left";
    visual?: Snippet;
    withBackground?: "bg-base" | "";
};
declare const AboutSection: Component<$$ComponentProps, {}, "">;
type AboutSection = ReturnType<typeof AboutSection>;
export default AboutSection;
