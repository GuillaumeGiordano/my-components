export type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};
export type KnowledgeEntry = {
    question: string;
    answer: string;
};
type $$ComponentProps = {
    open?: boolean;
    onMessage?: (history: ChatMessage[]) => Promise<string>;
    knowledge?: KnowledgeEntry[];
    apiEndpoint?: string;
    title?: string;
    placeholder?: string;
    initialMessage?: string;
    /** Edge the chatbot is anchored to — align it with its FloatingGroup position. */
    side?: "left" | "right";
};
declare const Chatbot: import("svelte").Component<$$ComponentProps, {}, "open">;
type Chatbot = ReturnType<typeof Chatbot>;
export default Chatbot;
