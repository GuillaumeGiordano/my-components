<script lang="ts">
  import ComponentPreview from "$lib/ComponentPreview.svelte";
  import Modal from "$lib/components/ui/Modal.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import { Trash2 } from "@lucide/svelte";
  import "$lib/styles/demo-page.css";
  import Avatar from "$lib/components/ui/Avatar.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import Card from "$lib/components/ui/Card.svelte";
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
        <Card>
          <p>
            This is a description of the card content. It can be a brief summary or any
            relevant information.
          </p>
          <Button variant="primary">Action</Button>
        </Card>
      </div>
    </ComponentPreview>
  </section>
</div>

<style>
</style>
