<script lang="ts">
  import '$lib/styles/demo-page.css';
  import StarfieldBackground from '$lib/components/ui/StarfieldBackground.svelte';
</script>

<svelte:head><title>Starfield Background — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Starfield Background</h1>
    <p>Voyage dans les étoiles — projection 3D→2D avec motion blur. Canvas + requestAnimationFrame.</p>
  </div>

  <section class="variant">
    <h2>Défaut — 250 étoiles blanches</h2>
    <StarfieldBackground>
      <div class="hero">
        <h2 class="hero-title">∞ Au-delà des étoiles</h2>
        <p class="hero-sub">250 étoiles en perspective, avec traînée proportionnelle à la vitesse.</p>
      </div>
    </StarfieldBackground>
  </section>

  <section class="variant">
    <h2>Vitesse rapide — <code>speed={3}</code></h2>
    <StarfieldBackground speed={3} starCount={300} background="#00000a">
      <div class="hero">
        <h2 class="hero-title">Warp speed</h2>
        <p class="hero-sub">300 étoiles à vitesse 3× — les traînées s'allongent.</p>
      </div>
    </StarfieldBackground>
  </section>

  <section class="variant">
    <h2>Étoiles colorées — <code>color="#818cf8"</code></h2>
    <StarfieldBackground color="#818cf8" background="#020617" speed={1.5} starCount={200}>
      <div class="hero">
        <h2 class="hero-title">Nébuleuse violette</h2>
        <p class="hero-sub">La couleur des étoiles est entièrement configurable.</p>
      </div>
    </StarfieldBackground>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['children',   'Snippet', '—',        'Contenu superposé'],
        ['starCount',  'number',  '250',       'Nombre d\'étoiles'],
        ['speed',      'number',  '1',         'Vitesse d\'approche (multiplieur)'],
        ['color',      'string',  '"#ffffff"', 'Couleur des étoiles'],
        ['background', 'string',  '"#000010"', 'Couleur du fond'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>
</div>

<style>
  .hero {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 56px 32px; gap: 12px; min-height: 200px;
  }
  .hero-title { margin: 0; font-size: clamp(1.3rem, 3vw, 2rem); font-weight: 800; color: #fff; }
  .hero-sub   { margin: 0; font-size: 14px; color: rgba(255,255,255,0.5); max-width: 420px; line-height: 1.6; }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 100px 80px 100px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }
</style>
