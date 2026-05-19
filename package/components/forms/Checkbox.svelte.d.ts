type $$ComponentProps = {
    id?: string;
    name?: string;
    label: string;
    checked?: boolean;
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
};
declare const Checkbox: import("svelte").Component<$$ComponentProps, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
