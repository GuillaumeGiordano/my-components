<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
</script>

<svelte:head><title>Skeleton — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Skeleton</h1>
    <p>Placeholder animé pendant le chargement — rect, text, circle.</p>
  </div>

  <section class="variant">
    <h2>Lignes de texte</h2>
    <div style="max-width: 360px;">
      <Skeleton variant="text" lines={4} />
    </div>
  </section>

  <section class="variant">
    <h2>Cercle (avatar)</h2>
    <div class="row">
      <Skeleton circle width="32px" />
      <Skeleton circle width="48px" />
      <Skeleton circle width="64px" />
    </div>
  </section>

  <section class="variant">
    <h2>Rectangles</h2>
    <div class="stack">
      <Skeleton height="200px" />
      <Skeleton height="40px" width="60%" />
      <Skeleton height="16px" width="40%" />
    </div>
  </section>

  <section class="variant">
    <h2>Carte simulée</h2>
    <div class="card-skeleton">
      <Skeleton height="160px" />
      <div class="card-body">
        <div class="row-gap">
          <Skeleton circle width="40px" />
          <div style="flex:1">
            <Skeleton height="14px" width="50%" />
            <Skeleton height="12px" width="30%" />
          </div>
        </div>
        <Skeleton variant="text" lines={3} />
      </div>
    </div>
  </section>
</div>

<style>
  .row     { display: flex; align-items: center; gap: 12px; }
  .stack   { display: flex; flex-direction: column; gap: 10px; max-width: 480px; }
  .card-skeleton {
    max-width: 320px;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .card-body   { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
  .row-gap     { display: flex; align-items: center; gap: 10px; }
</style>
