<script lang="ts">
  import '$lib/styles/demo-page.css';
  import SidebarItem from '$lib/components/ui/SidebarItem.svelte';
  import Sidebar from '$lib/components/layout/Sidebar.svelte';
  import {
    LayoutDashboard, Users, Settings, Bell, FileText,
    BarChart3, ShieldCheck, HelpCircle, Inbox,
    List, UserPlus, KeyRound, CalendarDays, TrendingUp,
    Palette, Lock, Globe, Package, Tag, Layers,
  } from '@lucide/svelte';

  let collapsed = $state(false);
</script>

<svelte:head>
  <title>Sidebar Item — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Sidebar Item</h1>
    <p>Bouton de navigation sidebar avec icône, label, badge de notification, sous-items collapsibles et tooltip en mode réduit.</p>
  </div>

  <!-- ─── Demo interactive avec Sidebar réelle ──────────────────── -->
  <section class="variant">
    <h2>Démo complète — Sidebar interactive</h2>
    <p class="hint">Clique sur <strong>«&nbsp;Réduire&nbsp;»</strong> pour voir le mode collapsed avec tooltip au hover et badge-dot.</p>

    <div class="sidebar-demo">
      <Sidebar
        {collapsed}
        activeHref="/dashboard"
        groups={[
          {
            label: 'Principal',
            items: [
              { icon: LayoutDashboard, label: 'Dashboard',    href: '/dashboard', active: true },
              { icon: Inbox,          label: 'Messages',      href: '/messages',  badge: 4 },
              { icon: Bell,           label: 'Notifications', href: '/notifs',    badge: '99+' },
            ],
          },
          {
            label: 'Gestion',
            items: [
              {
                icon: Users,
                label: 'Utilisateurs',
                children: [
                  { label: 'Liste',        href: '/users',        active: false },
                  { label: 'Invitations',  href: '/users/invite', active: false },
                  { label: 'Rôles',        href: '/users/roles',  active: false },
                ],
              },
              {
                icon: FileText,
                label: 'Rapports',
                children: [
                  { label: 'Mensuel',    href: '/reports/monthly' },
                  { label: 'Annuel',     href: '/reports/yearly'  },
                ],
              },
              { icon: BarChart3,   label: 'Analytiques', href: '/analytics' },
            ],
          },
          {
            label: 'Système',
            items: [
              { icon: ShieldCheck, label: 'Sécurité',  href: '/security',  badge: 1 },
              { icon: Settings,    label: 'Paramètres', href: '/settings'  },
              { icon: HelpCircle,  label: 'Aide',       href: '/help'      },
            ],
          },
        ]}
      />

      <div class="demo-content">
        <button class="toggle-btn" onclick={() => (collapsed = !collapsed)}>
          {collapsed ? '→ Ouvrir' : '← Réduire'}
        </button>
        <p class="demo-hint">
          {#if collapsed}
            Mode réduit — survole les icônes pour voir le tooltip
          {:else}
            Mode ouvert — clique sur "Utilisateurs" ou "Rapports" pour ouvrir les sous-menus
          {/if}
        </p>
      </div>
    </div>
  </section>

  <!-- ─── Sous-items avec icônes ────────────────────────────────── -->
  <section class="variant">
    <h2>Sous-items avec icônes</h2>
    <p class="hint">Chaque sous-item peut avoir sa propre icône Lucide via la prop <code>icon</code>.</p>

    <div class="row-previews">
      <div>
        <p class="preview-label">Utilisateurs</p>
        <div class="items-preview">
          <SidebarItem
            icon={Users}
            label="Utilisateurs"
            children={[
              { icon: List,     label: 'Liste',       href: '/users'         },
              { icon: UserPlus, label: 'Invitations', href: '/users/invite', active: true },
              { icon: KeyRound, label: 'Rôles',       href: '/users/roles'   },
            ]}
          />
        </div>
      </div>

      <div>
        <p class="preview-label">Rapports</p>
        <div class="items-preview">
          <SidebarItem
            icon={FileText}
            label="Rapports"
            badge={3}
            children={[
              { icon: CalendarDays, label: 'Mensuel',    href: '/reports/monthly' },
              { icon: TrendingUp,   label: 'Annuel',     href: '/reports/yearly'  },
              { icon: Globe,        label: 'Export',     href: '/reports/export'  },
            ]}
          />
        </div>
      </div>

      <div>
        <p class="preview-label">Paramètres</p>
        <div class="items-preview">
          <SidebarItem
            icon={Settings}
            label="Paramètres"
            children={[
              { icon: Palette, label: 'Apparence',  href: '/settings/theme'    },
              { icon: Lock,    label: 'Sécurité',   href: '/settings/security' },
              { icon: Package, label: 'Intégrations', href: '/settings/integrations' },
            ]}
          />
        </div>
      </div>
    </div>
  </section>

  <!-- ─── Items standalone ───────────────────────────────────────── -->
  <section class="variant">
    <h2>Items seuls — expanded</h2>
    <div class="items-preview">
      <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/dashboard" active />
      <SidebarItem icon={Bell}  label="Notifications" href="/notifs" badge={4} />
      <SidebarItem icon={Inbox} label="Messages"      href="/messages" badge="99+" />
      <SidebarItem
        icon={Layers}
        label="Catalogue"
        children={[
          { icon: Package, label: 'Produits',   href: '/catalog/products' },
          { icon: Tag,     label: 'Catégories', href: '/catalog/categories', active: true },
        ]}
      />
      <SidebarItem icon={ShieldCheck} label="Sécurité"   href="/security" badge={1} />
      <SidebarItem icon={Settings}    label="Paramètres" href="/settings" />
    </div>
  </section>

  <section class="variant">
    <h2>Items seuls — collapsed</h2>
    <div class="items-preview collapsed-preview">
      <SidebarItem icon={LayoutDashboard} label="Dashboard"     href="/dashboard" active collapsed />
      <SidebarItem icon={Bell}            label="Notifications" href="/notifs"    badge={4} collapsed />
      <SidebarItem icon={Layers}          label="Catalogue"     collapsed
        children={[{ icon: Package, label: 'Produits', href: '/catalog/products' }]}
      />
      <SidebarItem icon={Settings}        label="Paramètres"   href="/settings" collapsed />
    </div>
    <p class="hint" style="margin-top: 8px">Survole les icônes pour voir le tooltip.</p>
  </section>
</div>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  /* ── Sidebar demo ── */
  .sidebar-demo {
    display: flex;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    min-height: 380px;
  }

  .demo-content {
    flex: 1;
    padding: 24px;
    background: var(--bg-base);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .toggle-btn {
    align-self: flex-start;
    padding: 8px 16px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--bg-subtle);
    color: var(--text-base);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background var(--transition-fast);

    &:hover { background: var(--bg-hover); }
  }

  .demo-hint {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0;
  }

  /* ── Row of previews (sous-items avec icônes) ── */
  .row-previews {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .preview-label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-subtle);
    margin: 0 0 8px 8px;
  }

  /* ── Standalone preview ── */
  .items-preview {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 220px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 8px;
  }

  .collapsed-preview {
    max-width: 56px;
  }
</style>
