<script lang="ts">
  import '$lib/styles/demo-page.css';
  import GradientBackground from '$lib/components/ui/GradientBackground.svelte';
</script>

<svelte:head><title>Gradient Background — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Gradient Background</h1>
    <p>Gradient animé CSS pur — aucun canvas, zéro JS en runtime. Couleurs et vitesse configurables.</p>
  </div>

  <section class="variant">
    <h2>Défaut — palette vibrante</h2>
    <GradientBackground>
      <div class="hero">
        <h2 class="hero-title">Dégradé en mouvement</h2>
        <p class="hero-sub">4 couleurs interpolées sur 400% de surface, animées en boucle.</p>
      </div>
    </GradientBackground>
  </section>

  <section class="variant">
    <h2>Palette froide — <code>duration={12}</code></h2>
    <GradientBackground colors={['#0ea5e9', '#6366f1', '#8b5cf6', '#06b6d4']} duration={12}>
      <div class="hero">
        <h2 class="hero-title">Palette froide</h2>
        <p class="hero-sub">Bleus, violets, cyans — transition plus lente.</p>
      </div>
    </GradientBackground>
  </section>

  <section class="variant">
    <h2>Palette chaude — <code>angle={135}</code></h2>
    <GradientBackground colors={['#f97316', '#ef4444', '#f59e0b', '#ec4899']} duration={6} angle={135}>
      <div class="hero">
        <h2 class="hero-title">Palette chaude</h2>
        <p class="hero-sub">Oranges, rouges, roses — angle 135° et vitesse rapide.</p>
      </div>
    </GradientBackground>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['children', 'Snippet',  '—',                              'Contenu superposé'],
        ['colors',   'string[]', "['#6366f1','#ec4899',…]",        'Tableau de couleurs CSS (hex, rgb, hsl)'],
        ['duration', 'number',   '8',                              'Durée d\'un cycle complet (secondes)'],
        ['angle',    'number',   '-45',                            'Angle du dégradé (degrés)'],
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
  .hero-title { margin: 0; font-size: clamp(1.25rem, 3vw, 2rem); font-weight: 800; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.3); }
  .hero-sub   { margin: 0; font-size: 14px; color: rgba(255,255,255,0.8); max-width: 400px; line-height: 1.55; }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 80px 100px 200px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }
</style>
