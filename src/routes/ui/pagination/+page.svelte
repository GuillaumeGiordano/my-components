<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Pagination from '$lib/components/ui/Pagination.svelte';

  let page1    = $state(1);
  let page2    = $state(5);
  let page3    = $state(1);
  let page4    = $state(1);
  let perPage4 = $state(5);
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

  <section class="variant">
    <h2>Avec sélecteur « par page » — <code>perPageOptions</code></h2>
    <p class="hint">Le sélecteur apparaît quand <code>perPageOptions</code> est non vide. Changer la valeur remet la page à 1.</p>
    <Pagination
      bind:page={page4}
      bind:perPage={perPage4}
      total={20}
      perPageOptions={[5, 10, 25]}
    />
    <p class="hint">Page : {page4} — {perPage4} éléments par page</p>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [
        ['page',           'number (bindable)', '1',   'Page courante'],
        ['total',          'number',            '—',   'Nombre total de pages'],
        ['siblings',       'number',            '1',   'Pages voisines visibles de chaque côté'],
        ['perPage',        'number (bindable)', '10',  'Éléments par page (utilisé avec perPageOptions)'],
        ['perPageOptions', 'number[]',          '[]',  'Options du sélecteur — vide = masqué'],
        ['onchange',       'Function',          '—',   'Appelé quand la page change'],
        ['onPerPageChange','Function',          '—',   'Appelé quand perPage change'],
      ] as [prop, type, def, desc]}
        <div class="props-row">
          <code>{prop}</code>
          <code class="type">{type}</code>
          <code class="default">{def}</code>
          <span>{desc}</span>
        </div>
      {/each}
    </div>
  </section>
</div>

<style>
  .hint { font-size: 12px; color: var(--text-subtle); margin-top: 10px; }

  .props-table {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .props-row {
    display: grid;
    grid-template-columns: 160px 170px 60px 1fr;
    gap: 12px;
    padding: 10px 16px;
    align-items: center;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--text-muted);

    &:last-child { border-bottom: none; }
    &.header {
      background: var(--bg-subtle);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-subtle);
    }
  }

  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type    { color: var(--primary); }
  code.default { color: var(--text-subtle); }
</style>
