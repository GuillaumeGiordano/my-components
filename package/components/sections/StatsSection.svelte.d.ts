type $$ComponentProps = {
    badge?: string;
    title?: string;
    description?: string;
    stats: Array<{
        value: string;
        label: string;
        description?: string;
        prefix?: string;
        suffix?: string;
    }>;
    withBackground?: "bg-base" | "";
};
declare const StatsSection: import("svelte").Component<$$ComponentProps, {}, "">;
type StatsSection = ReturnType<typeof StatsSection>;
export default StatsSection;
