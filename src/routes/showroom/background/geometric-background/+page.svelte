<script lang="ts">
  import '$lib/styles/demo-page.css';
  import GeometricBackground from '$lib/components/ui/GeometricBackground.svelte';
</script>

<svelte:head><title>Geometric Background — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Geometric Background</h1>
    <p>Formes géométriques flottantes CSS — positions déterministes (stable SSR), animations indépendantes.</p>
  </div>

  <section class="variant">
    <h2>Fond clair — couleur primaire</h2>
    <GeometricBackground>
      <div class="hero">
        <h2 class="hero-title">Design géométrique</h2>
        <p class="hero-sub">14 formes (cercles, carrés, anneaux) — flottent à des vitesses différentes.</p>
      </div>
    </GeometricBackground>
  </section>

  <section class="variant">
    <h2>Fond sombre + couleur cyan</h2>
    <GeometricBackground background="#0f172a" color="#22d3ee" opacity={0.12} count={18}>
      <div class="hero">
        <h2 class="hero-title hero-title--white">Fond sombre</h2>
        <p class="hero-sub hero-sub--white">18 formes cyan sur fond ardoise — <code style="color:rgba(255,255,255,0.5)">opacity={0.12}</code>.</p>
      </div>
    </GeometricBackground>
  </section>

  <section class="variant">
    <h2>Densité réduite — <code>count={6} opacity={0.07}</code></h2>
    <GeometricBackground count={6} opacity={0.07} background="var(--bg-base)">
      <div class="hero hero--sm">
        <h2 class="hero-title">Très subtil</h2>
        <p class="hero-sub">6 formes, faible opacité — idéal derrière du texte dense.</p>
      </div>
    </GeometricBackground>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['children',   'Snippet', '—',                 'Contenu superposé'],
        ['count',      'number',  '14',                'Nombre de formes'],
        ['color',      'string',  '"var(--primary)"',  'Couleur des bordures'],
        ['background', 'string',  '"var(--bg-subtle)"','Fond du conteneur'],
        ['opacity',    'number',  '0.1',               'Opacité globale des formes'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>
</div>

<style>
  .hero {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 52px 32px; gap: 12px; min-height: 180px;
  }
  .hero--sm { padding: 36px 32px; min-height: 120px; }
  .hero-title { margin: 0; font-size: clamp(1.25rem, 3vw, 1.8rem); font-weight: 800; color: var(--text-heading); }
  .hero-title--white { color: #f8fafc; }
  .hero-sub   { margin: 0; font-size: 14px; color: var(--text-muted); max-width: 400px; line-height: 1.55; }
  .hero-sub--white { color: rgba(255,255,255,0.5); }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 90px 80px 170px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }
</style>
