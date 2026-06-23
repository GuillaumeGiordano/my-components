<script lang="ts">
  import "$lib/styles/demo-page.css";
  import DeviceShowcase from "$lib/components/ui/DeviceShowcase.svelte";

  const offers = [
    { label: "Site vitrine", price: 490, accent: "var(--primary)" },
    { label: "Portfolio", price: 690, accent: "#8b5cf6" },
    { label: "E-commerce", price: 1490, accent: "#22c55e" },
    { label: "Application web", price: 2900, accent: "#f59e0b" },
  ];
</script>

<svelte:head>
  <title>Device Showcase — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Device Showcase</h1>
    <p>
      Composition mockup en pur CSS : un écran desktop en arrière-plan, un téléphone qui
      chevauche à gauche, le titre et le prix de l'offre en haut à droite. Les offres
      défilent automatiquement (la boucle se met en pause au survol et l'accent se teinte à
      chaque offre) ; le bouton en bas à droite ouvre la page regroupant toutes les offres.
    </p>
  </div>

  <section class="variant">
    <div class="demo-area">
      <DeviceShowcase {offers} buttonHref="/g2webdev/offres" />
    </div>
  </section>
</div>

<style>
  .demo-area {
    display: flex;
    justify-content: center;
    padding: 40px 0 80px;
  }
</style>
