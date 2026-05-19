type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    posts: Array<{
        title: string;
        excerpt: string;
        category: string;
        author: {
            name: string;
            avatar?: string;
        };
        date: string;
        readTime?: string;
        image?: string;
        href?: string;
    }>;
    columns?: 2 | 3;
    showCta?: boolean;
    ctaLabel?: string;
    ctaHref?: string;
};
declare const BlogGridSection: import("svelte").Component<$$ComponentProps, {}, "">;
type BlogGridSection = ReturnType<typeof BlogGridSection>;
export default BlogGridSection;
