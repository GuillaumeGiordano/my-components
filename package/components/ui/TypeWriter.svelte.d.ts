type $$ComponentProps = {
    prefix?: string;
    words?: string[];
    typeSpeed?: number;
    deleteSpeed?: number;
    pauseDuration?: number;
    cursor?: boolean;
    cursorChar?: string;
};
declare const TypeWriter: import("svelte").Component<$$ComponentProps, {}, "">;
type TypeWriter = ReturnType<typeof TypeWriter>;
export default TypeWriter;
