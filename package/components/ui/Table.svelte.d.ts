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
    };
    exports: {};
    bindings: "selected";
    slots: {};
    events: {};
};
declare class __sveltets_Render<T extends Record<string, unknown>> {
    props(): ReturnType<typeof $$render<T>>['props'];
    events(): ReturnType<typeof $$render<T>>['events'];
    slots(): ReturnType<typeof $$render<T>>['slots'];
    bindings(): "selected";
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
