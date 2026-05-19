type Variant = "default" | "primary" | "success" | "warning" | "danger" | "info";
type Size = "sm" | "md";
type $$ComponentProps = {
    label: string;
    variant?: Variant;
    size?: Size;
    dot?: boolean;
};
declare const Badge: import("svelte").Component<$$ComponentProps, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
