<script lang="ts">
  import '$lib/styles/demo-page.css';
  import TagInput from '$lib/components/forms/TagInput.svelte';

  let skills  = $state(['Svelte', 'TypeScript']);
  let topics  = $state<string[]>([]);
</script>

<svelte:head><title>Tag Input — Formulaires — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>TagInput</h1>
    <p>Saisie de tags — Entrée ou virgule pour valider, Backspace pour supprimer le dernier.</p>
  </div>

  <section class="variant">
    <h2>Compétences (pré-remplies)</h2>
    <TagInput
      label="Compétences"
      bind:tags={skills}
      placeholder="Ajouter une compétence…"
      hint="Appuyez sur Entrée ou virgule pour valider."
    />
    <p class="hint">Tags : {skills.join(', ') || '—'}</p>
  </section>

  <section class="variant">
    <h2>Sujets (max 5)</h2>
    <TagInput
      label="Sujets"
      bind:tags={topics}
      maxTags={5}
      placeholder="Ajouter un sujet…"
    />
  </section>

  <section class="variant">
    <h2>Désactivé</h2>
    <TagInput
      label="Technologies"
      tags={['React', 'Vue', 'Angular']}
      disabled
    />
  </section>

  <section class="variant">
    <h2>Avec erreur</h2>
    <TagInput
      label="Tags requis"
      tags={[]}
      error="Au moins un tag est requis."
    />
  </section>
</div>

<style>
  .hint { font-size: 12px; color: var(--text-subtle); margin-top: 6px; }
</style>
