import type { Component } from "svelte";
type $$ComponentProps = {
    badge?: string;
    title: string;
    description: string;
    stats?: Array<{
        value: string;
        label: string;
        prefix?: string;
        suffix?: string;
    }>;
    values?: Array<{
        icon: Component;
        title: string;
        description: string;
    }>;
    columns?: 2 | 3 | 4;
    withBackground?: "bg-base" | "";
};
declare const AboutSectionV2: Component<$$ComponentProps, {}, "">;
type AboutSectionV2 = ReturnType<typeof AboutSectionV2>;
export default AboutSectionV2;
