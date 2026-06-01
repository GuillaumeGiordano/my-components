<script lang="ts">
  import "$lib/styles/demo-page.css";
  import ComponentPreview from "$lib/ComponentPreview.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import LogoGG from "$lib/components/logo/LogoGG.svelte";
  import {
    LayoutDashboard,
    FileText,
    Settings,
    Users,
    Bell,
    ShoppingCart,
    Package,
    Tag,
    BarChart2,
    HelpCircle,
  } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Navbar — Layout — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Navbar</h1>
    <p>
      Barre de navigation responsive avec items riches — icône, badge, sous-menu dropdown
      au survol (desktop) ou collapsible (mobile).
    </p>
  </div>

  <!-- ─── Démo simple ──────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Items simples avec icônes</h2>
    <ComponentPreview>
      <Navbar
        items={[
          { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
          { icon: FileText,        label: "Articles",  href: "/articles" },
          { icon: Users,           label: "Équipe",    href: "/team" },
          { icon: Settings,        label: "Paramètres",href: "/settings" },
        ]}
      >
        {#snippet brand()}
          <LogoGG width={28} height={28} open={false} />
        {/snippet}
        {#snippet actionBtn()}
          <Button size="sm" variant="primary" href="#">Commencer</Button>
        {/snippet}
      </Navbar>
    </ComponentPreview>
  </section>

  <!-- ─── Démo avec badges et sous-menus ──────────────────────────────── -->
  <section class="variant">
    <h2>Badges + sous-menus dropdown</h2>
    <p class="hint">Passe en mobile pour voir les sous-menus collapsibles.</p>
    <ComponentPreview>
      <Navbar
        items={[
          { icon: LayoutDashboard, label: "Dashboard", href: "/" },
          {
            icon: ShoppingCart,
            label: "Catalogue",
            children: [
              { icon: Package, label: "Produits",   href: "/products", active: true },
              { icon: Tag,     label: "Catégories", href: "/categories" },
            ],
          },
          {
            icon: BarChart2,
            label: "Rapports",
            children: [
              { label: "Ventes",      href: "/reports/sales" },
              { label: "Trafic",      href: "/reports/traffic" },
              { label: "Conversions", href: "/reports/conversions" },
            ],
          },
          { icon: Bell,       label: "Alertes", href: "/alerts", badge: 4 },
          { icon: HelpCircle, label: "Aide",    href: "/help" },
        ]}
      >
        {#snippet brand()}
          <LogoGG width={28} height={28} open={false} />
        {/snippet}
      </Navbar>
    </ComponentPreview>
  </section>

  <!-- ─── Usage ───────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Usage</h2>
    <div class="code-block">
      <pre><code>{`<Navbar
  items={[
    { icon: Home,    label: "Accueil",  href: "/",     active: true },
    { icon: Bell,    label: "Alertes",  href: "/bell", badge: 3 },
    {
      icon: Settings,
      label: "Admin",
      children: [
        { icon: Users, label: "Utilisateurs", href: "/admin/users" },
        { label: "Logs",                      href: "/admin/logs"  },
      ],
    },
  ]}
>
  {#snippet brand()}<LogoGG />{/snippet}
  {#snippet actionBtn()}<Button>Connexion</Button>{/snippet}
</Navbar>`}</code></pre>
    </div>
  </section>

  <!-- ─── Types ───────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Types</h2>
    <div class="code-block">
      <pre><code>{`type NavItem = {
  icon?:     Component;
  label:     string;
  href?:     string;          // absent → rendu en <button>
  active?:   boolean;
  badge?:    number | string; // pastille numérique
  children?: NavSubItem[];    // dropdown desktop / collapsible mobile
};

type NavSubItem = {
  label:   string;
  href:    string;
  icon?:   Component;
  active?: boolean;
};`}</code></pre>
    </div>
  </section>

  <!-- ─── Comportements ────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Comportements</h2>
    <ul class="notes">
      <li>Desktop : dropdown au <strong>survol</strong> et au focus clavier (<kbd>Tab</kbd>).</li>
      <li>Mobile : sous-menu collapsible au clic avec animation slide.</li>
      <li>Un seul sous-menu mobile ouvert à la fois.</li>
      <li>Clic sur un lien → fermeture du menu mobile.</li>
      <li><code>badge</code> → pastille primaire à droite du label.</li>
    </ul>
  </section>
</div>

<style>
  .hint {
    font-size: 13px;
    color: var(--text-muted);
    margin-bottom: 12px;
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
</style>
