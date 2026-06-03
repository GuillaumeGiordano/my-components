<script lang="ts">
  import "$lib/styles/demo-page.css";
  import SearchFilters from "$lib/components/ui/SearchFilters.svelte";
  import Pagination    from "$lib/components/ui/Pagination.svelte";
  import FormInput     from "$lib/components/forms/Input.svelte";
  import Select        from "$lib/components/forms/Select.svelte";
  import { goto }      from '$app/navigation';
  import { page }      from '$app/stores';

  let { data } = $props();

  // ── Options des selects ─────────────────────────────────────────────
  const statusOptions = [
    { value: '',         label: 'Tous' },
    { value: 'actif',    label: 'Actif' },
    { value: 'inactif',  label: 'Inactif' },
    { value: 'suspendu', label: 'Suspendu' },
  ];
  const roleOptions = [
    { value: '',      label: 'Tous' },
    { value: 'admin', label: 'Admin' },
    { value: 'user',  label: 'Utilisateur' },
  ];

  // ── Navigation de page via URL (préserve les filtres) ───────────────
  function setPage(p: number) {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('page', String(p));
    goto(`?${params.toString()}`);
  }

  function setPerPage(val: number) {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('perPage', String(val));
    params.set('page', '1');
    goto(`?${params.toString()}`);
  }

  // ── Mode callback (démo simple sans URL) ────────────────────────────
  type Row = { id: number; nom: string; statut: string; role: string };
  const ALL_DATA: Row[] = [
    { id: 1, nom: 'Alice Martin',  statut: 'actif',    role: 'admin' },
    { id: 2, nom: 'Bob Dupont',    statut: 'inactif',  role: 'user'  },
    { id: 3, nom: 'Clara Leroy',   statut: 'actif',    role: 'user'  },
    { id: 4, nom: 'David Moreau',  statut: 'suspendu', role: 'admin' },
    { id: 5, nom: 'Eva Bernard',   statut: 'actif',    role: 'user'  },
    { id: 6, nom: 'Frank Simon',   statut: 'inactif',  role: 'user'  },
  ];
  let cbResults = $state<Row[]>([...ALL_DATA]);
  let cbLoading = $state(false);

  function handleSearch(values: Record<string, string | string[]>) {
    cbLoading = true;
    setTimeout(() => {
      const nom    = (values.nom    as string ?? '').toLowerCase();
      const statut = values.statut as string ?? '';
      const role   = values.role   as string ?? '';
      cbResults = ALL_DATA.filter(r =>
        (!nom    || r.nom.toLowerCase().includes(nom)) &&
        (!statut || r.statut === statut) &&
        (!role   || r.role   === role)
      );
      cbLoading = false;
    }, 500);
  }

  function handleReset() { cbResults = [...ALL_DATA]; }
</script>

<svelte:head>
  <title>Search Filters — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Search Filters</h1>
    <p>
      Barre de filtres à placer au-dessus d'un tableau ou d'une grille.
      Deux modes : <strong>callback</strong> (état en mémoire) et <strong>URL-driven</strong>
      (filtres + pagination encodés dans l'URL — partageables, historique navigateur, refresh-safe).
    </p>
  </div>

  <!-- ─── Mode URL-driven (démo principale) ───────────────────────────── -->
  <section class="variant">
    <h2>Mode URL-driven — <code>urlDriven</code></h2>
    <p class="hint">
      Les filtres et la page sont encodés dans l'URL. Essaie de filtrer, changer de page,
      puis utilise le bouton <strong>Retour</strong> du navigateur.
      L'URL courante : <code class="url-display">{$page.url.search || '(aucun filtre)'}</code>
    </p>

    <SearchFilters
      urlDriven
      collapsible
      title="Filtrer les utilisateurs"
      columns={3}
    >
      <FormInput name="nom"    label="Nom"    placeholder="Rechercher…" />
      <Select    name="statut" label="Statut" options={statusOptions} />
      <Select    name="role"   label="Rôle"   options={roleOptions} />
    </SearchFilters>

    <!-- Résultats -->
    <div class="demo-table">
      <div class="table-meta">
        {data.totalItems} résultat{data.totalItems !== 1 ? 's' : ''}
        — page {data.page}/{data.totalPages}
        — {data.perPage} par page
      </div>
      <table>
        <thead><tr><th>#</th><th>Nom</th><th>Statut</th><th>Rôle</th></tr></thead>
        <tbody>
          {#each data.items as row}
            <tr>
              <td class="id">{row.id}</td>
              <td>{row.nom}</td>
              <td><span class="badge badge--{row.statut}">{row.statut}</span></td>
              <td>{row.role}</td>
            </tr>
          {:else}
            <tr><td colspan="4" class="empty">Aucun résultat</td></tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination connectée à l'URL -->
    <div class="pagination-wrap">
      <Pagination
        page={data.page}
        total={data.totalPages}
        perPage={data.perPage}
        perPageOptions={[4, 8, 12]}
        onchange={setPage}
        onPerPageChange={setPerPage}
      />
    </div>
  </section>

  <!-- ─── Mode callback ────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Mode callback — <code>onSearch</code> / <code>onReset</code></h2>
    <SearchFilters
      collapsible
      loading={cbLoading}
      onSearch={handleSearch}
      onReset={handleReset}
    >
      <FormInput name="nom"    label="Nom"    placeholder="Rechercher…" />
      <Select    name="statut" label="Statut" options={statusOptions} />
      <Select    name="role"   label="Rôle"   options={roleOptions} />
    </SearchFilters>

    <div class="demo-table">
      <table>
        <thead><tr><th>Nom</th><th>Statut</th><th>Rôle</th></tr></thead>
        <tbody>
          {#each cbResults as row}
            <tr>
              <td>{row.nom}</td>
              <td><span class="badge badge--{row.statut}">{row.statut}</span></td>
              <td>{row.role}</td>
            </tr>
          {:else}
            <tr><td colspan="3" class="empty">Aucun résultat</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>

  <!-- ─── Usage URL-driven ──────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Usage — mode URL-driven</h2>
    <div class="code-block">
      <pre><code>{`<!-- +page.ts — load pilotée par les searchParams -->
export const load: PageLoad = ({ url }) => {
  const nom     = url.searchParams.get('nom')    ?? '';
  const statut  = url.searchParams.get('statut') ?? '';
  const page    = parseInt(url.searchParams.get('page')    ?? '1');
  const perPage = parseInt(url.searchParams.get('perPage') ?? '10');

  const filtered = data.filter(row =>
    (!nom    || row.nom.includes(nom)) &&
    (!statut || row.statut === statut)
  );

  return {
    items:      filtered.slice((page-1)*perPage, page*perPage),
    totalPages: Math.ceil(filtered.length / perPage),
    page,
    perPage,
  };
};

<!-- +page.svelte -->
<script>
  import { goto } from '$app/navigation';
  import { page }  from '$app/stores';
  let { data } = $props();

  function setPage(p) {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('page', String(p));
    goto('?' + params.toString());
  }

  function setPerPage(val) {
    const params = new URLSearchParams($page.url.searchParams);
    params.set('perPage', String(val));
    params.set('page', '1');
    goto('?' + params.toString());
  }
<\/script>

<SearchFilters urlDriven collapsible columns={3}>
  <FormInput name="nom"    label="Nom" />
  <Select    name="statut" label="Statut" options={...} />
</SearchFilters>

<Table data={data.items} />

<Pagination
  page={data.page}
  total={data.totalPages}
  perPage={data.perPage}
  perPageOptions={[10, 25, 50]}
  onchange={setPage}
  onPerPageChange={setPerPage}
/>`}</code></pre>
    </div>
  </section>

  <!-- ─── Props ──────────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [
        ['children',    'Snippet',  '—',        'Champs de formulaire (name= requis)'],
        ['urlDriven',   'boolean',  'false',     'Encode filtres dans l\'URL + remet page=1'],
        ['onSearch',    'Function', '—',         'Callback submit (mode callback ou analytics)'],
        ['onReset',     'Function', '—',         'Callback reset'],
        ['loading',     'boolean',  'false',     'État chargement du bouton Filtrer'],
        ['collapsible', 'boolean',  'false',     'Active le toggle collapse/expand'],
        ['columns',     'number',   '3',         'Colonnes de la grille de champs'],
        ['title',       'string',   '"Filtres"', 'Titre du header'],
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

  <!-- ─── Comportements ──────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Comportements — mode URL-driven</h2>
    <ul class="notes">
      <li>Submit → <code>goto('?nom=alice&statut=actif&page=1')</code> — remet toujours page=1.</li>
      <li>Reset → efface les filtres, conserve <code>perPage</code>, revient page=1.</li>
      <li>Chargement de page / retour navigateur → champs pré-remplis depuis l'URL automatiquement.</li>
      <li>La <code>load</code> SvelteKit reçoit les searchParams → filtrage côté serveur ou client possible.</li>
      <li>Pagination : <code>onchange</code> appelle <code>goto</code> avec les filtres existants + nouveau <code>page=N</code>.</li>
      <li>Sélecteur par page : <code>onPerPageChange</code> met à jour <code>perPage</code> dans l'URL et remet <code>page=1</code>.</li>
      <li>Les params <code>page</code> et <code>perPage</code> sont exclus du badge "filtres actifs".</li>
    </ul>
  </section>
</div>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 16px;
    line-height: 1.5;
  }

  .url-display {
    display: inline-block;
    margin-top: 4px;
    padding: 2px 8px;
    background: var(--bg-subtle);
    border-radius: var(--radius-sm);
    font-size: 12px;
    word-break: break-all;
    color: var(--primary);
  }

  .demo-table {
    margin-top: 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .table-meta {
    padding: 8px 14px;
    font-size: 12px;
    color: var(--text-muted);
    background: var(--bg-subtle);
    border-bottom: 1px solid var(--border);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  th, td {
    padding: 10px 14px;
    text-align: left;
    border-bottom: 1px solid var(--border);
    color: var(--text-base);
  }

  th {
    background: var(--bg-subtle);
    font-weight: 600;
    font-size: 11px;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  td.id { color: var(--text-subtle); font-size: 12px; }

  tr:last-child td { border-bottom: none; }

  .empty {
    text-align: center;
    color: var(--text-muted);
    padding: 24px;
  }

  .badge {
    display: inline-flex;
    padding: 2px 8px;
    border-radius: var(--radius-full);
    font-size: 11px;
    font-weight: 600;
  }

  .badge--actif    { background: color-mix(in srgb, #22c55e 15%, transparent); color: #16a34a; }
  .badge--inactif  { background: var(--bg-subtle); color: var(--text-muted); border: 1px solid var(--border); }
  .badge--suspendu { background: color-mix(in srgb, #f97316 15%, transparent); color: #ea580c; }

  .pagination-wrap {
    padding: 12px 0 4px;
  }

  .code-block {
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: auto;
  }

  .code-block pre { margin: 0; padding: 20px; }

  .code-block code {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-base);
    white-space: pre;
  }

  .props-table {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .props-row {
    display: grid;
    grid-template-columns: 110px 100px 90px 1fr;
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

  .notes {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
  }
</style>
