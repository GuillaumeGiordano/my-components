type $$ComponentProps = {
    variant?: 'rect' | 'text' | 'circle';
    width?: string;
    height?: string;
    lines?: number;
    circle?: boolean;
};
declare const Skeleton: import("svelte").Component<$$ComponentProps, {}, "">;
type Skeleton = ReturnType<typeof Skeleton>;
export default Skeleton;
