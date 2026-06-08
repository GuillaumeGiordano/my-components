type $$ComponentProps = {
    badge?: string;
    title?: string;
    story: string;
    author?: {
        name: string;
        role: string;
        avatar?: string;
    };
    milestones?: Array<{
        year: string;
        title: string;
        description: string;
    }>;
    withBackground?: "bg-base" | "";
};
declare const AboutSectionV3: import("svelte").Component<$$ComponentProps, {}, "">;
type AboutSectionV3 = ReturnType<typeof AboutSectionV3>;
export default AboutSectionV3;
