type Option = {
    value: string;
    label: string;
    disabled?: boolean;
};
type $$ComponentProps = {
    id?: string;
    name?: string;
    label: string;
    value?: string[];
    options?: Option[];
    placeholder?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
};
declare const SelectMulti: import("svelte").Component<$$ComponentProps, {}, "value">;
type SelectMulti = ReturnType<typeof SelectMulti>;
export default SelectMulti;
