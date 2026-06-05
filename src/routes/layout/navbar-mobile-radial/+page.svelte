<script lang="ts">
  import "$lib/styles/demo-page.css";
  import NavbarMobileRadial from "$lib/components/layout/NavbarMobileRadial.svelte";
  import {
    LayoutDashboard,
    Bell,
    MessageCircle,
    Settings,
    User,
    Search,
    Bookmark,
    ShoppingCart,
  } from "@lucide/svelte";
  import FloatingGroup from "$lib/FloatingGroup.svelte";

  let activeHref = $state("/dashboard");
</script>

<svelte:head>
  <title>Navbar Mobile Radial — Layout — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Navbar Mobile Radial</h1>
    <p>
      Bouton flottant fixe en bas à droite. Un clic déploie les items de navigation en arc
      autour du bouton avec une animation staggerée. Backdrop avec blur au survol, labels
      apparaissant après chaque item.
    </p>
  </div>

  <!-- ─── Demo principale ───────────────────────────────────────────── -->
  <section class="variant">
    <h2>Démo — 4 items</h2>
    <p class="hint">
      Le composant est rendu en position fixe (bas droite). Clique sur le bouton
      <strong>Menu</strong> pour voir l'animation.
    </p>

    <div class="phone-frame">
      <div class="phone-screen">
        <div class="mock-content">
          <div class="mock-header"></div>
          {#each Array(5) as _}
            <div class="mock-card"></div>
          {/each}
        </div>
        <p class="frame-hint">↘ clique sur le bouton en bas à droite</p>
      </div>
    </div>

    <FloatingGroup position="bottom-right">
      <NavbarMobileRadial
        {activeHref}
        items={[
          { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
          { icon: Bell, label: "Notifications", href: "/notifs" },
          { icon: MessageCircle, label: "Messages", href: "/messages" },
          { icon: Settings, label: "Paramètres", href: "/settings" },
        ]}
      />
    </FloatingGroup>
  </section>

  <!-- ─── Variante 5 items ──────────────────────────────────────────── -->
  <section class="variant">
    <h2>Usage — 5 items, item actif</h2>
    <p class="hint">
      Jusqu'à 5–6 items recommandés pour un arc lisible. L'item actif est mis en évidence
      avec la couleur primaire.
    </p>

    <div class="code-block">
      <pre><code
          >{`<NavbarMobileRadial
  activeHref="/dashboard"
  items={[
    { icon: LayoutDashboard, label: "Dashboard",      href: "/dashboard" },
    { icon: User,            label: "Profil",          href: "/profile"   },
    { icon: Search,          label: "Recherche",       href: "/search"    },
    { icon: Bookmark,        label: "Favoris",         href: "/bookmarks" },
    { icon: ShoppingCart,    label: "Panier",          href: "/cart"      },
  ]}
/>`}</code
        ></pre>
    </div>
  </section>

  <!-- ─── Props ─────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [["items", "RadialNavItem[]", "[]", "Liste des items de navigation"], ["activeHref", "string", "''", "URL active — colore l'item correspondant"], ["radius", "number", "80", "Distance (px) entre le FAB et les items"]] as [prop, type, def, desc]}
        <div class="props-row">
          <code>{prop}</code>
          <code class="type">{type}</code>
          <code class="default">{def}</code>
          <span>{desc}</span>
        </div>
      {/each}
    </div>

    <h3 style="margin-top: 24px;">Type RadialNavItem</h3>
    <div class="code-block">
      <pre><code
          >{`type RadialNavItem = {
  icon: Component;   // icône Lucide
  label: string;     // label affiché au hover / ouverture
  href?: string;     // si fourni → rendu en <a>
  active?: boolean;  // état actif forcé (sinon comparé à activeHref)
  onclick?: () => void;
}`}</code
        ></pre>
    </div>
  </section>

  <!-- ─── Notes ─────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Comportements</h2>
    <ul class="notes">
      <li>Touche <kbd>Échap</kbd> ou clic sur le backdrop pour fermer.</li>
      <li>
        Ouverture en cascade : les items apparaissent de haut en bas (index 0 = haut).
      </li>
      <li>Fermeture en cascade inverse : dernier item disparaît en premier.</li>
      <li>Labels visibles dès que l'item a fini son animation d'entrée.</li>
      <li>
        Items rendu en <code>&lt;a&gt;</code> si <code>href</code> est fourni, sinon
        <code>&lt;button&gt;</code>.
      </li>
      <li>5–6 items maximum pour conserver un arc lisible sur petit écran.</li>
    </ul>
  </section>
</div>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  /* ── Phone frame mockup ── */
  .phone-frame {
    display: inline-flex;
    border: 2px solid var(--border-strong);
    border-radius: 32px;
    padding: 12px;
    background: var(--bg-subtle);
    box-shadow: var(--shadow-lg);
    margin-bottom: 16px;
  }

  .phone-screen {
    width: 280px;
    height: 480px;
    border-radius: 22px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .mock-content {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
  }

  .mock-header {
    height: 36px;
    background: var(--bg-subtle);
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
  }

  .mock-card {
    height: 64px;
    background: var(--bg-subtle);
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    flex-shrink: 0;
  }

  .frame-hint {
    font-size: 11px;
    color: var(--text-subtle);
    text-align: center;
    padding: 8px;
    border-top: 1px solid var(--border);
    margin: 0;
  }

  /* ── Code block ── */
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

  /* ── Props table ── */
  .props-table {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .props-row {
    display: grid;
    grid-template-columns: 140px 160px 80px 1fr;
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

  /* ── Notes list ── */
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
