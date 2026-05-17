<script lang="ts">
  import '$lib/styles/demo-page.css';
  import LogoCloudSection from '$lib/components/sections/LogoCloudSection.svelte';

  const companies = [
    { name: 'Stripe' },
    { name: 'Vercel' },
    { name: 'Linear' },
    { name: 'Notion' },
    { name: 'Figma' },
    { name: 'GitHub' },
    { name: 'Shopify' },
    { name: 'Airbnb' },
  ];
</script>

<svelte:head>
  <title>Logo Cloud — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Logo Cloud</h1>
    <p>Section de logos partenaires avec variante statique et défilement infini.</p>
  </div>

  <section class="variant">
    <h2>Statique — texte stylisé</h2>
    <LogoCloudSection
      badge="Ils nous font confiance"
      title="Des milliers d'équipes choisissent notre plateforme"
      logos={companies}
      variant="default"
    />
  </section>

  <section class="variant">
    <h2>Marquee — variante muted</h2>
    <LogoCloudSection
      badge="Partenaires"
      title="Rejoignez un écosystème de premier plan"
      logos={companies}
      marquee={true}
      variant="muted"
    />
  </section>
</div>
