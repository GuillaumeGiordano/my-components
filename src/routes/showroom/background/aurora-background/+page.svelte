<script lang="ts">
  import '$lib/styles/demo-page.css';
  import AuroraBackground from '$lib/components/ui/AuroraBackground.svelte';
</script>

<svelte:head><title>Aurora Background — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Aurora Background</h1>
    <p>Aurore boréale CSS — 4 couches floues animées indépendamment. Aucun canvas.</p>
  </div>

  <section class="variant">
    <h2>Défaut — fond très sombre</h2>
    <AuroraBackground>
      <div class="hero">
        <span class="badge">Aurora</span>
        <h2 class="hero-title">Quelque part dans le Nord</h2>
        <p class="hero-sub">Vert, violet, cyan et indigo — 4 couches animées à des vitesses différentes.</p>
      </div>
    </AuroraBackground>
  </section>

  <section class="variant">
    <h2>Intensité réduite — <code>intensity={0.35}</code></h2>
    <AuroraBackground intensity={0.35}>
      <div class="hero hero--sm">
        <h2 class="hero-title">Lueur discrète</h2>
        <p class="hero-sub">Parfait pour un fond subtil derrière du contenu dense.</p>
      </div>
    </AuroraBackground>
  </section>

  <section class="variant">
    <h2>Fond profond — <code>background="#000814"</code></h2>
    <AuroraBackground background="#000814" intensity={0.8}>
      <div class="hero">
        <h2 class="hero-title">Intensité maximale</h2>
        <p class="hero-sub">Plus le fond est sombre, plus les couleurs ressortent.</p>
      </div>
    </AuroraBackground>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['children',   'Snippet', '—',        'Contenu superposé aux couches'],
        ['background', 'string',  '"#020617"', 'Couleur du fond (sombre de préférence)'],
        ['intensity',  'number',  '0.65',      'Opacité des couches (0 → 1)'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>

  <section class="variant">
    <h2>Notes</h2>
    <ul class="notes">
      <li>CSS pur — 4 <code>&lt;div&gt;</code> avec <code>filter: blur(72px)</code> et <code>animation</code> différents.</li>
      <li>Les couleurs fixes sont : vert (#4ade80), indigo (#818cf8), cyan (#22d3ee), violet (#a855f7).</li>
      <li>Pour changer les couleurs, le composant peut être forké facilement — les 4 layers sont dans le <code>&lt;style&gt;</code>.</li>
    </ul>
  </section>
</div>

<style>
  .hero {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 60px 32px; gap: 16px; min-height: 220px;
  }
  .hero--sm { padding: 36px 32px; min-height: 140px; }
  .badge {
    display: inline-flex; padding: 3px 12px; border-radius: 99px;
    border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.6); font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
  }
  .hero-title { margin: 0; font-size: clamp(1.4rem, 3.5vw, 2.2rem); font-weight: 800; color: #f8fafc; }
  .hero-sub   { margin: 0; font-size: 14px; color: rgba(255,255,255,0.5); max-width: 420px; line-height: 1.6; }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 100px 80px 100px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }

  .notes { display: flex; flex-direction: column; gap: 8px; padding-left: 20px; font-size: 14px; color: var(--text-muted); line-height: 1.6; }
</style>
