import type { Component } from "svelte";
type $$ComponentProps = {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    hint?: string;
    disabled?: boolean;
    icon?: Component;
    id?: string;
    [key: string]: unknown;
};
declare const Input: Component<$$ComponentProps, {}, "value">;
type Input = ReturnType<typeof Input>;
export default Input;
