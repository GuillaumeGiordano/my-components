import type { Component, Snippet } from 'svelte';
type Platform = 'ios' | 'android' | 'windows' | 'mac' | 'linux' | 'web';
type Store = {
    platform: Platform;
    label: string;
    sublabel?: string;
    href: string;
    icon?: Component;
};
type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    stores: Store[];
    visual?: Snippet;
    stats?: Array<{
        value: string;
        label: string;
    }>;
    align?: 'center' | 'split';
    withBackground?: "bg-base" | "";
};
declare const DownloadSection: Component<$$ComponentProps, {}, "">;
type DownloadSection = ReturnType<typeof DownloadSection>;
export default DownloadSection;
