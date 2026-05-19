type $$ComponentProps = {
    value?: number;
    max?: number;
    readonly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    onchange?: (v: number) => void;
};
declare const Rating: import("svelte").Component<$$ComponentProps, {}, "value">;
type Rating = ReturnType<typeof Rating>;
export default Rating;
