type $$ComponentProps = {
    text: string;
    /** Position de la "ligne de lecture" dans le viewport (0-1). */
    readingLine?: number;
    class?: string;
};
declare const TextReveal: import("svelte").Component<$$ComponentProps, {}, "">;
type TextReveal = ReturnType<typeof TextReveal>;
export default TextReveal;
