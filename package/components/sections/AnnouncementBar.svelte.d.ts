import type { Component } from 'svelte';
type $$ComponentProps = {
    message: string;
    cta?: {
        label: string;
        href: string;
    };
    variant?: 'default' | 'primary' | 'warning' | 'success';
    dismissible?: boolean;
    icon?: Component;
    fixed?: boolean;
};
declare const AnnouncementBar: Component<$$ComponentProps, {}, "">;
type AnnouncementBar = ReturnType<typeof AnnouncementBar>;
export default AnnouncementBar;
