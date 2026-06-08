type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    placeholder?: string;
    ctaLabel?: string;
    hint?: string;
    onsubmit?: (email: string) => void;
    variant?: 'default' | 'card';
    withBackground?: "bg-base" | "";
};
declare const NewsletterSection: import("svelte").Component<$$ComponentProps, {}, "">;
type NewsletterSection = ReturnType<typeof NewsletterSection>;
export default NewsletterSection;
