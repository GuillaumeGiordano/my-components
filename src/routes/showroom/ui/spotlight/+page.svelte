<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Spotlight from '$lib/components/ui/Spotlight.svelte';
</script>

<svelte:head><title>Spotlight — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Spotlight</h1>
    <p>Section sombre avec une lumière qui suit la souris. Glisse le curseur sur la section.</p>
  </div>

  <section class="variant">
    <h2>Hero avec spotlight</h2>
    <Spotlight>
      <div class="hero">
        <span class="hero-badge">Nouveau</span>
        <h2 class="hero-title">Créez des interfaces<br/>qui <em>impressionnent</em></h2>
        <p class="hero-sub">Bibliothèque de composants Svelte 5 — animations fluides, accessibles, sans dépendances.</p>
        <div class="hero-actions">
          <button class="btn-primary">Commencer</button>
          <button class="btn-ghost">Voir la démo</button>
        </div>
      </div>
    </Spotlight>
  </section>

  <section class="variant">
    <h2>Couleur personnalisée — <code>color</code></h2>
    <Spotlight color="rgba(99,102,241,0.12)" size={400}>
      <div class="hero hero--sm">
        <h2 class="hero-title hero-title--sm">Teinte primaire</h2>
        <p class="hero-sub">Passe <code>color="rgba(99,102,241,0.12)"</code> pour une lueur colorée.</p>
      </div>
    </Spotlight>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['children', 'Snippet', '—',                      'Contenu de la section'],
        ['size',     'number',  '500',                    'Rayon du spotlight en px'],
        ['color',    'string',  '"rgba(255,255,255,0.07)"','Couleur de la lumière'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>
</div>

<style>
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 64px 32px;
    gap: 20px;
  }

  .hero--sm { padding: 40px 32px; }

  .hero-badge {
    display: inline-flex;
    padding: 3px 12px;
    border-radius: var(--radius-full);
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.7);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.05em;
  }

  .hero-title {
    margin: 0;
    font-size: clamp(1.75rem, 5vw, 3rem);
    font-weight: 800;
    color: #f8fafc;
    line-height: 1.2;
  }

  .hero-title--sm { font-size: clamp(1.25rem, 3vw, 2rem); }

  .hero-title em {
    font-style: normal;
    background: linear-gradient(135deg, #818cf8, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-sub {
    margin: 0;
    font-size: 15px;
    color: rgba(255,255,255,0.55);
    max-width: 500px;
    line-height: 1.6;
  }

  .hero-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }

  .btn-primary {
    padding: 10px 22px;
    border-radius: var(--radius-md);
    border: none;
    background: #6366f1;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: background 200ms ease;
    &:hover { background: #4f46e5; }
  }

  .btn-ghost {
    padding: 10px 22px;
    border-radius: var(--radius-md);
    border: 1px solid rgba(255,255,255,0.15);
    background: transparent;
    color: rgba(255,255,255,0.7);
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    transition: border-color 200ms ease, color 200ms ease;
    &:hover { border-color: rgba(255,255,255,0.35); color: #fff; }
  }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 80px 80px 220px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }
</style>
