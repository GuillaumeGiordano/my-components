<script lang="ts">
  import '$lib/styles/demo-page.css';
  import FireBackground from '$lib/components/ui/FireBackground.svelte';
</script>
<svelte:head><title>Fire Background</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Fire Background</h1><p>Particules de flammes canvas — turbulence sinusoïdale, dégradé HSL jaune→orange→rouge.</p></div>
  <section class="variant"><h2>Défaut</h2>
    <FireBackground><div class="hero"><h2 class="ht">🔥 Brasier</h2><p class="hs">120 particules, turbulence organique.</p></div></FireBackground>
  </section>
  <section class="variant"><h2>Brasier intense — <code>intensity={2}</code></h2>
    <FireBackground intensity={2} flameCount={200}><div class="hero"><h2 class="ht">INFERNO</h2></div></FireBackground>
  </section>
  <section class="variant"><h2>Petite flamme — <code>intensity={0.5}</code></h2>
    <FireBackground intensity={0.5} flameCount={60}><div class="hero hero--sm"><h2 class="ht">Bougie</h2></div></FireBackground>
  </section>
</div>
<style>
  .hero { display:flex;flex-direction:column;align-items:center;text-align:center;padding:52px 32px;gap:10px;min-height:180px; }
  .hero--sm { padding:32px 32px;min-height:120px; }
  .ht { margin:0;font-size:clamp(1.4rem,4vw,2.4rem);font-weight:900;color:#ff8844;text-shadow:0 0 20px #ff440066; }
  .hs { margin:0;font-size:13px;color:rgba(255,180,100,0.6); }
</style>
