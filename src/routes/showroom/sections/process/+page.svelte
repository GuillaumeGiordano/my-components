<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ProcessSection from '$lib/components/sections/ProcessSection.svelte';
  import { UserPlus, Settings, Users, Rocket } from '@lucide/svelte';

  const steps = [
    {
      icon: UserPlus,
      title: 'Créez votre compte',
      description:
        "Inscrivez-vous en moins de deux minutes avec votre email ou via votre compte Google. Aucune carte bancaire requise.",
      badge: 'Gratuit',
    },
    {
      icon: Settings,
      title: 'Configurez votre espace',
      description:
        "Personnalisez votre espace de travail selon vos besoins : choisissez votre secteur, vos outils préférés et vos préférences.",
    },
    {
      icon: Users,
      title: 'Invitez votre équipe',
      description:
        "Ajoutez vos collaborateurs par email en quelques secondes. Définissez les rôles et les permissions pour chaque membre.",
    },
    {
      icon: Rocket,
      title: 'Lancez vos projets',
      description:
        "Démarrez votre premier projet en partant d'un modèle ou d'une page blanche. Collaborez en temps réel et suivez vos progrès.",
    },
  ];
</script>

<svelte:head>
  <title>Process — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Process</h1>
    <p>Section d'étapes numérotées en disposition horizontale ou verticale.</p>
  </div>

  <section class="variant">
    <h2>Disposition horizontale</h2>
    <ProcessSection
      badge="Comment ça marche"
      title="Démarrez en quatre étapes simples"
      description="Notre processus d'intégration a été conçu pour être le plus fluide possible. Vous serez opérationnel en moins de dix minutes."
      steps={steps}
      layout="horizontal"
    />
  </section>

  <section class="variant">
    <h2>Disposition verticale</h2>
    <ProcessSection
      badge="Votre parcours"
      title="Un onboarding pensé pour vous"
      description="De la création de compte au lancement de votre premier projet, nous vous accompagnons à chaque étape."
      steps={steps}
      layout="vertical"
    />
  </section>
</div>
