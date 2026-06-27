<script lang="ts">
  import '$lib/styles/demo-page.css';
  import TypeWriter from '$lib/components/ui/TypeWriter.svelte';
</script>

<svelte:head><title>TypeWriter — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>TypeWriter</h1>
    <p>
      Préfixe statique + liste de mots animés lettre par lettre en boucle.
      Conçu pour s'insérer <strong>inline</strong> dans une phrase ou un titre.
    </p>
  </div>

  <!-- ── Intégration dans un titre hero ───────────────────────────────── -->
  <section class="variant">
    <h2>Dans un titre hero</h2>
    <div class="hero-demo">
      <h3 class="hero-title">
        Nous construisons des
        <TypeWriter
          prefix=" "
          words={['interfaces', 'expériences', 'produits', 'solutions']}
          typeSpeed={70}
          deleteSpeed={40}
          pauseDuration={1800}
        />
      </h3>
    </div>
  </section>

  <!-- ── Préfixe complet dans le composant ────────────────────────────── -->
  <section class="variant">
    <h2>Préfixe porté par le composant</h2>
    <p class="body-demo">
      <TypeWriter
        prefix="Je suis "
        words={['développeur', 'designer', 'créateur', 'architecte']}
        typeSpeed={90}
        deleteSpeed={55}
        pauseDuration={1600}
      />
    </p>
  </section>

  <!-- ── Sans curseur ─────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Sans curseur — <code>cursor={false}</code></h2>
    <p class="body-demo">
      <TypeWriter
        prefix="Technologie : "
        words={['Svelte 5', 'TypeScript', 'Tailwind CSS', 'SvelteKit']}
        cursor={false}
      />
    </p>
  </section>

  <!-- ── Curseur personnalisé ─────────────────────────────────────────── -->
  <section class="variant">
    <h2>Curseur personnalisé — <code>cursorChar="_"</code></h2>
    <p class="body-demo">
      <TypeWriter
        prefix="Mode : "
        words={['sombre', 'clair', 'automatique']}
        cursorChar="_"
        typeSpeed={100}
        deleteSpeed={60}
      />
    </p>
  </section>

  <!-- ── Props ────────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Défaut</span><span>Description</span>
      </div>
      {#each [
        ['prefix',        'string',   '""',    'Texte statique affiché avant le mot animé'],
        ['words',         'string[]', '[]',    'Liste des mots à cycler'],
        ['typeSpeed',     'number',   '80',    'Délai (ms) entre chaque lettre tapée'],
        ['deleteSpeed',   'number',   '50',    'Délai (ms) entre chaque lettre effacée'],
        ['pauseDuration', 'number',   '1500',  'Pause (ms) après avoir fini de taper un mot'],
        ['cursor',        'boolean',  'true',  'Affiche le curseur clignotant'],
        ['cursorChar',    'string',   '"\\|"', 'Caractère du curseur'],
      ] as [prop, type, def, desc]}
        <div class="props-row">
          <code>{prop}</code>
          <code class="type">{type}</code>
          <code class="default">{def}</code>
          <span>{desc}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- ── Notes ────────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Notes</h2>
    <ul class="notes">
      <li>Le composant s'insère <strong>inline</strong> — il hérite de la taille et du poids de son parent.</li>
      <li>Le mot animé et le curseur prennent la couleur <code>var(--primary)</code> du thème courant.</li>
      <li>Pour inclure un espace entre le préfixe et le mot, ajoutez-le en fin de <code>prefix</code> (ex. <code>"Je suis "</code>) ou en début de chaque mot.</li>
      <li>Le timer est nettoyé proprement au démontage du composant (<code>onDestroy</code>).</li>
    </ul>
  </section>
</div>

<style>
  .hero-demo {
    padding: 32px 24px;
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    text-align: center;
  }

  .hero-title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 700;
    color: var(--text-heading);
    margin: 0;
    line-height: 1.25;
  }

  .body-demo {
    font-size: 1.125rem;
    color: var(--text-base);
    margin: 0;
    padding: 20px 0 4px;
    min-height: 2em;
  }

  .props-table {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .props-row {
    display: grid;
    grid-template-columns: 130px 90px 80px 1fr;
    gap: 12px;
    padding: 10px 16px;
    align-items: center;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    color: var(--text-muted);

    &:last-child { border-bottom: none; }
    &.header {
      background: var(--bg-subtle);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-subtle);
    }
  }

  .props-row code { font-family: var(--font-mono); font-size: 12px; color: var(--text-base); }
  code.type    { color: var(--primary); }
  code.default { color: var(--text-subtle); }

  .notes {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
  }
</style>
