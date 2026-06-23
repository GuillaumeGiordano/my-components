import type { ScrollSection } from "./SectionScrollbar.svelte";
type $$ComponentProps = {
    sections?: ScrollSection[];
    /** Edge the dock sits on — controls which side the tooltips appear. */
    side?: "left" | "right";
};
declare const SectionNavDock: import("svelte").Component<$$ComponentProps, {}, "side">;
type SectionNavDock = ReturnType<typeof SectionNavDock>;
export default SectionNavDock;
