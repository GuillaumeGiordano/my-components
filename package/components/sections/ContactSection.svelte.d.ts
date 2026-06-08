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
    onsubmit?: (data: {
        name: string;
        email: string;
        subject?: string;
        message: string;
    }) => Promise<void> | void;
    variant?: 'split' | 'centered';
    withBackground?: "bg-base" | "";
};
declare const ContactSection: Component<$$ComponentProps, {}, "">;
type ContactSection = ReturnType<typeof ContactSection>;
export default ContactSection;
