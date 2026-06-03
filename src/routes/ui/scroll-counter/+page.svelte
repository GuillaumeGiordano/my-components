<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ScrollCounter from '$lib/components/ui/ScrollCounter.svelte';
</script>

<svelte:head><title>Scroll Counter — UI</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Scroll Counter</h1>
    <p>Contrairement à <code>CountUp</code> (one-shot), ce compteur est directement lié à la position de scroll — il monte ET descend en scrollant.</p>
  </div>
</div>

<!-- Section stats sombre -->
<section class="stats-section">
  <div class="stats-inner">
    <h2 class="stats-title">En chiffres</h2>
    <p class="stats-sub">Fais défiler pour animer — remonte pour voir les chiffres redescendre.</p>
    <div class="stats-grid">
      <div class="stat">
        <span class="stat-num"><ScrollCounter from={0} to={48} suffix="+" /></span>
        <span class="stat-label">Composants</span>
      </div>
      <div class="stat">
        <span class="stat-num"><ScrollCounter from={0} to={99.9} decimals={1} suffix="%" /></span>
        <span class="stat-label">Uptime</span>
      </div>
      <div class="stat">
        <span class="stat-num"><ScrollCounter from={0} to={12847} /></span>
        <span class="stat-label">Téléchargements</span>
      </div>
      <div class="stat">
        <span class="stat-num"><ScrollCounter from={0} to={4.9} decimals={1} prefix="★ " /></span>
        <span class="stat-label">Note moyenne</span>
      </div>
    </div>
  </div>
</section>

<div class="page">
  <section class="variant">
    <h2>Différence avec CountUp</h2>
    <ul class="notes">
      <li><strong>CountUp</strong> : se déclenche une fois quand l'élément entre dans le viewport (IntersectionObserver).</li>
      <li><strong>ScrollCounter</strong> : valeur = <code>f(scrollPosition)</code> — monte en descendant, descend en remontant.</li>
      <li>Utile pour des sections où l'interaction bidirectionnelle renforce l'engagement.</li>
    </ul>
  </section>
</div>

<style>
  .stats-section {
    background: #0f172a;
    padding: clamp(60px, 10vh, 100px) clamp(24px, 8vw, 80px);
  }

  .stats-inner { max-width: 900px; margin: 0 auto; }
  .stats-title { margin: 0 0 8px; font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 800; color: #f8fafc; text-align: center; }
  .stats-sub   { margin: 0 0 48px; font-size: 14px; color: rgba(255,255,255,0.4); text-align: center; }

  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  @media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }

  .stat { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px 16px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; background: rgba(255,255,255,0.04); }
  .stat-num { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 900; color: #6366f1; font-variant-numeric: tabular-nums; }
  .stat-label { font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 500; text-align: center; }

  .notes { display:flex;flex-direction:column;gap:8px;padding-left:20px;font-size:14px;color:var(--text-muted);line-height:1.6; }
</style>
