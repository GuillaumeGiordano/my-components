type $$ComponentProps = {
    id?: string;
    name?: string;
    label: string;
    hint?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    multiple?: boolean;
    accept?: string;
};
declare const FileInput: import("svelte").Component<$$ComponentProps, {}, "">;
type FileInput = ReturnType<typeof FileInput>;
export default FileInput;
