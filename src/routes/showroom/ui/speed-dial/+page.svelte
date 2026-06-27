<script lang="ts">
  import "$lib/styles/demo-page.css";
  import SpeedDial from "$lib/components/ui/SpeedDial.svelte";
  import { theme } from "$lib/theme.svelte";
  import {
    Settings,
    Sun,
    Moon,
    Bell,
    User,
    Plus,
    FileText,
    Image,
    Link,
  } from "@lucide/svelte";

  let isDark = $derived(theme.dark);
</script>

<svelte:head>
  <title>Speed Dial — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Speed Dial</h1>
    <p>
      Bouton flottant fixe (FAB) qui déploie un menu vertical vers le haut au clic.
      Chaque item est un bouton icône rond avec un label flottant au hover.
    </p>
  </div>

  <!-- ─── Démo principale ─────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Démo — Paramètres</h2>
    <p class="hint">
      Le composant est rendu en position fixe (bas droite). Clique sur le bouton
      <strong>engrenage</strong> pour voir l'animation.
    </p>

    <SpeedDial
      icon={Settings}
      items={[
        {
          icon: isDark ? Sun : Moon,
          label: isDark ? "Mode clair" : "Mode sombre",
          onclick: () => theme.toggle(),
        },
        { icon: Bell,  label: "Notifications" },
        { icon: User,  label: "Profil" },
      ]}
    />
  </section>

  <!-- ─── Usage code ──────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Usage — Bouton création</h2>
    <div class="code-block">
      <pre><code>{`<SpeedDial
  icon={Plus}
  items={[
    { icon: FileText, label: "Nouveau document", onclick: () => {} },
    { icon: Image,    label: "Importer une image", onclick: () => {} },
    { icon: Link,     label: "Ajouter un lien",   onclick: () => {} },
  ]}
/>`}</code></pre>
    </div>
  </section>

  <!-- ─── Usage Paramètres ─────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Usage — Paramètres avec item actif</h2>
    <div class="code-block">
      <pre><code>{`<SpeedDial
  icon={Settings}
  items={[
    { icon: Sun,  label: "Mode clair",  active: !dark, onclick: () => setLight() },
    { icon: Moon, label: "Mode sombre", active:  dark, onclick: () => setDark()  },
    { icon: Bell, label: "Notifications" },
  ]}
/>`}</code></pre>
    </div>
  </section>

  <!-- ─── Props ────────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [
        ["items", "SpeedDialItem[]", "[]",       "Liste des items du menu"],
        ["icon",  "Component",       "Settings",  "Icône du bouton principal"],
      ] as [prop, type, def, desc]}
        <div class="props-row">
          <code>{prop}</code>
          <code class="type">{type}</code>
          <code class="default">{def}</code>
          <span>{desc}</span>
        </div>
      {/each}
    </div>

    <h3 style="margin-top: 24px;">Type SpeedDialItem</h3>
    <div class="code-block">
      <pre><code>{`type SpeedDialItem = {
  icon: Component;     // icône Lucide
  label: string;       // label affiché au hover
  onclick?: () => void;
  active?: boolean;    // met l'item en évidence (couleur primaire)
}`}</code></pre>
    </div>
  </section>

  <!-- ─── Comportements ────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Comportements</h2>
    <ul class="notes">
      <li>Clic sur le FAB → ouvre/ferme le menu.</li>
      <li>Clic sur un item → exécute l'action et ferme le menu.</li>
      <li>Clic sur le backdrop ou touche <kbd>Échap</kbd> → ferme le menu.</li>
      <li>Ouverture en cascade : item 0 (le plus proche) apparaît en premier.</li>
      <li>Labels visibles au hover souris ou tap tactile.</li>
      <li>Item <code>active: true</code> → coloré en primaire.</li>
    </ul>
  </section>
</div>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 16px;
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
    grid-template-columns: 120px 160px 100px 1fr;
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

  .notes kbd {
    font-family: var(--font-mono);
    font-size: 11px;
    background: var(--bg-hover);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    padding: 1px 5px;
    color: var(--text-base);
  }

  h3 {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-heading);
    margin: 0 0 12px;
  }
</style>
