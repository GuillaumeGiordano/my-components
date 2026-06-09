import type { Snippet } from "svelte";
type $$ComponentProps = {
    children?: Snippet;
    background?: string;
    color?: string;
    dropCount?: number;
    /** Angle de vent en degrés */
    windAngle?: number;
    speed?: number;
};
declare const RainBackground: import("svelte").Component<$$ComponentProps, {}, "">;
type RainBackground = ReturnType<typeof RainBackground>;
export default RainBackground;
