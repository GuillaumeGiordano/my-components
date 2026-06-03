<script lang="ts">
  import '$lib/styles/demo-page.css';
  import SandBackground from '$lib/components/ui/SandBackground.svelte';
</script>
<svelte:head><title>Sand Background</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Sand Background</h1><p>Tempête de sable canvas — grains elliptiques colorés en profondeur, turbulence sinusoïdale.</p></div>
  <section class="variant"><h2>Défaut — vent du désert</h2>
    <SandBackground><div class="hero"><h2 class="ht">🏜️ Sahara</h2><p class="hs">200 grains, parallaxe de profondeur.</p></div></SandBackground>
  </section>
  <section class="variant"><h2>Tempête — <code>windSpeed={3} grainCount={400}</code></h2>
    <SandBackground windSpeed={3} grainCount={400}><div class="hero hero--sm"><h2 class="ht">Tempête de sable</h2></div></SandBackground>
  </section>
  <section class="variant"><h2>Plage — tons clairs</h2>
    <SandBackground background="linear-gradient(to bottom, #87ceeb, #f5deb3, #c8a060)" windSpeed={0.4} grainCount={100}><div class="hero"><h2 class="ht" style="color:#4a3010">Bord de mer</h2></div></SandBackground>
  </section>
</div>
<style>
  .hero { display:flex;flex-direction:column;align-items:center;text-align:center;padding:52px 32px;gap:10px;min-height:180px; }
  .hero--sm { padding:32px 32px;min-height:120px; }
  .ht { margin:0;font-size:clamp(1.3rem,3.5vw,2rem);font-weight:800;color:#f5deb3;text-shadow:0 2px 8px rgba(0,0,0,0.4); }
  .hs { margin:0;font-size:13px;color:rgba(245,222,179,0.5); }
</style>
