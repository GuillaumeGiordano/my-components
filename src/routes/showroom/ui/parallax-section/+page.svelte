<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ParallaxSection from '$lib/components/ui/ParallaxSection.svelte';
</script>

<svelte:head><title>Parallax Section — UI</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Parallax Section</h1>
    <p>Fond qui défile à vitesse réduite — couche <code>background</code> (snippet) à <code>speed×</code> et contenu à vitesse normale. Crée une illusion de profondeur.</p>
  </div>
</div>

<!-- Exemple 1 : fond dégradé + éléments décoratifs -->
<ParallaxSection speed={0.35}>
  {#snippet background()}
    <div class="bg-sky">
      <div class="bg-circle bg-c1"></div>
      <div class="bg-circle bg-c2"></div>
      <div class="bg-circle bg-c3"></div>
      <div class="bg-dots"></div>
    </div>
  {/snippet}
  <div class="section-content">
    <span class="label">Profondeur · speed=0.35</span>
    <h2>Couche 1 — Fond lent</h2>
    <p>Les éléments derrière se déplacent à 35% de la vitesse de scroll — le fond "reste en arrière".</p>
  </div>
</ParallaxSection>

<!-- Exemple 2 : fond sombre + géométrie -->
<ParallaxSection speed={0.2}>
  {#snippet background()}
    <div class="bg-dark">
      <div class="bg-grid"></div>
    </div>
  {/snippet}
  <div class="section-content section-content--light">
    <span class="label label--light">Profondeur · speed=0.2</span>
    <h2 style="color:#f8fafc">Couche 2 — Fond très lent</h2>
    <p style="color:rgba(255,255,255,0.6)">Vitesse 0.2 = le fond défile à seulement 20% — effet maximal.</p>
  </div>
</ParallaxSection>

<!-- Exemple 3 : fond clair neutre -->
<ParallaxSection speed={0.5}>
  {#snippet background()}
    <div class="bg-light">
      {#each Array(12) as _}
        <div class="bg-shape"></div>
      {/each}
    </div>
  {/snippet}
  <div class="section-content">
    <span class="label">Profondeur · speed=0.5</span>
    <h2>Couche 3 — Fond mi-vitesse</h2>
    <p>Speed=0.5 : fond à demi-vitesse — effet subtil, idéal pour le contenu dense.</p>
  </div>
</ParallaxSection>

<div class="page">
  <section class="variant">
    <h2>Notes</h2>
    <ul class="notes">
      <li>Le fond utilise un snippet <code>{'{#snippet background()}'}</code> — n'importe quel contenu (image, canvas, div décoratif).</li>
      <li>La couche fond a <code>position:absolute;inset:-15% 0</code> (+30% de hauteur) pour éviter les bords visibles.</li>
      <li>Le déplacement = <code>(progress - 0.5) × height × (1 - speed) × 1.4</code>.</li>
    </ul>
  </section>
</div>

<style>
  /* ── Section content ── */
  .section-content {
    padding: clamp(60px, 10vw, 100px) clamp(24px, 8vw, 80px);
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 620px;
    margin: 0 auto;
    text-align: center;
    align-items: center;
  }

  .section-content h2 { margin: 0; font-size: clamp(1.5rem, 3.5vw, 2.5rem); font-weight: 800; color: var(--text-heading); }
  .section-content p  { margin: 0; font-size: 15px; color: var(--text-muted); line-height: 1.65; max-width: 44ch; }

  .label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--primary); background: color-mix(in srgb, var(--primary) 10%, transparent);
    padding: 4px 12px; border-radius: 99px;
  }
  .label--light { color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.1); }

  /* ── Backgrounds ── */
  .bg-sky {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, #dbeafe 0%, #ede9fe 50%, #fce7f3 100%);
    position: relative; overflow: hidden;
  }

  .bg-circle {
    position: absolute; border-radius: 50%;
    filter: blur(60px); opacity: 0.5;
  }
  .bg-c1 { width: 40%; height: 60%; background: #6366f133; top: -10%; left: -5%; }
  .bg-c2 { width: 35%; height: 55%; background: #ec489933; top: 20%; right: -5%; }
  .bg-c3 { width: 30%; height: 50%; background: #22c55e33; bottom: -10%; left: 30%; }

  .bg-dots {
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, #6366f122 1px, transparent 1px);
    background-size: 28px 28px;
  }

  .bg-dark {
    width: 100%; height: 100%;
    background: #0f172a;
    position: relative; overflow: hidden;
  }

  .bg-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .bg-light {
    width: 100%; height: 100%;
    background: var(--bg-subtle);
    position: relative; overflow: hidden;
    display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 24px;
    padding: 40px;
  }

  .bg-shape {
    width: 60px; height: 60px;
    border: 2px solid var(--border);
    border-radius: 12px;
    opacity: 0.5;
    transform: rotate(45deg);
  }

  .notes { display:flex;flex-direction:column;gap:8px;padding-left:20px;font-size:14px;color:var(--text-muted);line-height:1.6; }
</style>
