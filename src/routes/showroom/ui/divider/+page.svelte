<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Divider from '$lib/components/ui/Divider.svelte';
</script>

<svelte:head><title>Divider — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Divider</h1>
    <p>Séparateur horizontal ou vertical — avec label optionnel.</p>
  </div>

  <section class="variant">
    <h2>Simple</h2>
    <div class="stack">
      <p class="text">Contenu au-dessus</p>
      <Divider />
      <p class="text">Contenu en-dessous</p>
    </div>
  </section>

  <section class="variant">
    <h2>Avec label centré</h2>
    <Divider label="ou continuer avec" />
  </section>

  <section class="variant">
    <h2>Label à gauche / droite</h2>
    <div class="stack">
      <Divider label="Aujourd'hui" align="left" />
      <Divider label="Section suivante" align="right" />
    </div>
  </section>

  <section class="variant">
    <h2>Vertical</h2>
    <div class="row">
      <span class="text">Élément A</span>
      <Divider orientation="vertical" />
      <span class="text">Élément B</span>
      <Divider orientation="vertical" />
      <span class="text">Élément C</span>
    </div>
  </section>
</div>

<style>
  .stack { display: flex; flex-direction: column; gap: 16px; }
  .row   { display: flex; align-items: center; gap: 12px; height: 32px; }
  .text  { font-size: 14px; color: var(--text-muted); }
</style>
