<script lang="ts">
  import '$lib/styles/demo-page.css';
  import SpeedDialBar from '$lib/components/ui/SpeedDialBar.svelte';
  import FloatingGroup from '$lib/FloatingGroup.svelte';
  import {
    LayoutDashboard, Bell, MessageCircle, Settings, User,
    Search, Bookmark, ShoppingCart, Star,
    FileText, Image, Video, Music, Share2, Download,
    Edit, Trash2,
  } from '@lucide/svelte';
</script>

<svelte:head><title>Speed Dial Bar — UI</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Speed Dial Bar</h1>
    <p>
      FAB flottant qui déploie un plateau d'items scrollable horizontalement au-dessus du bouton.
      Positionner via <code>FloatingGroup</code>. Les items avec sous-menus affichent un panneau vertical.
    </p>
  </div>

  <section class="variant">
    <h2>Démo — 10 items dont 2 avec sous-menus</h2>
    <p class="hint">
      Tape le FAB (en bas à droite) pour ouvrir. Glisse les items horizontalement. Tape un item
      avec un point bleu pour voir son sous-menu.
    </p>
  </section>

  <section class="variant">
    <h2>Comportements</h2>
    <ul class="notes">
      <li>FAB flottant — items surgissent au-dessus avec animation spring.</li>
      <li>Scroll horizontal infini en boucle (snap automatique, inertie).</li>
      <li>Items avec sous-menus marqués d'un point primaire en haut à droite.</li>
      <li>Sous-menu : panneau de pills flottant au-dessus de l'item tapé.</li>
      <li>Glisser ferme le sous-menu ouvert.</li>
      <li><kbd>Échap</kbd> ferme le sous-menu, puis le plateau.</li>
    </ul>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [
        ['items',    'SpeedDialBarItem[]', '[]',      'Items scrollables'],
        ['icon',     'Component',          'Settings', 'Icône du FAB'],
        ['nVisible', 'number',             '5',        'Nb de slots visibles simultanément'],
      ] as [p, t, d, desc]}
        <div class="props-row">
          <code>{p}</code><code class="type">{t}</code><code class="default">{d}</code><span>{desc}</span>
        </div>
      {/each}
    </div>
  </section>
</div>

<FloatingGroup position="bottom-right">
  <SpeedDialBar
    nVisible={5}
    items={[
      { icon: LayoutDashboard, label: 'Dashboard' },
      {
        icon: FileText, label: 'Fichiers',
        children: [
          { icon: Image,    label: 'Images',   onclick: () => {} },
          { icon: Video,    label: 'Vidéos',   onclick: () => {} },
          { icon: Music,    label: 'Musique',  onclick: () => {} },
        ],
      },
      { icon: Bell,          label: 'Alertes',  active: true },
      { icon: MessageCircle, label: 'Messages' },
      {
        icon: Share2, label: 'Partager',
        children: [
          { icon: Download, label: 'Télécharger', onclick: () => {} },
          { icon: Edit,     label: 'Modifier',    onclick: () => {} },
          { icon: Trash2,   label: 'Supprimer',   onclick: () => {} },
        ],
      },
      { icon: Search,       label: 'Chercher' },
      { icon: Bookmark,     label: 'Favoris'  },
      { icon: ShoppingCart, label: 'Panier'   },
      { icon: User,         label: 'Profil'   },
      { icon: Star,         label: 'Étoiles'  },
    ]}
  />
</FloatingGroup>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 16px;
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
    grid-template-columns: 120px 180px 90px 1fr;
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
