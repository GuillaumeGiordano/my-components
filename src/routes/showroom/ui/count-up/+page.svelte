<script lang="ts">
  import '$lib/styles/demo-page.css';
  import CountUp from '$lib/components/ui/CountUp.svelte';
</script>
<svelte:head><title>Count Up</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Count Up</h1><p>Chiffre qui s'anime de 0 à sa valeur cible dès qu'il entre dans le viewport — <code>IntersectionObserver</code> + easing cubique.</p></div>
  <section class="variant"><h2>Section stats — fait défiler pour déclencher</h2>
    <div class="spacer"></div>
    <div class="stats">
      <div class="stat">
        <span class="stat-value"><CountUp to={12847} separator="," duration={2000} /></span>
        <span class="stat-label">Utilisateurs actifs</span>
      </div>
      <div class="stat">
        <span class="stat-value"><CountUp to={99.9} decimals={1} suffix="%" duration={1600} /></span>
        <span class="stat-label">Uptime garanti</span>
      </div>
      <div class="stat">
        <span class="stat-value"><CountUp to={4.9} decimals={1} prefix="★ " duration={1200} /></span>
        <span class="stat-label">Note moyenne</span>
      </div>
      <div class="stat">
        <span class="stat-value"><CountUp to={38} suffix="+" duration={1800} /></span>
        <span class="stat-label">Composants</span>
      </div>
    </div>
    <div class="spacer"></div>
  </section>
</div>
<style>
  .spacer { height:60px; }
  .stats { display:grid;grid-template-columns:repeat(4,1fr);gap:24px; }
  @media(max-width:640px) { .stats { grid-template-columns:repeat(2,1fr); } }
  .stat { display:flex;flex-direction:column;align-items:center;gap:6px;padding:24px 16px;background:var(--bg-subtle);border:1px solid var(--border);border-radius:var(--radius-lg);text-align:center; }
  .stat-value { font-size:2rem;font-weight:800;color:var(--primary);font-variant-numeric:tabular-nums; }
  .stat-label { font-size:12px;color:var(--text-muted);font-weight:500; }
</style>
