import type { Snippet } from "svelte";
type $$ComponentProps = {
    children: Snippet;
    header?: Snippet;
    footer?: Snippet;
    hoverable?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
    class?: string;
};
declare const Card: import("svelte").Component<$$ComponentProps, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
