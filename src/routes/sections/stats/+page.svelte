<script lang="ts">
  import StatsSection from '$lib/components/sections/StatsSection.svelte';
  import '$lib/styles/demo-page.css';
</script>

<svelte:head>
  <title>Stats — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Stats</h1>
    <p>Grille de chiffres clés avec animation au scroll. Les valeurs numériques s'animent à l'entrée dans le viewport ; les valeurs textuelles s'affichent directement.</p>
  </div>

  <StatsSection
    badge="En chiffres"
    title="Des résultats qui parlent d'eux-mêmes"
    description="Des métriques mesurées en conditions réelles, sur l'ensemble de notre base d'utilisateurs actifs."
    stats={[
      {
        value: '10000',
        suffix: '+',
        label: 'Équipes actives',
        description: 'dans 42 pays',
      },
      {
        value: '99.9',
        suffix: '%',
        label: 'Disponibilité',
        description: 'SLA garanti sur 12 mois',
      },
      {
        value: '4.9',
        suffix: '/5',
        label: 'Note moyenne',
        description: 'sur plus de 1 200 avis',
      },
      {
        value: '< 2s',
        label: 'Temps de réponse',
        description: 'médian en production',
      },
    ]}
  />
</div>
