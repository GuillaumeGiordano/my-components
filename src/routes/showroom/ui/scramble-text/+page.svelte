<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ScrambleText from '$lib/components/ui/ScrambleText.svelte';
</script>
<svelte:head><title>Scramble Text</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Scramble Text</h1><p>Les lettres défilent aléatoirement avant de se révéler de gauche à droite. Clic pour rejouer.</p></div>
  <section class="variant"><h2>Titre principal — clic pour rejouer</h2>
    <div class="demo"><h2 class="big"><ScrambleText text="HELLO WORLD" /></h2></div>
  </section>
  <section class="variant"><h2>Rapide — <code>speed={20} stagger={30}</code></h2>
    <div class="demo"><h2 class="big"><ScrambleText text="FAST DECODE" speed={20} stagger={30} /></h2></div>
  </section>
  <section class="variant"><h2>Dans un paragraphe</h2>
    <div class="demo demo--light">
      <p class="sentence">Bienvenue sur <ScrambleText text="my-components" stagger={50} /> — ta lib Svelte 5.</p>
    </div>
  </section>
</div>
<style>
  .demo { display:flex;align-items:center;justify-content:center;padding:40px 24px;background:#050508;border-radius:var(--radius-lg);min-height:100px; }
  .demo--light { background:var(--bg-subtle); }
  .big { margin:0;font-size:clamp(1.8rem,5vw,3rem);font-weight:900;color:#00ff88;font-family:monospace;letter-spacing:0.08em; }
  .sentence { margin:0;font-size:1.1rem;font-weight:600;color:var(--text-heading); }
</style>
