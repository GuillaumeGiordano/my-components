type $$ComponentProps = {
    words: string[];
    interval?: number;
    duration?: number;
    /** Controlled mode: when provided, shows words[index] and morphs on change instead of auto-cycling. */
    index?: number;
};
declare const MorphText: import("svelte").Component<$$ComponentProps, {}, "">;
type MorphText = ReturnType<typeof MorphText>;
export default MorphText;
