<script lang="ts">
  import "$lib/styles/demo-page.css";
  import Chatbot from "$lib/components/ui/Chatbot.svelte";
  import knowledge from "./knowledge.json";
  import FloatingGroup from "$lib/FloatingGroup.svelte";
</script>

<svelte:head>
  <title>Chatbot — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Chatbot</h1>
    <p>
      Widget conversationnel avec base de connaissances JSON. L'IA répond
      <strong>uniquement</strong> depuis tes données — rien d'inventé.
    </p>
  </div>

  <section class="variant">
    <h2>Démo active</h2>
    <p class="hint">
      Le chatbot est en bas à droite. Il répond sur G2webdev et tous les composants de la
      bibliothèque. Nécessite <code>GROQ_API_KEY</code> dans <code>.env</code>.
    </p>
    <p class="hint">
      Essaie : <em>"Quels services propose G2webdev ?"</em> ou
      <em>"Comment utiliser le composant Modal ?"</em>
    </p>
  </section>

  <section class="variant">
    <h2>Structure du JSON</h2>
    <pre class="code-block"><code
        >const knowledge = [
  &#123;
    question: "Quels sont vos horaires ?",
    answer:   "Ouvert lundi–vendredi 9h–18h.",
  &#125;,
  &#123;
    question: "Comment retourner un article ?",
    answer:   "30 jours, emballage d'origine. Email pour l'étiquette.",
  &#125;,
  // ... autant d'entrées que nécessaire
];

&lt;Chatbot
  &#123;knowledge&#125;
  title="Support"
  initialMessage="Bonjour ! Comment puis-je vous aider ?"
/&gt;</code
      ></pre>
    <p class="hint">
      Tu peux aussi charger le JSON depuis un fichier :
      <code>import knowledge from './faq.json'</code>
    </p>
  </section>

  <section class="variant">
    <h2>Configuration — Groq (actif, gratuit)</h2>
    <ol class="steps">
      <li>
        Crée un compte sur <strong>console.groq.com</strong> (connexion Google suffisante)
      </li>
      <li>Va dans <strong>API Keys → Create API Key</strong> et copie la clé</li>
      <li>Ajoute-la dans ton <code>.env</code> :</li>
    </ol>
    <pre class="code-block"><code
        ># .env
GROQ_API_KEY=gsk_...   # console.groq.com → API Keys</code
      ></pre>
    <p class="hint">
      Modèle utilisé : <code>llama-3.3-70b-versatile</code> — très capable, généreux en tokens
      gratuits.
    </p>
  </section>

  <section class="variant">
    <h2>Configuration — Anthropic Claude (optionnel, payant)</h2>
    <ol class="steps">
      <li>Crée un compte sur <strong>console.anthropic.com</strong></li>
      <li>Va dans <strong>API Keys</strong> et génère une clé</li>
      <li>Ajoute des crédits dans <strong>Plans &amp; Billing</strong> (min. $5)</li>
      <li>Ajoute la clé dans ton <code>.env</code> :</li>
    </ol>
    <pre class="code-block"><code
        ># .env
ANTHROPIC_API_KEY=sk-ant-...   # console.anthropic.com → API Keys</code
      ></pre>
    <p class="hint">
      Pour basculer sur Anthropic, modifie une ligne dans
      <code>src/routes/api/chat/+server.ts</code> :
    </p>
    <pre class="code-block"><code
        >// Remplacer :
const content = await callGroq(system, messages);
// Par :
const content = await callAnthropic(system, messages);</code
      ></pre>
  </section>

  <section class="variant">
    <h2>Redémarrage requis</h2>
    <p class="hint">
      Vite ne relit pas <code>.env</code> à chaud. Après chaque modification de la clé,
      redémarre le serveur : <code>Ctrl+C</code> puis <code>npm run dev</code>.
    </p>
  </section>
</div>

<!-- Le composant est fixed — il flotte sur la page -->
<FloatingGroup position="right">
  <Chatbot
    {knowledge}
    title="G2webdev — Assistant"
    initialMessage="Bonjour ! Je peux vous renseigner sur G2webdev et les composants de la bibliothèque. Comment puis-je vous aider ?"
  />
</FloatingGroup>

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
    margin-top: 6px;
  }

  .hint em {
    font-style: italic;
    color: var(--primary);
  }

  .steps {
    padding-left: 20px;
    margin: 0 0 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
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
    margin-top: 12px;
  }

  .code-block code {
    background: none;
    padding: 0;
    font-size: inherit;
  }
</style>
