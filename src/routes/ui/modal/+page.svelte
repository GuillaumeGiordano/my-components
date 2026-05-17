<script lang="ts">
  import ComponentPreview from "$lib/ComponentPreview.svelte";
  import Modal from "$lib/components/ui/Modal.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import { Trash2 } from "@lucide/svelte";
  import "$lib/styles/demo-page.css";
</script>

<svelte:head><title>Modal — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Modal</h1>
    <p>
      Dialog natif (<code>&lt;dialog&gt;</code> + <code>showModal()</code>) — focus trap
      et gestion de l'ESC fournis par le navigateur. Animations CSS d'entrée et de sortie,
      3 variantes de mise en page.
    </p>
  </div>

  <!-- DEFAULT -->
  <section class="variant">
    <h2>Default — dialog centré</h2>
    <ComponentPreview>
      <div class="demo-row">
        <Button commandfor="default-modal" command="show-modal">Ouvrir la modal</Button>
      </div>
    </ComponentPreview>
  </section>

  <Modal
    id="default-modal"
    title="Confirmer la suppression"
    variant="default"
    size="md"
    overlayClose={true}
  >
    {#snippet children()}
      <div class="modal-content">
        <div class="warning-icon"><Trash2 size={24} /></div>
        <p>
          Cette action est <strong>irréversible</strong>. Le fichier sera définitivement
          supprimé et ne pourra pas être récupéré.
        </p>
      </div>
    {/snippet}
    {#snippet footer(close)}
      <Button variant="outline" onclick={close}>Annuler</Button>
      <Button variant="danger" onclick={close}>Supprimer</Button>
    {/snippet}
  </Modal>

  <!-- DRAWER -->
  <section class="variant">
    <h2>Drawer — panneau latéral</h2>
    <ComponentPreview>
      <div class="demo-row">
        <Button commandfor="drawer-modal" command="show-modal">Ouvrir le drawer</Button>
      </div>
    </ComponentPreview>
  </section>

  <Modal id="drawer-modal" title="Confirmer la suppression" variant="drawer" size="md">
    {#snippet children()}
      <div class="modal-content">
        <div class="warning-icon"><Trash2 size={24} /></div>
        <p>
          Cette action est <strong>irréversible</strong>. Le fichier sera définitivement
          supprimé et ne pourra pas être récupéré.
        </p>
      </div>
    {/snippet}
    {#snippet footer(close)}
      <Button variant="outline" onclick={close}>Annuler</Button>
      <Button variant="danger" onclick={close}>Supprimer</Button>
    {/snippet}
  </Modal>
</div>

<style>
  .demo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 32px;
    flex-wrap: wrap;
  }

  code {
    font-family: var(--font-mono);
    font-size: 12px;
    background: var(--bg-muted);
    padding: 1px 5px;
    border-radius: var(--radius-sm);
    color: var(--text-base);
  }

  /* ---- Default modal demo content ---- */
  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .warning-icon {
    color: #dc2626;
  }

  .modal-content p {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
  }
</style>
