<script lang="ts">
  import '$lib/styles/demo-page.css';
  import NavbarMobileRadialScroll from '$lib/components/layout/NavbarMobileRadialScroll.svelte';
  import FloatingGroup from '$lib/FloatingGroup.svelte';
  import {
    LayoutDashboard, Bell, MessageCircle, Settings,
    User, Search, Bookmark, ShoppingCart, Heart, Star,
  } from '@lucide/svelte';

  let activeHref = $state('/dashboard');
</script>

<svelte:head>
  <title>Radial Défilant — Layout</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Radial Défilant</h1>
    <p>
      FAB radial avec <strong>4 items visibles</strong> en arc. Glisser vers le haut ou le bas
      pour faire défiler tous les items — snap automatique, inertie, boucle circulaire.
    </p>
  </div>

  <section class="variant">
    <h2>Démo — 8 items</h2>
    <p class="hint">
      Ouvre le menu puis glisse sur les items pour faire défiler. Tap sur un item pour naviguer.
    </p>

    <div class="phone-frame">
      <div class="phone-screen">
        <div class="mock-content">
          <div class="mock-header"></div>
          {#each Array(5) as _}
            <div class="mock-card"></div>
          {/each}
        </div>
        <p class="frame-hint">↘ ouvre le menu puis glisse pour défiler</p>
      </div>
    </div>

    <FloatingGroup position="right">
      <NavbarMobileRadialScroll
        {activeHref}
        items={[
          { icon: LayoutDashboard, label: 'Dashboard',     href: '/dashboard' },
          { icon: Bell,            label: 'Notifications', href: '/notifs'    },
          { icon: MessageCircle,   label: 'Messages',      href: '/messages'  },
          { icon: Settings,        label: 'Paramètres',    href: '/settings'  },
          { icon: User,            label: 'Profil',        href: '/profile'   },
          { icon: Search,          label: 'Recherche',     href: '/search'    },
          { icon: Bookmark,        label: 'Favoris',       href: '/bookmarks' },
          { icon: ShoppingCart,    label: 'Panier',        href: '/cart'      },
        ]}
      />
    </FloatingGroup>
  </section>

  <section class="variant">
    <h2>Comportements</h2>
    <ul class="notes">
      <li>4 items visibles simultanément dans un arc de 90°, centrés à 135°.</li>
      <li>Glisser vers le haut → items suivants, vers le bas → items précédents.</li>
      <li>Snap automatique après relâchement, avec inertie proportionnelle à la vitesse.</li>
      <li>Défilement en boucle — le dernier item est suivi du premier.</li>
      <li>Tap sans mouvement sur un item → navigation.</li>
      <li>Touche <kbd>↑</kbd> / <kbd>↓</kbd> pour défiler au clavier. <kbd>Échap</kbd> pour fermer.</li>
      <li>Utilise <code>translate</code> CSS (sans transition) pour un suivi en temps réel, <code>scale</code> pour l'animation d'ouverture.</li>
    </ul>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [
        ['items',      'RadialScrollItem[]', '[]',    'Liste complète des items (défilables)'],
        ['activeHref', 'string',             "''",    'URL active — colore l\'item correspondant'],
        ['radius',     'number',             '150',   'Rayon de l\'arc en px'],
      ] as [prop, type, def, desc]}
        <div class="props-row">
          <code>{prop}</code>
          <code class="type">{type}</code>
          <code class="default">{def}</code>
          <span>{desc}</span>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

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
</style>
