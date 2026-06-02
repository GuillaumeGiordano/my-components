<script lang="ts">
  import "$lib/styles/demo-page.css";
  import NavSectionWheel from "$lib/components/ui/NavSectionWheel.svelte";
  import { Home, BarChart2, Users, Mail, FileText, Settings } from "@lucide/svelte";

  const demoParts = [
    { id: 's-accueil',  label: 'Accueil',  desc: 'Faites tourner la roue à droite (glisser, molette, ou flèches) pour naviguer entre ces sections.' },
    { id: 's-stats',    label: 'Stats',    desc: 'Le scroll de la page met automatiquement à jour la roue via IntersectionObserver.' },
    { id: 's-equipe',   label: 'Équipe',   desc: 'La synchronisation est bidirectionnelle : tourner la roue scrolle la page, scroller la page tourne la roue.' },
    { id: 's-messages', label: 'Messages', desc: 'Cliquer directement sur un item de la roue snap également et navigue.' },
  ];
</script>

<svelte:head>
  <title>Nav Section Wheel — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Nav Section Wheel</h1>
    <p>
      Roue de navigation verticale fixée sur le <strong>bord droit de l'écran</strong>,
      centrée verticalement. Même mécanique que <em>NavbarMobileWheel</em> mais orientée
      pour le desktop : 3 items complets, 1 coupé en haut, 1 coupé en bas.
      Tourne au scroll molette, au glisser, ou aux flèches clavier.
      Synchronisée avec le scroll de la page via <code>IntersectionObserver</code>.
    </p>
  </div>

  <!-- ─── Usage ────────────────────────────────────────────────────────── -->
  <section class="variant" id="s-usage">
    <h2>Usage</h2>
    <div class="code-block">
      <pre><code>{`<script>
  import { NavSectionWheel } from '@guillaumeg/ui';
  import { Home, BarChart2, Users } from '@lucide/svelte';
<\/script>

<NavSectionWheel
  activeHref="#accueil"
  items={[
    { icon: Home,      label: 'Accueil',  href: '#accueil' },
    { icon: BarChart2, label: 'Stats',    href: '#stats' },
    { icon: Users,     label: 'Équipe',   href: '#equipe' },
  ]}
/>`}</code></pre>
    </div>
  </section>

  <!-- ─── Props ────────────────────────────────────────────────────────── -->
  <section class="variant" id="s-props">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [
        ['items',      'SectionNavItem[]', '[]',    'Liste des sections à naviguer'],
        ['activeHref', 'string',           '""',    'Href actif au chargement'],
        ['size',       'number',           '200',   'Hauteur du strip en px (≈ 25vh)'],
      ] as [prop, type, def, desc]}
        <div class="props-row">
          <code>{prop}</code>
          <code class="type">{type}</code>
          <code class="default">{def}</code>
          <span>{desc}</span>
        </div>
      {/each}
    </div>

    <h3 style="margin-top: 24px;">Type SectionNavItem</h3>
    <div class="code-block">
      <pre><code>{`type SectionNavItem = {
  icon: Component;       // icône Lucide
  label: string;         // label affiché au hover / item actif
  href?: string;         // ancre (#section) ou route (/page)
  active?: boolean;      // marquer actif manuellement
  onclick?: () => void;  // callback optionnel
}`}</code></pre>
    </div>
  </section>

  <!-- ─── Comportements ────────────────────────────────────────────────── -->
  <section class="variant" id="s-comportements">
    <h2>Comportements</h2>
    <ul class="notes">
      <li>Toujours visible — pas de FAB, pas de backdrop.</li>
      <li>3 items complets + 1 coupé en haut + 1 coupé en bas (affordance de rotation).</li>
      <li>L'anneau central met en évidence la section active.</li>
      <li><strong>Glisser</strong> verticalement → rotation + inertie + snap automatique.</li>
      <li><strong>Molette souris</strong> → rotation avec snap différé 200ms.</li>
      <li><strong>Flèches ↑ ↓</strong> (focus sur le strip) → navigation item par item.</li>
      <li>Snap → <code>scrollIntoView({'{'} behavior: 'smooth' {'}'})</code> vers la section.</li>
      <li>Scroll manuel → <code>IntersectionObserver</code> met la roue à jour.</li>
      <li>Labels apparaissent à gauche des items, au hover et sur l'item actif.</li>
    </ul>
  </section>

  <!-- ─── Intégration ────────────────────────────────────────────────── -->
  <section class="variant" id="s-integration">
    <h2>Intégration dans un layout</h2>
    <div class="code-block">
      <pre><code>{`<!-- +layout.svelte -->
<script>
  import { NavSectionWheel } from '@guillaumeg/ui';
  import { page } from '$app/stores';
<\/script>

<!-- Ajouter un padding-right sur le contenu pour ne pas être masqué -->
<main style="padding-right: 80px">
  <slot />
</main>

<NavSectionWheel
  activeHref={$page.url.hash}
  items={sections}
/>`}</code></pre>
    </div>
    <p class="hint" style="margin-top: 12px;">
      Le strip fait 280px de large mais les items sont positionnés dans les 80 derniers px.
      Un <code>padding-right: 80px</code> sur le contenu suffit généralement.
    </p>
  </section>

  <!-- Sections pour la démo de scroll sync -->
  {#each demoParts as { id, label, desc }}
    <section class="variant demo-section" {id}>
      <h2>{label}</h2>
      <p class="filler">{desc}</p>
    </section>
  {/each}
</div>

<!-- Démo live -->
<NavSectionWheel
  activeHref="#s-usage"
  items={[
    { icon: Home,     label: 'Usage',          href: '#s-usage' },
    { icon: FileText, label: 'Props',           href: '#s-props' },
    { icon: Settings, label: 'Comportements',   href: '#s-comportements' },
    { icon: BarChart2,label: 'Intégration',     href: '#s-integration' },
    { icon: Users,    label: 'Équipe',          href: '#s-equipe' },
    { icon: Mail,     label: 'Messages',        href: '#s-messages' },
  ]}
/>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
  }

  .demo-section {
    min-height: 260px;
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
    grid-template-columns: 110px 160px 80px 1fr;
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
  code.type    { color: var(--primary); }
  code.default { color: var(--text-subtle); }

  .notes {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
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
