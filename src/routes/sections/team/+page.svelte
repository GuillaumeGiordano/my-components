<script lang="ts">
  import TeamSection from '$lib/components/sections/TeamSection.svelte';
  import { Github, Linkedin, Twitter } from '@lucide/svelte';
  import '$lib/styles/demo-page.css';
</script>

<svelte:head>
  <title>Team — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Team</h1>
    <p>Grille de membres d'équipe avec avatar, rôle, bio et liens sociaux. L'avatar utilise les initiales si aucune image n'est fournie.</p>
  </div>

  <TeamSection
    badge="L'équipe"
    title="Les personnes derrière le produit"
    description="Une équipe passionnée par le design système, l'accessibilité et l'expérience développeur."
    members={[
      {
        name: 'Élise Morin',
        role: 'Co-fondatrice & CEO',
        bio: 'Ex-ingénieure chez Doctolib, Élise pilote la vision produit et la stratégie de croissance depuis la création de la société en 2021.',
        links: [
          { icon: Linkedin, href: '#', label: 'LinkedIn d\'Élise Morin' },
          { icon: Twitter, href: '#', label: 'Twitter d\'Élise Morin' },
        ],
      },
      {
        name: 'Nathan Keller',
        role: 'Co-fondateur & CTO',
        bio: 'Architecte logiciel spécialisé en systèmes distribués. Nathan a contribué à plusieurs projets open-source avant de co-fonder la société.',
        links: [
          { icon: Github, href: '#', label: 'GitHub de Nathan Keller' },
          { icon: Linkedin, href: '#', label: 'LinkedIn de Nathan Keller' },
        ],
      },
      {
        name: 'Yasmine Benali',
        role: 'Lead Designer',
        bio: 'Spécialiste design système et accessibilité. Yasmine conçoit chaque composant pour être beau, utilisable et conforme RGAA dès le départ.',
        links: [
          { icon: Linkedin, href: '#', label: 'LinkedIn de Yasmine Benali' },
          { icon: Twitter, href: '#', label: 'Twitter de Yasmine Benali' },
        ],
      },
      {
        name: 'Marcus Pereira',
        role: 'Senior Full-Stack Engineer',
        bio: 'Développeur Svelte et Rust passionné. Marcus maintient l\'infrastructure de la plateforme et contribue au cœur du moteur de rendu.',
        links: [
          { icon: Github, href: '#', label: 'GitHub de Marcus Pereira' },
          { icon: Linkedin, href: '#', label: 'LinkedIn de Marcus Pereira' },
        ],
      },
    ]}
  />
</div>
