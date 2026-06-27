<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Rating from '$lib/components/ui/Rating.svelte';

  let note = $state(0);
</script>

<svelte:head><title>Rating — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Rating</h1>
    <p>Évaluation par étoiles — interactif ou lecture seule.</p>
  </div>

  <section class="variant">
    <h2>Interactif</h2>
    <Rating bind:value={note} />
    {#if note > 0}<p class="hint">{note} / 5</p>{/if}
  </section>

  <section class="variant">
    <h2>Lecture seule — notes figées</h2>
    <div class="stack">
      <div class="row"><Rating value={5} readonly /><span>5/5 — Excellent</span></div>
      <div class="row"><Rating value={4} readonly /><span>4/5 — Très bien</span></div>
      <div class="row"><Rating value={3} readonly /><span>3/5 — Correct</span></div>
      <div class="row"><Rating value={1} readonly /><span>1/5 — Décevant</span></div>
    </div>
  </section>

  <section class="variant">
    <h2>Tailles</h2>
    <div class="stack">
      <Rating value={4} readonly size="sm" />
      <Rating value={4} readonly size="md" />
      <Rating value={4} readonly size="lg" />
    </div>
  </section>

  <section class="variant">
    <h2>Sur 10</h2>
    <Rating value={7} max={10} readonly />
  </section>
</div>

<style>
  .stack { display: flex; flex-direction: column; gap: 10px; }
  .row   { display: flex; align-items: center; gap: 12px; font-size: 13px; color: var(--text-muted); }
  .hint  { font-size: 13px; color: var(--primary); font-weight: 600; margin-top: 8px; }
</style>
