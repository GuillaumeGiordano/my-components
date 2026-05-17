<script lang="ts">
  import '$lib/styles/demo-page.css';
  import NumberInput from '$lib/components/forms/NumberInput.svelte';

  let qty   = $state(1);
  let seats = $state(5);
  let temp  = $state(20);
</script>

<svelte:head><title>Number Input — Formulaires — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>NumberInput</h1>
    <p>Champ numérique avec boutons +/− — min, max, step configurables.</p>
  </div>

  <section class="variant">
    <h2>Quantité (min 1, max 99)</h2>
    <NumberInput label="Quantité" bind:value={qty} min={1} max={99} />
    <p class="hint">Valeur : {qty}</p>
  </section>

  <section class="variant">
    <h2>Sièges (par 5)</h2>
    <NumberInput label="Nombre de sièges" bind:value={seats} min={5} max={100} step={5}
      hint="Minimum 5, par tranches de 5" />
  </section>

  <section class="variant">
    <h2>Température (avec min/max)</h2>
    <NumberInput label="Température (°C)" bind:value={temp} min={-20} max={100} />
  </section>

  <section class="variant">
    <h2>Désactivé</h2>
    <NumberInput label="Champ désactivé" value={42} disabled />
  </section>

  <section class="variant">
    <h2>Avec erreur</h2>
    <NumberInput label="Nombre d'utilisateurs" value={0} error="La valeur doit être supérieure à 0." />
  </section>
</div>

<style>
  .hint { font-size: 12px; color: var(--text-subtle); margin-top: 6px; }
</style>
