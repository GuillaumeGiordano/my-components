<script lang="ts">
  import TeamSection from '$lib/components/sections/TeamSection.svelte';
  import { Code2, Link2, X } from '@lucide/svelte';
  import '$lib/styles/demo-page.css';
</script>

<svelte:head>
  <title>Team — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Team</h1>
    <p>Grille de membres avec avatar, rôle, bio et liens sociaux. L'avatar utilise les initiales si aucune image n'est fournie.</p>
  </div>

  <TeamSection
    badge="L'équipe"
    title="Les personnes derrière le produit"
    description="Une équipe passionnée par le design système, l'accessibilité et l'expérience développeur."
    members={[
      {
        name: 'Élise Morin',
        role: 'Co-fondatrice & CEO',
        bio: "Ex-ingénieure chez Doctolib, Élise pilote la vision produit et la stratégie de croissance depuis la création de la société en 2021.",
        links: [
          { icon: Link2, href: '#', label: 'LinkedIn' },
          { icon: X, href: '#', label: 'Twitter' },
        ],
      },
      {
        name: 'Nathan Keller',
        role: 'Co-fondateur & CTO',
        bio: "Architecte logiciel spécialisé en systèmes distribués. Nathan a contribué à plusieurs projets open-source avant de co-fonder la société.",
        links: [
          { icon: Code2, href: '#', label: 'GitHub' },
          { icon: Link2, href: '#', label: 'LinkedIn' },
        ],
      },
      {
        name: 'Yasmine Benali',
        role: 'Lead Designer',
        bio: "Spécialiste design système et accessibilité. Yasmine conçoit chaque composant pour être beau, utilisable et conforme RGAA dès le départ.",
        links: [
          { icon: Link2, href: '#', label: 'LinkedIn' },
          { icon: X, href: '#', label: 'Twitter' },
        ],
      },
      {
        name: 'Marcus Pereira',
        role: 'Senior Full-Stack Engineer',
        bio: "Développeur Svelte et Rust passionné. Marcus maintient l'infrastructure de la plateforme et contribue au coeur du moteur de rendu.",
        links: [
          { icon: Code2, href: '#', label: 'GitHub' },
          { icon: Link2, href: '#', label: 'LinkedIn' },
        ],
      },
    ]}
  />
</div>
