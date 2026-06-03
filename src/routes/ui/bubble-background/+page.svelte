<script lang="ts">
  import '$lib/styles/demo-page.css';
  import BubbleBackground from '$lib/components/ui/BubbleBackground.svelte';
</script>

<svelte:head><title>Bubble Background — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Bubble Background</h1>
    <p>Bulles transparentes qui montent avec un léger reflet — canvas avec dérive aléatoire.</p>
  </div>

  <section class="variant">
    <h2>Défaut — couleur primaire</h2>
    <BubbleBackground>
      <div class="hero">
        <h2 class="hero-title">Légèreté</h2>
        <p class="hero-sub">20 bulles de tailles variées — montée lente avec dérive horizontale.</p>
      </div>
    </BubbleBackground>
  </section>

  <section class="variant">
    <h2>Fond sombre + couleur cyan</h2>
    <BubbleBackground background="#0c1a2e" color="#22d3ee" bubbleCount={30}>
      <div class="hero">
        <h2 class="hero-title hero-title--white">Profondeur</h2>
        <p class="hero-sub hero-sub--white">30 bulles cyan sur fond sombre — effet aquatique.</p>
      </div>
    </BubbleBackground>
  </section>

  <section class="variant">
    <h2>Peu de bulles — <code>bubbleCount={8}</code></h2>
    <BubbleBackground bubbleCount={8} background="var(--bg-subtle)">
      <div class="hero hero--sm">
        <h2 class="hero-title">Version épurée</h2>
      </div>
    </BubbleBackground>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['children',     'Snippet', '—',                 'Contenu superposé'],
        ['bubbleCount',  'number',  '20',                'Nombre de bulles'],
        ['color',        'string',  '"var(--primary)"',  'Couleur des bulles — hex, rgb ou var()'],
        ['background',   'string',  '"var(--bg-base)"',  'Fond du conteneur'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>
</div>

<style>
  .hero {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 52px 32px; gap: 12px; min-height: 200px;
  }
  .hero--sm { padding: 36px 32px; min-height: 140px; }
  .hero-title { margin: 0; font-size: clamp(1.3rem, 3vw, 2rem); font-weight: 800; color: var(--text-heading); }
  .hero-title--white { color: #f8fafc; }
  .hero-sub   { margin: 0; font-size: 14px; color: var(--text-muted); max-width: 400px; line-height: 1.55; }
  .hero-sub--white { color: rgba(255,255,255,0.5); }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 120px 80px 180px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }
</style>
