<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ZoomReveal from '$lib/components/ui/ZoomReveal.svelte';
  import { Zap, Shield, Star, Globe, Cpu, Lock } from '@lucide/svelte';

  const features = [
    { icon: Zap,    title: 'Performance',   body: 'Bundle < 10kb, SSR, lazy loading.' },
    { icon: Shield, title: 'Accessibilité', body: 'ARIA, focus trap, navigation clavier.' },
    { icon: Star,   title: 'Animations',    body: 'Canvas, CSS, IntersectionObserver.' },
    { icon: Globe,  title: 'i18n ready',    body: 'Labels configurables, RTL possible.' },
    { icon: Cpu,    title: 'TypeScript',    body: 'Types stricts, inférence complète.' },
    { icon: Lock,   title: 'SSR safe',      body: 'Guard browser, pas de window en SSR.' },
  ];
</script>

<svelte:head><title>Zoom Reveal — UI</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Zoom Reveal</h1>
    <p>Les éléments partent de <code>scale(0.72)</code> et grossissent jusqu'à leur taille normale en entrant dans le viewport.</p>
  </div>

  <section class="variant">
    <h2>Titre seul</h2>
    <div class="spacer-sm"></div>
    <ZoomReveal>
      <h2 class="big-title">Construit pour impressionner</h2>
    </ZoomReveal>
    <div class="spacer-sm"></div>
  </section>

  <section class="variant">
    <h2>Grid de features — <code>ZoomReveal</code> par carte</h2>
    <div class="features-grid">
      {#each features as f, i}
        <ZoomReveal>
          <div class="feat-card">
            <div class="feat-icon"><f.icon size={20} /></div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        </ZoomReveal>
      {/each}
    </div>
  </section>

  <section class="variant">
    <h2>Notes</h2>
    <ul class="notes">
      <li>L'animation est calculée en continu via <code>scroll</code> listener passif.</li>
      <li>Easing : <code>1 - (1-t)^2.5</code> — entrée rapide, finition douce.</li>
      <li>Par défaut : commence quand l'élément est à 92% de hauteur viewport, finit à 35%.</li>
    </ul>
  </section>
</div>

<style>
  .spacer-sm { height: 40px; }
  .big-title { margin: 0; font-size: clamp(2rem, 6vw, 4rem); font-weight: 900; color: var(--text-heading); text-align: center; }

  .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  @media (max-width: 640px) { .features-grid { grid-template-columns: 1fr; } }

  .feat-card { padding: 20px; border-radius: var(--radius-lg); border: 1px solid var(--border); background: var(--bg-base); display: flex; flex-direction: column; gap: 8px; }
  .feat-icon { width: 36px; height: 36px; border-radius: var(--radius-md); background: color-mix(in srgb, var(--primary) 12%, transparent); color: var(--primary); display: flex; align-items: center; justify-content: center; }
  .feat-card h3 { margin: 0; font-size: 14px; font-weight: 700; color: var(--text-heading); }
  .feat-card p  { margin: 0; font-size: 12px; color: var(--text-muted); line-height: 1.5; }

  .notes { display:flex;flex-direction:column;gap:8px;padding-left:20px;font-size:14px;color:var(--text-muted);line-height:1.6; }
</style>
