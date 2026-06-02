<script lang="ts">
  import { MessageCircle, X, Send, Bot } from "@lucide/svelte";

  export type ChatMessage = { role: "user" | "assistant"; content: string };
  export type KnowledgeEntry = { question: string; answer: string };

  let {
    onMessage,
    knowledge,
    apiEndpoint = "/api/chat",
    title = "Assistant",
    placeholder = "Posez une question…",
    initialMessage = "",
    position = "bottom-right",
  }: {
    onMessage?: (history: ChatMessage[]) => Promise<string>;
    knowledge?: KnowledgeEntry[];
    apiEndpoint?: string;
    title?: string;
    placeholder?: string;
    initialMessage?: string;
    position?: "bottom-right" | "bottom-left";
  } = $props();

  let open = $state(false);
  let loading = $state(false);
  let input = $state("");
  let messagesEl: HTMLDivElement | null = $state(null);

  const messages = $state<ChatMessage[]>(
    initialMessage ? [{ role: "assistant", content: initialMessage }] : [],
  );

  function scrollToBottom() {
    if (messagesEl) {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  }

  async function fetchKnowledge(history: ChatMessage[]): Promise<string> {
    const res = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history, knowledge }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.content;
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    input = "";
    messages.push({ role: "user", content: text });
    loading = true;

    await Promise.resolve();
    scrollToBottom();

    try {
      let reply: string;
      if (knowledge && knowledge.length > 0) {
        reply = await fetchKnowledge([...messages]);
      } else if (onMessage) {
        reply = await onMessage([...messages]);
      } else {
        reply = "Aucune source de réponse configurée (knowledge ou onMessage requis).";
      }
      messages.push({ role: "assistant", content: reply });
    } catch {
      messages.push({
        role: "assistant",
        content: "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      loading = false;
      await Promise.resolve();
      scrollToBottom();
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }
</script>

<div class="chatbot-root {position}">
  <!-- Floating toggle button -->
  <button
    class="toggle-btn"
    onclick={() => (open = !open)}
    aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
    aria-expanded={open}
  >
    {#if open}
      <X size={22} />
    {:else}
      <MessageCircle size={22} />
    {/if}
  </button>

  <!-- Chat panel -->
  {#if open}
    <div class="panel" role="dialog" aria-label={title}>
      <!-- Header -->
      <div class="panel-header">
        <div class="header-left">
          <span class="bot-icon"><Bot size={16} /></span>
          <span class="panel-title">{title}</span>
        </div>
        <button class="close-btn" onclick={() => (open = false)} aria-label="Fermer">
          <X size={16} />
        </button>
      </div>

      <!-- Messages -->
      <div class="messages" bind:this={messagesEl}>
        {#if messages.length === 0}
          <p class="empty-hint">Posez votre première question ci-dessous.</p>
        {/if}

        {#each messages as msg}
          <div class="message {msg.role}">
            {#if msg.role === "assistant"}
              <span class="avatar"><Bot size={14} /></span>
            {/if}
            <div class="bubble">{msg.content}</div>
          </div>
        {/each}

        {#if loading}
          <div class="message assistant">
            <span class="avatar"><Bot size={14} /></span>
            <div class="bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        {/if}
      </div>

      <!-- Input -->
      <div class="input-area">
        <textarea
          bind:value={input}
          onkeydown={onKeydown}
          {placeholder}
          rows={1}
          disabled={loading}
          aria-label="Message"
        ></textarea>
        <button
          class="send-btn"
          onclick={send}
          disabled={!input.trim() || loading}
          aria-label="Envoyer"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .chatbot-root {
    /* position: fixed;
    bottom: 24px;
    z-index: 1000; */
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
    gap: 12px;
  }

  .chatbot-root.bottom-right {
    /* right: 24px;
    align-items: flex-end; */
  }
  .chatbot-root.bottom-left {
    /* left: 24px;
    align-items: flex-start; */
  }

  /* ── Toggle button ── */
  .toggle-btn {
    width: 52px;
    height: 52px;
    border-radius: var(--radius-full);
    border: none;
    background: var(--primary);
    color: var(--primary-fg);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
    transition:
      background var(--transition-fast),
      transform var(--transition-fast);
    flex-shrink: 0;

    &:hover {
      background: var(--primary-hover);
      transform: scale(1.06);
    }
    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 3px;
    }
  }

  /* ── Panel ── */
  .panel {
    width: min(360px, calc(100dvw - 48px));
    height: min(520px, calc(100dvh - 120px));
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slide-up 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* ── Header ── */
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
    background: var(--bg-subtle);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .bot-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: var(--radius-full);
    background: var(--primary-subtle);
    color: var(--primary-subtle-fg);
  }

  .panel-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-heading);
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--text-subtle);
    border-radius: var(--radius-md);
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }
    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
  }

  /* ── Messages ── */
  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    scroll-behavior: smooth;
  }

  .empty-hint {
    font-size: 13px;
    color: var(--text-subtle);
    text-align: center;
    margin: auto;
  }

  .message {
    display: flex;
    align-items: flex-end;
    gap: 8px;

    &.user {
      flex-direction: row-reverse;
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: var(--radius-full);
    background: var(--primary-subtle);
    color: var(--primary-subtle-fg);
    flex-shrink: 0;
  }

  .bubble {
    max-width: 78%;
    padding: 9px 13px;
    border-radius: 16px;
    font-size: 13.5px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-break: break-word;

    .message.assistant & {
      background: var(--bg-subtle);
      color: var(--text-base);
      border-bottom-left-radius: 4px;
    }

    .message.user & {
      background: var(--primary);
      color: var(--primary-fg);
      border-bottom-right-radius: 4px;
    }
  }

  /* ── Typing indicator ── */
  .typing {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 16px;

    span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--text-subtle);
      animation: dot-bounce 1.2s ease-in-out infinite;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }
      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }

  /* ── Input area ── */
  .input-area {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }

  textarea {
    flex: 1;
    resize: none;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 9px 12px;
    font-size: 13.5px;
    font-family: var(--font-sans);
    background: var(--bg-base);
    color: var(--text-base);
    line-height: 1.5;
    max-height: 120px;
    overflow-y: auto;
    transition: border-color var(--transition-fast);

    &:focus {
      outline: none;
      border-color: var(--primary);
    }

    &::placeholder {
      color: var(--text-subtle);
    }
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .send-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-lg);
    border: none;
    background: var(--primary);
    color: var(--primary-fg);
    cursor: pointer;
    flex-shrink: 0;
    transition:
      background var(--transition-fast),
      opacity var(--transition-fast);

    &:hover:not(:disabled) {
      background: var(--primary-hover);
    }
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }
  }

  /* ── Animations ── */
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes dot-bounce {
    0%,
    80%,
    100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    40% {
      transform: translateY(-5px);
      opacity: 1;
    }
  }
</style>
