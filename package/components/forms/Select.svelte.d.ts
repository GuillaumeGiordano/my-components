type Option = {
    value: string;
    label: string;
    disabled?: boolean;
};
type $$ComponentProps = {
    id?: string;
    name?: string;
    label: string;
    value?: string;
    options?: Option[];
    placeholder?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
};
declare const Select: import("svelte").Component<$$ComponentProps, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
