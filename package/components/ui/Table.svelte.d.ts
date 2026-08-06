import type { Snippet } from 'svelte';
declare function $$render<T extends Record<string, unknown>>(): {
    props: {
        columns: {
            key: keyof T;
            label: string;
            sortable?: boolean;
            width?: string;
            align?: "left" | "center" | "right";
            cell?: Snippet<[T]> | undefined;
        }[];
        rows: T[];
        selectable?: boolean;
        striped?: boolean;
        stickyHeader?: boolean;
        emptyLabel?: string;
        selected?: T[];
        onrowclick?: (row: T) => void;
        /**
         * Server-side ("manual") sorting. When true, the table does NOT sort `rows` itself
         * (the backend already returned them sorted); it only reflects `sortKey`/`sortDir`
         * and calls `onsort` on header click so the parent can refetch. Default: client sort.
         */
        manualSort?: boolean;
        /** Current sort column (bindable). In manual mode, controlled by the parent. */
        sortKey?: keyof T | null;
        /** Current sort direction (bindable). */
        sortDir?: "desc" | "asc";
        /** Fired when a sortable header is clicked, with the next sort state. */
        onsort?: (key: keyof T, dir: "desc" | "asc") => void;
    };
    exports: {};
    bindings: "selected" | "sortKey" | "sortDir";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T extends Record<string, unknown>> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "selected" | "sortKey" | "sortDir";
    exports(): {};
}
interface $$IsomorphicComponent {
    new <T extends Record<string, unknown>>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<T>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<T>['props']>, ReturnType<__sveltets_Render<T>['events']>, ReturnType<__sveltets_Render<T>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<T>['bindings']>;
    } & ReturnType<__sveltets_Render<T>['exports']>;
    <T extends Record<string, unknown>>(internal: unknown, props: ReturnType<__sveltets_Render<T>['props']> & {}): ReturnType<__sveltets_Render<T>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>;
}
declare const Table: $$IsomorphicComponent;
type Table<T extends Record<string, unknown>> = InstanceType<typeof Table<T>>;
export default Table;
