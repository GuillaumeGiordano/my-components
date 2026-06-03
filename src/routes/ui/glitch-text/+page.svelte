<script lang="ts">
  import '$lib/styles/demo-page.css';
  import GlitchText from '$lib/components/ui/GlitchText.svelte';
</script>
<svelte:head><title>Glitch Text</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Glitch Text</h1><p>Effet glitch RGB — deux clones décalés avec clip-path aléatoire. Fréquence et intensité configurables.</p></div>
  <section class="variant"><h2>Défaut</h2>
    <div class="demo"><h2 class="big"><GlitchText text="SYSTEM ERROR" /></h2></div>
  </section>
  <section class="variant"><h2>Haute fréquence — <code>frequency={8} intensity={2}</code></h2>
    <div class="demo"><h2 class="big glitch-2"><GlitchText text="CORRUPTED" frequency={8} intensity={2} /></h2></div>
  </section>
  <section class="variant"><h2>Subtil — <code>frequency={1} intensity={0.5}</code></h2>
    <div class="demo"><h2 class="big"><GlitchText text="Glitch subtil" frequency={1} intensity={0.5} /></h2></div>
  </section>
  <section class="variant"><h2>Dans un titre de section</h2>
    <div class="demo demo--light">
      <p class="sentence">Bienvenue dans la <GlitchText text="MATRIX" frequency={4} intensity={1.5} /> — suis le lapin blanc.</p>
    </div>
  </section>
</div>
<style>
  .demo { display:flex;align-items:center;justify-content:center;padding:40px 24px;background:#050508;border-radius:var(--radius-lg);min-height:100px; }
  .demo--light { background:var(--bg-subtle); }
  .big { margin:0;font-size:clamp(2rem,6vw,3.5rem);font-weight:900;color:#fff;font-family:monospace;letter-spacing:0.06em; }
  .glitch-2 { color:#00ff88; }
  .sentence { margin:0;font-size:1.1rem;font-weight:600;color:var(--text-heading); }
</style>
