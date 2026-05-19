type $$ComponentProps = {
    badge?: string;
    title?: string;
    logos: Array<{
        name: string;
        src?: string;
        href?: string;
        width?: number;
    }>;
    marquee?: boolean;
    variant?: 'default' | 'muted';
};
declare const LogoCloudSection: import("svelte").Component<$$ComponentProps, {}, "">;
type LogoCloudSection = ReturnType<typeof LogoCloudSection>;
export default LogoCloudSection;
