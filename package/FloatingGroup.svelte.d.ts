import type { Snippet } from "svelte";
type $$ComponentProps = {
    children: Snippet;
    position: "top-left" | "top" | "top-right" | "left" | "right" | "bottom-left" | "bottom" | "bottom-right";
    scrollAware?: boolean;
};
declare const FloatingGroup: import("svelte").Component<$$ComponentProps, {}, "">;
type FloatingGroup = ReturnType<typeof FloatingGroup>;
export default FloatingGroup;
