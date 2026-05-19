import type { Snippet, Component } from "svelte";
type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";
type $$ComponentProps = {
    label: string;
    variant?: Variant;
    size?: Size;
    icon?: Component;
    addClass?: string;
    items: Snippet<[() => void]>;
};
declare const ButtonAction: Component<$$ComponentProps, {}, "">;
type ButtonAction = ReturnType<typeof ButtonAction>;
export default ButtonAction;
