<script lang="ts">
  import '$lib/styles/demo-page.css';
  import NeonText from '$lib/components/ui/NeonText.svelte';
</script>
<svelte:head><title>Neon Text</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Neon Text</h1><p>Lueur néon CSS — couches de <code>text-shadow</code>, deux modes : pulse lent ou flicker aléatoire.</p></div>
  <section class="variant"><h2>Flicker — défaut</h2>
    <div class="demo">
      <p class="nt-big"><NeonText text="OPEN" color="#ff2080" /></p>
    </div>
  </section>
  <section class="variant"><h2>Pulse lent — <code>flicker={false}</code></h2>
    <div class="demo">
      <p class="nt-big"><NeonText text="NEON DREAMS" color="#00ccff" flicker={false} /></p>
    </div>
  </section>
  <section class="variant"><h2>Multi-couleurs dans une phrase</h2>
    <div class="demo">
      <p class="nt-sentence">
        <NeonText text="Svelte" color="#ff6040" flicker={false} />
        &nbsp;×&nbsp;
        <NeonText text="Canvas" color="#00ccff" flicker={false} />
        &nbsp;=&nbsp;
        <NeonText text="Magic" color="#cc00ff" />
      </p>
    </div>
  </section>
  <section class="variant"><h2>Taille personnalisée — <code>size={48}</code></h2>
    <div class="demo">
      <p><NeonText text="WOW" color="#ffcc00" size={56} /></p>
    </div>
  </section>
</div>
<style>
  .demo { display:flex;align-items:center;justify-content:center;padding:40px 24px;background:#040408;border-radius:var(--radius-lg);min-height:100px; }
  .nt-big { margin:0;font-size:3rem;font-weight:900;font-family:monospace;letter-spacing:0.1em; }
  .nt-sentence { margin:0;font-size:2rem;font-weight:700;font-family:monospace; }
</style>
