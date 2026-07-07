import type { Component, Snippet } from 'svelte';
export type SidebarSubItem = {
    label: string;
    href: string;
    active?: boolean;
    icon?: Component;
};
type $$ComponentProps = {
    icon: Component;
    label: string;
    href?: string;
    active?: boolean;
    collapsed?: boolean;
    badge?: number | string;
    children?: SidebarSubItem[];
    /** Custom expandable content (e.g. a picker). Toggles like sub-items. */
    content?: Snippet;
    onclick?: () => void;
};
declare const SidebarItem: Component<$$ComponentProps, {}, "">;
type SidebarItem = ReturnType<typeof SidebarItem>;
export default SidebarItem;
