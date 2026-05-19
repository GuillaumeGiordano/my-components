type $$ComponentProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    hint?: string;
    disabled?: boolean;
    rows?: number;
    id?: string;
    [key: string]: unknown;
};
declare const Textarea: import("svelte").Component<$$ComponentProps, {}, "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
