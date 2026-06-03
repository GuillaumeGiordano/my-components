<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ConfettiButton from '$lib/components/ui/ConfettiButton.svelte';
  import { PartyPopper, Heart, Star } from '@lucide/svelte';
</script>
<svelte:head><title>Confetti Button</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Confetti Button</h1><p>Clic → pluie de confettis canvas sur toute la page. Formes mixtes (rect + cercle), gravité et drag.</p></div>
  <section class="variant"><h2>Défaut — palette arc-en-ciel</h2>
    <div class="demo">
      <ConfettiButton><PartyPopper size={16} />Lancer les confettis</ConfettiButton>
    </div>
  </section>
  <section class="variant"><h2>Monochrome — couleur unique</h2>
    <div class="demo">
      <ConfettiButton colors={['#ec4899','#f9a8d4','#fce7f3']} count={60}>
        <Heart size={16} />Rose shower
      </ConfettiButton>
      <ConfettiButton colors={['#f59e0b','#fbbf24','#fef3c7']} count={60}>
        <Star size={16} />Étoiles
      </ConfettiButton>
    </div>
  </section>
  <section class="variant"><h2>Spray dirigé — <code>spread={120}</code></h2>
    <div class="demo">
      <ConfettiButton spread={120} count={100}>
        <PartyPopper size={16} />Spray vers le haut
      </ConfettiButton>
    </div>
  </section>
</div>
<style>
  .demo { display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:16px;padding:40px 32px;background:var(--bg-subtle);border-radius:var(--radius-lg);min-height:120px; }
</style>
