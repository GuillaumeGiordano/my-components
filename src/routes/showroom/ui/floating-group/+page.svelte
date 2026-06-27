<script lang="ts">
  import "$lib/styles/demo-page.css";
  import FloatingGroup from "$lib/FloatingGroup.svelte";
  import ScrollToTop from "$lib/components/ui/ScrollToTop.svelte";
  import SpeedDial from "$lib/components/ui/SpeedDial.svelte";
  import { Settings, Bell, User } from "@lucide/svelte";
</script>

<svelte:head>
  <title>Float Wrapper — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Float Wrapper</h1>
    <p>
      Conteneur utilitaire en position fixe. Regroupe plusieurs composants flottants
      (ScrollToTop, SpeedDial, Chatbot…) dans l'un des 8 points d'ancrage de l'écran.
    </p>
  </div>

  <!-- ─── Usage ──────────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Usage</h2>
    <div class="code-block">
      <pre><code>{`<script>
  import { FloatingGroup, ScrollToTop, SpeedDial } from '@guillaumeg/ui';
<\/script>

<!-- Coin bas-droite : SpeedDial + ScrollToTop -->
<FloatingGroup position="bottom-right">
  <SpeedDial icon={Settings} items={[...]} />
  <ScrollToTop />
</FloatingGroup>

<!-- Milieu gauche : Chatbot -->
<FloatingGroup position="left">
  <Chatbot ... />
</FloatingGroup>`}</code></pre>
    </div>
  </section>

  <!-- ─── Démo ────────────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Démo — position="bottom-right"</h2>
    <p class="hint">
      Le groupe ci-dessous est rendu en bas à droite de la page (position fixe).
      Il contient un <strong>SpeedDial</strong> et un <strong>ScrollToTop</strong>.
    </p>
  </section>

  <!-- ─── Props ────────────────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Props</h2>
    <div class="props-table">
      <div class="props-row header">
        <span>Prop</span><span>Type</span><span>Requis</span><span>Description</span>
      </div>
      {#each [
        ["position", '"top-left" | "top" | "top-right" | "left" | "right" | "bottom-left" | "bottom" | "bottom-right"', "oui", "Point d'ancrage parmi les 8 positions"],
        ["children", "Snippet", "oui", "Un ou plusieurs composants flottants"],
        ["scrollAware", "boolean", "non", "Réduit l'opacité à 0.3 au repos, revient à 1 lors du scroll"],
      ] as [prop, type, req, desc]}
        <div class="props-row">
          <code>{prop}</code>
          <code class="type">{type}</code>
          <code class="req">{req}</code>
          <span>{desc}</span>
        </div>
      {/each}
    </div>
  </section>

  <!-- ─── Comportements ─────────────────────────────────────────────────── -->
  <section class="variant">
    <h2>Comportements</h2>
    <ul class="notes">
      <li>Position fixe, <code>z-index: 50</code>. Les enfants sont empilés en colonne avec <code>gap: 8px</code>.</li>
      <li>Coins — <code>top-left</code>, <code>top-right</code>, <code>bottom-left</code>, <code>bottom-right</code> : ancré à <code>24px</code> du bord et <code>28px</code> du haut/bas.</li>
      <li>Milieux de côté — <code>top</code>, <code>bottom</code> : centré horizontalement. <code>left</code>, <code>right</code> : centré verticalement.</li>
      <li>Pas de style propre sur les enfants — chaque composant gère sa propre taille et apparence.</li>
    </ul>
  </section>

  <!-- ─── Exemple multi-composants ──────────────────────────────────────── -->
  <section class="variant">
    <h2>Exemple — deux groupes simultanés</h2>
    <div class="code-block">
      <pre><code>{`<FloatingGroup position="bottom-right">
  <SpeedDial icon={Settings} items={[...]} />
  <ScrollToTop />
</FloatingGroup>

<FloatingGroup position="bottom-left">
  <Chatbot onSend={handleMessage} />
</FloatingGroup>`}</code></pre>
    </div>
    <p class="hint" style="margin-top: 12px;">
      Chaque <code>FloatingGroup</code> est indépendant — plusieurs peuvent coexister sans collision.
    </p>
  </section>

  <!-- Contenu pour pouvoir scroller -->
  {#each Array(4) as _, i}
    <section class="variant">
      <h2>Section {i + 1}</h2>
      <p class="filler">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </section>
  {/each}
</div>

<!-- Démo live en bas à droite -->
<FloatingGroup position="bottom-right">
  <SpeedDial
    icon={Settings}
    items={[
      { icon: Bell, label: "Notifications" },
      { icon: User, label: "Profil" },
    ]}
  />
  <ScrollToTop />
</FloatingGroup>

<style>
  .hint {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 4px;
  }

  .code-block {
    background: var(--bg-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: auto;
  }

  .code-block pre { margin: 0; padding: 20px; }

  .code-block code {
    font-family: var(--font-mono);
    font-size: 13px;
    color: var(--text-base);
    white-space: pre;
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
    grid-template-columns: 100px 180px 70px 1fr;
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
  code.type { color: var(--primary); }
  code.req  { color: var(--text-subtle); }

  .notes {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 20px;
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
  }

  .filler {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.7;
  }
</style>
