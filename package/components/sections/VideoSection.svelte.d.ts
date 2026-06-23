type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    videoUrl?: string;
    thumbnailSrc?: string;
    thumbnailAlt?: string;
    aspectRatio?: "16/9" | "4/3" | "1/1";
    autoplay?: boolean;
    withBackground?: "bg-base" | "";
};
declare const VideoSection: import("svelte").Component<$$ComponentProps, {}, "">;
type VideoSection = ReturnType<typeof VideoSection>;
export default VideoSection;
