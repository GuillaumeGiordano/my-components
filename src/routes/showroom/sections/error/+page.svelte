<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Error404Section from '$lib/components/sections/Error404Section.svelte';
</script>

<svelte:head><title>Error — Sections — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Error / 404</h1>
    <p>Page d'erreur plein écran — code, titre, description, CTA.</p>
  </div>

  <section class="variant">
    <h2>404 — Page introuvable</h2>
    <div class="frame">
      <Error404Section />
    </div>
  </section>

  <section class="variant">
    <h2>500 — Erreur serveur</h2>
    <div class="frame">
      <Error404Section
        code="500"
        title="Erreur serveur"
        description="Une erreur inattendue s'est produite. Notre équipe a été notifiée automatiquement."
        cta={{ label: 'Réessayer', onclick: () => {} }}
        secondaryCta={{ label: 'Contacter le support', href: '#' }}
      />
    </div>
  </section>

  <section class="variant">
    <h2>403 — Accès refusé</h2>
    <div class="frame">
      <Error404Section
        code="403"
        title="Accès interdit"
        description="Vous n'avez pas les permissions nécessaires pour accéder à cette page."
        cta={{ label: 'Retour au tableau de bord', href: '#' }}
      />
    </div>
  </section>
</div>

<style>
  .frame {
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    min-height: 400px;
  }
</style>
