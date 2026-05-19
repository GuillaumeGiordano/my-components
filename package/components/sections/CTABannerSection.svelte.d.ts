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
    variant?: 'default' | 'primary' | 'dark';
};
declare const CTABannerSection: import("svelte").Component<$$ComponentProps, {}, "">;
type CTABannerSection = ReturnType<typeof CTABannerSection>;
export default CTABannerSection;
