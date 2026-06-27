<script lang="ts">
  import GallerySection from '$lib/components/sections/GallerySection.svelte';
  import GallerySectionV2 from '$lib/components/sections/GallerySectionV2.svelte';
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
      { src: 'https://picsum.photos/seed/dashboard/800/600', alt: 'Tableau de bord analytique', caption: 'Tableau de bord analytique' },
      { src: 'https://picsum.photos/seed/editor/800/600', alt: 'Éditeur de contenu', caption: 'Éditeur de contenu riche' },
      { src: 'https://picsum.photos/seed/settings/800/600', alt: 'Paramètres utilisateur', caption: 'Panneau de paramètres' },
      { src: 'https://picsum.photos/seed/calendar/800/600', alt: 'Vue calendrier', caption: 'Vue calendrier intégrée' },
      { src: 'https://picsum.photos/seed/kanban/800/600', alt: 'Tableau Kanban', caption: 'Gestion de tâches Kanban' },
      { src: 'https://picsum.photos/seed/reports/800/600', alt: 'Rapports et exports', caption: 'Rapports et exports PDF' },
      { src: 'https://picsum.photos/seed/profile/800/600', alt: 'Profil utilisateur', caption: 'Page de profil utilisateur' },
      { src: 'https://picsum.photos/seed/notifications/800/600', alt: 'Centre de notifications', caption: 'Centre de notifications' },
      { src: 'https://picsum.photos/seed/integrations/800/600', alt: "Catalogue d'intégrations", caption: "Catalogue d'intégrations" },
    ]}
  />

  <div class="page-header" style="margin-top: 80px;">
    <h2>GallerySection V2</h2>
    <p>Variante premium : filtres par catégorie, layout <em>featured</em> et <em>masonry</em>, lightbox full-screen avec navigation par points.</p>
  </div>

  <!-- V2 — featured layout + category filters -->
  <GallerySectionV2
    badge="Portfolio"
    title="Nos réalisations"
    description="Une sélection de projets classés par univers. Cliquez sur une image pour l'agrandir."
    columns={3}
    layout="featured"
    images={[
      { src: 'https://picsum.photos/seed/arch1/1200/800', alt: 'Grande réalisation', caption: 'Projet phare — Architecture', category: 'Architecture' },
      { src: 'https://picsum.photos/seed/arch2/800/600', alt: 'Façade urbaine', caption: 'Façade urbaine', category: 'Architecture' },
      { src: 'https://picsum.photos/seed/nature1/800/600', alt: 'Forêt boréale', caption: 'Forêt boréale', category: 'Nature' },
      { src: 'https://picsum.photos/seed/arch3/800/600', alt: 'Intérieur minimaliste', caption: 'Intérieur minimaliste', category: 'Architecture' },
      { src: 'https://picsum.photos/seed/nature2/800/600', alt: 'Lac de montagne', caption: 'Lac de montagne', category: 'Nature' },
      { src: 'https://picsum.photos/seed/urban1/800/600', alt: 'Rue animée', caption: 'Rue animée', category: 'Urbain' },
      { src: 'https://picsum.photos/seed/nature3/800/600', alt: 'Coucher de soleil', caption: 'Coucher de soleil', category: 'Nature' },
      { src: 'https://picsum.photos/seed/urban2/800/600', alt: 'Place publique', caption: 'Place publique', category: 'Urbain' },
      { src: 'https://picsum.photos/seed/urban3/800/600', alt: 'Architecture moderne', caption: 'Architecture moderne', category: 'Urbain' },
    ]}
  />

  <!-- V2 — masonry layout -->
  <GallerySectionV2
    title="Masonry"
    description="Layout masonry via CSS columns — les images conservent leur ratio naturel."
    columns={3}
    layout="masonry"
    images={[
      { src: 'https://picsum.photos/seed/m1/600/400', alt: 'Image 1' },
      { src: 'https://picsum.photos/seed/m2/600/800', alt: 'Image 2', caption: 'Portrait' },
      { src: 'https://picsum.photos/seed/m3/600/450', alt: 'Image 3' },
      { src: 'https://picsum.photos/seed/m4/600/700', alt: 'Image 4', caption: 'Grand format' },
      { src: 'https://picsum.photos/seed/m5/600/380', alt: 'Image 5' },
      { src: 'https://picsum.photos/seed/m6/600/600', alt: 'Image 6', caption: 'Carré' },
      { src: 'https://picsum.photos/seed/m7/600/500', alt: 'Image 7' },
      { src: 'https://picsum.photos/seed/m8/600/420', alt: 'Image 8' },
    ]}
  />
</div>
