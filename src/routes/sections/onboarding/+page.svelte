<script lang="ts">
  import '$lib/styles/demo-page.css';
  import OnboardingSection from '$lib/components/sections/OnboardingSection.svelte';
  import { User, Zap, CheckCircle } from '@lucide/svelte';

  let step = $state(0);
</script>

<svelte:head><title>Onboarding — Sections — My Components</title></svelte:head>

{#snippet visual1()}
  <div class="visual blue">
    <div class="mock-profile">
      <div class="mock-avatar"></div>
      <div class="mock-lines">
        <div class="mock-line wide"></div>
        <div class="mock-line short"></div>
      </div>
    </div>
  </div>
{/snippet}

{#snippet visual2()}
  <div class="visual violet">
    <div class="mock-zap">⚡</div>
  </div>
{/snippet}

{#snippet visual3()}
  <div class="visual green">
    <div class="mock-check">✓</div>
  </div>
{/snippet}

<div class="page">
  <div class="page-header">
    <h1>OnboardingSection</h1>
    <p>Écran de bienvenue multi-étapes — Stepper + navigation + visuel.</p>
  </div>

  <section class="variant">
    <h2>Onboarding interactif</h2>
    <div class="frame">
      <OnboardingSection
        bind:current={step}
        steps={[
          {
            label: 'Profil',
            title: 'Configurez votre profil',
            description: "Ajoutez votre nom, photo et informations de contact pour que votre équipe puisse vous identifier facilement.",
            icon: User,
            visual: visual1,
          },
          {
            label: 'Automatisation',
            title: 'Activez vos premières automatisations',
            description: "Connectez vos outils et configurez des déclencheurs pour automatiser les tâches répétitives de votre équipe.",
            icon: Zap,
            visual: visual2,
          },
          {
            label: "C'est parti !",
            title: "Vous êtes prêt à démarrer",
            description: "Votre espace de travail est configuré. Invitez vos collègues et commencez à collaborer en quelques secondes.",
            icon: CheckCircle,
            visual: visual3,
          },
        ]}
        onComplete={() => alert('Onboarding terminé !')}
        onSkip={() => alert('Étapes ignorées')}
      />
    </div>
  </section>
</div>

<style>
  .frame {
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    min-height: 520px;
  }

  .visual {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 64px;
  }

  .blue   { background: linear-gradient(135deg, #dbeafe, #bfdbfe); }
  .violet { background: linear-gradient(135deg, #ede9fe, #ddd6fe); }
  .green  { background: linear-gradient(135deg, #d1fae5, #a7f3d0); }

  .mock-profile {
    display: flex;
    align-items: center;
    gap: 16px;
    background: white;
    padding: 20px 24px;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
  }

  .mock-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    flex-shrink: 0;
  }

  .mock-lines { display: flex; flex-direction: column; gap: 8px; }
  .mock-line  { height: 10px; background: #e2e8f0; border-radius: 4px; }
  .mock-line.wide  { width: 120px; }
  .mock-line.short { width: 72px; }

  .mock-zap, .mock-check {
    font-size: 72px;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
  }
</style>
