type $$ComponentProps = {
    id?: string;
    title: string;
    description?: string;
    primaryCta?: {
        label: string;
        href: string;
    };
    secondaryCta?: {
        label: string;
        href: string;
    };
    withBackground?: "bg-base" | "bg-subtle" | "bg-accent" | "bg-primary" | "";
};
declare const CTABannerSection: import("svelte").Component<$$ComponentProps, {}, "">;
type CTABannerSection = ReturnType<typeof CTABannerSection>;
export default CTABannerSection;
