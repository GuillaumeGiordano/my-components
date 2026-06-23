import type { ScrollSection } from "./SectionScrollbar.svelte";
type $$ComponentProps = {
    sections?: ScrollSection[];
    /** Route → sections map. When `sections` is omitted, the dock auto-selects the
     *  entry whose key matches the current pathname ("*" acts as a default). */
    pages?: Record<string, ScrollSection[]>;
    /** Permanent button pinned in first position (a real link, e.g. back to home).
     *  Sits outside the scroll-spy/puck mechanics. */
    home?: ScrollSection;
    /** Edge the dock sits on — controls which side the tooltips appear. */
    side?: "left" | "right";
};
declare const SectionNavDock: import("svelte").Component<$$ComponentProps, {}, "side">;
type SectionNavDock = ReturnType<typeof SectionNavDock>;
export default SectionNavDock;
