import type { Component } from "svelte";
type $$ComponentProps = {
    label: string;
    icon?: Component;
    variant?: "default" | "danger";
    disabled?: boolean;
    onclick?: () => void;
};
declare const ButtonActionItem: Component<$$ComponentProps, {}, "">;
type ButtonActionItem = ReturnType<typeof ButtonActionItem>;
export default ButtonActionItem;
