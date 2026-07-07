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
    /** Show the collapse toggle (and enable its shortcut). False = always expanded. */
    collapsible?: boolean;
    /** Make it a full-height sticky app shell with a scrollable nav. */
    fill?: boolean;
    header?: Snippet;
    footer?: Snippet;
    /** Extra content appended inside the nav, after the groups. */
    children?: Snippet;
};
declare const Sidebar: Component<$$ComponentProps, {}, "collapsed">;
type Sidebar = ReturnType<typeof Sidebar>;
export default Sidebar;
