<script lang="ts">
  import ComponentPreview from '$lib/ComponentPreview.svelte';
  import Tabs from '$lib/components/ui/Tabs.svelte';
  import '$lib/styles/demo-page.css';

  const settingsTabs = [
    { id: 'general', label: 'Général' },
    { id: 'security', label: 'Sécurité' },
    { id: 'notifications', label: 'Notifications' },
  ];

  const docTabs = [
    { id: 'overview', label: 'Vue d\'ensemble' },
    { id: 'api', label: 'API' },
    { id: 'examples', label: 'Exemples' },
  ];

  const editorTabs = [
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'JavaScript' },
  ];
</script>

<svelte:head><title>Tabs — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Tabs</h1>
    <p>
      Navigation par onglets accessible — pattern ARIA <code>tablist</code> / <code>tab</code> /
      <code>tabpanel</code>, navigation clavier aux flèches, 3 variantes visuelles.
    </p>
  </div>

  <!-- VARIANT DEFAULT -->
  <section class="variant">
    <h2>Default — indicateur de bordure</h2>
    <ComponentPreview>
      <div class="demo-wrap">
        <Tabs tabs={settingsTabs}>
          {#snippet children(tab)}
            {#if tab === 'general'}
              <div class="panel-content">
                <h3>Paramètres généraux</h3>
                <p>Configurez le nom d'affichage, la langue et le fuseau horaire de votre compte.</p>
              </div>
            {:else if tab === 'security'}
              <div class="panel-content">
                <h3>Sécurité</h3>
                <p>Gérez votre mot de passe, l'authentification à deux facteurs et les sessions actives.</p>
              </div>
            {:else if tab === 'notifications'}
              <div class="panel-content">
                <h3>Notifications</h3>
                <p>Choisissez quels événements déclenchent des notifications par email ou push.</p>
              </div>
            {/if}
          {/snippet}
        </Tabs>
      </div>
    </ComponentPreview>
  </section>

  <!-- VARIANT PILLS -->
  <section class="variant">
    <h2>Pills — fond segmenté</h2>
    <ComponentPreview>
      <div class="demo-wrap">
        <Tabs tabs={docTabs} variant="pills">
          {#snippet children(tab)}
            {#if tab === 'overview'}
              <div class="panel-content">
                <h3>Vue d'ensemble</h3>
                <p>Ce composant implémente le pattern ARIA Tabs avec navigation au clavier complète.</p>
              </div>
            {:else if tab === 'api'}
              <div class="panel-content">
                <h3>Référence API</h3>
                <p>Consultez la liste des props, événements et slots disponibles pour ce composant.</p>
              </div>
            {:else if tab === 'examples'}
              <div class="panel-content">
                <h3>Exemples</h3>
                <p>Des exemples d'intégration dans différents contextes de mise en page.</p>
              </div>
            {/if}
          {/snippet}
        </Tabs>
      </div>
    </ComponentPreview>
  </section>

  <!-- VARIANT UNDERLINE -->
  <section class="variant">
    <h2>Underline — soulignement animé</h2>
    <ComponentPreview>
      <div class="demo-wrap">
        <Tabs tabs={editorTabs} variant="underline">
          {#snippet children(tab)}
            {#if tab === 'html'}
              <div class="panel-content code">
                <code>&lt;div class="container"&gt;&lt;/div&gt;</code>
              </div>
            {:else if tab === 'css'}
              <div class="panel-content code">
                <code>.container &#123; display: flex; gap: 16px; &#125;</code>
              </div>
            {:else if tab === 'js'}
              <div class="panel-content code">
                <code>const el = document.querySelector('.container');</code>
              </div>
            {/if}
          {/snippet}
        </Tabs>
      </div>
    </ComponentPreview>
  </section>

  <div class="props-table">
    <h2>Props</h2>
    <table>
      <thead><tr><th>Prop</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>
        <tr>
          <td>tabs</td>
          <td>{"{ id: string; label: string }[]"}</td>
          <td>Liste des onglets à afficher</td>
        </tr>
        <tr>
          <td>value</td>
          <td>string</td>
          <td>ID de l'onglet actif, bindable (défaut : premier onglet)</td>
        </tr>
        <tr>
          <td>variant</td>
          <td>'default' | 'pills' | 'underline'</td>
          <td>Style visuel (défaut : <code>default</code>)</td>
        </tr>
        <tr>
          <td>children</td>
          <td>Snippet&lt;[string]&gt;</td>
          <td>Contenu du panel — reçoit l'ID de l'onglet actif en argument</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="props-table">
    <h2>Accessibilité</h2>
    <table>
      <thead><tr><th>Élément</th><th>Attribut ARIA</th><th>Rôle</th></tr></thead>
      <tbody>
        <tr><td>Conteneur des boutons</td><td>role="tablist"</td><td>Annonce une liste d'onglets</td></tr>
        <tr><td>Bouton onglet</td><td>role="tab" + aria-selected</td><td>Indique l'onglet courant</td></tr>
        <tr><td>Bouton onglet</td><td>aria-controls</td><td>Lie le bouton à son panel</td></tr>
        <tr><td>Panel</td><td>role="tabpanel" + aria-labelledby</td><td>Lié à son onglet déclencheur</td></tr>
        <tr><td>Navigation</td><td>← → (flèches)</td><td>Déplace le focus entre les onglets</td></tr>
      </tbody>
    </table>
  </div>
</div>

<style>
  .demo-wrap {
    padding: 24px;
    min-width: 360px;
    max-width: 560px;
    width: 100%;
  }

  .panel-content {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.6;
  }

  .panel-content h3 {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-base);
    margin-bottom: 6px;
  }

  .panel-content.code {
    background: var(--bg-subtle);
    border-radius: var(--radius-md);
    padding: 12px 16px;
  }

  code {
    font-family: var(--font-mono);
    font-size: 12px;
    background: var(--bg-muted);
    padding: 1px 5px;
    border-radius: var(--radius-sm);
    color: var(--text-base);
  }

  .panel-content.code code {
    background: none;
    padding: 0;
    font-size: 13px;
  }
</style>
