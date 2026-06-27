<script lang="ts">
  import "$lib/styles/demo-page.css";
  import ScrollOverSection from "$lib/components/sections/ScrollOverSection.svelte";
  import ParticleBackground from "$lib/components/ui/ParticleBackground.svelte";
</script>

<svelte:head>
  <title>Scroll Over — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Scroll Over</h1>
    <p>
      Un fond épinglé (sticky) reste en place pendant que le contenu défile par-dessus.
      Donnez un fond transparent ou semi-transparent au contenu pour laisser voir le fond.
    </p>
  </div>

  <section class="variant">
    <h2>Particules épinglées</h2>
    <ScrollOverSection>
      {#snippet background()}
        <ParticleBackground />
      {/snippet}

      <div class="overlay">
        <div class="panel">
          <h3>Faites défiler</h3>
          <p>Le champ de particules reste fixe derrière ce contenu.</p>
        </div>
        <div class="panel">
          <h3>Le contenu glisse dessus</h3>
          <p>Les panneaux semi-transparents laissent transparaître les particules.</p>
        </div>
        <div class="panel">
          <h3>Fin de la section</h3>
          <p>Le fond se libère et la page reprend son défilement normal.</p>
        </div>
      </div>
    </ScrollOverSection>
  </section>
</div>

<style>
  .overlay {
    display: flex;
    flex-direction: column;
    gap: 60vh;
    padding: 30vh 24px;
  }

  .panel {
    max-width: 480px;
    margin: 0 auto;
    padding: 32px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border);
    /* Semi-transparent so the pinned background shows through */
    background: color-mix(in srgb, var(--bg-base) 78%, transparent);
    backdrop-filter: blur(4px);
    text-align: center;
  }

  .panel h3 {
    margin: 0 0 8px;
    color: var(--text-heading);
  }

  .panel p {
    margin: 0;
    color: var(--text-muted);
  }
</style>
