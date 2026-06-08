type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    images: Array<{
        src: string;
        alt: string;
        caption?: string;
    }>;
    columns?: 2 | 3 | 4;
    withBackground?: "bg-base" | "";
};
declare const GallerySection: import("svelte").Component<$$ComponentProps, {}, "">;
type GallerySection = ReturnType<typeof GallerySection>;
export default GallerySection;
