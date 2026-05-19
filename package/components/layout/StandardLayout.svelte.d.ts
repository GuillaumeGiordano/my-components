import type { Snippet } from "svelte";
type $$ComponentProps = {
    header?: Snippet;
    sidebar?: Snippet;
    main: Snippet;
    footer?: Snippet;
    hasSidebar?: boolean;
};
declare const StandardLayout: import("svelte").Component<$$ComponentProps, {}, "">;
type StandardLayout = ReturnType<typeof StandardLayout>;
export default StandardLayout;
