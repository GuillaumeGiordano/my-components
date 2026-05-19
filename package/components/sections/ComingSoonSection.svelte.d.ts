type $$ComponentProps = {
    badge?: string;
    title?: string;
    description?: string;
    launchDate?: Date;
    emailPlaceholder?: string;
    ctaLabel?: string;
    onsubmit?: (email: string) => void;
};
declare const ComingSoonSection: import("svelte").Component<$$ComponentProps, {}, "">;
type ComingSoonSection = ReturnType<typeof ComingSoonSection>;
export default ComingSoonSection;
