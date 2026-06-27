<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Table from '$lib/components/ui/Table.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Pagination from '$lib/components/ui/Pagination.svelte';

  type User = { id: number; name: string; email: string; role: string; status: string; date: string };

  const allRows: User[] = [
    { id: 1,  name: 'Élise Morin',    email: 'elise@flow.io',   role: 'Admin',    status: 'active',  date: '12 jan. 2025' },
    { id: 2,  name: 'Nathan Keller',  email: 'nathan@flow.io',  role: 'Admin',    status: 'active',  date: '12 jan. 2025' },
    { id: 3,  name: 'Yasmine Benali', email: 'yasmine@flow.io', role: 'Designer', status: 'active',  date: '15 jan. 2025' },
    { id: 4,  name: 'Marcus Pereira', email: 'marcus@flow.io',  role: 'Dev',      status: 'active',  date: '18 jan. 2025' },
    { id: 5,  name: 'Sophie Laurent', email: 'sophie@flow.io',  role: 'Dev',      status: 'pending', date: '22 jan. 2025' },
    { id: 6,  name: 'Thomas Renard',  email: 'thomas@flow.io',  role: 'Dev',      status: 'active',  date: '28 jan. 2025' },
    { id: 7,  name: 'Clara Vidal',    email: 'clara@flow.io',   role: 'Designer', status: 'inactive',date: '02 fév. 2025' },
    { id: 8,  name: 'Paul Girard',    email: 'paul@flow.io',    role: 'Manager',  status: 'active',  date: '05 fév. 2025' },
    { id: 9,  name: 'Emma Bertrand',  email: 'emma@flow.io',    role: 'Dev',      status: 'pending', date: '10 fév. 2025' },
    { id: 10, name: 'Lucas Martin',   email: 'lucas@flow.io',   role: 'Manager',  status: 'active',  date: '14 fév. 2025' },
  ];

  const perPage = 5;
  let page = $state(1);
  const rows = $derived(allRows.slice((page - 1) * perPage, page * perPage));
  let selected = $state<User[]>([]);

  const statusVariant = (s: string) =>
    s === 'active' ? 'success' : s === 'pending' ? 'warning' : 'default';
</script>

<svelte:head><title>Table — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Table</h1>
    <p>Tableau de données avec tri, sélection par case à cocher et pagination.</p>
  </div>

  <section class="variant">
    <h2>Complète — tri + sélection + pagination</h2>

    {#if selected.length > 0}
      <p class="selection-info">{selected.length} ligne{selected.length > 1 ? 's' : ''} sélectionnée{selected.length > 1 ? 's' : ''}.</p>
    {/if}

    <Table
      {rows}
      bind:selected
      selectable
      columns={[
        { key: 'name',   label: 'Nom',    sortable: true  },
        { key: 'email',  label: 'E-mail', sortable: true  },
        { key: 'role',   label: 'Rôle',   sortable: true  },
        {
          key: 'status',
          label: 'Statut',
          sortable: true,
          cell: (row) => row as any,
        },
        { key: 'date',   label: 'Inscrit le' },
      ]}
    >
    </Table>

    <div class="table-footer">
      <span class="table-count">{allRows.length} utilisateurs</span>
      <Pagination total={Math.ceil(allRows.length / perPage)} bind:page />
    </div>
  </section>

  <section class="variant">
    <h2>Striped — sans sélection</h2>
    <Table
      rows={allRows.slice(0, 5)}
      striped
      columns={[
        { key: 'name',  label: 'Nom',    sortable: true },
        { key: 'email', label: 'E-mail', sortable: true },
        { key: 'role',  label: 'Rôle' },
      ]}
    />
  </section>
</div>

<style>
  .selection-info {
    font-size: 13px;
    color: var(--primary);
    font-weight: 500;
    margin-bottom: 8px;
  }

  .table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .table-count {
    font-size: 13px;
    color: var(--text-muted);
  }
</style>
