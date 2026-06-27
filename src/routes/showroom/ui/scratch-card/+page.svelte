<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ScratchCard from '$lib/components/ui/ScratchCard.svelte';

  let revealed1 = $state(false);
  let revealed2 = $state(false);
</script>
<svelte:head><title>Scratch Card</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Scratch Card</h1><p>Canvas avec <code>destination-out</code> — gratter révèle le contenu en dessous. Seuil de révélation automatique.</p></div>
  <section class="variant"><h2>Carte cadeau</h2>
    <div class="demo">
      <ScratchCard onReveal={() => (revealed1 = true)}>
        <div class="prize">
          <span class="prize-emoji">🎉</span>
          <h3>Félicitations !</h3>
          <p>Tu as gagné un composant Svelte gratuit.</p>
          {#if revealed1}<span class="prize-badge">Révélé !</span>{/if}
        </div>
      </ScratchCard>
    </div>
  </section>
  <section class="variant"><h2>Couverture rose — <code>cover="#ec4899" threshold={40}</code></h2>
    <div class="demo">
      <ScratchCard cover="#9333ea" threshold={40} label="✨ Grattez ici ✨" onReveal={() => (revealed2 = true)}>
        <div class="prize prize--b">
          <span class="prize-emoji">🦄</span>
          <h3>Magie !</h3>
          <p>Seulement 40% à gratter pour révéler.</p>
          {#if revealed2}<span class="prize-badge prize-badge--b">Magique !</span>{/if}
        </div>
      </ScratchCard>
    </div>
  </section>
</div>
<style>
  .demo { display:flex;align-items:center;justify-content:center;padding:40px 32px;background:var(--bg-subtle);border-radius:var(--radius-lg); }
  .prize { width:280px;height:180px;border-radius:12px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;padding:16px; }
  .prize--b { background:linear-gradient(135deg,#f59e0b,#ec4899); }
  .prize-emoji { font-size:36px; }
  .prize h3 { margin:0;font-size:16px;font-weight:700;color:#fff; }
  .prize p  { margin:0;font-size:12px;color:rgba(255,255,255,0.7); }
  .prize-badge { padding:3px 10px;border-radius:99px;background:rgba(255,255,255,0.2);color:#fff;font-size:11px;font-weight:700; }
  .prize-badge--b { background:rgba(255,255,255,0.2); }
</style>
