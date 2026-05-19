type $$ComponentProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    showValue?: boolean;
    formatValue?: (v: number) => string;
    disabled?: boolean;
    hint?: string;
    onchange?: (v: number) => void;
};
declare const Slider: import("svelte").Component<$$ComponentProps, {}, "value">;
type Slider = ReturnType<typeof Slider>;
export default Slider;
