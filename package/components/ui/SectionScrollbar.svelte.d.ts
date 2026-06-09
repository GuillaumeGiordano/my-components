import type { Component } from "svelte";
export type ScrollSection = {
    label: string;
    href: string;
    icon?: Component;
};
type $$ComponentProps = {
    sections?: ScrollSection[];
    size?: number;
};
declare const SectionScrollbar: Component<$$ComponentProps, {}, "">;
type SectionScrollbar = ReturnType<typeof SectionScrollbar>;
export default SectionScrollbar;
