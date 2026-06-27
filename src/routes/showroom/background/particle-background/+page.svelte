<script lang="ts">
  import ParticleBackground from "$lib/components/ui/ParticleBackground.svelte";
</script>

<svelte:head><title>Particle Background — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Particle Background</h1>
    <p>
      Réseau de particules animées sur canvas — particules connectées par des lignes si
      assez proches.
    </p>
  </div>

  <section class="variant">
    <h2>Hero section</h2>
    <ParticleBackground>
      <div class="hero">
        <h2 class="hero-title">Réseau de particules</h2>
        <p class="hero-sub">
          60 particules, connexions à moins de 120px, couleur primaire du thème.
        </p>
      </div>
    </ParticleBackground>
  </section>

  <section class="variant">
    <h2>Particules lentes — <code>speed={0.3}</code></h2>
    <ParticleBackground speed={0.3} particleCount={40} connectionDistance={100}>
      <div class="hero hero--sm">
        <h2 class="hero-title hero-title--sm">40 particules, lent</h2>
      </div>
    </ParticleBackground>
  </section>

  <section class="variant">
    <h2>Fond sombre + couleur personnalisée</h2>
    <ParticleBackground
      color="#818cf8"
      background="#0f172a"
      particleCount={70}
      connectionDistance={130}
    >
      <div class="hero">
        <h2 class="hero-title hero-title--white">Couleur violette</h2>
        <p class="hero-sub hero-sub--white">
          Passe une couleur hex + <code style="color:rgba(255,255,255,0.6)"
            >background="#0f172a"</code
          > pour un fond sombre.
        </p>
      </div>
    </ParticleBackground>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [["children", "Snippet", "—", "Contenu superposé aux particules"], ["particleCount", "number", "60", "Nombre de particules"], ["color", "string", '"var(--primary)"', "Couleur des particules — hex, rgb ou var()"], ["background", "string", '"var(--bg-subtle)"', "Fond du conteneur — doit être opaque"], ["speed", "number", "0.6", "Vitesse de déplacement"], ["connectionDistance", "number", "120", "Distance max (px) pour tracer une connexion"]] as [p, t, d, desc]}
        <div class="props-row">
          <code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span
            >{desc}</span
          >
        </div>
      {/each}
    </div>
  </section>

  <section class="variant">
    <h2>Notes</h2>
    <ul class="notes">
      <li>Le canvas se redimensionne automatiquement via <code>ResizeObserver</code>.</li>
      <li>
        L'animation est nettoyée proprement au démontage (<code>cancelAnimationFrame</code
        >).
      </li>
      <li>
        Les particules rebondissent sur les bords — algorithme O(n²) optimisé (paires
        uniques).
      </li>
      <li>
        Pour les couleurs, <code>var(--css-var)</code> est résolu au montage — pas réactif
        aux changements de thème dynamiques.
      </li>
    </ul>
  </section>
</div>

<style>
  /* Pas de background ici — c'est ParticleBackground qui gère le fond */
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 56px 32px;
    gap: 12px;
    min-height: 200px;
  }

  .hero--sm {
    padding: 36px 32px;
  }

  .hero-title {
    margin: 0;
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 700;
    color: var(--text-heading);
  }

  .hero-title--sm {
    font-size: 1.25rem;
  }
  .hero-title--white {
    color: #f8fafc;
  }

  .hero-sub {
    margin: 0;
    font-size: 14px;
    color: var(--text-muted);
    max-width: 420px;
    line-height: 1.55;
  }

  .hero-sub--white {
    color: rgba(255, 255, 255, 0.55);
  }

  .props-table {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .props-row {
    display: grid;
    grid-template-columns: 170px 80px 170px 1fr;
    gap: 12px;
    padding: 10px 16px;
    align-items: center;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--text-muted);
  }
  .props-row:last-child {
    border-bottom: none;
  }
  .props-row.header {
    background: var(--bg-subtle);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-subtle);
  }
  .props-row code {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-base);
  }
  code.type {
    color: var(--primary);
  }
  code.def {
    color: var(--text-subtle);
  }

  .notes {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
  }
</style>
