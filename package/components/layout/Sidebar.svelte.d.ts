import type { Component, Snippet } from "svelte";
import type { SidebarSubItem } from "../ui/SidebarItem.svelte";
type SidebarLink = {
    label: string;
    href?: string;
    icon: Component;
    badge?: number | string;
    active?: boolean;
    children?: SidebarSubItem[];
    onclick?: () => void;
};
type SidebarGroup = {
    label: string;
    items: SidebarLink[];
};
type $$ComponentProps = {
    groups?: SidebarGroup[];
    collapsed?: boolean;
    activeHref?: string;
    shortkey?: string | false;
    header?: Snippet;
    footer?: Snippet;
};
declare const Sidebar: Component<$$ComponentProps, {}, "collapsed">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
