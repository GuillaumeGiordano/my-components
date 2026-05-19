type $$ComponentProps = {
    badge?: string;
    title: string;
    description?: string;
    faqs: Array<{
        question: string;
        answer: string;
    }>;
    columns?: 1 | 2;
};
declare const FAQSection: import("svelte").Component<$$ComponentProps, {}, "">;
type FAQSection = ReturnType<typeof FAQSection>;
export default FAQSection;
