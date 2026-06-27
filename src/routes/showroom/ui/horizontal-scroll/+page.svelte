<script lang="ts">
  import '$lib/styles/demo-page.css';
  import HorizontalScroll from '$lib/components/ui/HorizontalScroll.svelte';

  const projects = [
    { num: '01', title: 'Dashboard Analytics',   tech: 'SvelteKit · PostgreSQL · D3.js',  color: '#6366f1', emoji: '📊' },
    { num: '02', title: 'E-commerce Platform',    tech: 'Svelte 5 · Stripe · Cloudflare',  color: '#ec4899', emoji: '🛒' },
    { num: '03', title: 'Real-time Collaboration',tech: 'WebSockets · CRDT · Redis',        color: '#22c55e', emoji: '⚡' },
    { num: '04', title: 'AI Content Platform',    tech: 'Claude API · RAG · Pinecone',      color: '#f59e0b', emoji: '🤖' },
    { num: '05', title: 'Design System',           tech: 'Storybook · CSS Tokens · Figma',  color: '#8b5cf6', emoji: '🎨' },
    { num: '06', title: 'Mobile App',              tech: 'Capacitor · SQLite · Push',        color: '#06b6d4', emoji: '📱' },
  ];
</script>

<svelte:head><title>Horizontal Scroll — UI</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Horizontal Scroll</h1>
    <p>Le scroll vertical pilote un défilement horizontal — technique portfolio / timeline. Continue de scroller vers le bas.</p>
  </div>
</div>

<HorizontalScroll title="Projets" subtitle="Fais défiler vers le bas pour parcourir horizontalement →">
  {#each projects as p}
    <div class="card" style="--c:{p.color}">
      <div class="card-top">
        <span class="card-num">{p.num}</span>
        <span class="card-emoji">{p.emoji}</span>
      </div>
      <h3 class="card-title">{p.title}</h3>
      <p class="card-tech">{p.tech}</p>
      <div class="card-bar"></div>
    </div>
  {/each}
</HorizontalScroll>

<div class="page">
  <section class="variant">
    <h2>Notes</h2>
    <ul class="notes">
      <li>La hauteur du container = <code>window.innerHeight + trackOverflow</code> — calculée au montage et au resize.</li>
      <li>La progression de <code>translateX</code> est directement liée au scroll via <code>scrollTop / total</code>.</li>
      <li>La barre de progression en bas du sticky montre la position dans le track horizontal.</li>
    </ul>
  </section>
</div>

<style>
  .card {
    width: clamp(260px, 35vw, 340px);
    height: 320px;
    flex-shrink: 0;
    border-radius: 16px;
    border: 1px solid var(--border);
    background: var(--bg-base);
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: transform 200ms ease, box-shadow 200ms ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px color-mix(in srgb, var(--c) 20%, transparent);
    }
  }

  .card-top { display: flex; align-items: center; justify-content: space-between; }
  .card-num { font-size: 11px; font-weight: 700; color: var(--c); letter-spacing: 0.1em; font-family: var(--font-mono); }
  .card-emoji { font-size: 28px; }
  .card-title { margin: 0; font-size: 18px; font-weight: 700; color: var(--text-heading); line-height: 1.25; flex: 1; }
  .card-tech  { margin: 0; font-size: 12px; color: var(--text-subtle); font-family: var(--font-mono); }
  .card-bar   { height: 3px; background: color-mix(in srgb, var(--c) 30%, transparent); border-radius: 2px; margin-top: auto; }

  .notes { display:flex;flex-direction:column;gap:8px;padding-left:20px;font-size:14px;color:var(--text-muted);line-height:1.6; }
</style>
