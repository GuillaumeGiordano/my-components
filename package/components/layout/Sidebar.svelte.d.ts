import type { Component } from "svelte";
type SidebarItem = {
    label: string;
    href: string;
    icon?: Component;
};
type SidebarGroup = {
    label: string;
    items: SidebarItem[];
};
type $$ComponentProps = {
    groups?: SidebarGroup[];
    collapsed?: boolean;
    activeHref?: string;
};
declare const Sidebar: Component<$$ComponentProps, {}, "collapsed">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
