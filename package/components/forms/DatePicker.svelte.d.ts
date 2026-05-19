type $$ComponentProps = {
    id?: string;
    name?: string;
    label: string;
    value?: string;
    placeholder?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    min?: string;
    max?: string;
};
declare const DatePicker: import("svelte").Component<$$ComponentProps, {}, "value">;
type DatePicker = ReturnType<typeof DatePicker>;
export default DatePicker;
