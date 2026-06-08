import type { Component } from 'svelte';
type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    steps: Array<{
        icon: Component;
        title: string;
        description: string;
        badge?: string;
    }>;
    layout?: 'horizontal' | 'vertical';
    withBackground?: "bg-base" | "";
};
declare const ProcessSection: Component<$$ComponentProps, {}, "">;
type ProcessSection = ReturnType<typeof ProcessSection>;
export default ProcessSection;
