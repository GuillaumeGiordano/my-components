<script lang="ts">
  import ComponentPreview from "$lib/ComponentPreview.svelte";
  import ButtonAction from "$lib/components/ui/ButtonAction.svelte";
  import ButtonActionItem from "$lib/components/ui/ButtonActionItem.svelte";
  import { Edit, Trash2, Copy, Download, Share2, MoreHorizontal } from "@lucide/svelte";
  import "$lib/styles/demo-page.css";
</script>

<svelte:head><title>ButtonAction — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>ButtonAction</h1>
    <p>
      Bouton déclencheur ouvrant un menu contextuel via le <code>Popover API</code>.
      Fermeture automatique au clic extérieur et à l'ESC, repositionnement intelligent si
      le menu déborde du viewport.
    </p>
  </div>

  <!-- DEFAULT -->
  <section class="variant">
    <h2>Default</h2>
    <ComponentPreview>
      <div class="demo-row">
        <ButtonAction label="Actions">
          {#snippet items(close)}
            <ButtonActionItem label="Modifier" icon={Edit} onclick={close} />
            <ButtonActionItem label="Dupliquer" icon={Copy} onclick={close} />
            <ButtonActionItem label="Télécharger" icon={Download} onclick={close} />
            <ButtonActionItem
              label="Supprimer"
              icon={Trash2}
              variant="danger"
              onclick={close}
            />
          {/snippet}
        </ButtonAction>
      </div>
    </ComponentPreview>
  </section>

  <!-- VARIANTS -->
  <section class="variant">
    <h2>Variantes</h2>
    <ComponentPreview>
      <div class="demo-row">
        <ButtonAction label="Primary" variant="primary">
          {#snippet items(close)}
            <ButtonActionItem label="Partager" icon={Share2} onclick={close} />
            <ButtonActionItem
              label="Supprimer"
              icon={Trash2}
              variant="danger"
              onclick={close}
            />
          {/snippet}
        </ButtonAction>

        <ButtonAction label="Outline" variant="outline">
          {#snippet items(close)}
            <ButtonActionItem label="Modifier" icon={Edit} onclick={close} />
            <ButtonActionItem
              label="Supprimer"
              icon={Trash2}
              variant="danger"
              onclick={close}
            />
          {/snippet}
        </ButtonAction>

        <ButtonAction label="Ghost" variant="ghost">
          {#snippet items(close)}
            <ButtonActionItem label="Modifier" icon={Edit} onclick={close} />
            <ButtonActionItem
              label="Supprimer"
              icon={Trash2}
              variant="danger"
              onclick={close}
            />
          {/snippet}
        </ButtonAction>

        <ButtonAction label="" variant="ghost" icon={MoreHorizontal}>
          {#snippet items(close)}
            <ButtonActionItem label="Modifier" icon={Edit} onclick={close} />
            <ButtonActionItem label="Dupliquer" icon={Copy} onclick={close} />
            <ButtonActionItem
              label="Supprimer"
              icon={Trash2}
              variant="danger"
              onclick={close}
            />
          {/snippet}
        </ButtonAction>
      </div>
    </ComponentPreview>
  </section>

  <!-- DISABLED ITEM -->
  <section class="variant">
    <h2>Item désactivé</h2>
    <ComponentPreview>
      <div class="demo-row">
        <ButtonAction label="Actions">
          {#snippet items(close)}
            <ButtonActionItem label="Modifier" icon={Edit} onclick={close} />
            <ButtonActionItem
              label="Télécharger"
              icon={Download}
              disabled
              onclick={close}
            />
            <ButtonActionItem
              label="Supprimer"
              icon={Trash2}
              variant="danger"
              onclick={close}
            />
          {/snippet}
        </ButtonAction>
      </div>
    </ComponentPreview>
  </section>
</div>

<style>
  .demo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 32px;
    flex-wrap: wrap;
  }
</style>
