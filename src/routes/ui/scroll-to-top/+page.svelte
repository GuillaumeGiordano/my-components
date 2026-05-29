<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ScrollToTop from '$lib/components/ui/ScrollToTop.svelte';
</script>

<svelte:head>
  <title>Scroll To Top — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Scroll To Top</h1>
    <p>Bouton fixe qui apparaît après 300px de scroll et ramène en haut de page en douceur. Fais défiler cette page pour le voir apparaître en bas à droite.</p>
  </div>

  <section class="variant">
    <h2>Utilisation</h2>
    <pre class="code-block"><code
>&lt;script&gt;
  import &#123; ScrollToTop &#125; from '@guillaumeg/ui';
&lt;/script&gt;

&lt;!-- À placer une seule fois dans le layout ou la page --&gt;
&lt;ScrollToTop /&gt;</code></pre>
  </section>

  <section class="variant">
    <h2>Comportement</h2>
    <ul class="info-list">
      <li>Invisible au chargement de la page</li>
      <li>Apparaît avec une animation après <strong>300px</strong> de défilement</li>
      <li>Clique pour remonter en haut avec <code>behavior: 'smooth'</code></li>
      <li>Position fixe en bas à droite (<code>bottom: 28px / right: 24px</code>)</li>
      <li>Compatible SSR — utilise <code>browser</code> de SvelteKit</li>
    </ul>
  </section>

  <!-- Contenu long pour pouvoir scroller -->
  {#each Array(6) as _, i}
    <section class="variant">
      <h2>Section {i + 1}</h2>
      <p class="filler">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
    </section>
  {/each}
</div>

<ScrollToTop />

<style>
  code {
    font-family: var(--font-mono);
    font-size: 0.85em;
    background: var(--bg-subtle);
    padding: 1px 5px;
    border-radius: var(--radius-sm);
  }

  .code-block {
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 16px;
    overflow-x: auto;
    font-size: 13px;
    line-height: 1.6;
    white-space: pre;
    margin-top: 12px;
  }

  .code-block code { background: none; padding: 0; }

  .info-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .filler {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.7;
  }
</style>
