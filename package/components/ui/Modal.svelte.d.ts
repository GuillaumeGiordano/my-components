import type { Snippet } from "svelte";
type $$ComponentProps = {
    id: string;
    title?: string;
    variant?: "default" | "drawer" | "bottom-sheet";
    size?: "sm" | "md" | "lg" | "full";
    overlayClose?: boolean;
    children: Snippet;
    footer?: Snippet<[() => void]>;
};
declare const Modal: import("svelte").Component<$$ComponentProps, {}, "">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
