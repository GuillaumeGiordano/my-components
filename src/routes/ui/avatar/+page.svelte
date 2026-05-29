<script lang="ts">
  import "$lib/styles/demo-page.css";
  import Avatar from "$lib/components/ui/Avatar.svelte";
  import Card from "$lib/components/ui/Card.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import { MapPin, Link } from "@lucide/svelte";

  const TEAM = [
    { name: "Marie Dupont",    role: "CEO & Co-fondatrice",    location: "Paris" },
    { name: "Thomas Renard",   role: "CTO",                    location: "Lyon" },
    { name: "Camille Martin",  role: "Lead Designer",          location: "Bordeaux" },
    { name: "Julien Moreau",   role: "Dev Back-end",           location: "Nantes" },
    { name: "Sophie Bernard",  role: "Product Manager",        location: "Toulouse" },
    { name: "Alexandre Petit", role: "Dev Front-end",          location: "Lille" },
  ];
</script>

<svelte:head>
  <title>Avatar — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Avatar</h1>
    <p>
      Photo ou initiales générées depuis le nom avec une couleur déterministe. 5 tailles,
      2 formes — le fallback initiales se déclenche automatiquement si aucune image n'est
      fournie ou si elle échoue à charger.
    </p>
  </div>

  <!-- ─── Tailles ───────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Tailles</h2>
    <p class="hint">De <code>xs</code> (24 px) à <code>xl</code> (72 px).</p>

    <div class="size-row">
      {#each ["xs", "sm", "md", "lg", "xl"] as size}
        <div class="size-col">
          <Avatar name="Guillaume G" {size} />
          <span class="size-label">{size}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- ─── Formes ────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Formes</h2>
    <p class="hint"><code>circle</code> (défaut) et <code>square</code> avec coins arrondis.</p>

    <div class="shapes-row">
      <div class="shape-group">
        <p class="group-label">Circle</p>
        <div class="avatars-inline">
          {#each ["xs", "sm", "md", "lg", "xl"] as size}
            <Avatar name="Marie Dupont" {size} shape="circle" />
          {/each}
        </div>
      </div>
      <div class="shape-group">
        <p class="group-label">Square</p>
        <div class="avatars-inline">
          {#each ["xs", "sm", "md", "lg", "xl"] as size}
            <Avatar name="Marie Dupont" {size} shape="square" />
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- ─── Initiales & couleurs ──────────────────────────────────────── -->
  <section class="variant">
    <h2>Initiales & couleurs déterministes</h2>
    <p class="hint">
      La couleur est calculée depuis le nom — le même nom produit toujours la même couleur,
      peu importe le contexte.
    </p>

    <div class="color-grid">
      {#each [
        "Alice Bernard",
        "Bob Martin",
        "Claire Lefevre",
        "David Roux",
        "Emma Girard",
        "Florian Morel",
        "Gabriel Fournier",
        "Hugo Mercier",
        "Isabelle Dupuis",
        "Jacques Simon",
        "Katia Blanc",
        "Laurent Henry",
      ] as name}
        <div class="color-item">
          <Avatar {name} size="md" />
          <span class="color-name">{name.split(" ")[0]}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- ─── Avec image ────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Avec image</h2>
    <p class="hint">Si <code>src</code> est fourni, l'image remplace les initiales.</p>

    <div class="avatars-inline">
      <Avatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
        alt="John"
        size="xl"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
        alt="Sarah"
        size="xl"
      />
      <Avatar
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
        alt="Mark"
        size="xl"
      />
      <!-- Broken src — falls back to initials -->
      <Avatar src="/broken-url.jpg" name="Fallback Test" size="xl" />
    </div>
    <p class="hint" style="margin-top: 12px">
      Le dernier avatar utilise une URL invalide — les initiales prennent le relais automatiquement.
    </p>
  </section>

  <!-- ─── Stack d'avatars ───────────────────────────────────────────── -->
  <section class="variant">
    <h2>Avatar stack</h2>
    <p class="hint">Groupe d'avatars empilés — pattern courant pour afficher les participants.</p>

    <div class="stack-demo">
      <div class="avatar-stack">
        {#each [
          { name: "Alice B", src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" },
          { name: "Bob M" },
          { name: "Claire L" },
          { name: "David R" },
          { name: "Emma G" },
        ] as av, i}
          <div class="stack-item" style="z-index: {10 - i}">
            <Avatar name={av.name} src={av.src} size="md" />
          </div>
        {/each}
        <div class="stack-item stack-count" style="z-index: 0">+12</div>
      </div>
      <p class="stack-label">17 participants à ce projet</p>
    </div>
  </section>

  <!-- ─── Composition avec Card ─────────────────────────────────────── -->
  <section class="variant">
    <h2>Composition — cartes équipe</h2>
    <p class="hint">Avatar combiné avec Card, Badge et Button dans un contexte réel.</p>

    <div class="team-grid">
      {#each TEAM as member}
        <Card hoverable>
          {#snippet header()}
            <div class="team-card-head">
              <Avatar name={member.name} size="lg" />
              <Badge variant="default">Actif</Badge>
            </div>
          {/snippet}

          <div class="team-info">
            <p class="team-name">{member.name}</p>
            <p class="team-role">{member.role}</p>
            <p class="team-location"><MapPin size={12} />{member.location}</p>
          </div>

          {#snippet footer()}
            <div class="team-footer">
              <Button variant="ghost" size="sm"><Link size={14} /> Profil</Button>
              <Button variant="outline" size="sm">Message</Button>
            </div>
          {/snippet}
        </Card>
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

  /* ── Tailles ── */
  .size-row {
    display: flex;
    align-items: flex-end;
    gap: 24px;
  }

  .size-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .size-label {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-subtle);
    font-family: var(--font-mono);
  }

  /* ── Formes ── */
  .shapes-row {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .shape-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .group-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-subtle);
    font-family: var(--font-mono);
    width: 56px;
    flex-shrink: 0;
    margin: 0;
  }

  .avatars-inline {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  /* ── Couleurs ── */
  .color-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }

  .color-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .color-name {
    font-size: 11px;
    color: var(--text-subtle);
  }

  /* ── Stack ── */
  .stack-demo {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .avatar-stack {
    display: flex;
    align-items: center;
  }

  .stack-item {
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid var(--bg-base);

    &:first-child { margin-left: 0; }
  }

  .stack-count {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--bg-subtle);
    border: 2px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    color: var(--text-muted);
  }

  .stack-label {
    font-size: 14px;
    color: var(--text-muted);
    margin: 0;
  }

  /* ── Team grid ── */
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }

  .team-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .team-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .team-name {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-heading);
    margin: 0;
  }

  .team-role {
    font-size: 13px;
    color: var(--text-muted);
    margin: 0;
  }

  .team-location {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: var(--text-subtle);
    margin: 4px 0 0;
  }

  .team-footer {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }
</style>
