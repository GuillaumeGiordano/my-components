export type ChatMessage = {
    role: 'user' | 'assistant';
    content: string;
};
type $$ComponentProps = {
    onMessage: (history: ChatMessage[]) => Promise<string>;
    title?: string;
    placeholder?: string;
    initialMessage?: string;
    position?: 'bottom-right' | 'bottom-left';
};
declare const Chatbot: import("svelte").Component<$$ComponentProps, {}, "">;
type Chatbot = ReturnType<typeof Chatbot>;
export default Chatbot;
