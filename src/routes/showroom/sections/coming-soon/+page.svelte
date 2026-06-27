<script lang="ts">
  import ComingSoonSection from "$lib/components/sections/ComingSoonSection.svelte";

  const launchDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // +15 jours
</script>

<svelte:head><title>Coming Soon — Sections — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Coming Soon</h1>
    <p>Page de lancement avec compte à rebours et formulaire d'inscription.</p>
  </div>

  <section class="variant">
    <h2>Avec compte à rebours</h2>
    <div class="frame">
      <ComingSoonSection {launchDate} onsubmit={(email) => alert(`Inscrit : ${email}`)} />
    </div>
  </section>

  <section class="variant">
    <h2>Sans compte à rebours</h2>
    <div class="frame">
      <ComingSoonSection
        badge="En préparation"
        title="Une nouvelle expérience arrive"
        description="Nous construisons quelque chose d'unique. Rejoignez la liste d'attente pour être parmi les premiers à découvrir la plateforme."
        ctaLabel="Rejoindre la liste"
        onsubmit={(email) => alert(`Inscrit : ${email}`)}
      />
    </div>
  </section>
</div>

<style>
  .frame {
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    min-height: 500px;
  }
</style>
