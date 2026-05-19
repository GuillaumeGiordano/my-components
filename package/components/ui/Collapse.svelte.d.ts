import type { Snippet } from "svelte";
type $$ComponentProps = {
    name?: string;
    title: string;
    variant?: "default" | "bordered" | "card";
    isOpen?: boolean;
    children: Snippet;
};
declare const Collapse: import("svelte").Component<$$ComponentProps, {}, "">;
type Collapse = ReturnType<typeof Collapse>;
export default Collapse;
