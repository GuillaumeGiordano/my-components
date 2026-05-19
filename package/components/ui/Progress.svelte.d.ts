type $$ComponentProps = {
    value?: number;
    max?: number;
    variant?: 'linear' | 'circular';
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    showValue?: boolean;
    animated?: boolean;
    color?: 'primary' | 'success' | 'warning' | 'danger';
};
declare const Progress: import("svelte").Component<$$ComponentProps, {}, "">;
type Progress = ReturnType<typeof Progress>;
export default Progress;
