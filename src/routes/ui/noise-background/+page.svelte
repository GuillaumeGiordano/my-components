<script lang="ts">
  import '$lib/styles/demo-page.css';
  import NoiseBackground from '$lib/components/ui/NoiseBackground.svelte';
</script>

<svelte:head><title>Noise Background — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Noise Background</h1>
    <p>Blobs flous en mouvement lent sur canvas — effet "liquid noise" ou "lava lamp" coloré.</p>
  </div>

  <section class="variant">
    <h2>Défaut — palette vibrante</h2>
    <NoiseBackground>
      <div class="hero">
        <h2 class="hero-title">Liquid Noise</h2>
        <p class="hero-sub">4 blobs flous (indigo, rose, orange, cyan) animés indépendamment.</p>
      </div>
    </NoiseBackground>
  </section>

  <section class="variant">
    <h2>Palette froide</h2>
    <NoiseBackground colors={['#0ea5e9', '#6366f1', '#8b5cf6', '#22d3ee']} background="#030712" speed={0.3}>
      <div class="hero">
        <h2 class="hero-title">Palette froide</h2>
        <p class="hero-sub">Bleus et violets sur fond très sombre — vitesse 0.3×.</p>
      </div>
    </NoiseBackground>
  </section>

  <section class="variant">
    <h2>Blur réduit — <code>blurAmount={40}</code></h2>
    <NoiseBackground blurAmount={40} colors={['#f97316', '#ef4444', '#f59e0b']} background="#1a0a00" speed={0.6}>
      <div class="hero">
        <h2 class="hero-title">Formes distinctes</h2>
        <p class="hero-sub">Moins de flou → blobs plus définis, effet plus "brut".</p>
      </div>
    </NoiseBackground>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['children',   'Snippet',  '—',                           'Contenu superposé'],
        ['colors',     'string[]', "['#6366f1','#ec4899',…]",     'Couleurs des blobs — hex, rgb, hsl uniquement'],
        ['background', 'string',   '"#0f172a"',                   'Fond (sombre de préférence)'],
        ['blurAmount', 'number',   '90',                          'Rayon de flou en px (plus élevé = plus doux)'],
        ['speed',      'number',   '0.4',                         'Vitesse de déplacement des blobs'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>

  <section class="variant">
    <h2>Notes</h2>
    <ul class="notes">
      <li>Les couleurs doivent être des valeurs CSS directes (hex, rgb, hsl) — les <code>var()</code> ne sont pas supportées ici car canvas ne peut pas les résoudre.</li>
      <li>Un <code>blurAmount</code> élevé (~80-120) donne un effet liquide. Plus faible (~20-40) révèle les formes.</li>
      <li>Le <code>ResizeObserver</code> réinitialise les blobs à chaque redimensionnement.</li>
    </ul>
  </section>
</div>

<style>
  .hero {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 52px 32px; gap: 12px; min-height: 200px;
  }
  .hero-title { margin: 0; font-size: clamp(1.3rem, 3vw, 2rem); font-weight: 800; color: #f8fafc; }
  .hero-sub   { margin: 0; font-size: 14px; color: rgba(255,255,255,0.5); max-width: 420px; line-height: 1.6; }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 100px 90px 210px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }
  .notes { display: flex; flex-direction: column; gap: 8px; padding-left: 20px; font-size: 14px; color: var(--text-muted); line-height: 1.6; }
</style>
