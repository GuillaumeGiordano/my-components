<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Chatbot from '$lib/components/ui/Chatbot.svelte';
  import type { KnowledgeEntry } from '$lib/components/ui/Chatbot.svelte';

  // Ta base de connaissances — remplace avec tes propres Q/R
  const knowledge: KnowledgeEntry[] = [
    {
      question: 'Quels sont vos horaires ?',
      answer: 'Nous sommes ouverts du lundi au vendredi de 9h à 18h, et le samedi de 10h à 14h.',
    },
    {
      question: 'Comment retourner un article ?',
      answer: 'Vous avez 30 jours à compter de la réception pour retourner tout article non utilisé et dans son emballage d\'origine. Contactez-nous par email pour obtenir l\'étiquette de retour.',
    },
    {
      question: 'Quels modes de paiement acceptez-vous ?',
      answer: 'Nous acceptons les cartes Visa, Mastercard, American Express, ainsi que PayPal et le virement bancaire.',
    },
    {
      question: 'Livrez-vous à l\'étranger ?',
      answer: 'Oui, nous livrons dans toute l\'Europe. Les délais varient de 3 à 7 jours ouvrés selon le pays. Les frais de port sont offerts dès 80€ d\'achat.',
    },
    {
      question: 'Comment contacter le service client ?',
      answer: 'Vous pouvez nous joindre par email à support@exemple.com ou par téléphone au 01 23 45 67 89, du lundi au vendredi de 9h à 17h.',
    },
    {
      question: 'Où en est ma commande ?',
      answer: 'Un email avec le numéro de suivi vous est envoyé dès l\'expédition. Vous pouvez suivre votre colis directement sur le site du transporteur.',
    },
  ];
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
      Le chatbot est en bas à droite. Il utilise les Q/R définies dans
      <code>knowledge</code>. Nécessite <code>ANTHROPIC_API_KEY</code> dans <code>.env</code>.
    </p>
    <p class="hint">Essaie : <em>"Vous livrez en Espagne ?"</em> ou <em>"Comment vous payer ?"</em></p>
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
/&gt;</code></pre>
    <p class="hint">
      Tu peux aussi charger le JSON depuis un fichier :
      <code>import knowledge from './faq.json'</code>
    </p>
  </section>

  <section class="variant">
    <h2>Configuration requise</h2>
    <pre class="code-block"><code
># .env
ANTHROPIC_API_KEY=sk-ant-...   # console.anthropic.com → API Keys</code></pre>
  </section>
</div>

<!-- Le composant est fixed — il flotte sur la page -->
<Chatbot
  {knowledge}
  title="Support"
  initialMessage="Bonjour ! Posez-moi une question sur nos services."
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
    margin-top: 6px;
  }

  .hint em {
    font-style: italic;
    color: var(--primary);
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
