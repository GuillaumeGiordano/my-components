type $$ComponentProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    disabled?: boolean;
    error?: string;
    hint?: string;
    onchange?: (v: number) => void;
};
declare const NumberInput: import("svelte").Component<$$ComponentProps, {}, "value">;
type NumberInput = ReturnType<typeof NumberInput>;
export default NumberInput;
