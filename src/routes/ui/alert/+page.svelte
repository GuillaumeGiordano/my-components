<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Alert from '$lib/components/ui/Alert.svelte';
  import { Rocket } from '@lucide/svelte';

  let showDismissed = $state(false);
</script>

<svelte:head>
  <title>Alert — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Alert</h1>
    <p>Bloc de notification inline — 4 variantes, titre optionnel, dismissible.</p>
  </div>

  <section class="variant">
    <h2>Info</h2>
    <Alert variant="info" title="Mise à jour disponible" dismissible={false}>
      Une nouvelle version de la plateforme sera déployée demain à 3h00 (heure de Paris).
    </Alert>
  </section>

  <section class="variant">
    <h2>Success</h2>
    <Alert variant="success" title="Enregistré avec succès" dismissible={false}>
      Vos modifications ont bien été sauvegardées et sont maintenant visibles par votre équipe.
    </Alert>
  </section>

  <section class="variant">
    <h2>Warning</h2>
    <Alert variant="warning" title="Abonnement proche de l'expiration" dismissible={false}>
      Votre abonnement Pro expire dans 5 jours. Renouvelez pour maintenir l'accès à toutes les fonctionnalités.
    </Alert>
  </section>

  <section class="variant">
    <h2>Error</h2>
    <Alert variant="error" title="Échec de la requête" dismissible={false}>
      Impossible de se connecter au serveur. Vérifiez votre connexion et réessayez.
    </Alert>
  </section>

  <section class="variant">
    <h2>Sans titre</h2>
    <div class="stack">
      <Alert variant="info" dismissible={false}>
        Votre session expire dans 15 minutes.
      </Alert>
      <Alert variant="success" dismissible={false}>
        Fichier importé avec succès.
      </Alert>
      <Alert variant="warning" dismissible={false}>
        Certains champs sont incomplets.
      </Alert>
      <Alert variant="error" dismissible={false}>
        Adresse e-mail déjà utilisée.
      </Alert>
    </div>
  </section>

  <section class="variant">
    <h2>Dismissible</h2>
    <div class="stack">
      <Alert variant="success" title="Paiement confirmé">
        Votre abonnement a été renouvelé. Merci !
      </Alert>
      <Alert variant="info" title="Nouveau message">
        Yasmine vous a envoyé un commentaire sur le projet Refonte UI.
      </Alert>
    </div>
  </section>

  <section class="variant">
    <h2>Icône personnalisée</h2>
    <Alert variant="info" title="Lancement imminent" icon={Rocket} dismissible={false}>
      La fonctionnalité est en cours de déploiement sur votre espace de travail.
    </Alert>
  </section>

  <section class="variant">
    <h2>onclose callback</h2>
    {#if !showDismissed}
      <Alert
        variant="warning"
        title="Action irréversible"
        onclose={() => (showDismissed = true)}
      >
        Cette opération supprimera définitivement toutes les données associées.
      </Alert>
    {:else}
      <p class="dismissed-hint">Alerte fermée — callback déclenché.</p>
    {/if}
  </section>
</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .dismissed-hint {
    font-size: 13px;
    color: var(--text-muted);
    font-style: italic;
  }
</style>
