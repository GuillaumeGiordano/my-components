import type { ScrollSection } from "./SectionScrollbar.svelte";
type $$ComponentProps = {
    sections?: ScrollSection[];
    /** Which edge the rail sits on — mirrors the layout so labels slide inward. */
    side?: "left" | "right";
};
declare const SectionNavRail: import("svelte").Component<$$ComponentProps, {}, "side">;
type SectionNavRail = ReturnType<typeof SectionNavRail>;
export default SectionNavRail;
