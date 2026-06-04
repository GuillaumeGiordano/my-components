export type ProgressSection = {
    id: string;
    label: string;
};
type $$ComponentProps = {
    sections?: ProgressSection[];
    side?: 'left' | 'right';
    showLabels?: boolean;
};
declare const ScrollProgress: import("svelte").Component<$$ComponentProps, {}, "">;
type ScrollProgress = ReturnType<typeof ScrollProgress>;
export default ScrollProgress;
