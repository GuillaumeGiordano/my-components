type RadioOption = {
    value: string;
    label: string;
    hint?: string;
    disabled?: boolean;
};
type $$ComponentProps = {
    name?: string;
    legend: string;
    value?: string;
    options?: RadioOption[];
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    orientation?: 'vertical' | 'horizontal';
};
declare const RadioGroup: import("svelte").Component<$$ComponentProps, {}, "value">;
type RadioGroup = ReturnType<typeof RadioGroup>;
export default RadioGroup;
