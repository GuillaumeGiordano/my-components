import type { Snippet } from 'svelte';
type Feature = {
    badge?: string;
    title: string;
    description: string;
    bullets?: string[];
    cta?: {
        label: string;
        href: string;
    };
    visual: Snippet;
    imageFirst?: boolean;
};
type $$ComponentProps = {
    features: Feature[];
};
declare const SplitFeatureSection: import("svelte").Component<$$ComponentProps, {}, "">;
type SplitFeatureSection = ReturnType<typeof SplitFeatureSection>;
export default SplitFeatureSection;
