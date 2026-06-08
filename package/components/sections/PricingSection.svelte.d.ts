type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    plans: Array<{
        name: string;
        price: string;
        period?: string;
        description?: string;
        features: string[];
        cta: string;
        href?: string;
        highlighted?: boolean;
        badge?: string;
    }>;
    withBackground?: "bg-base" | "";
};
declare const PricingSection: import("svelte").Component<$$ComponentProps, {}, "">;
type PricingSection = ReturnType<typeof PricingSection>;
export default PricingSection;
