export type ComponentEntry = {
    slug: string;
    label: string;
    description?: string;
};
export type ComponentCategory = {
    slug: string;
    label: string;
    components: ComponentEntry[];
};
export declare const categories: ComponentCategory[];
