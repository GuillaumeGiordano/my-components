import type { Component, Snippet } from 'svelte';
type OnboardingStep = {
    label: string;
    title: string;
    description: string;
    icon?: Component;
    visual?: Snippet;
};
type $$ComponentProps = {
    steps: OnboardingStep[];
    current?: number;
    onComplete?: () => void;
    onSkip?: () => void;
    withBackground?: "bg-base" | "";
};
declare const OnboardingSection: Component<$$ComponentProps, {}, "current">;
type OnboardingSection = ReturnType<typeof OnboardingSection>;
export default OnboardingSection;
