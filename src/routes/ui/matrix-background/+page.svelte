<script lang="ts">
  import '$lib/styles/demo-page.css';
  import MatrixBackground from '$lib/components/ui/MatrixBackground.svelte';
</script>

<svelte:head><title>Matrix Background — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Matrix Background</h1>
    <p>Pluie de caractères katakana — technique semi-transparente pour les traînées. Canvas.</p>
  </div>

  <section class="variant">
    <h2>Défaut — vert Matrix</h2>
    <MatrixBackground>
      <div class="hero">
        <h2 class="hero-title">WAKE UP, NEO</h2>
        <p class="hero-sub">Caractères katakana et numériques. Tête blanche, corps vert, traînée par fondu.</p>
      </div>
    </MatrixBackground>
  </section>

  <section class="variant">
    <h2>Rapide — <code>speed={3}</code></h2>
    <MatrixBackground speed={3} fontSize={12}>
      <div class="hero hero--sm">
        <h2 class="hero-title">Overflow</h2>
        <p class="hero-sub">Vitesse max, fonte 12px — plus de colonnes.</p>
      </div>
    </MatrixBackground>
  </section>

  <section class="variant">
    <h2>Couleur personnalisée — cyan</h2>
    <MatrixBackground color="#22d3ee" headColor="#ffffff" background="#001a1a" fontSize={16} speed={2}>
      <div class="hero">
        <h2 class="hero-title hero-title--cyan">SYSTEM OVERRIDE</h2>
        <p class="hero-sub">Cyan sur fond très sombre — <code>color="#22d3ee"</code>.</p>
      </div>
    </MatrixBackground>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['children',   'Snippet', '—',        'Contenu superposé'],
        ['color',      'string',  '"#00ff41"', 'Couleur des caractères de la traînée'],
        ['headColor',  'string',  '"#ccffcc"', 'Couleur du caractère de tête'],
        ['background', 'string',  '"#000000"', 'Fond (doit être sombre)'],
        ['fontSize',   'number',  '14',        'Taille des caractères en px'],
        ['speed',      'number',  '2',         'Vitesse de chute (1-3)'],
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
  .hero--sm { padding: 32px 32px; min-height: 130px; }
  .hero-title { margin: 0; font-size: clamp(1.3rem, 4vw, 2.2rem); font-weight: 900; color: #00ff41; font-family: monospace; letter-spacing: 0.12em; text-shadow: 0 0 20px #00ff4180; }
  .hero-title--cyan { color: #22d3ee; text-shadow: 0 0 20px #22d3ee80; }
  .hero-sub   { margin: 0; font-size: 13px; color: rgba(0,255,65,0.5); max-width: 400px; line-height: 1.55; font-family: monospace; }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 100px 80px 100px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }
</style>
