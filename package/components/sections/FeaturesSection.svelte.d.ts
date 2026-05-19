import type { Component } from 'svelte';
type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    features: Array<{
        icon: Component;
        title: string;
        description: string;
        badge?: string;
    }>;
    columns?: 2 | 3 | 4;
};
declare const FeaturesSection: Component<$$ComponentProps, {}, "">;
type FeaturesSection = ReturnType<typeof FeaturesSection>;
export default FeaturesSection;
