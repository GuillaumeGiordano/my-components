type $$ComponentProps = {
    tags?: string[];
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    maxTags?: number;
    error?: string;
    hint?: string;
    onchange?: (tags: string[]) => void;
};
declare const TagInput: import("svelte").Component<$$ComponentProps, {}, "tags">;
type TagInput = ReturnType<typeof TagInput>;
export default TagInput;
