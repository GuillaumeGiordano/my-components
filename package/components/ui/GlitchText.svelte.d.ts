type $$ComponentProps = {
    text: string;
    frequency?: number;
    /** 0 = subtil, 1 = normal, 2 = extrême */
    intensity?: number;
};
declare const GlitchText: import("svelte").Component<$$ComponentProps, {}, "">;
type GlitchText = ReturnType<typeof GlitchText>;
export default GlitchText;
