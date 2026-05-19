import type { Component } from 'svelte';
type Step = {
    label: string;
    description?: string;
    icon?: Component;
};
type $$ComponentProps = {
    steps: Step[];
    current?: number;
    orientation?: 'horizontal' | 'vertical';
    variant?: 'numbered' | 'dotted';
};
declare const Stepper: Component<$$ComponentProps, {}, "">;
type Stepper = ReturnType<typeof Stepper>;
export default Stepper;
