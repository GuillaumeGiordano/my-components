<script lang="ts">
  import GallerySection from '$lib/components/sections/GallerySection.svelte';
  import '$lib/styles/demo-page.css';
</script>

<svelte:head>
  <title>Gallery — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Gallery</h1>
    <p>Grille d'images avec lightbox intégrée. Navigation au clavier (flèches gauche/droite) et fermeture au clic sur l'overlay.</p>
  </div>

  <GallerySection
    badge="Galerie"
    title="Aperçu de l'interface"
    description="Quelques captures illustrant les principales sections et composants disponibles dans la bibliothèque."
    columns={3}
    images={[
      {
        src: 'https://picsum.photos/seed/dashboard/800/600',
        alt: 'Tableau de bord analytique',
        caption: 'Tableau de bord analytique',
      },
      {
        src: 'https://picsum.photos/seed/editor/800/600',
        alt: 'Éditeur de contenu',
        caption: 'Éditeur de contenu riche',
      },
      {
        src: 'https://picsum.photos/seed/settings/800/600',
        alt: 'Paramètres utilisateur',
        caption: 'Panneau de paramètres',
      },
      {
        src: 'https://picsum.photos/seed/calendar/800/600',
        alt: 'Vue calendrier',
        caption: 'Vue calendrier intégrée',
      },
      {
        src: 'https://picsum.photos/seed/kanban/800/600',
        alt: 'Tableau Kanban',
        caption: 'Gestion de tâches Kanban',
      },
      {
        src: 'https://picsum.photos/seed/reports/800/600',
        alt: 'Rapports et exports',
        caption: 'Rapports et exports PDF',
      },
      {
        src: 'https://picsum.photos/seed/profile/800/600',
        alt: 'Profil utilisateur',
        caption: 'Page de profil utilisateur',
      },
      {
        src: 'https://picsum.photos/seed/notifications/800/600',
        alt: 'Centre de notifications',
        caption: 'Centre de notifications',
      },
      {
        src: 'https://picsum.photos/seed/integrations/800/600',
        alt: 'Catalogue d\'intégrations',
        caption: 'Catalogue d\'intégrations',
      },
    ]}
  />
</div>
