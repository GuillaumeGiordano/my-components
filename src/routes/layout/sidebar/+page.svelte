<script lang="ts">
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import Avatar from "$lib/components/ui/Avatar.svelte";
  import ThemeToggle from "$lib/components/ui/ThemeToggle.svelte";
  import {
    LayoutDashboard,
    BarChart2,
    FileText,
    User,
    Lock,
    Bell,
    Building2,
    LogOut,
    Settings,
  } from "@lucide/svelte";

  const groups = [
    {
      label: "Général",
      items: [
        { label: "Tableau de bord", href: "#", icon: LayoutDashboard, active: true },
        { label: "Analytiques", href: "#", icon: BarChart2 },
        { label: "Rapports", href: "#", icon: FileText, badge: 3 },
      ],
    },
    {
      label: "Paramètres",
      items: [
        { label: "Profil", href: "#", icon: User },
        { label: "Sécurité", href: "#", icon: Lock },
        { label: "Notifications", href: "#", icon: Bell, badge: 12 },
      ],
    },
  ];

  let collapsed = $state(false);
</script>

<svelte:head>
  <title>Sidebar — Layout</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Sidebar</h1>
    <p>
      Navigation latérale collapsible avec groupes, badges et état bindable. Supporte des
      snippets <code>header</code> et <code>footer</code> pour intégrer un en-tête de marque
      et un pied de page utilisateur.
    </p>
  </div>

  <!-- ── Démo complète avec header + footer ── -->
  <section class="variant">
    <h2>Avec header et footer</h2>
    <p class="hint">
      Cas d'usage réel — en-tête de marque, navigation, pied de page utilisateur.
    </p>

    <div class="demo-wrap">
      <Sidebar {groups} bind:collapsed>
        {#snippet header()}
          <div class="brand">
            <div class="brand-icon">
              <Building2 size={16} />
            </div>
            {#if !collapsed}
              <div class="brand-text">
                <span class="brand-name">G2 ERP</span>
                <span class="brand-sub">G2 Webdev</span>
              </div>
            {/if}
          </div>
        {/snippet}

        {#snippet footer()}
          <div class="user-footer">
            <div class="user-row">
              <Avatar name="Guillaume G." size="sm" />
              {#if !collapsed}
                <span class="user-email">g.giordano@g2web.fr</span>
                <ThemeToggle />
              {/if}
            </div>
            {#if !collapsed}
              <button class="logout-btn">
                <LogOut size={14} />
                <span>Déconnexion</span>
              </button>
            {/if}
          </div>
        {/snippet}
      </Sidebar>

      <div class="demo-main">
        <p>Contenu principal</p>
        <p class="state-hint">
          Sidebar : <strong>{collapsed ? "réduite" : "ouverte"}</strong>
          — raccourci <kbd>[</kbd>
        </p>
      </div>
    </div>
  </section>

  <!-- ── Sans header/footer (comportement original) ── -->
  <section class="variant">
    <h2>Sans header / footer</h2>
    <div class="demo-wrap">
      <Sidebar {groups} activeHref="#" />
      <div class="demo-main"><p>Contenu principal</p></div>
    </div>
  </section>

  <!-- ── Props ── -->
  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [["groups", "SidebarGroup[]", "[]", "Groupes de liens de navigation"], ["collapsed", "boolean", "false", "État réduit — bindable"], ["activeHref", "string", "''", "URL active (surlignée)"], ["shortkey", "string | false", "'['", "Raccourci clavier pour toggle — false pour désactiver"], ["header", "Snippet", "—", "Contenu rendu en haut de la sidebar (logo, marque…)"], ["footer", "Snippet", "—", "Contenu rendu en bas de la sidebar (user, logout…)"]] as [p, t, d, desc]}
        <div class="props-row">
          <code>{p}</code><code class="type">{t}</code><code class="default">{d}</code
          ><span>{desc}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- ── Usage ── -->
  <section class="variant">
    <h2>Usage</h2>
    <div class="code-block">
      <pre><code
          >{`<Sidebar {groups} bind:collapsed activeHref={page.url.pathname}>

  {#snippet header()}
    <div class="brand-header">
      <BuildingIcon size={16} />
      <span>Mon App</span>
    </div>
  {/snippet}

  {#snippet footer()}
    <div class="user-footer">
      <Avatar name={user.name} size="sm" />
      <span>{user.email}</span>
      <ThemeToggle />
    </div>
  {/snippet}

</Sidebar>`}</code
        ></pre>
    </div>
  </section>
</div>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  /* ── Demo frame ── */
  .demo-wrap {
    display: flex;
    min-height: 340px;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .demo-main {
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: var(--text-muted);
    font-size: 14px;
    background: var(--bg-base);
  }

  .state-hint {
    font-size: 13px;
    color: var(--text-subtle);
  }

  .state-hint strong {
    color: var(--primary);
  }

  .state-hint kbd {
    font-family: var(--font-mono);
    font-size: 11px;
    background: var(--bg-hover);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    padding: 1px 5px;
  }

  /* ── Brand header snippet ── */
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
  }

  .brand-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    background: var(--primary);
    color: var(--primary-fg);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
  }

  .brand-name {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-base);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .brand-sub {
    font-size: 11px;
    color: var(--text-subtle);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── User footer snippet ── */
  .user-footer {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .user-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .user-email {
    flex: 1;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-base);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  .logout-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 6px 8px;
    font-size: 13px;
    color: var(--text-muted);
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    text-align: left;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }
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
    grid-template-columns: 120px 160px 70px 1fr;
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
</style>
