<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Progress from '$lib/components/ui/Progress.svelte';

  let val = $state(65);
</script>

<svelte:head><title>Progress — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Progress</h1>
    <p>Barre linéaire et anneau circulaire — 4 couleurs, 3 tailles.</p>
  </div>

  <section class="variant">
    <h2>Linéaire — tailles</h2>
    <div class="stack">
      <Progress value={40} size="sm" showValue label="Small" />
      <Progress value={65} size="md" showValue label="Medium" />
      <Progress value={82} size="lg" showValue label="Large" />
    </div>
  </section>

  <section class="variant">
    <h2>Couleurs</h2>
    <div class="stack">
      <Progress value={72} color="primary" showValue label="Primary" />
      <Progress value={85} color="success" showValue label="Success" />
      <Progress value={48} color="warning" showValue label="Warning" />
      <Progress value={33} color="danger"  showValue label="Danger" />
    </div>
  </section>

  <section class="variant">
    <h2>Circulaire</h2>
    <div class="row">
      <Progress variant="circular" value={val} size="sm" showValue />
      <Progress variant="circular" value={val} size="md" showValue />
      <Progress variant="circular" value={val} size="lg" showValue />
      <Progress variant="circular" value={val} color="success" size="md" showValue />
      <Progress variant="circular" value={val} color="warning" size="md" showValue />
    </div>
  </section>

  <section class="variant">
    <h2>Valeur interactive</h2>
    <div class="stack">
      <input type="range" min="0" max="100" bind:value={val} />
      <Progress value={val} showValue label="Progression" size="md" />
    </div>
  </section>
</div>

<style>
  .stack { display: flex; flex-direction: column; gap: 16px; max-width: 480px; }
  .row   { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
  input[type=range] { width: 100%; max-width: 480px; accent-color: var(--primary); }
</style>
