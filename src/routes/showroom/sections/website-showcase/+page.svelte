<script lang="ts">
  import "$lib/styles/demo-page.css";
  import WebsiteShowcase from "$lib/components/ui/WebsiteShowcase.svelte";
</script>

<svelte:head>
  <title>Website Showcase — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Website Showcase</h1>
    <p>
      Illustration en pur CSS d'un site internet : une fenêtre de navigateur affichant une
      landing page (navigation, hero, cartes), avec un curseur de souris flottant. Décorative
      (aucune interaction), la couleur d'accent est personnalisable via la prop
      <code>accent</code>.
    </p>
  </div>

  <section class="variant">
    <div class="demo-area">
      <WebsiteShowcase />
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
