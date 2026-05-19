type $$ComponentProps = {
    id?: string;
    name?: string;
    label: string;
    startValue?: string;
    endValue?: string;
    placeholder?: [string, string];
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    min?: string;
    max?: string;
};
declare const DateRangePicker: import("svelte").Component<$$ComponentProps, {}, "startValue" | "endValue">;
type DateRangePicker = ReturnType<typeof DateRangePicker>;
export default DateRangePicker;
