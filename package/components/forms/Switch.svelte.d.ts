type $$ComponentProps = {
    id?: string;
    name?: string;
    label: string;
    checked?: boolean;
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    labelPosition?: 'left' | 'right';
};
declare const Switch: import("svelte").Component<$$ComponentProps, {}, "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
