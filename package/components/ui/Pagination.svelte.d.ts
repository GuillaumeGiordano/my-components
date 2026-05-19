type $$ComponentProps = {
    page?: number;
    total: number;
    siblings?: number;
    onchange?: (page: number) => void;
};
declare const Pagination: import("svelte").Component<$$ComponentProps, {}, "page">;
type Pagination = ReturnType<typeof Pagination>;
export default Pagination;
