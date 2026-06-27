<script lang="ts">
  import '$lib/styles/demo-page.css';
  import NavbarMobileSheet from '$lib/components/layout/NavbarMobileSheet.svelte';
  import FloatingGroup from '$lib/FloatingGroup.svelte';
  import {
    LayoutDashboard, Bell, MessageCircle, Settings, User,
    Search, Bookmark, FileText, Image, Video, Music,
    ShoppingCart, HelpCircle, LogOut, Shield, CreditCard,
    Menu,
  } from '@lucide/svelte';
</script>

<svelte:head>
  <title>Mobile Sheet — Layout</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Mobile Sheet</h1>
    <p>
      FAB flottant qui ouvre un menu plein écran glissant depuis le bas.
      Supporte icône, badge de notification, collapse et sous-items.
      À positionner via <code>&lt;FloatingGroup&gt;</code>.
    </p>
  </div>

  <section class="variant">
    <h2>Démo</h2>
    <p class="hint">
      Tape le FAB en bas à droite. Le menu monte depuis le bas.
      Glisse vers le bas pour fermer.
    </p>
  </section>

  <section class="variant">
    <h2>Comportements</h2>
    <ul class="notes">
      <li>Slide vers le haut depuis le bas de l'écran — <code>cubic-bezier(0.32, 0.72, 0, 1)</code> (iOS-like).</li>
      <li>Voile sombre avec blur à l'ouverture — clic dessus ferme le menu.</li>
      <li>Glisser la barre de drag vers le bas ferme le menu (seuil : 120 px).</li>
      <li>Item <code>active</code> — barre colorée à gauche + fond primaire subtil.</li>
      <li>Item avec <code>badge</code> — pill numérique à droite.</li>
      <li>Item avec <code>children</code> — chevron rotatif, collapse animé.</li>
      <li><kbd>Échap</kbd> ferme le menu.</li>
    </ul>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [
        ['items', 'SheetNavItem[]', '[]',    'Liste des items du menu'],
        ['icon',  'Component',     'Menu',   'Icône du FAB déclencheur'],
        ['title', 'string',        "''",     'Titre affiché dans l\'en-tête du menu'],
      ] as [p, t, d, desc]}
        <div class="props-row">
          <code>{p}</code><code class="type">{t}</code><code class="default">{d}</code><span>{desc}</span>
        </div>
      {/each}
    </div>
  </section>

  <section class="variant">
    <h2>Type SheetNavItem</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Champ</span><span>Type</span><span>Requis</span><span>Description</span>
      </div>
      {#each [
        ['icon',     'Component',       'oui', 'Icône Lucide'],
        ['label',    'string',          'oui', 'Texte de l\'item'],
        ['href',     'string',          'non', 'Lien de navigation (goto)'],
        ['active',   'boolean',         'non', 'État actif — barre colorée + fond'],
        ['badge',    'number | string', 'non', 'Badge de notification affiché à droite'],
        ['onclick',  '() => void',      'non', 'Callback au tap (ferme le menu)'],
        ['children', 'SheetNavItem[]',  'non', 'Sous-items — collapse animé'],
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
  <NavbarMobileSheet
    icon={Menu}
    title="Navigation"
    items={[
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
      { icon: Bell,            label: 'Alertes',   badge: 3 },
      {
        icon: Settings, label: 'Paramètres',
        children: [
          { icon: User,       label: 'Profil',   href: '/profile' },
          { icon: Shield,     label: 'Sécurité', href: '/security' },
          { icon: CreditCard, label: 'Facturation', href: '/billing' },
        ],
      },
      { icon: LogOut, label: 'Déconnexion', onclick: () => signOut() },
    ]}
  />
</FloatingGroup>`}</code></pre>
    </div>
  </section>

  <!-- Filler content to scroll -->
  {#each Array(6) as _, i}
    <section class="variant">
      <h2>Section {i + 1}</h2>
      <p class="filler">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
      </p>
    </section>
  {/each}
</div>

<FloatingGroup position="bottom-right">
  <NavbarMobileSheet
    icon={Menu}
    title="Navigation"
    items={[
      { icon: LayoutDashboard, label: 'Dashboard',     href: '/dashboard', active: true },
      { icon: Bell,            label: 'Notifications', badge: 12 },
      { icon: MessageCircle,   label: 'Messages',      badge: 3  },
      { icon: Search,          label: 'Recherche' },
      { icon: Bookmark,        label: 'Favoris' },
      { icon: ShoppingCart,    label: 'Panier',         badge: 2 },
      {
        icon: FileText,
        label: 'Fichiers',
        children: [
          { icon: Image, label: 'Images',  onclick: () => {} },
          { icon: Video, label: 'Vidéos',  onclick: () => {} },
          { icon: Music, label: 'Musique', onclick: () => {} },
        ],
      },
      {
        icon: Settings,
        label: 'Paramètres',
        children: [
          { icon: User,       label: 'Mon profil',    onclick: () => {} },
          { icon: Shield,     label: 'Sécurité',      onclick: () => {} },
          { icon: CreditCard, label: 'Facturation',   onclick: () => {} },
        ],
      },
      { icon: HelpCircle, label: 'Aide' },
      { icon: LogOut,     label: 'Déconnexion', onclick: () => {} },
    ]}
  />
</FloatingGroup>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  .filler {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.7;
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
    grid-template-columns: 120px 180px 70px 1fr;
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
