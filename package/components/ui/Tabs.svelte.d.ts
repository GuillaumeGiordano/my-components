import type { Snippet } from 'svelte';
type $$ComponentProps = {
    tabs: {
        id: string;
        label: string;
    }[];
    value?: string;
    variant?: 'default' | 'pills' | 'underline';
    children?: Snippet<[string]>;
};
declare const Tabs: import("svelte").Component<$$ComponentProps, {}, "value">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
