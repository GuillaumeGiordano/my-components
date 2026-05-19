import type { Component } from 'svelte';
type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    members: Array<{
        name: string;
        role: string;
        bio?: string;
        avatar?: string;
        links?: Array<{
            icon: Component;
            href: string;
            label: string;
        }>;
    }>;
};
declare const TeamSection: Component<$$ComponentProps, {}, "">;
type TeamSection = ReturnType<typeof TeamSection>;
export default TeamSection;
