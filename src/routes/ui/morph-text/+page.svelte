<script lang="ts">
  import '$lib/styles/demo-page.css';
  import MorphText from '$lib/components/ui/MorphText.svelte';
</script>
<svelte:head><title>Morph Text</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Morph Text</h1><p>Transition blur entre les mots — fondu sur <code>filter:blur</code> au changement. CSS pur, zéro canvas.</p></div>
  <section class="variant"><h2>Dans un titre hero</h2>
    <div class="demo demo--dark">
      <h2 class="ht">Nous créons des <MorphText words={['interfaces', 'expériences', 'produits', 'solutions']} /></h2>
    </div>
  </section>
  <section class="variant"><h2>Rapide — <code>interval={1500} duration={300}</code></h2>
    <div class="demo">
      <p class="sentence">Stack : <strong><MorphText words={['Svelte 5', 'TypeScript', 'Tailwind CSS', 'SvelteKit']} interval={1500} duration={300} /></strong></p>
    </div>
  </section>
</div>
<style>
  .demo { display:flex;align-items:center;justify-content:center;padding:48px 32px;background:var(--bg-subtle);border-radius:var(--radius-lg);min-height:120px; }
  .demo--dark { background:#050510; }
  .ht { margin:0;font-size:clamp(1.4rem,4vw,2.2rem);font-weight:800;color:#f8fafc;text-align:center; }
  .sentence { margin:0;font-size:1.1rem;font-weight:500;color:var(--text-base); }
</style>
