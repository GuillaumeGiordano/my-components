import type { Component } from "svelte";
type $$ComponentProps = {
    id?: string;
    title: string;
    description?: string;
    steps: Array<{
        icon: Component;
        title: string;
        description: string;
        badge?: string;
        cta?: {
            label: string;
            href: string;
        };
    }>;
    withBackground?: "bg-base" | "";
    /** Vertical gap between rows — any CSS length. Negative values overlap the rows (e.g. "-60px"). */
    gap?: string;
    /** Minimum section height — keeps the frame full even when a negative gap shrinks the content (e.g. "100vh"). */
    minHeight?: string;
};
declare const ProcessTimelineSection: Component<$$ComponentProps, {}, "">;
type ProcessTimelineSection = ReturnType<typeof ProcessTimelineSection>;
export default ProcessTimelineSection;
