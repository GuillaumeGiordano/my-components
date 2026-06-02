<script lang="ts">
  import "$lib/styles/demo-page.css";
  import SectionScrollbar from "$lib/components/ui/SectionScrollbar.svelte";

  const demoParts = [
    { id: 's-a', h: 'Section A', t: 'Faites défiler — le curseur se déplace et le point actif change.' },
    { id: 's-b', h: 'Section B', t: 'Cliquez directement sur un point à droite pour y sauter.' },
    { id: 's-c', h: 'Section C', t: 'Glissez le curseur horizontal pour scroller rapidement.' },
    { id: 's-d', h: 'Section D', t: 'Cliquez sur la barre (hors point) pour un scroll doux à cette position.' },
  ];
</script>

<svelte:head>
  <title>Section Scrollbar — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Section Scrollbar</h1>
    <p>
      Barre de scroll verticale fixée sur le bord droit de l'écran.
      Des <strong>points</strong> marquent chaque section — cliquables pour y naviguer.
      Un <strong>curseur horizontal</strong> glissable indique la position de scroll actuelle
      et permet de scroller rapidement.
    </p>
  </div>

  <!-- ─── Usage ────────────────────────────────────────────────────────── -->
  <section class="variant" id="s-usage">
    <h2>Usage</h2>
    <div class="code-block">
      <pre><code>{`<script>
  import { SectionScrollbar } from '@guillaumeg/ui';
<\/script>

<SectionScrollbar
  sections={[
    { label: 'Accueil',  href: '#accueil' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing',  href: '#pricing' },
    { label: 'Contact',  href: '#contact' },
  ]}
/>`}</code></pre>
    </div>
    <p class="hint" style="margin-top: 12px;">
      Placer le composant une seule fois dans le layout ou la page.
      Les <code>href</code> doivent correspondre aux <code>id</code> des sections sur la page.
    </p>
  </section>

  <!-- ─── Props ────────────────────────────────────────────────────────── -->
  <section class="variant" id="s-props">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Requis</span><span>Description</span>
      </div>
      {#each [
        ['sections', 'ScrollSection[]', 'oui', 'Liste des sections avec label et href'],
      ] as [prop, type, req, desc]}
        <div class="props-row">
          <code>{prop}</code>
          <code class="type">{type}</code>
          <code class="req">{req}</code>
          <span>{desc}</span>
        </div>
      {/each}
    </div>

    <h3 style="margin-top: 24px;">Type ScrollSection</h3>
    <div class="code-block">
      <pre><code>{`type ScrollSection = {
  label: string;   // texte affiché au hover du point
  href:  string;   // ancre de la section, ex: '#features'
}`}</code></pre>
    </div>
  </section>

  <!-- ─── Comportements ────────────────────────────────────────────────── -->
  <section class="variant" id="s-comportements">
    <h2>Comportements</h2>
    <ul class="notes">
      <li>
        <strong>Points</strong> — positionnés proportionnellement à l'<code>offsetTop</code>
        de chaque section sur la hauteur totale de la page.
      </li>
      <li><strong>Clic sur un point</strong> → <code>scrollIntoView({'{'} behavior: 'smooth' {'}'})</code>.</li>
      <li>Le point actif (section visible) est mis en évidence avec la couleur primaire.</li>
      <li><strong>Curseur (thumb)</strong> — barre horizontale représentant la position de scroll actuelle.</li>
      <li><strong>Glisser le curseur</strong> → scroll de la page en temps réel.</li>
      <li><strong>Clic sur la barre</strong> (hors point et curseur) → scroll doux à cette position.</li>
      <li>La barre et les points se remesure automatiquement au resize de la fenêtre.</li>
      <li>Focus + <kbd>↑</kbd> / <kbd>↓</kbd> sur le curseur → scroll de 80px.</li>
    </ul>
  </section>

  <!-- ─── Intégration ────────────────────────────────────────────────── -->
  <section class="variant" id="s-integration">
    <h2>Intégration dans un layout</h2>
    <div class="code-block">
      <pre><code>{`<!-- +layout.svelte ou page principale -->
<SectionScrollbar
  sections={[
    { label: 'Hero',     href: '#hero' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing',  href: '#pricing' },
    { label: 'FAQ',      href: '#faq' },
    { label: 'Contact',  href: '#contact' },
  ]}
/>

<!-- Le composant est fixe (position: fixed), aucun wrapper nécessaire.
     Ajouter padding-right: 24px sur le contenu si besoin. -->`}</code></pre>
    </div>
  </section>

  <!-- Sections de démo pour voir le scroll sync -->
  {#each demoParts as { id, h, t }}
    <section class="variant demo-section" {id}>
      <h2>{h}</h2>
      <p class="filler">{t}</p>
    </section>
  {/each}
</div>

<!-- Démo live — les sections de cette page -->
<SectionScrollbar
  sections={[
    { label: 'Usage',          href: '#s-usage' },
    { label: 'Props',          href: '#s-props' },
    { label: 'Comportements',  href: '#s-comportements' },
    { label: 'Intégration',    href: '#s-integration' },
    { label: 'Section A',      href: '#s-a' },
    { label: 'Section B',      href: '#s-b' },
    { label: 'Section C',      href: '#s-c' },
    { label: 'Section D',      href: '#s-d' },
  ]}
/>

<style>
  .hint { font-size: 14px; color: var(--text-muted); }

  .demo-section {
    min-height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .code-block {
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: auto;
  }

  .code-block pre { margin: 0; padding: 20px; }

  .code-block code {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-base);
    white-space: pre;
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
    grid-template-columns: 100px 160px 60px 1fr;
    gap: 12px;
    padding: 10px 16px;
    align-items: center;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--text-muted);

    &:last-child { border-bottom: none; }
    &.header {
      background: var(--bg-subtle);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-subtle);
    }
  }

  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); }
  code.req  { color: var(--text-subtle); }

  .notes {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .notes kbd {
    font-family: var(--font-mono);
    font-size: 11px;
    background: var(--bg-hover);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    padding: 1px 5px;
    color: var(--text-base);
  }

  .filler { color: var(--text-muted); font-size: 14px; line-height: 1.7; }

  h3 { font-size: 15px; font-weight: 600; color: var(--text-heading); margin: 0 0 12px; }
</style>
