type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    images: Array<{
        src: string;
        alt: string;
        caption?: string;
        category?: string;
    }>;
    columns?: 2 | 3 | 4;
    layout?: 'grid' | 'masonry' | 'featured';
};
declare const GallerySectionV2: import("svelte").Component<$$ComponentProps, {}, "">;
type GallerySectionV2 = ReturnType<typeof GallerySectionV2>;
export default GallerySectionV2;
