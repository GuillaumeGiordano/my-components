import type { Snippet } from 'svelte';
type $$ComponentProps = {
    children: Snippet;
    onSearch?: (values: Record<string, string | string[]>) => void;
    onReset?: () => void;
    loading?: boolean;
    collapsible?: boolean;
    columns?: number;
    title?: string;
    /** Encode les filtres dans l'URL et remet page=1 à chaque recherche */
    urlDriven?: boolean;
};
declare const SearchFilters: import("svelte").Component<$$ComponentProps, {}, "">;
type SearchFilters = ReturnType<typeof SearchFilters>;
export default SearchFilters;
