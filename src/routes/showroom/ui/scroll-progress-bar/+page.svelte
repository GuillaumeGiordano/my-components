<script lang="ts">
  import "$lib/styles/demo-page.css";
  import ScrollProgressBar from "$lib/components/ui/ScrollProgressBar.svelte";

  const blocks = Array.from({ length: 6 }, (_, i) => i + 1);
</script>

<svelte:head>
  <title>Scroll Progress Bar — UI — My Components</title>
</svelte:head>

<ScrollProgressBar />

<div class="page">
  <div class="page-header">
    <h1>Scroll Progress Bar</h1>
    <p>
      Barre de progression fine, pleine largeur, fixée tout en haut de la page.
      Elle se remplit de gauche à droite au fur et à mesure du défilement.
      Faites défiler pour la voir progresser.
    </p>
  </div>

  {#each blocks as n (n)}
    <section class="variant filler-section">
      <h2>Bloc {n}</h2>
      <p class="filler">
        Contenu de démonstration pour générer de la hauteur de page. La barre en haut
        reflète la position de scroll : 0 % en haut, 100 % en bas de la page.
      </p>
    </section>
  {/each}
</div>

<style>
  .filler-section {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .filler {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.7;
  }
</style>
