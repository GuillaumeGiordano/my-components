export type CommandItem = {
    id: string;
    label: string;
    group?: string;
    shortcut?: string;
    icon?: string;
    action: () => void;
};
type $$ComponentProps = {
    items?: CommandItem[];
    triggerKey?: string;
    placeholder?: string;
};
declare const CommandPalette: import("svelte").Component<$$ComponentProps, {}, "">;
type CommandPalette = ReturnType<typeof CommandPalette>;
export default CommandPalette;
