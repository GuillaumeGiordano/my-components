<script lang="ts">
  import '$lib/styles/demo-page.css';
  import OceanBackground from '$lib/components/ui/OceanBackground.svelte';
</script>

<svelte:head><title>Ocean Background — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Ocean Background</h1>
    <p>Fond marin animé — rayons lumineux, caustiques ondulantes et particules flottantes. Trois profondeurs prédéfinies.</p>
  </div>

  <!-- ── Shallow ── -->
  <section class="variant">
    <h2>Eau peu profonde — <code>depth="shallow"</code></h2>
    <OceanBackground depth="shallow">
      <div class="hero">
        <span class="badge badge--cyan">🐠 Récif corallien</span>
        <h2 class="hero-title">Eau turquoise</h2>
        <p class="hero-sub">Caustiques intenses, rayons vifs — profondeur 3-10m.</p>
      </div>
    </OceanBackground>
  </section>

  <!-- ── Deep ── -->
  <section class="variant">
    <h2>Fond marin — <code>depth="deep"</code> (défaut)</h2>
    <OceanBackground depth="deep">
      <div class="hero">
        <span class="badge badge--blue">🐳 Grande bleue</span>
        <h2 class="hero-title">Profondeur</h2>
        <p class="hero-sub">Caustiques atténuées, bulles lentes — 50-200m.</p>
      </div>
    </OceanBackground>
  </section>

  <!-- ── Abyss ── -->
  <section class="variant">
    <h2>Abysses — <code>depth="abyss"</code></h2>
    <OceanBackground depth="abyss" particleCount={20}>
      <div class="hero">
        <span class="badge badge--dark">🦑 Zone bathypélagique</span>
        <h2 class="hero-title">Ténèbres</h2>
        <p class="hero-sub">Quasi-obscurité, quelques rares particules — &gt;1000m.</p>
      </div>
    </OceanBackground>
  </section>

  <!-- ── Sans rayons ── -->
  <section class="variant">
    <h2>Sans rayons — <code>enableRays={false}</code></h2>
    <OceanBackground depth="shallow" enableRays={false}>
      <div class="hero hero--sm">
        <h2 class="hero-title">Caustiques seules</h2>
        <p class="hero-sub">Désactive les rayons pour un effet plus discret.</p>
      </div>
    </OceanBackground>
  </section>

  <!-- ── Background custom ── -->
  <section class="variant">
    <h2>Fond personnalisé — <code>background</code></h2>
    <OceanBackground background="linear-gradient(to bottom, #134e4a, #0f3d39, #052e2b)">
      <div class="hero hero--sm">
        <h2 class="hero-title">Lagune émeraude</h2>
        <p class="hero-sub">N'importe quelle valeur CSS — dégradé, couleur unie, etc.</p>
      </div>
    </OceanBackground>
  </section>

  <!-- ── Props ── -->
  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['children',       'Snippet',                    '—',       'Contenu superposé'],
        ['depth',          '"shallow"|"deep"|"abyss"',   '"deep"',  'Profondeur prédéfinie — choisit le dégradé et l\'intensité des caustiques'],
        ['background',     'string',                     '—',       'Surcharge complète du fond (prioritaire sur depth)'],
        ['particleCount',  'number',                     '50',      'Nombre de particules (bulles + débris)'],
        ['enableRays',     'boolean',                    'true',    'Affiche les rayons lumineux'],
        ['enableCaustics', 'boolean',                    'true',    'Affiche les caustiques ondulantes'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>

  <!-- ── Notes ── -->
  <section class="variant">
    <h2>Fonctionnement</h2>
    <ul class="notes">
      <li><strong>Caustiques</strong> — interférence de 3 sinusoïdes sur une grille 38px. Les points où l'amplitude dépasse un seuil sont dessinés comme spots lumineux flous.</li>
      <li><strong>Rayons</strong> — trapèzes translucides avec gradient linéaire vertical, position oscillante selon <code>sin(t)</code>.</li>
      <li><strong>Profondeur</strong> — contrôle à la fois le dégradé CSS du fond et l'<code>alpha</code> max des caustiques (shallow 0.22 → abyss 0.05).</li>
      <li>Canvas avec <code>ResizeObserver</code> + guard <code>browser</code> pour le SSR.</li>
    </ul>
  </section>
</div>

<style>
  .hero {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 56px 32px; gap: 14px; min-height: 210px;
  }
  .hero--sm { padding: 36px 32px; min-height: 140px; }

  .badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 14px; border-radius: 99px;
    font-size: 12px; font-weight: 600; letter-spacing: 0.04em;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.07);
  }
  .badge--cyan { color: #a0f0ff; }
  .badge--blue { color: #93c5fd; }
  .badge--dark { color: rgba(255,255,255,0.45); }

  .hero-title { margin: 0; font-size: clamp(1.4rem, 3.5vw, 2.2rem); font-weight: 800; color: #f0f9ff; text-shadow: 0 2px 12px rgba(0,100,160,0.5); }
  .hero-sub   { margin: 0; font-size: 14px; color: rgba(160,230,255,0.6); max-width: 400px; line-height: 1.6; }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 140px 210px 80px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }

  .notes { display: flex; flex-direction: column; gap: 10px; padding-left: 20px; font-size: 14px; color: var(--text-muted); line-height: 1.65; }
</style>
