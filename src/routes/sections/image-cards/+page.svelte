<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ImageCardsSection from '$lib/components/sections/ImageCardsSection.svelte';

  const constructionCards = [
    {
      src: 'https://picsum.photos/seed/building1/800/600',
      alt: 'Design et construction',
      title: 'Design & Construction',
      text: 'De la conception architecturale à la livraison clé en main, nous gérons chaque étape du projet.',
      href: '#',
    },
    {
      src: 'https://picsum.photos/seed/renovation1/800/600',
      alt: 'Rénovation et restauration',
      title: 'Rénovation & Restauration',
      text: 'Nous redonnons vie aux bâtiments anciens avec des techniques modernes respectueuses du patrimoine.',
      href: '#',
    },
    {
      src: 'https://picsum.photos/seed/interior1/800/600',
      alt: 'Aménagement intérieur',
      title: 'Aménagement Intérieur',
      text: 'Conception d\'espaces intérieurs fonctionnels et esthétiques adaptés à vos usages.',
      href: '#',
    },
  ];

  const twoColCards = [
    {
      src: 'https://picsum.photos/seed/arch-hero/1200/800',
      alt: 'Architecture contemporaine',
      title: 'Architecture Contemporaine',
      text: 'Des lignes épurées et des matériaux nobles pour des espaces qui durent.',
    },
    {
      src: 'https://picsum.photos/seed/landscape1/1200/800',
      alt: 'Aménagement paysager',
      title: 'Aménagement Paysager',
      text: 'Jardins, terrasses et espaces verts conçus pour prolonger votre espace de vie.',
    },
  ];

  const fourColCards = [
    {
      src: 'https://picsum.photos/seed/service1/600/800',
      alt: 'Maçonnerie',
      title: 'Maçonnerie',
    },
    {
      src: 'https://picsum.photos/seed/service2/600/800',
      alt: 'Charpente',
      title: 'Charpente & Toiture',
    },
    {
      src: 'https://picsum.photos/seed/service3/600/800',
      alt: 'Électricité',
      title: 'Électricité',
    },
    {
      src: 'https://picsum.photos/seed/service4/600/800',
      alt: 'Plomberie',
      title: 'Plomberie & Sanitaire',
    },
  ];
</script>

<svelte:head>
  <title>Image Cards — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Image Cards</h1>
    <p>Grille de cartes full-image avec overlay sombre, titre en majuscules, accent coloré et texte optionnel — idéal pour les services ou portfolios.</p>
  </div>

  <section class="variant">
    <h2>3 colonnes avec header et liens</h2>
    <ImageCardsSection
      badge="Nos services"
      title="Ce que nous construisons"
      description="Une expertise complète pour vos projets de construction, de la conception à la livraison."
      columns={3}
      cards={constructionCards}
    />
  </section>

  <section class="variant">
    <h2>2 colonnes sans header</h2>
    <ImageCardsSection
      columns={2}
      cards={twoColCards}
    />
  </section>

  <section class="variant">
    <h2>4 colonnes — titre seul</h2>
    <ImageCardsSection
      columns={4}
      cards={fourColCards}
    />
  </section>
</div>
