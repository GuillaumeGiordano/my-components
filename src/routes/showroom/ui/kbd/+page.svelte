<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Kbd from '$lib/components/ui/Kbd.svelte';
</script>

<svelte:head><title>Kbd — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Kbd</h1>
    <p>Affichage de raccourcis clavier stylisés.</p>
  </div>

  <section class="variant">
    <h2>Raccourcis communs</h2>
    <div class="list">
      <div class="row"><Kbd keys={['⌘', 'K']} /><span>Ouvrir la palette de commandes</span></div>
      <div class="row"><Kbd keys={['Ctrl', 'S']} /><span>Enregistrer</span></div>
      <div class="row"><Kbd keys={['⌘', 'Shift', 'P']} /><span>Palette de commandes VS Code</span></div>
      <div class="row"><Kbd keys={['Esc']} /><span>Fermer / Annuler</span></div>
      <div class="row"><Kbd keys={['Tab']} /><span>Élément suivant</span></div>
      <div class="row"><Kbd keys={['↑', '↓']} /><span>Naviguer dans la liste</span></div>
    </div>
  </section>

  <section class="variant">
    <h2>Taille sm</h2>
    <div class="row">
      <Kbd keys={['⌘', 'K']} size="sm" />
      <Kbd keys={['Ctrl', 'Z']} size="sm" />
    </div>
  </section>
</div>

<style>
  .list { display: flex; flex-direction: column; gap: 14px; }
  .row  { display: flex; align-items: center; gap: 12px; font-size: 13px; color: var(--text-muted); }
</style>
