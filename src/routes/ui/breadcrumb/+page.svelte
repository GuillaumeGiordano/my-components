<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Breadcrumb from '$lib/components/ui/Breadcrumb.svelte';
</script>

<svelte:head><title>Breadcrumb — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Breadcrumb</h1>
    <p>Fil d'Ariane accessible — avec icône home, collapse automatique.</p>
  </div>

  <section class="variant">
    <h2>Basique</h2>
    <Breadcrumb items={[
      { label: 'Tableau de bord', href: '#' },
      { label: 'Projets', href: '#' },
      { label: 'Refonte UI' },
    ]} />
  </section>

  <section class="variant">
    <h2>Avec icône home</h2>
    <Breadcrumb
      showHome
      items={[
        { label: 'Paramètres', href: '#' },
        { label: 'Compte', href: '#' },
        { label: 'Sécurité' },
      ]}
    />
  </section>

  <section class="variant">
    <h2>Collapse (maxItems=4)</h2>
    <Breadcrumb
      maxItems={4}
      items={[
        { label: 'Accueil', href: '#' },
        { label: 'Catalogue', href: '#' },
        { label: 'Électronique', href: '#' },
        { label: 'Ordinateurs', href: '#' },
        { label: 'Laptops', href: '#' },
        { label: 'MacBook Pro 16"' },
      ]}
    />
  </section>
</div>
