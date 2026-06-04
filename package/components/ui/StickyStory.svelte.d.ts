export type StorySlide = {
    step?: string;
    title: string;
    body?: string;
    visual?: string;
    color?: string;
};
type $$ComponentProps = {
    slides: StorySlide[];
};
declare const StickyStory: import("svelte").Component<$$ComponentProps, {}, "">;
type StickyStory = ReturnType<typeof StickyStory>;
export default StickyStory;
