import type { Component } from "svelte";
import type { ScrollSection } from "./SectionScrollbar.svelte";
type $$ComponentProps = {
    sections?: ScrollSection[];
    /** Route → sections map. When `sections` is omitted, the dock auto-selects the
     *  entry whose key matches the current pathname ("*" acts as a default). */
    pages?: Record<string, ScrollSection[]>;
    /** Permanent button pinned in first position (a real link, e.g. back to home).
     *  Sits outside the scroll-spy/puck mechanics. */
    home?: ScrollSection;
    /** "desktop": always-visible pill. "mobile": collapsed FAB opening an overlay.
     *  "auto": switches to mobile below `mobileBreakpoint`. */
    mode?: "desktop" | "mobile" | "auto";
    /** Viewport width (px) under which "auto" mode collapses to the mobile FAB. */
    mobileBreakpoint?: number;
    /** Icon shown on the collapsed mobile FAB. */
    mobileIcon?: Component;
    /** Show the built-in mobile FAB. Set false to open only from an external
     *  trigger via `bind:open` (toggle it yourself). */
    showFab?: boolean;
    /** Edge the dock sits on — controls which side the tooltips appear. */
    side?: "left" | "right";
    /** Bindable open state of the mobile overlay (drive it from an external button). */
    open?: boolean;
};
declare const SectionNavDock: Component<$$ComponentProps, {}, "open" | "side">;
type SectionNavDock = ReturnType<typeof SectionNavDock>;
export default SectionNavDock;
