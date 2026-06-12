import type { Component, Snippet } from "svelte";
type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";
type $$ComponentProps = {
    variant?: Variant;
    size?: Size;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    href?: string;
    icon?: Component;
    iconRight?: Component;
    children?: Snippet;
    onclick?: (e: MouseEvent) => void;
    [key: string]: unknown;
};
declare const Button: Component<$$ComponentProps, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
