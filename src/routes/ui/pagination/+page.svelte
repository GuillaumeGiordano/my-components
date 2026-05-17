<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Pagination from '$lib/components/ui/Pagination.svelte';

  let page1 = $state(1);
  let page2 = $state(5);
  let page3 = $state(1);
</script>

<svelte:head><title>Pagination — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Pagination</h1>
    <p>Navigation entre pages avec collapse automatique des numéros intermédiaires.</p>
  </div>

  <section class="variant">
    <h2>Peu de pages</h2>
    <Pagination bind:page={page1} total={6} />
    <p class="hint">Page courante : {page1}</p>
  </section>

  <section class="variant">
    <h2>Beaucoup de pages (collapse)</h2>
    <Pagination bind:page={page2} total={24} siblings={1} />
    <p class="hint">Page courante : {page2}</p>
  </section>

  <section class="variant">
    <h2>siblings=2 (plus de contexte)</h2>
    <Pagination bind:page={page3} total={20} siblings={2} />
    <p class="hint">Page courante : {page3}</p>
  </section>
</div>

<style>
  .hint { font-size: 12px; color: var(--text-subtle); margin-top: 10px; }
</style>
