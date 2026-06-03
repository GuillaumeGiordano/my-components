<script lang="ts">
  import '$lib/styles/demo-page.css';
  import SnowBackground from '$lib/components/ui/SnowBackground.svelte';
</script>
<svelte:head><title>Snow Background</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Snow Background</h1><p>Flocons canvas — oscillation sinusoïdale par phase individuelle, vent configurable.</p></div>
  <section class="variant"><h2>Défaut — neige douce</h2>
    <SnowBackground><div class="hero"><h2 class="ht">❄️ Hiver</h2><p class="hs">120 flocons, dérive légère.</p></div></SnowBackground>
  </section>
  <section class="variant"><h2>Blizzard — <code>flakeCount={300} wind={1.5}</code></h2>
    <SnowBackground flakeCount={300} wind={1.5} speed={2} background="#06101a"><div class="hero hero--sm"><h2 class="ht">🌨 Blizzard</h2></div></SnowBackground>
  </section>
  <section class="variant"><h2>Paysage enneigé</h2>
    <SnowBackground background="linear-gradient(to bottom, #1a2a3a, #2a3a4a)" flakeCount={80} speed={0.6}><div class="hero"><h2 class="ht">Nuit de Noël</h2><p class="hs">Chute lente, ambiance apaisante.</p></div></SnowBackground>
  </section>
</div>
<style>
  .hero { display:flex;flex-direction:column;align-items:center;text-align:center;padding:52px 32px;gap:10px;min-height:180px; }
  .hero--sm { padding:32px 32px;min-height:120px; }
  .ht { margin:0;font-size:clamp(1.3rem,3.5vw,2rem);font-weight:800;color:#e8f4ff; }
  .hs { margin:0;font-size:13px;color:rgba(200,230,255,0.5); }
</style>
