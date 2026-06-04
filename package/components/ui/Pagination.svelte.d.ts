type $$ComponentProps = {
    page?: number;
    total: number;
    siblings?: number;
    /** Nombre d'items affichés par page (bindable). */
    perPage?: number;
    /** Si non vide, affiche un sélecteur à droite de la pagination. */
    perPageOptions?: number[];
    onchange?: (page: number) => void;
    onPerPageChange?: (perPage: number) => void;
};
declare const Pagination: import("svelte").Component<$$ComponentProps, {}, "page" | "perPage">;
type Pagination = ReturnType<typeof Pagination>;
export default Pagination;
