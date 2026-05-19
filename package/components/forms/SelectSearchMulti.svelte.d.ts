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
    searchPlaceholder?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
};
declare const SelectSearchMulti: import("svelte").Component<$$ComponentProps, {}, "value">;
type SelectSearchMulti = ReturnType<typeof SelectSearchMulti>;
export default SelectSearchMulti;
