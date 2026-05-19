import type { Component } from 'svelte';
type TimelineItem = {
    title: string;
    description?: string;
    date?: string;
    icon?: Component;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
};
type $$ComponentProps = {
    items: TimelineItem[];
};
declare const Timeline: Component<$$ComponentProps, {}, "">;
type Timeline = ReturnType<typeof Timeline>;
export default Timeline;
