type $$ComponentProps = {
    badge?: string;
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
    withBackground?: "bg-base" | "";
};
declare const CTABannerSection: import("svelte").Component<$$ComponentProps, {}, "">;
type CTABannerSection = ReturnType<typeof CTABannerSection>;
export default CTABannerSection;
