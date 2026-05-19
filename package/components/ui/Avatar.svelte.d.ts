type Size = "xs" | "sm" | "md" | "lg" | "xl";
type $$ComponentProps = {
    src?: string;
    alt?: string;
    name?: string;
    size?: Size;
    shape?: "circle" | "square";
};
declare const Avatar: import("svelte").Component<$$ComponentProps, {}, "">;
type Avatar = ReturnType<typeof Avatar>;
export default Avatar;
