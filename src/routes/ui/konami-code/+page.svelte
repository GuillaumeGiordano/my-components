<script lang="ts">
  import '$lib/styles/demo-page.css';
  import KonamiCode from '$lib/components/ui/KonamiCode.svelte';

  let activated = $state(false);
  let progress  = $state(0);
  let lastKey   = $state('');

  const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  const LABELS: Record<string, string> = {
    ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→',
  };
  function label(k: string) { return LABELS[k] ?? k.toUpperCase(); }

  function track(e: KeyboardEvent) {
    lastKey = label(e.key);
    if (e.key === SEQ[progress]) {
      progress++;
      if (progress === SEQ.length) { progress = 0; activated = true; setTimeout(() => { activated = false; }, 3000); }
    } else {
      progress = e.key === SEQ[0] ? 1 : 0;
    }
  }
</script>

<svelte:window onkeydown={track} />
<svelte:head><title>Konami Code — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Konami Code</h1>
    <p>Déclenche un contenu caché quand l'utilisateur tape une séquence de touches précise.</p>
  </div>

  <!-- Easter egg via composant -->
  <KonamiCode onactivate={() => (activated = true)} duration={3000}>
    <div class="easter-egg">
      🎉 KONAMI CODE ACTIVÉ ! Vous avez trouvé le secret. 🎉
    </div>
  </KonamiCode>

  <section class="variant">
    <h2>Séquence à taper</h2>
    <div class="seq-display">
      {#each SEQ as key, i}
        <span class="seq-key" class:seq-key--done={i < progress} class:seq-key--active={i === progress}>
          {label(key)}
        </span>
      {/each}
    </div>
    <p class="hint">
      Progression : <strong>{progress}/{SEQ.length}</strong>
      {#if lastKey} — dernière touche : <code>{lastKey}</code>{/if}
    </p>
  </section>

  {#if activated}
    <section class="variant">
      <div class="success-banner">
        🎊 Code activé ! Le composant <code>KonamiCode</code> a déclenché son <code>children</code>.
      </div>
    </section>
  {/if}

  <section class="variant">
    <h2>Séquence personnalisée</h2>
    <p class="hint">Tu peux définir n'importe quelle séquence de touches via la prop <code>sequence</code>.</p>
    <KonamiCode sequence={['s','v','e','l','t','e']} onactivate={() => alert('Svelte !')}>
      <div class="easter-egg easter-egg--sm">Tu as tapé "svelte" — ✨ bravo !</div>
    </KonamiCode>
    <div class="seq-display seq-display--sm">
      {#each ['S','V','E','L','T','E'] as k}
        <span class="seq-key">{k}</span>
      {/each}
    </div>
  </section>

  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header"><span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span></div>
      {#each [
        ['sequence',   'string[]',  'Konami (10 touches)', 'Séquence de touches à détecter'],
        ['onactivate', 'Function',  '—',                  'Callback déclenché à l\'activation'],
        ['children',   'Snippet',   '—',                  'Contenu révélé pendant <code>duration</code>'],
        ['duration',   'number',    '3000',               'Durée d\'affichage du children (ms)'],
      ] as [p, t, d, desc]}
        <div class="props-row"><code>{p}</code><code class="type">{t}</code><code class="def">{d}</code><span>{@html desc}</span></div>
      {/each}
    </div>
  </section>
</div>

<style>
  .seq-display {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 20px 0 8px;
  }

  .seq-display--sm { padding: 12px 0 4px; }

  .seq-key {
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg-subtle);
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 600;
    color: var(--text-muted);
    transition: background 200ms ease, border-color 200ms ease, color 200ms ease;
    padding: 0 10px;
  }

  .seq-key--done {
    background: color-mix(in srgb, var(--primary) 12%, transparent);
    border-color: var(--primary);
    color: var(--primary);
  }

  .seq-key--active {
    background: var(--primary);
    border-color: var(--primary);
    color: var(--primary-fg);
    animation: pulse 0.6s ease infinite alternate;
  }

  @keyframes pulse {
    from { box-shadow: 0 0 0 0 color-mix(in srgb, var(--primary) 40%, transparent); }
    to   { box-shadow: 0 0 0 6px transparent; }
  }

  .hint { font-size: 13px; color: var(--text-muted); margin-top: 8px; }

  .easter-egg {
    padding: 20px 24px;
    background: color-mix(in srgb, var(--primary) 10%, var(--bg-base));
    border: 2px solid var(--primary);
    border-radius: var(--radius-lg);
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    color: var(--primary);
    margin-bottom: 24px;
  }

  .easter-egg--sm {
    padding: 12px 20px;
    font-size: 15px;
    margin: 0;
  }

  .success-banner {
    padding: 16px 20px;
    background: color-mix(in srgb, #22c55e 10%, transparent);
    border: 1px solid #22c55e;
    border-radius: var(--radius-lg);
    font-size: 14px;
    color: #16a34a;
  }

  .props-table { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
  .props-row { display: grid; grid-template-columns: 110px 170px 160px 1fr; gap: 12px; padding: 10px 16px; align-items: center; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text-muted); }
  .props-row:last-child { border-bottom: none; }
  .props-row.header { background: var(--bg-subtle); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-subtle); }
  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type { color: var(--primary); } code.def { color: var(--text-subtle); }
</style>
