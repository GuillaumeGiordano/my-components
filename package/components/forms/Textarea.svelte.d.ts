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
    readonly?: boolean;
    rows?: number;
    maxlength?: number;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
};
declare const Textarea: import("svelte").Component<$$ComponentProps, {}, "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
