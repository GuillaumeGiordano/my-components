<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Slider from '$lib/components/forms/Slider.svelte';

  let volume = $state(60);
  let price  = $state(250);
  let opacityVal = $state(80);
</script>

<svelte:head><title>Slider — Formulaires — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Slider</h1>
    <p>Curseur de valeur numérique — min/max/step, formatage personnalisé.</p>
  </div>

  <section class="variant">
    <h2>Volume (0–100)</h2>
    <div style="max-width: 400px;">
      <Slider label="Volume" bind:value={volume} formatValue={(v) => `${v}%`} />
    </div>
  </section>

  <section class="variant">
    <h2>Prix (0–1000 €, pas de 10)</h2>
    <div style="max-width: 400px;">
      <Slider label="Budget maximum" bind:value={price} min={0} max={1000} step={10}
        formatValue={(v) => `${v} €`} />
    </div>
  </section>

  <section class="variant">
    <h2>Opacité (0–100 %)</h2>
    <div style="max-width: 400px;">
      <Slider
        label="Opacité"
        bind:value={opacityVal}
        formatValue={(v) => `${v}%`}
        hint="Ajuste la transparence de l'élément sélectionné."
      />
    </div>
    <div class="preview" style:opacity={opacityVal / 100}>Aperçu de l'élément</div>
  </section>

  <section class="variant">
    <h2>Désactivé</h2>
    <div style="max-width: 400px;">
      <Slider label="Désactivé" value={40} disabled />
    </div>
  </section>
</div>

<style>
  .preview {
    margin-top: 16px;
    padding: 16px;
    background: var(--primary-subtle);
    color: var(--primary-subtle-fg);
    border-radius: var(--radius-md);
    font-size: 14px;
    font-weight: 500;
    width: fit-content;
  }
</style>
