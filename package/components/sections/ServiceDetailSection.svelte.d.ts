import type { Component, Snippet } from "svelte";
type $$ComponentProps = {
    id?: string;
    eyebrow?: string;
    title: string;
    description: string;
    points?: string[];
    cta?: {
        label: string;
        href: string;
    };
    icon?: Component;
    accent?: string;
    reverse?: boolean;
    withBackground?: "bg-base" | "";
    visual?: Snippet;
};
declare const ServiceDetailSection: Component<$$ComponentProps, {}, "">;
type ServiceDetailSection = ReturnType<typeof ServiceDetailSection>;
export default ServiceDetailSection;
