<script lang="ts">
  import "$lib/styles/demo-page.css";
  import NavbarMobileWheel from "$lib/components/layout/NavbarMobileWheel.svelte";
  import { Home, BarChart2, Users, Settings, Mail, FileText } from "@lucide/svelte";
  import FloatingGroup from "$lib/FloatingGroup.svelte";
</script>

<svelte:head>
  <title>Navbar Mobile Wheel — Layout — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Navbar Mobile Wheel</h1>
    <p>
      FAB fixe en bas à droite qui ouvre une <strong>roue rotative</strong>. 3 items sont
      visibles dans l'arc, 2 sont coupés aux bords pour indiquer qu'on peut faire tourner.
      L'item central (anneau prononcé) est l'item actif. Faire tourner la roue scrolle la
      page vers la section correspondante — et inversement, le scroll de la page tourne la
      roue.
    </p>
  </div>

  <!-- ─── Démo live ────────────────────────────────────────────────────── -->
  <section class="variant" id="section-accueil">
    <h2>Démo — faire défiler les sections</h2>
    <p class="hint">
      Cliquer sur le FAB (bas droite) pour ouvrir la roue. Glisser vers le haut ou vers le
      bas pour la faire tourner, ou cliquer sur un item. Faire défiler cette page met
      également à jour la roue.
    </p>
  </section>

  <!-- ─── Usage ────────────────────────────────────────────────────────── -->
  <section class="variant" id="section-usage">
    <h2>Usage</h2>
    <div class="code-block">
      <pre><code
          >{`<script>
  import { NavbarMobileWheel } from '@guillaumeg/ui';
  import { Home, BarChart2, Users, Settings } from '@lucide/svelte';
<\/script>

<NavbarMobileWheel
  activeHref="#accueil"
  items={[
    { icon: Home,     label: 'Accueil',   href: '#accueil' },
    { icon: BarChart2, label: 'Stats',    href: '#stats' },
    { icon: Users,    label: 'Équipe',    href: '#equipe' },
    { icon: Settings, label: 'Paramètres', href: '#settings' },
  ]}
/>`}</code
        ></pre>
    </div>
  </section>

  <!-- ─── Props ────────────────────────────────────────────────────────── -->
  <section class="variant" id="section-props">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [["items", "WheelNavItem[]", "[]", "Liste des items de navigation"], ["activeHref", "string", '""', "Href de la section active au chargement"], ["radius", "number", "170", "Rayon du cercle en pixels"]] as [prop, type, def, desc]}
        <div class="props-row">
          <code>{prop}</code>
          <code class="type">{type}</code>
          <code class="default">{def}</code>
          <span>{desc}</span>
        </div>
      {/each}
    </div>

    <h3 style="margin-top: 24px;">Type WheelNavItem</h3>
    <div class="code-block">
      <pre><code
          >{`type WheelNavItem = {
  icon: Component;       // icône Lucide
  label: string;         // label affiché au hover / item actif
  href?: string;         // ancre (#section) ou route (/page)
  active?: boolean;      // marquer actif manuellement
  onclick?: () => void;  // callback optionnel en plus de href
}`}</code
        ></pre>
    </div>
  </section>

  <!-- ─── Comportements ────────────────────────────────────────────────── -->
  <section class="variant" id="section-comportements">
    <h2>Comportements</h2>
    <ul class="notes">
      <li>Clic FAB → ouvre / ferme la roue. Re-clic ou <kbd>Échap</kbd> → ferme.</li>
      <li>3 items complets visibles dans l'arc + 1 coupé à droite + 1 coupé en bas.</li>
      <li>L'anneau central (slot actif) met en évidence l'item courant.</li>
      <li>Glisser verticalement fait tourner la roue dans les deux sens.</li>
      <li>Relâcher → snap automatique sur l'item le plus proche + inertie.</li>
      <li>Un item snappe → scroll doux vers sa section (<code>scrollIntoView</code>).</li>
      <li>
        Scroll manuel de la page → <code>IntersectionObserver</code> retourne la roue.
      </li>
      <li>Cliquer un item directement → snap + navigation.</li>
    </ul>
  </section>

  <!-- Sections pour la démo de synchronisation scroll ↔ roue -->
  <section class="variant demo-section" id="section-stats">
    <h2>Section Stats</h2>
    <p class="filler">
      Faites défiler vers cette section — la roue se met à jour automatiquement pour
      mettre "Stats" dans le slot actif (anneau prononcé).
    </p>
  </section>

  <section class="variant demo-section" id="section-equipe">
    <h2>Section Équipe</h2>
    <p class="filler">
      Chaque section visible à 50% déclenche la mise à jour de la roue via
      <code>IntersectionObserver</code>. Aucun scroll handler global nécessaire.
    </p>
  </section>

  <section class="variant demo-section" id="section-messages">
    <h2>Section Messages</h2>
    <p class="filler">
      La synchronisation est bidirectionnelle : tourner la roue scrolle la page, et
      scroller la page tourne la roue.
    </p>
  </section>

  <section class="variant demo-section" id="section-docs">
    <h2>Section Docs</h2>
    <p class="filler">
      Avec 6 items, la roue fait un tour complet de 360° pour les parcourir tous. À tout
      moment, 3 sont visibles + 2 partiels aux bords de l'arc.
    </p>
  </section>
</div>

<!-- Démo live — 6 items pointant vers les sections de cette page -->
<FloatingGroup position="bottom-right">
  <NavbarMobileWheel
    activeHref="#section-accueil"
    items={[
      { icon: Home, label: "Accueil", href: "#section-accueil" },
      { icon: BarChart2, label: "Stats", href: "#section-stats" },
      { icon: Users, label: "Équipe", href: "#section-equipe" },
      { icon: Mail, label: "Messages", href: "#section-messages" },
      { icon: FileText, label: "Docs", href: "#section-docs" },
      { icon: Settings, label: "Comportements", href: "#section-comportements" },
    ]}
  />
</FloatingGroup>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 4px;
  }

  .demo-section {
    min-height: 240px;
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

  .code-block pre {
    margin: 0;
    padding: 20px;
  }

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
    grid-template-columns: 110px 160px 80px 1fr;
    gap: 12px;
    padding: 10px 16px;
    align-items: center;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--text-muted);

    &:last-child {
      border-bottom: none;
    }
    &.header {
      background: var(--bg-subtle);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-subtle);
    }
  }

  .props-row code {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-base);
  }
  code.type {
    color: var(--primary);
  }
  code.default {
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

  .notes kbd {
    font-family: var(--font-mono);
    font-size: 11px;
    background: var(--bg-hover);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    padding: 1px 5px;
    color: var(--text-base);
  }

  .filler {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.7;
  }

  h3 {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-heading);
    margin: 0 0 12px;
  }
</style>
