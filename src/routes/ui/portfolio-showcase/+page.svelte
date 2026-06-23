<script lang="ts">
  import "$lib/styles/demo-page.css";
  import PortfolioShowcase from "$lib/components/ui/PortfolioShowcase.svelte";
</script>

<svelte:head>
  <title>Portfolio Showcase — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Portfolio Showcase</h1>
    <p>
      Illustration en pur CSS d'un site portfolio : une fenêtre de navigateur affichant une
      galerie d'images, avec un badge d'icône image flottant. Décorative (aucune interaction),
      la couleur d'accent est personnalisable via la prop <code>accent</code>.
    </p>
  </div>

  <section class="variant">
    <div class="demo-area">
      <PortfolioShowcase />
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
