<script lang="ts">
  import '$lib/styles/demo-page.css';
  import EmptyState from '$lib/components/ui/EmptyState.svelte';
  import { Inbox, Search, FolderOpen, AlertCircle } from '@lucide/svelte';
</script>

<svelte:head><title>Empty State — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Empty State</h1>
    <p>Placeholder affiché quand une liste ou une section est vide.</p>
  </div>

  <section class="variant">
    <h2>Avec CTA</h2>
    <div class="demo-frame">
      <EmptyState
        icon={Inbox}
        title="Aucun message"
        description="Vous n'avez pas encore reçu de messages. Commencez une nouvelle conversation."
        cta={{ label: 'Nouveau message', onclick: () => {} }}
      />
    </div>
  </section>

  <section class="variant">
    <h2>Recherche sans résultat</h2>
    <div class="demo-frame">
      <EmptyState
        icon={Search}
        title="Aucun résultat"
        description="Aucun élément ne correspond à votre recherche. Essayez avec d'autres mots-clés."
      />
    </div>
  </section>

  <section class="variant">
    <h2>Dossier vide</h2>
    <div class="demo-frame">
      <EmptyState
        size="sm"
        icon={FolderOpen}
        title="Dossier vide"
        description="Ce dossier ne contient aucun fichier."
        cta={{ label: 'Importer un fichier', onclick: () => {} }}
      />
    </div>
  </section>

  <section class="variant">
    <h2>Erreur de chargement</h2>
    <div class="demo-frame">
      <EmptyState
        icon={AlertCircle}
        title="Impossible de charger les données"
        description="Une erreur s'est produite lors du chargement. Vérifiez votre connexion et réessayez."
        cta={{ label: 'Réessayer', onclick: () => {} }}
      />
    </div>
  </section>
</div>

<style>
  .demo-frame {
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--bg-subtle);
  }
</style>
