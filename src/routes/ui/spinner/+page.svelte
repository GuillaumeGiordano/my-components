<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Spinner from '$lib/components/ui/Spinner.svelte';
</script>

<svelte:head><title>Spinner — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Spinner</h1>
    <p>Indicateur de chargement circulaire — 5 tailles, 3 couleurs.</p>
  </div>

  <section class="variant">
    <h2>Tailles</h2>
    <div class="row">
      <Spinner size="xs" /><Spinner size="sm" /><Spinner size="md" /><Spinner size="lg" /><Spinner size="xl" />
    </div>
  </section>

  <section class="variant">
    <h2>Couleurs</h2>
    <div class="row">
      <Spinner color="primary" />
      <Spinner color="muted" />
      <div style="background: var(--text-heading); padding: 8px; border-radius: 8px; display:flex; align-items:center;">
        <Spinner color="white" />
      </div>
    </div>
  </section>
</div>

<style>
  .row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
</style>
