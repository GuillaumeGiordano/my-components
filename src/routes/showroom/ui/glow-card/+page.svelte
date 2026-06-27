<script lang="ts">
  import '$lib/styles/demo-page.css';
  import GlowCard from '$lib/components/ui/GlowCard.svelte';
  import { Star, Zap, Shield, TrendingUp } from '@lucide/svelte';
</script>

<svelte:head><title>Glow Card — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Glow Card</h1>
    <p>Carte avec une lueur colorée qui suit la position du curseur. Passe la souris sur les cartes.</p>
  </div>

  <section class="variant">
    <h2>Défaut — couleur primaire</h2>
    <div class="grid-3">
      <GlowCard>
        <div class="demo-card">
          <div class="demo-icon"><Star size={20} /></div>
          <h3>Performance</h3>
          <p>Animations GPU-accelerated — aucune bibliothèque JS externe.</p>
        </div>
      </GlowCard>

      <GlowCard>
        <div class="demo-card">
          <div class="demo-icon"><Zap size={20} /></div>
          <h3>Svelte 5</h3>
          <p>Construit avec les runes — réactivité fine et zéro runtime overhead.</p>
        </div>
      </GlowCard>

      <GlowCard>
        <div class="demo-card">
          <div class="demo-icon"><Shield size={20} /></div>
          <h3>Accessible</h3>
          <p>Pas d'effets de mouvement bloquants — respecte <code>prefers-reduced-motion</code>.</p>
        </div>
      </GlowCard>
    </div>
  </section>

  <section class="variant">
    <h2>Couleurs personnalisées — <code>glowColor</code></h2>
    <div class="grid-3">
      <GlowCard glowColor="#22c55e" glowSize={280}>
        <div class="demo-card">
          <div class="demo-icon green"><TrendingUp size={20} /></div>
          <h3>+42%</h3>
          <p>Croissance des utilisateurs actifs ce mois-ci.</p>
        </div>
      </GlowCard>

      <GlowCard glowColor="#f59e0b" glowSize={280}>
        <div class="demo-card">
          <div class="demo-icon amber"><Star size={20} /></div>
          <h3>4.9 / 5</h3>
          <p>Score moyen de satisfaction client sur 1 200 avis.</p>
        </div>
      </GlowCard>

      <GlowCard glowColor="#ef4444" glowSize={280}>
        <div class="demo-card">
          <div class="demo-icon red"><Zap size={20} /></div>
          <h3>99.9%</h3>
          <p>Uptime garanti sur les 12 derniers mois.</p>
        </div>
      </GlowCard>
    </div>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['children',   'Snippet',  '—',              'Contenu de la carte'],
        ['glowColor',  'string',   '"var(--primary)"','Couleur de la lueur — hex, rgb, ou var()'],
        ['glowSize',   'number',   '350',             'Rayon de la lueur en px'],
        ['padding',    'string',   '"24px"',          'Padding interne du conteneur'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>
</div>

<style>
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  @media (max-width: 640px) { .grid-3 { grid-template-columns: 1fr; } }

  .demo-card { display: flex; flex-direction: column; gap: 8px; }
  .demo-card h3 { margin: 0; font-size: 15px; font-weight: 600; color: var(--text-heading); }
  .demo-card p  { margin: 0; font-size: 13px; color: var(--text-muted); line-height: 1.5; }

  .demo-icon {
    width: 36px; height: 36px;
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--primary) 12%, transparent);
    color: var(--primary);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 4px;
  }
  .demo-icon.green { background: color-mix(in srgb, #22c55e 12%, transparent); color: #22c55e; }
  .demo-icon.amber { background: color-mix(in srgb, #f59e0b 12%, transparent); color: #f59e0b; }
  .demo-icon.red   { background: color-mix(in srgb, #ef4444 12%, transparent); color: #ef4444; }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 100px 120px 170px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }
</style>
