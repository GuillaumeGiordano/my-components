<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Stepper from '$lib/components/ui/Stepper.svelte';
  import Button from '$lib/components/buttons/Button.svelte';
  import { User, CreditCard, CheckCircle } from '@lucide/svelte';

  let step = $state(1);
  const steps = [
    { label: 'Compte',   description: 'Créez votre compte utilisateur.',     icon: User },
    { label: 'Paiement', description: 'Renseignez vos informations bancaires.', icon: CreditCard },
    { label: 'Confirmation', description: 'Votre abonnement est activé.', icon: CheckCircle },
  ];
</script>

<svelte:head><title>Stepper — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Stepper</h1>
    <p>Indicateur de progression multi-étapes — horizontal, vertical, numéroté, pointillé.</p>
  </div>

  <section class="variant">
    <h2>Horizontal — numéroté (interactif)</h2>
    <Stepper {steps} current={step} variant="numbered" />
    <div class="nav">
      <Button variant="outline" size="sm" onclick={() => step = Math.max(0, step - 1)} disabled={step === 0}>
        Précédent
      </Button>
      <Button variant="primary" size="sm" onclick={() => step = Math.min(steps.length - 1, step + 1)} disabled={step === steps.length - 1}>
        Suivant
      </Button>
    </div>
  </section>

  <section class="variant">
    <h2>Horizontal — pointillé</h2>
    <Stepper steps={steps} current={1} variant="dotted" />
  </section>

  <section class="variant">
    <h2>Vertical — numéroté</h2>
    <div style="max-width: 300px;">
      <Stepper {steps} current={step} orientation="vertical" variant="numbered" />
    </div>
  </section>
</div>

<style>
  .nav { display: flex; gap: 10px; margin-top: 20px; }
</style>
