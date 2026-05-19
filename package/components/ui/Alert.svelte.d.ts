import type { Component, Snippet } from 'svelte';
type $$ComponentProps = {
    variant?: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    children?: Snippet;
    dismissible?: boolean;
    icon?: Component;
    onclose?: () => void;
};
declare const Alert: Component<$$ComponentProps, {}, "">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
