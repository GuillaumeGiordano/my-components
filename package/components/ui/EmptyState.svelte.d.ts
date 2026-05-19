import type { Component, Snippet } from 'svelte';
type $$ComponentProps = {
    icon?: Component;
    title: string;
    description?: string;
    cta?: {
        label: string;
        href?: string;
        onclick?: () => void;
    };
    size?: 'sm' | 'md' | 'lg';
    children?: Snippet;
};
declare const EmptyState: Component<$$ComponentProps, {}, "">;
type EmptyState = ReturnType<typeof EmptyState>;
export default EmptyState;
