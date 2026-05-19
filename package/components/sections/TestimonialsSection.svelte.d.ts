type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    testimonials: Array<{
        name: string;
        role: string;
        company?: string;
        initials?: string;
        content: string;
        rating?: number;
    }>;
    addClass?: string;
};
declare const TestimonialsSection: import("svelte").Component<$$ComponentProps, {}, "">;
type TestimonialsSection = ReturnType<typeof TestimonialsSection>;
export default TestimonialsSection;
