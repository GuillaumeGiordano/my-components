type $$ComponentProps = {
    id?: string;
    title: string;
    description?: string;
    items?: Array<{
        label: string;
        description?: string;
    }>;
    columns?: 1 | 2 | 3;
    withBackground?: "bg-base" | "";
};
declare const ChecklistSection: import("svelte").Component<$$ComponentProps, {}, "">;
type ChecklistSection = ReturnType<typeof ChecklistSection>;
export default ChecklistSection;
