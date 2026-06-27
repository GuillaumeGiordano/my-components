<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Marquee from '$lib/components/ui/Marquee.svelte';
</script>
<svelte:head><title>Marquee</title></svelte:head>
<div class="page">
  <div class="page-header"><h1>Marquee</h1><p>Scroll infini horizontal — CSS pur, duplication de contenu pour boucle seamless. Pause au survol.</p></div>
  <section class="variant"><h2>Logos / stack technologique</h2>
    <Marquee speed={50}>
      {#each ['Svelte 5','TypeScript','Tailwind CSS','SvelteKit','Vite','Node.js','PostgreSQL','Docker','Git','Cloudflare'] as tech}
        <span class="tag">{tech}</span>
      {/each}
    </Marquee>
  </section>
  <section class="variant"><h2>Sens inverse — <code>direction="right"</code></h2>
    <Marquee speed={40} direction="right">
      {#each ['🎨 Design','⚡ Performance','🔒 Sécurité','♿ Accessibilité','📱 Responsive','🌙 Dark mode','🎯 DX','🚀 SSR','🔧 TypeScript','🎪 Animations'] as item}
        <span class="tag tag--b">{item}</span>
      {/each}
    </Marquee>
  </section>
  <section class="variant"><h2>Avatars / témoignages</h2>
    <Marquee speed={35} gap={16}>
      {#each [
        {name:'Alice M.', text:'Super composants !'},
        {name:'Bob D.',   text:'Exactement ce qu\'il me fallait.'},
        {name:'Clara L.', text:'Le DX est incroyable.'},
        {name:'David M.', text:'Utilisé en prod depuis 3 mois.'},
        {name:'Eva B.',   text:'Svelte 5 + cette lib = 🔥'},
      ] as t}
        <div class="card">
          <p class="card-text">«{t.text}»</p>
          <span class="card-name">— {t.name}</span>
        </div>
      {/each}
    </Marquee>
  </section>
</div>
<style>
  .tag { display:inline-flex;padding:6px 16px;border-radius:99px;border:1px solid var(--border);background:var(--bg-base);color:var(--text-base);font-size:13px;font-weight:500;white-space:nowrap; }
  .tag--b { background:color-mix(in srgb,var(--primary) 8%,transparent);border-color:color-mix(in srgb,var(--primary) 25%,transparent);color:var(--primary); }
  .card { width:200px;flex-shrink:0;padding:14px 16px;border-radius:var(--radius-md);border:1px solid var(--border);background:var(--bg-base); }
  .card-text { margin:0 0 6px;font-size:13px;color:var(--text-base);font-style:italic;line-height:1.4; }
  .card-name { font-size:11px;color:var(--text-muted);font-weight:600; }
</style>
