<script lang="ts">
  import "$lib/styles/demo-page.css";
  import EcommerceShowcase from "$lib/components/ui/EcommerceShowcase.svelte";
</script>

<svelte:head>
  <title>Ecommerce Showcase — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Ecommerce Showcase</h1>
    <p>
      Illustration en pur CSS d'un site e-commerce : une fenêtre de navigateur avec une grille
      de fiches produits (prix en €) et un panier flottant avec compteur. Décorative (aucune
      interaction), la couleur d'accent est personnalisable via la prop <code>accent</code>.
    </p>
  </div>

  <section class="variant">
    <div class="demo-area">
      <EcommerceShowcase />
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
