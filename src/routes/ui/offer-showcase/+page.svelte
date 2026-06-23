<script lang="ts">
  import "$lib/styles/demo-page.css";
  import OfferShowcase from "$lib/components/ui/OfferShowcase.svelte";
  import { Monitor, Image, ShoppingCart, AppWindow } from "@lucide/svelte";

  const offers = [
    {
      label: "Site vitrine",
      price: 490,
      tagline: "Présentez votre activité et convertissez vos visiteurs.",
      href: "#",
      accent: "var(--primary)",
      icon: Monitor,
    },
    {
      label: "Portfolio",
      price: 690,
      tagline: "Mettez vos réalisations en valeur dans une galerie soignée.",
      href: "#",
      accent: "#8b5cf6",
      icon: Image,
    },
    {
      label: "E-commerce",
      price: 1490,
      tagline: "Vendez vos produits en ligne, partout et 24h/24.",
      href: "#",
      accent: "#22c55e",
      icon: ShoppingCart,
    },
    {
      label: "Application web",
      price: 2900,
      tagline: "Des outils métier sur mesure, taillés pour votre organisation.",
      href: "#",
      accent: "#f59e0b",
      icon: AppWindow,
    },
  ];
</script>

<svelte:head>
  <title>Offer Showcase — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Offer Showcase</h1>
    <p>
      Carte d'offre animée : le prix se compte à chaque changement, les offres défilent
      automatiquement (pause au survol), avec halo pulsant et points de navigation.
    </p>
  </div>

  <section class="variant">
    <div class="demo-area">
      <OfferShowcase {offers} />
    </div>
  </section>
</div>

<style>
  .demo-area {
    display: flex;
    justify-content: center;
    padding: 40px 0;
  }
</style>
