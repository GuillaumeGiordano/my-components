type BreadcrumbItem = {
    label: string;
    href?: string;
};
type $$ComponentProps = {
    items: BreadcrumbItem[];
    showHome?: boolean;
    maxItems?: number;
};
declare const Breadcrumb: import("svelte").Component<$$ComponentProps, {}, "">;
type Breadcrumb = ReturnType<typeof Breadcrumb>;
export default Breadcrumb;
