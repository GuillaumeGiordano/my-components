<script lang="ts">
  import TestimonialsSection from '$lib/components/sections/TestimonialsSection.svelte';
  import '$lib/styles/demo-page.css';
</script>

<svelte:head>
  <title>Testimonials — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Testimonials</h1>
    <p>Grille masonry de témoignages clients avec avatar, note en étoiles et citation. Mise en page automatique en colonnes CSS.</p>
  </div>

  <TestimonialsSection
    badge="Témoignages"
    title="Ce que disent nos utilisateurs"
    description="Plus de 10 000 équipes font confiance à notre plateforme au quotidien. Voici quelques-uns de leurs retours."
    testimonials={[
      {
        name: 'Sophie Marchand',
        role: 'CTO',
        company: 'Leanflow',
        content: 'Nous avons réduit notre temps de déploiement de 40 % dès le premier mois. L\'intégration avec nos outils existants a été quasi immédiate.',
        rating: 5,
      },
      {
        name: 'Thomas Rivière',
        role: 'Lead Developer',
        company: 'Hexacode',
        content: 'La qualité des composants est impressionnante. Tout est accessible et bien documenté — exactement ce dont notre équipe avait besoin.',
        rating: 5,
      },
      {
        name: 'Amina El Fassi',
        role: 'Product Manager',
        company: 'NovaTech',
        content: 'Le support réactif et les mises à jour régulières nous donnent confiance pour utiliser cette solution dans nos projets critiques.',
        rating: 5,
      },
      {
        name: 'Lucas Ferreira',
        role: 'Fondateur',
        company: 'Buildify',
        content: 'En tant que startup, chaque heure compte. Cette bibliothèque nous a permis de lancer notre MVP en trois semaines au lieu de trois mois.',
        rating: 4,
      },
      {
        name: 'Claire Dupont',
        role: 'Directrice Technique',
        company: 'Arkéa Digital',
        content: 'La conformité RGPD et la gestion des accès granulaires étaient des critères non négociables pour nous. Tout y est, sans complexité inutile.',
        rating: 5,
      },
      {
        name: 'David Kim',
        role: 'Senior Engineer',
        company: 'Synclab',
        content: 'Les performances out-of-the-box sont bluffantes. Nos Core Web Vitals sont au vert depuis le premier déploiement en production.',
        rating: 4,
      },
    ]}
  />
</div>
