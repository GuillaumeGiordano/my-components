<script lang="ts">
  import '$lib/styles/demo-page.css';
  import InfiniteScroll from '$lib/components/ui/InfiniteScroll.svelte';

  type Item = { id: number; title: string; subtitle: string };

  function makeItem(id: number): Item {
    const adjectives = ['Rapide', 'Robuste', 'Élégant', 'Minimal', 'Puissant', 'Accessible', 'Réactif', 'Composable'];
    const nouns      = ['composant', 'module', 'système', 'pattern', 'élément', 'fragment', 'bloc', 'widget'];
    return {
      id,
      title:    `${adjectives[(id - 1) % adjectives.length]} ${nouns[(id - 1) % nouns.length]} #${id}`,
      subtitle: `Chargé à ${new Date().toLocaleTimeString('fr-FR')}`,
    };
  }

  const INITIAL = 8;
  const BATCH   = 6;
  const MAX     = 30;

  let items   = $state<Item[]>(Array.from({ length: INITIAL }, (_, i) => makeItem(i + 1)));
  let loading = $state(false);
  let hasMore = $derived(items.length < MAX);

  function loadMore() {
    if (loading || !hasMore) return;
    loading = true;
    setTimeout(() => {
      const next = Array.from({ length: Math.min(BATCH, MAX - items.length) }, (_, i) =>
        makeItem(items.length + i + 1)
      );
      items   = [...items, ...next];
      loading = false;
    }, 800);
  }
</script>

<svelte:head><title>Infinite Scroll — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Infinite Scroll</h1>
    <p>Charge automatiquement les données suivantes quand le bas de la liste entre dans le viewport — via <code>IntersectionObserver</code>.</p>
  </div>

  <section class="variant">
    <h2>Démo — {items.length} / {MAX} éléments</h2>
    <p class="hint">Fais défiler vers le bas pour charger les éléments suivants.</p>

    <InfiniteScroll onLoadMore={loadMore} {loading} {hasMore}>
      <ul class="item-list">
        {#each items as item (item.id)}
          <li class="item-row">
            <span class="item-num">{item.id}</span>
            <div class="item-body">
              <span class="item-title">{item.title}</span>
              <span class="item-sub">{item.subtitle}</span>
            </div>
          </li>
        {/each}
      </ul>
    </InfiniteScroll>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['children',    'Snippet',  '—',                   'Contenu de la liste'],
        ['onLoadMore',  'Function', '—',                   'Callback déclenché quand le sentinel est visible'],
        ['loading',     'boolean',  'false',               'Bloque les déclenchements pendant le chargement'],
        ['hasMore',     'boolean',  'true',                'Masque le spinner et affiche le message de fin si false'],
        ['rootMargin',  'string',   '"200px"',             'Marge d\'anticipation de l\'IntersectionObserver'],
        ['endLabel',    'string',   '"Vous avez tout vu"', 'Message affiché quand hasMore = false'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{desc}</span></div>
      {/each}
    </div>
  </section>
</div>

<style>
  .hint { font-size: 13px; color: var(--text-muted); margin-bottom: 12px; }

  .item-list {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .item-row {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border);
    transition: background 150ms ease;

    &:last-child { border-bottom: none; }
    &:hover { background: var(--bg-hover); }
  }

  .item-num {
    width: 28px;
    height: 28px;
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--primary) 10%, transparent);
    color: var(--primary);
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .item-body { display: flex; flex-direction: column; gap: 2px; }
  .item-title { font-size: 13px; font-weight: 500; color: var(--text-base); }
  .item-sub   { font-size: 11px; color: var(--text-subtle); }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 110px 80px 180px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }
</style>
