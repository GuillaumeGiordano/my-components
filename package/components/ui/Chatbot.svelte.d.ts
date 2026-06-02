export type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};
export type KnowledgeEntry = {
    question: string;
    answer: string;
};
type $$ComponentProps = {
    onMessage?: (history: ChatMessage[]) => Promise<string>;
    knowledge?: KnowledgeEntry[];
    apiEndpoint?: string;
    title?: string;
    placeholder?: string;
    initialMessage?: string;
};
declare const Chatbot: import("svelte").Component<$$ComponentProps, {}, "">;
type Chatbot = ReturnType<typeof Chatbot>;
export default Chatbot;
