import type { Component } from 'svelte';
type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    info?: Array<{
        icon: Component;
        label: string;
        value: string;
        href?: string;
    }>;
    /** iframe src copiée depuis Google Maps > Partager > Intégrer une carte */
    mapSrc?: string;
    mapLabel?: string;
    onsubmit?: (data: {
        name: string;
        email: string;
        subject?: string;
        message: string;
    }) => Promise<void> | void;
    withBackground?: "bg-base" | "";
};
declare const ContactSectionV2: Component<$$ComponentProps, {}, "">;
type ContactSectionV2 = ReturnType<typeof ContactSectionV2>;
export default ContactSectionV2;
