<script lang="ts">
  import '$lib/styles/demo-page.css';
  import NeonGridBackground from '$lib/components/ui/NeonGridBackground.svelte';
</script>
<svelte:head><title>Neon Grid Background</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Neon Grid Background</h1><p>Grille synthwave en perspective — lignes convergentes animées, soleil rétro, glow canvas.</p></div>
  <section class="variant"><h2>Défaut — synthwave classique</h2>
    <NeonGridBackground>
      <div class="hero">
        <span class="badge">SYNTHWAVE</span>
        <h2 class="ht">OUTRUN</h2>
        <p class="hs">Grille perspective animée, soleil magenta, lignes cyan.</p>
      </div>
    </NeonGridBackground>
  </section>
  <section class="variant"><h2>Couleurs cyberpunk — cyan / rouge</h2>
    <NeonGridBackground gridColor="#00ffff" horizonColor="#ff0040" sunColor="#ff6000" background="linear-gradient(to bottom,#000020 0%,#000040 45%,#200010 100%)" speed={1.5}>
      <div class="hero hero--sm"><h2 class="ht" style="color:#00ffff;text-shadow:0 0 20px #00ffff">CYBERPUNK</h2></div>
    </NeonGridBackground>
  </section>
  <section class="variant"><h2>Vitesse lente — <code>speed={0.3}</code></h2>
    <NeonGridBackground speed={0.3}><div class="hero hero--sm"><h2 class="ht">Zen mode</h2></div></NeonGridBackground>
  </section>
</div>
<style>
  .hero { display:flex;flex-direction:column;align-items:center;text-align:center;padding:52px 32px;gap:12px;min-height:200px; }
  .hero--sm { padding:32px 32px;min-height:130px; }
  .badge { padding:3px 12px;border-radius:99px;border:1px solid rgba(255,0,255,0.4);background:rgba(255,0,255,0.08);color:#ff80ff;font-size:11px;font-weight:700;letter-spacing:0.12em; }
  .ht { margin:0;font-size:clamp(1.8rem,5vw,3rem);font-weight:900;color:#ff40ff;text-shadow:0 0 30px #ff00ff88;letter-spacing:0.1em;font-family:monospace; }
  .hs { margin:0;font-size:13px;color:rgba(200,100,255,0.5); }
</style>
