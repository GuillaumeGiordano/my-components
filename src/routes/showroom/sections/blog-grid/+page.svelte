<script lang="ts">
  import '$lib/styles/demo-page.css';
  import BlogGridSection from '$lib/components/sections/BlogGridSection.svelte';

  const posts = [
    {
      title: 'Concevoir des interfaces accessibles sans sacrifier l\'esthétique',
      excerpt:
        "L'accessibilité et la beauté ne sont pas des opposés. Découvrez comment intégrer les bonnes pratiques WCAG dès la phase de design pour créer des produits inclusifs et élégants.",
      category: 'Design',
      author: { name: 'Sophie Martin' },
      date: '8 jan. 2025',
      readTime: '6 min',
      image: 'https://picsum.photos/seed/access/800/450',
      href: '#',
    },
    {
      title: 'Svelte 5 et les Runes : une révolution pour la réactivité',
      excerpt:
        "Les Runes de Svelte 5 transforment la façon dont on gère l'état dans les applications web. Tour d'horizon des nouveautés et de leur impact sur la DX.",
      category: 'Développement',
      author: { name: 'Lucas Fontaine' },
      date: '15 jan. 2025',
      readTime: '8 min',
      image: 'https://picsum.photos/seed/svelte5/800/450',
      href: '#',
    },
    {
      title: 'Créer un design system modulaire avec des tokens CSS',
      excerpt:
        "Les variables CSS ne sont pas que pratiques : elles peuvent devenir le socle d'un système de design cohérent et maintenable à l'échelle. Retour d'expérience.",
      category: 'Design System',
      author: { name: 'Camille Renard' },
      date: '22 jan. 2025',
      readTime: '7 min',
      image: 'https://picsum.photos/seed/tokens/800/450',
      href: '#',
    },
    {
      title: 'Performance web en 2025 : les métriques qui comptent vraiment',
      excerpt:
        "Core Web Vitals, INP, TTFB... Le paysage des métriques de performance évolue vite. Voici comment prioriser vos efforts pour un impact maximum sur l'expérience utilisateur.",
      category: 'Performance',
      author: { name: 'Arthur Leblanc' },
      date: '29 jan. 2025',
      readTime: '5 min',
      image: 'https://picsum.photos/seed/perf25/800/450',
      href: '#',
    },
    {
      title: 'Micro-interactions : l\'art de rendre une interface vivante',
      excerpt:
        "Une animation bien placée peut transformer une interface ordinaire en une expérience mémorable. Guide pratique des micro-interactions qui font la différence.",
      category: 'Animation',
      author: { name: 'Emma Duval' },
      date: '5 fév. 2025',
      readTime: '4 min',
      image: 'https://picsum.photos/seed/micro/800/450',
      href: '#',
    },
    {
      title: 'Déployer une app SvelteKit sur Cloudflare Pages : le guide complet',
      excerpt:
        "Cloudflare Pages offre des performances edge exceptionnelles pour vos applications SvelteKit. Du zéro au déploiement en production en moins de 30 minutes.",
      category: 'Déploiement',
      author: { name: 'Thomas Bernard' },
      date: '12 fév. 2025',
      readTime: '9 min',
      image: 'https://picsum.photos/seed/cloudflare/800/450',
      href: '#',
    },
  ];
</script>

<svelte:head>
  <title>Blog Grid — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Blog Grid</h1>
    <p>Grille d'articles de blog avec cartes hovérables, avatars et badges de catégorie.</p>
  </div>

  <section class="variant">
    <h2>Grille 3 colonnes avec CTA</h2>
    <BlogGridSection
      badge="Blog"
      title="Derniers articles"
      description="Ressources, tutoriels et retours d'expérience sur le design et le développement web moderne."
      posts={posts}
      columns={3}
      showCta={true}
      ctaLabel="Voir tous les articles"
      ctaHref="#"
    />
  </section>

  <section class="variant">
    <h2>Grille 2 colonnes</h2>
    <BlogGridSection
      badge="Ressources"
      title="Articles sélectionnés"
      description="Une sélection de nos meilleurs contenus pour approfondir vos connaissances."
      posts={posts.slice(0, 4)}
      columns={2}
      showCta={false}
    />
  </section>
</div>
