<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Chatbot from '$lib/components/ui/Chatbot.svelte';
  import type { ChatMessage } from '$lib/components/ui/Chatbot.svelte';

  // Mock handler — simule un délai et retourne une réponse fictive
  async function mockOnMessage(history: ChatMessage[]): Promise<string> {
    await new Promise((r) => setTimeout(r, 900));
    const last = history.at(-1)?.content ?? '';
    return `Vous avez dit : "${last}". Connectez un vrai handler pour une réponse IA.`;
  }

  /*
  // Exemple avec l'API Anthropic (depuis un endpoint SvelteKit) :
  async function claudeOnMessage(history: ChatMessage[]): Promise<string> {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    });
    const data = await res.json();
    return data.content;
  }

  // Votre endpoint /api/chat/+server.ts :
  // import Anthropic from '@anthropic-ai/sdk';
  // const client = new Anthropic({ apiKey: import.meta.env.ANTHROPIC_API_KEY });
  // const response = await client.messages.create({
  //   model: 'claude-opus-4-7',
  //   max_tokens: 1024,
  //   messages: body.messages,
  // });
  // return json({ content: response.content[0].text });
  */
</script>

<svelte:head>
  <title>Chatbot — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Chatbot</h1>
    <p>
      Widget conversationnel flottant — provider-agnostic. Passez un callback
      <code>onMessage</code> pour le brancher sur Claude, OpenAI ou n'importe quelle API.
    </p>
  </div>

  <section class="variant">
    <h2>Démo (mock)</h2>
    <p class="hint">Le chatbot est visible en bas à droite de la page.</p>
  </section>

  <section class="variant">
    <h2>Branchement Anthropic API</h2>
    <pre class="code-block"><code
>// 1. Installer le SDK
npm install @anthropic-ai/sdk

// 2. Créer src/routes/api/chat/+server.ts
import Anthropic from '@anthropic-ai/sdk';
import &#123; json &#125; from '@sveltejs/kit';

const client = new Anthropic(&#123; apiKey: import.meta.env.ANTHROPIC_API_KEY &#125;);

export async function POST(&#123; request &#125;) &#123;
  const &#123; messages &#125; = await request.json();
  const response = await client.messages.create(&#123;
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    messages,
  &#125;);
  return json(&#123; content: response.content[0].text &#125;);
&#125;

// 3. Brancher le composant
async function onMessage(history) &#123;
  const res = await fetch('/api/chat', &#123;
    method: 'POST',
    headers: &#123; 'Content-Type': 'application/json' &#125;,
    body: JSON.stringify(&#123; messages: history &#125;),
  &#125;);
  const data = await res.json();
  return data.content;
&#125;
</code></pre>
  </section>
</div>

<!-- Le composant est positionné fixed — il vit en dehors du flux de la page -->
<Chatbot
  onMessage={mockOnMessage}
  title="Assistant"
  initialMessage="Bonjour ! Je suis un mock. Connectez l'API Claude pour de vraies réponses."
/>

<style>
  code {
    font-family: var(--font-mono);
    font-size: 0.85em;
    background: var(--bg-subtle);
    padding: 1px 5px;
    border-radius: var(--radius-sm);
  }

  .hint {
    font-size: 14px;
    color: var(--text-muted);
  }

  .code-block {
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 16px;
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.6;
    white-space: pre;
  }

  .code-block code {
    background: none;
    padding: 0;
    font-size: inherit;
  }
</style>
