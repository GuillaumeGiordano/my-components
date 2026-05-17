<script lang="ts">
  import '$lib/styles/demo-page.css';
  import CookieBanner from '$lib/components/sections/CookieBanner.svelte';
  import Button from '$lib/components/buttons/Button.svelte';

  let showBanner  = $state(false);
  let showLeft    = $state(false);
  let showRight   = $state(false);
  let lastChoice  = $state('');

  function reset(key: string) {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
  }
</script>

<svelte:head><title>Cookie Banner — Sections — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>CookieBanner</h1>
    <p>Bannière de consentement RGPD — 3 positions, persistance localStorage.</p>
  </div>

  <section class="variant">
    <h2>Barre en bas (pleine largeur)</h2>
    <Button variant="outline" onclick={() => { reset('demo-cookie-bar'); showBanner = !showBanner; }}>
      Afficher la bannière
    </Button>
    {#if lastChoice}<p class="choice">Choix : <strong>{lastChoice}</strong></p>{/if}
    {#if showBanner}
      <CookieBanner
        cookieKey="demo-cookie-bar"
        onaccept={() => { lastChoice = 'Accepté'; showBanner = false; }}
        ondecline={() => { lastChoice = 'Refusé'; showBanner = false; }}
      />
    {/if}
  </section>

  <section class="variant">
    <h2>En bas à gauche</h2>
    <Button variant="outline" onclick={() => { reset('demo-cookie-left'); showLeft = !showLeft; }}>
      Afficher (bas-gauche)
    </Button>
    {#if showLeft}
      <CookieBanner
        position="bottom-left"
        cookieKey="demo-cookie-left"
        onaccept={() => showLeft = false}
        ondecline={() => showLeft = false}
      />
    {/if}
  </section>

  <section class="variant">
    <h2>En bas à droite</h2>
    <Button variant="outline" onclick={() => { reset('demo-cookie-right'); showRight = !showRight; }}>
      Afficher (bas-droite)
    </Button>
    {#if showRight}
      <CookieBanner
        position="bottom-right"
        cookieKey="demo-cookie-right"
        title="Cookies & confidentialité"
        description="Nous utilisons des cookies analytiques pour améliorer votre expérience."
        onaccept={() => showRight = false}
        ondecline={() => showRight = false}
        oncustomize={() => alert('Ouvrir les préférences')}
      />
    {/if}
  </section>
</div>

<style>
  .choice { font-size: 13px; color: var(--text-muted); margin-top: 10px; }
</style>
