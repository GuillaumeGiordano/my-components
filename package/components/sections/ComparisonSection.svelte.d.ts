import type { Component } from "svelte";
type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    plans: Array<{
        name: string;
        highlighted?: boolean;
        badge?: string;
        cta?: {
            label: string;
            href?: string;
        };
    }>;
    features: Array<{
        category?: string;
        label: string;
        tooltip?: string;
        values: Array<string | boolean | null>;
    }>;
    withBackground?: "bg-base" | "";
};
declare const ComparisonSection: Component<$$ComponentProps, {}, "">;
type ComparisonSection = ReturnType<typeof ComparisonSection>;
export default ComparisonSection;
