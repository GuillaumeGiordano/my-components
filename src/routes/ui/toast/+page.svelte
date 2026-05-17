<script lang="ts">
  import '$lib/styles/demo-page.css';
  import { toast } from '$lib/stores/toast';
  import Button from '$lib/components/buttons/Button.svelte';
</script>

<svelte:head>
  <title>Toast — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Toast</h1>
    <p>Notification flottante déclenchée via <code>toast.success()</code>, <code>toast.error()</code>, etc. — disparaît automatiquement après 4s.</p>
  </div>

  <section class="variant">
    <h2>Variantes de base</h2>
    <div class="row">
      <Button
        variant="outline"
        onclick={() => toast.success("Enregistré avec succès.")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onclick={() => toast.error("Impossible de soumettre le formulaire.")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onclick={() => toast.warning("Votre session expire bientôt.")}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onclick={() => toast.info("Une mise à jour est disponible.")}
      >
        Info
      </Button>
    </div>
  </section>

  <section class="variant">
    <h2>Avec titre</h2>
    <div class="row">
      <Button
        variant="outline"
        onclick={() => toast.success("Vos modifications sont visibles par toute l'équipe.", { title: "Projet sauvegardé" })}
      >
        Success avec titre
      </Button>
      <Button
        variant="outline"
        onclick={() => toast.error("Vérifiez votre connexion et réessayez.", { title: "Erreur réseau" })}
      >
        Error avec titre
      </Button>
    </div>
  </section>

  <section class="variant">
    <h2>Durée personnalisée</h2>
    <div class="row">
      <Button
        variant="outline"
        onclick={() => toast.info("Ce toast disparaît après 1,5s.", { duration: 1500 })}
      >
        1,5 secondes
      </Button>
      <Button
        variant="outline"
        onclick={() => toast.warning("Ce toast reste jusqu'à ce que vous le fermiez.", { duration: 0 })}
      >
        Persistant (duration 0)
      </Button>
    </div>
  </section>

  <section class="variant">
    <h2>Simulation d'une requête</h2>
    <div class="row">
      <Button
        variant="primary"
        onclick={async () => {
          const id = toast.info("Envoi en cours…", { duration: 0 });
          await new Promise((r) => setTimeout(r, 1800));
          toast.remove(id);
          toast.success("Données envoyées avec succès.");
        }}
      >
        Simuler requête réussie
      </Button>
      <Button
        variant="outline"
        onclick={async () => {
          const id = toast.info("Envoi en cours…", { duration: 0 });
          await new Promise((r) => setTimeout(r, 1800));
          toast.remove(id);
          toast.error("Erreur 500 — le serveur n'a pas répondu.", { title: "Requête échouée" });
        }}
      >
        Simuler requête échouée
      </Button>
    </div>
  </section>
</div>

<style>
  code {
    font-family: monospace;
    font-size: 0.9em;
    background: var(--bg-subtle);
    padding: 1px 5px;
    border-radius: var(--radius-sm);
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
</style>
