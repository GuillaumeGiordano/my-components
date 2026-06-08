import type { Component } from 'svelte';
type IntegrationStatus = 'available' | 'coming-soon' | 'beta';
type Integration = {
    name: string;
    description?: string;
    icon?: Component;
    logoSrc?: string;
    category?: string;
    href?: string;
    status?: IntegrationStatus;
};
type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    integrations: Integration[];
    cta?: {
        label: string;
        href: string;
    };
    columns?: 2 | 3 | 4;
    withBackground?: "bg-base" | "";
};
declare const IntegrationsSection: Component<$$ComponentProps, {}, "">;
type IntegrationsSection = ReturnType<typeof IntegrationsSection>;
export default IntegrationsSection;
