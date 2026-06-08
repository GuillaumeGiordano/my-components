export type ComponentEntry = {
    slug: string;
    label: string;
    description?: string;
};
export type ComponentCategory = {
    slug: string;
    label: string;
    /** Route prefix override — defaults to slug if omitted. */
    baseSlug?: string;
    components: ComponentEntry[];
};
export declare const categories: ComponentCategory[];
