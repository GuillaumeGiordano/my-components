<script lang="ts">
  import '$lib/styles/demo-page.css';
  import CopyButton from '$lib/components/ui/CopyButton.svelte';
</script>

<svelte:head><title>CopyButton — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>CopyButton</h1>
    <p>Bouton copier-dans-le-presse-papier — feedback visuel automatique après 2s.</p>
  </div>

  <section class="variant">
    <h2>Variantes</h2>
    <div class="row">
      <CopyButton text="npm install @my-components/svelte" variant="outline" />
      <CopyButton text="npm install @my-components/svelte" variant="ghost" />
      <CopyButton text="npm install @my-components/svelte" variant="outline" size="sm" />
    </div>
  </section>

  <section class="variant">
    <h2>Dans un bloc de code</h2>
    <div class="code-block">
      <code>npm install @my-components/svelte</code>
      <CopyButton text="npm install @my-components/svelte" variant="ghost" size="sm" label="Copier" />
    </div>
  </section>

  <section class="variant">
    <h2>URL à copier</h2>
    <div class="code-block">
      <code>https://my-components.dev/ui/copy-button</code>
      <CopyButton text="https://my-components.dev/ui/copy-button" variant="ghost" size="sm" label="Copier l'URL" />
    </div>
  </section>
</div>

<style>
  .row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .code-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    max-width: 560px;
  }
  code {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-base);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
