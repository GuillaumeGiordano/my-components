<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ScrollProgress from '$lib/components/ui/ScrollProgress.svelte';
  import type { ProgressSection } from '$lib/components/ui/ScrollProgress.svelte';

  const sections: ProgressSection[] = [
    { id: 'intro',      label: 'Introduction' },
    { id: 'features',   label: 'Fonctionnalités' },
    { id: 'usage',      label: 'Usage' },
    { id: 'conclusion', label: 'Conclusion' },
  ];
</script>

<svelte:head><title>Scroll Progress — UI</title></svelte:head>

<ScrollProgress {sections} side="right" />

<div class="page">
  <div class="page-header">
    <h1>Scroll Progress</h1>
    <p>Sidebar fixe — ligne de progression + dots de section cliquables. Fais défiler pour voir.</p>
  </div>
</div>

<section id="intro" class="content-section">
  <div class="section-inner">
    <span class="section-badge">Introduction</span>
    <h2>Qu'est-ce que ScrollProgress ?</h2>
    <p>Un composant sidebar fixe qui montre ta progression dans la page. La ligne verticale monte avec ton scroll. Chaque dot correspond à une section — clique dessus pour y naviguer.</p>
    <p>Idéal pour les articles longs, les pages de documentation, les landing pages avec plusieurs sections distinctes.</p>
  </div>
</section>

<section id="features" class="content-section content-section--alt">
  <div class="section-inner">
    <span class="section-badge">Fonctionnalités</span>
    <h2>Ce que le composant fait</h2>
    <ul class="feature-list">
      <li>Barre de progression globale (scroll 0% → 100%)</li>
      <li>Dots de section cliquables avec smooth scroll</li>
      <li>Label visible au hover + section active</li>
      <li>Côté configurable : <code>side="left"</code> ou <code>side="right"</code></li>
      <li>Détection de section active basée sur la position viewport</li>
    </ul>
  </div>
</section>

<section id="usage" class="content-section">
  <div class="section-inner">
    <span class="section-badge">Usage</span>
    <h2>Comment l'utiliser</h2>
    <div class="code-block">
      <pre><code>{`<ScrollProgress
  sections={[
    { id: 'intro',    label: 'Introduction' },
    { id: 'features', label: 'Features' },
    { id: 'contact',  label: 'Contact' },
  ]}
  side="right"
/>

<!-- Tes sections avec les ids correspondants -->
<section id="intro">...</section>
<section id="features">...</section>
<section id="contact">...</section>`}</code></pre>
    </div>
  </div>
</section>

<section id="conclusion" class="content-section content-section--alt">
  <div class="section-inner">
    <span class="section-badge">Conclusion</span>
    <h2>Fin de la démo</h2>
    <p>Tu as scrollé jusqu'en bas ! La barre de progression est à 100% et "Conclusion" est la section active dans le sidebar.</p>
    <p>Le composant est léger : un seul listener <code>scroll</code> passif, pas d'IntersectionObserver multiple.</p>
  </div>
</section>

<style>
  .content-section {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px clamp(24px, 8vw, 80px);
  }

  .content-section--alt { background: var(--bg-subtle); }

  .section-inner {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .section-badge {
    display: inline-flex; padding: 3px 12px; border-radius: 99px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: var(--primary); background: color-mix(in srgb, var(--primary) 10%, transparent);
    align-self: flex-start;
  }

  .section-inner h2 { margin: 0; font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 800; color: var(--text-heading); }
  .section-inner p  { margin: 0; font-size: 15px; color: var(--text-muted); line-height: 1.65; }

  .feature-list {
    margin: 0; padding-left: 20px;
    display: flex; flex-direction: column; gap: 8px;
    font-size: 14px; color: var(--text-muted); line-height: 1.6;
  }

  .code-block { background: var(--bg-subtle); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: auto; }
  .code-block pre { margin: 0; padding: 16px; }
  .code-block code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
</style>
