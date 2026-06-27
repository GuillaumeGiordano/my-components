<script lang="ts">
  import "$lib/styles/demo-page.css";
  import Card from "$lib/components/ui/Card.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import Avatar from "$lib/components/ui/Avatar.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import {
    Star,
    ArrowRight,
    MoreHorizontal,
    TrendingUp,
    Users,
    ShoppingCart,
    DollarSign,
    Heart,
    MessageCircle,
    Share2,
    Bookmark,
    Calendar,
    Clock,
  } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Card — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Card</h1>
    <p>
      Conteneur polyvalent avec bordure, ombre optionnelle, effet hover et padding
      configurable. Accepte des snippets <code>header</code> et <code>footer</code> pour
      structurer le contenu.
    </p>
  </div>

  <!-- ─── Padding variants ──────────────────────────────────────────── -->
  <section class="variant">
    <h2>Padding</h2>
    <p class="hint">4 tailles disponibles : <code>none</code>, <code>sm</code>, <code>md</code> (défaut), <code>lg</code>.</p>

    <div class="row wrap">
      <div class="col">
        <p class="label">none</p>
        <Card padding="none">
          <img class="card-img" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop" alt="Montagne" />
          <div class="img-caption">Padding none — idéal pour les médias plein-bord</div>
        </Card>
      </div>

      <div class="col">
        <p class="label">sm</p>
        <Card padding="sm">
          <p class="card-text">Padding <strong>sm</strong> — contenu compact, notifications, chips.</p>
        </Card>
      </div>

      <div class="col">
        <p class="label">md (défaut)</p>
        <Card padding="md">
          <p class="card-text">Padding <strong>md</strong> — usage général, la valeur par défaut pour la plupart des cas.</p>
        </Card>
      </div>

      <div class="col">
        <p class="label">lg</p>
        <Card padding="lg">
          <p class="card-text">Padding <strong>lg</strong> — mise en avant, hero cards, CTA proéminents.</p>
        </Card>
      </div>
    </div>
  </section>

  <!-- ─── Hoverable ─────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Hoverable</h2>
    <p class="hint">La prop <code>hoverable</code> ajoute une ombre et un léger décalage au survol.</p>

    <div class="row">
      <Card>
        <p class="card-text">Card normale — pas de survol.</p>
      </Card>
      <Card hoverable>
        <p class="card-text">Card hoverable — survole pour voir l'effet.</p>
      </Card>
    </div>
  </section>

  <!-- ─── Header & Footer ───────────────────────────────────────────── -->
  <section class="variant">
    <h2>Header & Footer</h2>
    <p class="hint">
      Les snippets <code>#header</code> et <code>#footer</code> s'affichent avec une
      bordure de séparation automatique.
    </p>

    <div class="row wrap">
      <!-- Header only -->
      <Card class="card-demo">
        {#snippet header()}
          <div class="card-head-row">
            <span class="card-title">En-tête seul</span>
            <Badge variant="info" label="Nouveau" />
          </div>
        {/snippet}
        <p class="card-text">Le snippet <code>#header</code> ajoute un bloc séparé au-dessus du corps.</p>
      </Card>

      <!-- Footer only -->
      <Card class="card-demo">
        <p class="card-text">Le snippet <code>#footer</code> ajoute des actions en bas, séparées visuellement.</p>
        {#snippet footer()}
          <div class="card-foot-row">
            <Button variant="ghost" size="sm">Annuler</Button>
            <Button variant="primary" size="sm">Confirmer</Button>
          </div>
        {/snippet}
      </Card>

      <!-- Header + Footer -->
      <Card class="card-demo">
        {#snippet header()}
          <div class="card-head-row">
            <span class="card-title">Header + Footer</span>
            <button class="icon-btn"><MoreHorizontal size={16} /></button>
          </div>
        {/snippet}
        <p class="card-text">Combinaison complète — structure à trois zones.</p>
        {#snippet footer()}
          <div class="card-foot-row">
            <span class="footer-hint">Dernière mise à jour il y a 3 min</span>
            <Button variant="outline" size="sm">Détails <ArrowRight size={14} /></Button>
          </div>
        {/snippet}
      </Card>
    </div>
  </section>

  <!-- ─── Exemples concrets ─────────────────────────────────────────── -->
  <section class="variant">
    <h2>Exemples concrets</h2>

    <div class="row wrap align-start">

      <!-- Profil utilisateur -->
      <Card class="card-demo" hoverable>
        {#snippet header()}
          <div class="card-head-row">
            <span class="card-title">Profil</span>
            <Badge variant="success" label="Actif" />
          </div>
        {/snippet}

        <div class="profile-body">
          <Avatar name="Marie Dupont" size="lg" />
          <div>
            <p class="profile-name">Marie Dupont</p>
            <p class="profile-role">Développeuse Front-end</p>
            <div class="profile-stats">
              <span><strong>128</strong> projets</span>
              <span><strong>4.9</strong> <Star size={12} fill="currentColor" /></span>
            </div>
          </div>
        </div>

        {#snippet footer()}
          <div class="card-foot-row">
            <Button variant="outline" size="sm">Message</Button>
            <Button variant="primary" size="sm">Voir profil</Button>
          </div>
        {/snippet}
      </Card>

      <!-- Stat card -->
      <Card class="card-demo stat-card" hoverable>
        {#snippet header()}
          <div class="card-head-row">
            <span class="card-title">Revenus ce mois</span>
            <span class="stat-icon revenue"><DollarSign size={18} /></span>
          </div>
        {/snippet}

        <div class="stat-body">
          <p class="stat-value">€24 890</p>
          <p class="stat-delta positive"><TrendingUp size={14} /> +12,4 % vs mois dernier</p>
        </div>

        {#snippet footer()}
          <div class="card-foot-row">
            <span class="footer-hint">Mise à jour en temps réel</span>
            <Button variant="ghost" size="sm">Rapport complet</Button>
          </div>
        {/snippet}
      </Card>

      <!-- Article / blog card -->
      <Card class="card-demo" padding="none" hoverable>
        <img
          class="card-img"
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=180&fit=crop"
          alt="Code"
        />
        <div class="article-body">
          <div class="article-meta">
            <Badge variant="default" label="Dev" />
            <span class="article-date"><Clock size={12} /> 5 min de lecture</span>
          </div>
          <p class="article-title">Svelte 5 — les runes expliquées en profondeur</p>
          <p class="article-desc">Découvrez comment $state, $derived et $effect transforment la réactivité.</p>
        </div>
        <div class="article-footer">
          <div class="article-author">
            <Avatar name="Guillaume G" size="xs" />
            <span>Guillaume G. · <Calendar size={12} /> 24 mai</span>
          </div>
          <div class="article-actions">
            <button class="icon-btn"><Heart size={15} /></button>
            <button class="icon-btn"><MessageCircle size={15} /></button>
            <button class="icon-btn"><Bookmark size={15} /></button>
          </div>
        </div>
      </Card>

      <!-- Stats grid card -->
      <Card class="card-demo">
        {#snippet header()}
          <span class="card-title">Vue d'ensemble</span>
        {/snippet}

        <div class="stats-grid">
          {#each [
            { icon: Users, label: "Utilisateurs", value: "8 421", color: "blue" },
            { icon: ShoppingCart, label: "Commandes", value: "1 203", color: "green" },
            { icon: DollarSign, label: "Revenus", value: "€52k", color: "yellow" },
            { icon: Share2, label: "Partages", value: "389", color: "pink" },
          ] as stat}
            <div class="stat-item">
              <span class="stat-item-icon {stat.color}"><stat.icon size={16} /></span>
              <p class="stat-item-value">{stat.value}</p>
              <p class="stat-item-label">{stat.label}</p>
            </div>
          {/each}
        </div>
      </Card>

    </div>
  </section>
</div>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 16px;
  }

  .row {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .row.wrap { flex-wrap: wrap; }
  .row.align-start { align-items: flex-start; }

  .col {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 200px;
    flex: 1;
  }

  .label {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-subtle);
    margin: 0;
  }

  /* ── Card demo width ── */
  :global(.card-demo) {
    min-width: 240px;
    flex: 1;
    max-width: 300px;
  }

  /* ── Card image ── */
  .card-img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
  }

  .img-caption {
    padding: 12px;
    font-size: 13px;
    color: var(--text-muted);
  }

  .card-text {
    font-size: 14px;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.6;
  }

  /* ── Header / Footer rows ── */
  .card-head-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .card-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-heading);
  }

  .card-foot-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  .footer-hint {
    font-size: 12px;
    color: var(--text-subtle);
    margin-right: auto;
  }

  .icon-btn {
    display: flex;
    align-items: center;
    padding: 4px;
    border: none;
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: color var(--transition-fast);

    &:hover { color: var(--text-base); }
  }

  /* ── Profile card ── */
  .profile-body {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .profile-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-heading);
    margin: 0 0 2px;
  }

  .profile-role {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0 0 8px;
  }

  .profile-stats {
    display: flex;
    gap: 12px;
    font-size: 13px;
    color: var(--text-muted);
  }

  .profile-stats strong { color: var(--text-base); }

  /* ── Stat card ── */
  .stat-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-icon.revenue {
    background: color-mix(in srgb, var(--success) 15%, transparent);
    color: var(--success);
  }

  .stat-body {
    padding: 4px 0;
  }

  .stat-value {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0 0 4px;
    letter-spacing: -0.02em;
  }

  .stat-delta {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    margin: 0;
  }

  .stat-delta.positive { color: var(--success); }

  /* ── Article card ── */
  .article-body {
    padding: 16px 16px 8px;
  }

  .article-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .article-date {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--text-muted);
  }

  .article-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-heading);
    margin: 0 0 6px;
    line-height: 1.4;
  }

  .article-desc {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0;
    line-height: 1.5;
  }

  .article-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-top: 1px solid var(--border);
  }

  .article-author {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--text-muted);
  }

  .article-actions {
    display: flex;
    gap: 2px;
  }

  /* ── Stats grid inside card ── */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .stat-item-icon {
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }

  .stat-item-icon.blue   { background: color-mix(in srgb, #3b82f6 15%, transparent); color: #3b82f6; }
  .stat-item-icon.green  { background: color-mix(in srgb, var(--success) 15%, transparent); color: var(--success); }
  .stat-item-icon.yellow { background: color-mix(in srgb, #f59e0b 15%, transparent); color: #f59e0b; }
  .stat-item-icon.pink   { background: color-mix(in srgb, #ec4899 15%, transparent); color: #ec4899; }

  .stat-item-value {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
  }

  .stat-item-label {
    font-size: 12px;
    color: var(--text-muted);
    margin: 0;
  }
</style>
