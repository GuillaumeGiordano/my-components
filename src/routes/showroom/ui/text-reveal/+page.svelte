<script lang="ts">
  import '$lib/styles/demo-page.css';
  import TextReveal from '$lib/components/ui/TextReveal.svelte';
</script>

<svelte:head><title>Text Reveal — UI</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Text Reveal</h1>
    <p>Chaque mot s'allume en passant la "ligne de lecture" virtuelle. Fais défiler lentement pour l'effet maximum.</p>
  </div>
</div>

<!-- Section manifeste -->
<div class="manifesto">
  <TextReveal
    text="Le web mérite mieux que des interfaces tièdes. Chaque pixel compte. Chaque interaction raconte quelque chose. Nous construisons des composants qui ne se contentent pas de fonctionner — ils impressionnent, ils guident, ils restent. Svelte 5 nous donne les outils pour faire la différence : réactivité fine, bundle minimal, zéro compromis. Ce n'est pas juste une bibliothèque de composants. C'est une façon de penser le développement front-end — avec exigence, avec soin, avec plaisir."
    class="manifesto-text"
  />
</div>

<div class="page">
  <section class="variant">
    <h2>Deuxième exemple — citation</h2>
    <TextReveal
      text="La simplicité est la sophistication suprême. Chaque élément superflu retiré est une clarté gagnée. Design est la réponse silencieuse à une question que l'utilisateur n'a pas encore posée."
      class="quote-text"
    />
  </section>

  <section class="variant">
    <h2>Notes</h2>
    <ul class="notes">
      <li>Chaque mot est un <code>&lt;span&gt;</code> avec <code>opacity</code> dynamique.</li>
      <li>La "ligne de lecture" est à <code>readingLine × viewport height</code> (défaut 72%).</li>
      <li>L'opacité passe de <code>0.12</code> à <code>1</code> dans une zone de <code>18vh</code> autour de la ligne.</li>
      <li>Un seul <code>scroll</code> listener passif — aucun IntersectionObserver.</li>
    </ul>
  </section>
</div>

<style>
  .manifesto {
    max-width: 700px;
    margin: 80px auto 120px;
    padding: 0 32px;
  }

  :global(.manifesto-text) {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    font-weight: 600;
    color: var(--text-heading);
    line-height: 1.75;
  }

  :global(.quote-text) {
    font-size: clamp(1rem, 2vw, 1.25rem);
    font-style: italic;
    color: var(--text-heading);
    line-height: 1.8;
  }

  .notes { display:flex;flex-direction:column;gap:8px;padding-left:20px;font-size:14px;color:var(--text-muted);line-height:1.6; }
</style>
