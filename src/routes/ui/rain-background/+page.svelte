<script lang="ts">
  import '$lib/styles/demo-page.css';
  import RainBackground from '$lib/components/ui/RainBackground.svelte';
</script>
<svelte:head><title>Rain Background</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Rain Background</h1><p>Pluie canvas — gouttes diagonales, impact et ronds dans l'eau.</p></div>
  <section class="variant"><h2>Défaut — pluie légère</h2>
    <RainBackground><div class="hero"><h2 class="ht">🌧 Pluie d'automne</h2><p class="hs">150 gouttes, angle 15°, ripples à l'impact.</p></div></RainBackground>
  </section>
  <section class="variant"><h2>Averse — <code>dropCount={280} speed={2}</code></h2>
    <RainBackground dropCount={280} speed={2} windAngle={20}><div class="hero hero--sm"><h2 class="ht">⛈ Averse</h2></div></RainBackground>
  </section>
  <section class="variant"><h2>Fond bleu sombre</h2>
    <RainBackground background="#050d1a" color="rgba(120,180,255,0.5)"><div class="hero hero--sm"><h2 class="ht">Nuit pluvieuse</h2></div></RainBackground>
  </section>
</div>
<style>
  .hero { display:flex;flex-direction:column;align-items:center;text-align:center;padding:52px 32px;gap:10px;min-height:180px; }
  .hero--sm { padding:32px 32px;min-height:120px; }
  .ht { margin:0;font-size:clamp(1.3rem,3.5vw,2rem);font-weight:800;color:#a0d0ff; }
  .hs { margin:0;font-size:13px;color:rgba(120,180,255,0.5); }
</style>
