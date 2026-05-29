import type { Component } from 'svelte';
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
    onclick?: () => void;
};
declare const SidebarItem: Component<$$ComponentProps, {}, "">;
type SidebarItem = ReturnType<typeof SidebarItem>;
export default SidebarItem;
