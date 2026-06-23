type $$ComponentProps = {
    id?: string;
    title?: string;
    description?: string;
    stats: Array<{
        value: string;
        label: string;
        description?: string;
        prefix?: string;
        suffix?: string;
    }>;
    withBackground?: "bg-base" | "bg-subtle" | "bg-accent" | "bg-primary" | "";
};
declare const StatsSection: import("svelte").Component<$$ComponentProps, {}, "">;
type StatsSection = ReturnType<typeof StatsSection>;
export default StatsSection;
