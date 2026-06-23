import type { Component, Snippet } from "svelte";
type $$ComponentProps = {
    id?: string;
    /** Small label above the title (e.g. "Le plus demandé"). */
    eyebrow?: string;
    title: string;
    description: string;
    /** Key selling points, shown as a checklist. */
    points?: string[];
    cta?: {
        label: string;
        href: string;
    };
    /** Optional icon shown in the eyebrow badge. */
    icon?: Component;
    /** Accent color — any CSS color or token. */
    accent?: string;
    /** Put the visual on the left instead of the right. */
    reverse?: boolean;
    /** Custom illustration replacing the default browser mockup. */
    visual?: Snippet;
};
declare const ServiceDetailSection: Component<$$ComponentProps, {}, "">;
type ServiceDetailSection = ReturnType<typeof ServiceDetailSection>;
export default ServiceDetailSection;
