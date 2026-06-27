<script lang="ts">
  import ComponentPreview from "$lib/ComponentPreview.svelte";
  import Modal from "$lib/components/ui/Modal.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import { Trash2 } from "@lucide/svelte";
  import "$lib/styles/demo-page.css";
  import Avatar from "$lib/components/ui/Avatar.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
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
    <h2>Avatar</h2>
    <ComponentPreview>
      <div class="demo-row">
        <Badge label="Badge" variant="default" size="md" />
        <Badge label="Badge" variant="success" size="md" />
        <Badge label="Badge" variant="danger" size="md" />
        <Badge label="Badge" variant="info" size="md" />
        <Badge label="Badge" variant="primary" size="md" />
        <Badge label="Badge" variant="warning" size="md" />
      </div>
    </ComponentPreview>
  </section>
</div>

<style>
</style>
