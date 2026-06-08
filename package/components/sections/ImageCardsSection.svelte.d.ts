type $$ComponentProps = {
    badge?: string;
    title?: string;
    description?: string;
    cards: Array<{
        src: string;
        alt: string;
        title: string;
        text?: string;
        href?: string;
    }>;
    columns?: 2 | 3 | 4;
    withBackground?: "bg-base" | "";
};
declare const ImageCardsSection: import("svelte").Component<$$ComponentProps, {}, "">;
type ImageCardsSection = ReturnType<typeof ImageCardsSection>;
export default ImageCardsSection;
