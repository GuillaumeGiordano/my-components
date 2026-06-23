<script lang="ts">
  import "$lib/styles/demo-page.css";
  import AppShowcase from "$lib/components/ui/AppShowcase.svelte";
</script>

<svelte:head>
  <title>App Showcase — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>App Showcase</h1>
    <p>
      Illustration en pur CSS d'une application web : une fenêtre d'application avec sidebar et
      dashboard (cartes de statistiques + graphe en barres), surmontée d'une roue crantée qui
      tourne lentement. Décorative (aucune interaction), la couleur d'accent est personnalisable
      via la prop <code>accent</code>.
    </p>
  </div>

  <section class="variant">
    <div class="demo-area">
      <AppShowcase />
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
