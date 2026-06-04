type $$ComponentProps = {
    text: string;
    speed?: number;
    chars?: string;
    autoplay?: boolean;
    stagger?: number;
};
declare const ScrambleText: import("svelte").Component<$$ComponentProps, {
    scramble: () => void;
}, "">;
type ScrambleText = ReturnType<typeof ScrambleText>;
export default ScrambleText;
