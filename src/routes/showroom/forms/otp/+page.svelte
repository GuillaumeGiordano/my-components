<script lang="ts">
  import '$lib/styles/demo-page.css';
  import OtpInput from '$lib/components/forms/OtpInput.svelte';

  let code4 = $state('');
  let code6 = $state('');
</script>

<svelte:head><title>OTP Input — Formulaires — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>OTP Input</h1>
    <p>Saisie de code de vérification — 4 ou 6 chiffres, coller depuis le presse-papier, navigation clavier.</p>
  </div>

  <section class="variant">
    <h2>Code à 4 chiffres (PIN)</h2>
    <OtpInput
      length={4}
      label="Code PIN"
      bind:value={code4}
      hint="Entrez le code reçu par SMS."
      onComplete={(v) => console.log('PIN complet :', v)}
    />
    {#if code4.length === 4}<p class="success">Code saisi : {code4}</p>{/if}
  </section>

  <section class="variant">
    <h2>Code à 6 chiffres (2FA)</h2>
    <OtpInput
      length={6}
      label="Code d'authentification"
      bind:value={code6}
      hint="Code valable 30 secondes."
      onComplete={(v) => console.log('2FA complet :', v)}
    />
  </section>

  <section class="variant">
    <h2>Avec erreur</h2>
    <OtpInput length={6} value="123456" error="Code incorrect. Veuillez réessayer." />
  </section>
</div>

<style>
  .success {
    font-size: 13px;
    color: var(--success, #059669);
    font-weight: 600;
    margin-top: 10px;
  }
</style>
