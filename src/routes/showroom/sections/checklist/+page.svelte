<script lang="ts">
  import "$lib/styles/demo-page.css";
  import ChecklistSection from "$lib/components/sections/ChecklistSection.svelte";

  const items = [
    { label: "Design sur mesure", description: "Aucun template revendu, une identité unique." },
    { label: "100 % responsive", description: "Pensé mobile-first, testé sur tous les écrans." },
    { label: "Référencement (SEO)", description: "Balises, sitemap et performances optimisées." },
    { label: "Formulaire de contact", description: "Avec validation et anti-spam." },
    { label: "Nom de domaine & hébergement", description: "Configurés et mis en ligne pour vous." },
    { label: "Formation à la prise en main", description: "Pour gérer vos contenus en autonomie." },
  ];
</script>

<svelte:head>
  <title>Checklist — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Checklist</h1>
    <p>Section « ce qui est inclus » : une liste à coches, en 1 à 3 colonnes.</p>
  </div>

  <section class="variant">
    <h2>2 colonnes</h2>
    <ChecklistSection
      title="Ce qui est inclus"
      description="Tout ce que vous recevez avec votre projet, sans surprise."
      columns={2}
      {items}
    />
  </section>

  <section class="variant">
    <h2>1 colonne</h2>
    <ChecklistSection title="Inclus dans l'offre" columns={1} items={items.slice(0, 4)} />
  </section>
</div>
