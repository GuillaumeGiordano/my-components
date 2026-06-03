<script lang="ts">
  import '$lib/styles/demo-page.css';
  import SwipeCard from '$lib/components/ui/SwipeCard.svelte';

  type Fact = { emoji: string; title: string; body: string; color: string };

  const ALL_FACTS: Fact[] = [
    { emoji: '🦕', title: 'Svelte 5',        body: 'Les Runes remplacent les stores et les réactivités implicites par une API explicite et compacte.',               color: '#f97316' },
    { emoji: '⚡', title: 'Vite',             body: 'Vite démarre un serveur de dev en moins de 300ms, même sur de gros projets — grâce à l\'ESM natif.',           color: '#6366f1' },
    { emoji: '🎨', title: 'Tailwind CSS 4',  body: 'La version 4 est écrite en Rust, supprime le fichier de config JS et compile 10× plus vite.',                  color: '#0ea5e9' },
    { emoji: '🔷', title: 'TypeScript',       body: 'TypeScript est désormais compris nativement par Node.js (--experimental-strip-types) depuis v22.6.',            color: '#3b82f6' },
    { emoji: '🌐', title: 'SvelteKit',        body: 'SvelteKit supporte les Server Actions, les islands et le streaming RSC depuis la version 2.',                  color: '#22c55e' },
    { emoji: '🐇', title: 'Bun',             body: 'Bun est 5× plus rapide que npm pour l\'installation des dépendances et embarque un runtime JS ultra-rapide.',  color: '#f59e0b' },
  ];

  function buildDeck() {
    return [...ALL_FACTS];
  }

  let deck = $state<Fact[]>(buildDeck());
  let history = $state<{ card: Fact; dir: string }[]>([]);

  function onswipe(card: Fact, dir: 'left' | 'right') {
    history = [{ card, dir }, ...history.slice(0, 2)];
  }

  function reset() {
    deck    = buildDeck();
    history = [];
  }
</script>

<svelte:head><title>Swipe Card — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Swipe Card</h1>
    <p>Cartes empilées — glisse ou tire à gauche/droite pour les écarter. Touch + souris supportés.</p>
  </div>

  <section class="variant">
    <h2>Démo — fun facts tech</h2>
    <p class="hint">← rejeter &nbsp;|&nbsp; → garder &nbsp;—&nbsp; tire la carte au delà du seuil.</p>

    <SwipeCard bind:cards={deck} {onswipe}>
      {#snippet renderCard(card: Fact)}
        <div class="fact-card" style="--c:{card.color}">
          <div class="fact-emoji">{card.emoji}</div>
          <div class="fact-body">
            <h3 class="fact-title">{card.title}</h3>
            <p class="fact-text">{card.body}</p>
          </div>
          <div class="fact-footer">{deck.length} restante{deck.length > 1 ? 's' : ''}</div>
        </div>
      {/snippet}
    </SwipeCard>

    <div class="controls">
      {#if deck.length === 0}
        <button class="btn-reset" onclick={reset}>↺ Recommencer ({ALL_FACTS.length} cartes)</button>
      {:else}
        <span class="deck-count">{deck.length} / {ALL_FACTS.length}</span>
      {/if}
    </div>

    {#if history.length > 0}
      <div class="history">
        <span class="history-label">Dernières :</span>
        {#each history as h}
          <span class="history-item history-item--{h.dir}">
            {h.dir === 'right' ? '✓' : '✕'} {h.card.title}
          </span>
        {/each}
      </div>
    {/if}
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['cards',      'T[] (bindable)',                 '[]',  'Tableau de cartes — la dernière est celle du dessus'],
        ['renderCard', 'Snippet<[T, number]>',           '—',   'Snippet pour le rendu de chaque carte'],
        ['onswipe',    '(card: T, dir) => void',         '—',   'Callback après chaque swipe'],
        ['threshold',  'number',                         '80',  'Distance en px pour valider un swipe'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>
</div>

<style>
  .hint { font-size: 13px; color: var(--text-muted); margin-bottom: 16px; }

  .fact-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 220px;
  }

  .fact-emoji {
    font-size: 40px;
    padding: 24px 24px 0;
    line-height: 1;
  }

  .fact-body {
    flex: 1;
    padding: 12px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .fact-title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--c);
  }

  .fact-text {
    margin: 0;
    font-size: 13px;
    line-height: 1.55;
    color: var(--text-muted);
  }

  .fact-footer {
    padding: 10px 24px;
    font-size: 11px;
    color: var(--text-subtle);
    border-top: 1px solid var(--border);
    text-align: right;
  }

  .controls {
    margin-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  .btn-reset {
    padding: 8px 18px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--bg-base);
    color: var(--text-base);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 150ms ease;
    &:hover { background: var(--bg-hover); }
  }

  .deck-count { font-size: 13px; color: var(--text-subtle); }

  .history {
    margin-top: 12px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
  }

  .history-label { font-size: 12px; color: var(--text-subtle); }

  .history-item {
    font-size: 12px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: var(--radius-full);
  }

  .history-item--right { background: color-mix(in srgb, #22c55e 12%, transparent); color: #16a34a; }
  .history-item--left  { background: color-mix(in srgb, #ef4444 12%, transparent); color: #dc2626; }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 110px 200px 60px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }
</style>
