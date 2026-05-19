type $$ComponentProps = {
    value?: string;
    length?: number;
    label?: string;
    error?: string;
    hint?: string;
    disabled?: boolean;
    onComplete?: (v: string) => void;
};
declare const OtpInput: import("svelte").Component<$$ComponentProps, {}, "value">;
type OtpInput = ReturnType<typeof OtpInput>;
export default OtpInput;
