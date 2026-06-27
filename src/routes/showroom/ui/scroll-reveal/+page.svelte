<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ScrollReveal from '$lib/components/ui/ScrollReveal.svelte';
</script>

<svelte:head><title>Scroll Reveal — UI</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Scroll Reveal</h1>
    <p>Les enfants directs s'animent en stagger quand le conteneur entre dans le viewport. 5 modes d'animation.</p>
  </div>

  <section class="variant">
    <h2>fade-up (défaut) — <code>stagger={80}</code></h2>
    <ScrollReveal animation="fade-up" stagger={80}>
      <div class="item"><span class="dot"></span>Premier élément</div>
      <div class="item"><span class="dot"></span>Deuxième élément</div>
      <div class="item"><span class="dot"></span>Troisième élément</div>
      <div class="item"><span class="dot"></span>Quatrième élément</div>
    </ScrollReveal>
  </section>

  <section class="variant">
    <h2>zoom — grille de cards</h2>
    <ScrollReveal animation="zoom" stagger={60}>
      {#each ['Analytics', 'Dashboard', 'Settings', 'Reports', 'Users', 'Billing'] as label}
        <div class="card">{label}</div>
      {/each}
    </ScrollReveal>
  </section>

  <section class="variant">
    <h2>slide-right</h2>
    <ScrollReveal animation="slide-right" stagger={100}>
      <div class="badge badge--1">🎨 Design tokens</div>
      <div class="badge badge--2">⚡ Svelte 5 runes</div>
      <div class="badge badge--3">🌙 Dark mode</div>
      <div class="badge badge--4">♿ Accessibilité</div>
    </ScrollReveal>
  </section>

  <section class="variant">
    <h2>flip — cartes 3D</h2>
    <ScrollReveal animation="flip" stagger={70}>
      {#each ['HTML', 'CSS', 'JS', 'TS', 'Svelte'] as tech}
        <div class="tech-pill">{tech}</div>
      {/each}
    </ScrollReveal>
  </section>
</div>

<style>
  .item { display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:var(--radius-md);border:1px solid var(--border);background:var(--bg-base);font-size:13px;font-weight:500;color:var(--text-base);margin-bottom:8px; }
  .dot  { width:8px;height:8px;border-radius:50%;background:var(--primary);flex-shrink:0; }

  .card { padding:16px;border-radius:var(--radius-md);border:1px solid var(--border);background:var(--bg-base);font-size:13px;font-weight:600;color:var(--text-heading);display:flex;align-items:center;justify-content:center;min-height:80px; }
  :global(.sr--zoom) { display:grid;grid-template-columns:repeat(3,1fr);gap:12px; }
  @media(max-width:640px) { :global(.sr--zoom) { grid-template-columns:repeat(2,1fr); } }

  .badge { display:inline-flex;padding:8px 16px;border-radius:99px;border:1px solid var(--border);font-size:13px;font-weight:600;margin:4px 0; }
  .badge--1 { background:color-mix(in srgb,#6366f1 10%,transparent);color:#6366f1; }
  .badge--2 { background:color-mix(in srgb,#f59e0b 10%,transparent);color:#d97706; }
  .badge--3 { background:color-mix(in srgb,#8b5cf6 10%,transparent);color:#7c3aed; }
  .badge--4 { background:color-mix(in srgb,#22c55e 10%,transparent);color:#16a34a; }

  .tech-pill { display:inline-flex;align-items:center;justify-content:center;padding:12px 24px;border-radius:var(--radius-md);border:1px solid var(--border);background:var(--bg-base);font-family:var(--font-mono);font-size:14px;font-weight:700;color:var(--text-heading); }
  :global(.sr--flip) { display:flex;gap:12px;flex-wrap:wrap; }
</style>
