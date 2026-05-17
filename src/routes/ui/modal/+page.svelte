<script lang="ts">
  import ComponentPreview from "$lib/ComponentPreview.svelte";
  import Modal from "$lib/components/ui/Modal.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import { Trash2, Save, Link, Mail, MessageCircle, Download } from "@lucide/svelte";
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

  <Modal id="default-modal" title="Confirmer la suppression" variant="drawer" size="md">
    {#snippet children()}
      <div class="modal-content">
        <div class="warning-icon"><Trash2 size={24} /></div>
        <p>
          Cette action est <strong>irréversible</strong>. Le fichier sera définitivement
          supprimé et ne pourra pas être récupéré.
        </p>
      </div>
    {/snippet}
    {#snippet footer()}
      <Button variant="outline" commandfor="default-modal" command="close">
        Annuler
      </Button>

      <Button variant="danger" commandfor="default-modal" command="close">
        Supprimer
      </Button>
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

  /* ---- Drawer form ---- */
  .form-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field label {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-base);
  }

  .field input,
  .field textarea {
    padding: 8px 12px;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg-base);
    color: var(--text-base);
    font-size: 14px;
    font-family: var(--font-sans);
    outline: none;
    transition: border-color var(--transition-fast);
    resize: vertical;
  }

  .field input:focus,
  .field textarea:focus {
    border-color: var(--primary);
  }

  /* ---- Bottom-sheet action grid ---- */
  .action-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 8px;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    background: var(--bg-base);
    cursor: pointer;
    font-size: 12px;
    color: var(--text-muted);
    transition:
      background var(--transition-fast),
      border-color var(--transition-fast);
  }

  .action-item:hover {
    background: var(--bg-subtle);
    border-color: var(--primary);
    color: var(--text-base);
  }
</style>
