<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ThunderBackground from '$lib/components/ui/ThunderBackground.svelte';
</script>
<svelte:head><title>Thunder Background</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Thunder Background</h1><p>Éclairs canvas — trait récursif avec déplacement, flash de scène, timing aléatoire.</p></div>
  <section class="variant"><h2>Défaut — orage</h2>
    <ThunderBackground><div class="hero"><h2 class="ht">⚡ Orage</h2><p class="hs">Éclairs toutes les 2-6 secondes. Attendez…</p></div></ThunderBackground>
  </section>
  <section class="variant"><h2>Orage intense — éclairs fréquents</h2>
    <ThunderBackground minInterval={800} maxInterval={2000}><div class="hero hero--sm"><h2 class="ht">Tempête électrique</h2></div></ThunderBackground>
  </section>
  <section class="variant"><h2>Éclair coloré — cyan</h2>
    <ThunderBackground boltColor="#00ffcc" background="linear-gradient(to bottom, #001020, #00180e)"><div class="hero hero--sm"><h2 class="ht" style="color:#00ffcc">Plasma</h2></div></ThunderBackground>
  </section>
</div>
<style>
  .hero { display:flex;flex-direction:column;align-items:center;text-align:center;padding:52px 32px;gap:10px;min-height:200px; }
  .hero--sm { padding:32px 32px;min-height:130px; }
  .ht { margin:0;font-size:clamp(1.3rem,3.5vw,2rem);font-weight:800;color:#c0d8ff; }
  .hs { margin:0;font-size:13px;color:rgba(150,180,220,0.5); }
</style>
