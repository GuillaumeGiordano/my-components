type $$ComponentProps = {
    words?: {
        text: string;
        weight: number;
    }[];
    minSize?: number;
    maxSize?: number;
};
declare const WordCloud: import("svelte").Component<$$ComponentProps, {}, "">;
type WordCloud = ReturnType<typeof WordCloud>;
export default WordCloud;
