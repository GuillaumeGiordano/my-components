<script lang="ts">
  import '$lib/styles/demo-page.css';
  import WordCloud from '$lib/components/ui/WordCloud.svelte';

  const techWords = [
    { text: 'Svelte',       weight: 95 },
    { text: 'TypeScript',   weight: 88 },
    { text: 'SvelteKit',    weight: 82 },
    { text: 'Tailwind',     weight: 78 },
    { text: 'Vite',         weight: 72 },
    { text: 'CSS',          weight: 70 },
    { text: 'HTML',         weight: 65 },
    { text: 'Node.js',      weight: 60 },
    { text: 'Git',          weight: 58 },
    { text: 'GitHub',       weight: 52 },
    { text: 'REST',         weight: 48 },
    { text: 'GraphQL',      weight: 40 },
    { text: 'Docker',       weight: 36 },
    { text: 'PostgreSQL',   weight: 32 },
    { text: 'Redis',        weight: 25 },
    { text: 'Cloudflare',   weight: 22 },
    { text: 'WebSockets',   weight: 18 },
    { text: 'PWA',          weight: 15 },
  ];

  const conceptWords = [
    { text: 'Réactivité',    weight: 90 },
    { text: 'Composants',    weight: 85 },
    { text: 'Accessibilité', weight: 80 },
    { text: 'Performance',   weight: 75 },
    { text: 'SSR',           weight: 70 },
    { text: 'Animations',    weight: 65 },
    { text: 'Tokens',        weight: 55 },
    { text: 'Dark mode',     weight: 50 },
    { text: 'Responsive',    weight: 48 },
    { text: 'TypeSafety',    weight: 42 },
    { text: 'Runes',         weight: 40 },
    { text: 'Snippets',      weight: 35 },
    { text: 'Stores',        weight: 28 },
    { text: 'Hydration',     weight: 22 },
    { text: 'Islands',       weight: 18 },
  ];
</script>

<svelte:head><title>Word Cloud — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Word Cloud</h1>
    <p>Nuage de mots dont la taille est proportionnelle au poids. Survole un mot pour l'agrandir.</p>
  </div>

  <section class="variant">
    <h2>Stack technique</h2>
    <div class="cloud-wrap">
      <WordCloud words={techWords} />
    </div>
  </section>

  <section class="variant">
    <h2>Concepts front-end</h2>
    <div class="cloud-wrap">
      <WordCloud words={conceptWords} minSize={14} maxSize={44} />
    </div>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['words',   '{ text: string; weight: number }[]', '[]',  'Liste des mots avec leur poids'],
        ['minSize', 'number',                             '13',  'Taille de fonte minimale (px)'],
        ['maxSize', 'number',                             '52',  'Taille de fonte maximale (px)'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>

  <section class="variant">
    <h2>Notes</h2>
    <ul class="notes">
      <li>La taille et l'opacité sont interpolées linéairement entre le poids min et max de la liste.</li>
      <li>Les rotations sont déterministes (hash du texte) — le rendu est stable entre les rerenders.</li>
      <li>Le hover annule la rotation et scale légèrement le mot.</li>
    </ul>
  </section>
</div>

<style>
  .cloud-wrap {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--bg-subtle);
    min-height: 180px;
  }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 80px 240px 60px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }

  .notes { display: flex; flex-direction: column; gap: 8px; padding-left: 20px; font-size: 14px; color: var(--text-muted); line-height: 1.6; }
</style>
