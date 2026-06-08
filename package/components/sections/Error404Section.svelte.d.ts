type $$ComponentProps = {
    code?: string;
    title?: string;
    description?: string;
    cta?: {
        label: string;
        href?: string;
        onclick?: () => void;
    };
    secondaryCta?: {
        label: string;
        href?: string;
        onclick?: () => void;
    };
    withBackground?: "bg-base" | "";
};
declare const Error404Section: import("svelte").Component<$$ComponentProps, {}, "">;
type Error404Section = ReturnType<typeof Error404Section>;
export default Error404Section;
