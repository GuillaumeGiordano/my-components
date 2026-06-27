<script lang="ts">
  import '$lib/styles/demo-page.css';
  import SpeedDialBar from '$lib/components/ui/SpeedDialBar.svelte';
  import FloatingGroup from '$lib/FloatingGroup.svelte';
  import {
    LayoutDashboard, Bell, MessageCircle, Settings, User,
    Search, Bookmark, ShoppingCart, Star,
    FileText, Image, Video, Music, Share2, Download,
    Edit, Trash2, Plus, Heart,
  } from '@lucide/svelte';
</script>

<svelte:head><title>Speed Dial Bar — UI</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Speed Dial Bar</h1>
    <p>
      FAB flottant avec deux zones d'action : une <strong>pilule horizontale</strong> qui glisse
      sur le côté (items scrollables en boucle), et des <strong>boutons verticaux</strong> qui
      surgissent au-dessus. À positionner via <code>&lt;FloatingGroup&gt;</code>.
    </p>
  </div>

  <section class="variant">
    <h2>Démo — 2 actions + 10 items dont 2 avec sous-menus</h2>
    <p class="hint">
      Tape le FAB (en bas à droite). La pilule glisse à gauche, les boutons surgissent au-dessus.
      Glisse horizontalement pour faire défiler les items. Tape un item marqué d'un point bleu pour
      voir son sous-menu.
    </p>
  </section>

  <section class="variant">
    <h2>Comportements</h2>
    <ul class="notes">
      <li>
        <strong>Pilule horizontale</strong> — glisse depuis derrière le FAB vers la gauche à
        l'ouverture. Fond uni, bord gauche arrondi, plus haute que le FAB (62 px vs 56 px).
      </li>
      <li>Scroll horizontal infini en boucle — snap automatique avec inertie après relâchement.</li>
      <li>Barre de progression sous les items : le thumb se déplace en temps réel avec le scroll.</li>
      <li>
        <strong>Actions verticales</strong> — boutons circulaires qui surgissent au-dessus du FAB
        avec un stagger de bas en haut (spring). Label visible au survol.
      </li>
      <li>Items avec sous-menus marqués d'un point primaire — sous-menu en panneau vertical.</li>
      <li>Voile sombre à l'ouverture — clic dessus ferme le menu.</li>
      <li><kbd>Échap</kbd> ferme le sous-menu ouvert, puis le menu.</li>
    </ul>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [
        ['items',    'SpeedDialBarItem[]',   '[]',       'Items du plateau horizontal scrollable'],
        ['actions',  'SpeedDialBarAction[]', '[]',       'Boutons verticaux au-dessus du FAB (optionnel)'],
        ['icon',     'Component',            'Settings', 'Icône du FAB'],
        ['nVisible', 'number',               '5',        'Nombre de slots visibles simultanément'],
      ] as [p, t, d, desc]}
        <div class="props-row">
          <code>{p}</code><code class="type">{t}</code><code class="default">{d}</code><span>{desc}</span>
        </div>
      {/each}
    </div>
  </section>

  <section class="variant">
    <h2>Types</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Champ</span><span>Type</span><span>Requis</span><span>Description</span>
      </div>
      <div class="props-row type-header"><span colspan="4"><strong>SpeedDialBarItem</strong></span></div>
      {#each [
        ['icon',     'Component',              'oui', 'Icône Lucide'],
        ['label',    'string',                 'oui', 'Texte affiché sous l\'icône'],
        ['active',   'boolean',                'non', 'État actif — colore l\'item en primaire'],
        ['onclick',  '() => void',             'non', 'Callback au tap'],
        ['children', 'SpeedDialBarSubItem[]',  'non', 'Déclenche un sous-menu au tap'],
      ] as [f, t, r, desc]}
        <div class="props-row">
          <code>{f}</code><code class="type">{t}</code><code class="req">{r}</code><span>{desc}</span>
        </div>
      {/each}
      <div class="props-row type-header"><span colspan="4"><strong>SpeedDialBarAction</strong></span></div>
      {#each [
        ['icon',    'Component',  'oui', 'Icône Lucide'],
        ['label',   'string',     'oui', 'Label affiché au survol'],
        ['onclick', '() => void', 'non', 'Callback — le menu se ferme automatiquement'],
      ] as [f, t, r, desc]}
        <div class="props-row">
          <code>{f}</code><code class="type">{t}</code><code class="req">{r}</code><span>{desc}</span>
        </div>
      {/each}
      <div class="props-row type-header"><span colspan="4"><strong>SpeedDialBarSubItem</strong></span></div>
      {#each [
        ['icon',    'Component',  'oui', 'Icône Lucide'],
        ['label',   'string',     'oui', 'Texte de la pill'],
        ['onclick', '() => void', 'non', 'Callback au clic'],
      ] as [f, t, r, desc]}
        <div class="props-row">
          <code>{f}</code><code class="type">{t}</code><code class="req">{r}</code><span>{desc}</span>
        </div>
      {/each}
    </div>
  </section>

  <section class="variant">
    <h2>Usage</h2>
    <div class="code-block">
      <pre><code>{`<FloatingGroup position="bottom-right">
  <SpeedDialBar
    icon={Menu}
    actions={[
      { icon: Plus,  label: 'Nouveau',  onclick: () => {} },
      { icon: Heart, label: 'Favoris',  onclick: () => {} },
    ]}
    items={[
      { icon: Home,     label: 'Accueil' },
      { icon: Settings, label: 'Paramètres', active: true },
      {
        icon: FileText, label: 'Fichiers',
        children: [
          { icon: Image, label: 'Images', onclick: () => {} },
        ],
      },
    ]}
  />
</FloatingGroup>`}</code></pre>
    </div>
  </section>
</div>

<FloatingGroup position="bottom-right">
  <SpeedDialBar
    nVisible={5}
    actions={[
      { icon: Plus,  label: 'Nouveau',  onclick: () => {} },
      { icon: Heart, label: 'Favoris',  onclick: () => {} },
    ]}
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
  code.req     { color: var(--text-subtle); }

  .type-header {
    background: var(--bg-subtle);
    font-size: 12px;
    color: var(--text-base);
    padding: 8px 16px;
    border-bottom: 1px solid var(--border);
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
