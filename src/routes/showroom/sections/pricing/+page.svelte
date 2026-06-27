<script lang="ts">
  import PricingSection from '$lib/components/sections/PricingSection.svelte';
  import '$lib/styles/demo-page.css';
</script>

<svelte:head>
  <title>Pricing — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Pricing</h1>
    <p>Grille de tarifs avec plans, liste de fonctionnalités et bouton d'appel à l'action. Le plan mis en avant est visuellement distinct.</p>
  </div>

  <PricingSection
    badge="Tarifs"
    title="Un plan adapté à chaque étape"
    description="Démarrez gratuitement, évoluez selon vos besoins. Pas de frais cachés, pas d'engagement."
    plans={[
      {
        name: 'Starter',
        price: 'Gratuit',
        description: 'Idéal pour explorer la plateforme et tester vos premières idées.',
        features: [
          '3 projets actifs',
          '5 Go de stockage',
          'Jusqu\'à 2 membres',
          'Support par e-mail',
        ],
        cta: 'Commencer gratuitement',
        href: '#',
      },
      {
        name: 'Pro',
        price: '29€',
        period: 'mois',
        description: 'Pour les équipes qui souhaitent aller plus loin avec des outils avancés.',
        features: [
          'Projets illimités',
          '100 Go de stockage',
          'Jusqu\'à 15 membres',
          'Analytiques avancées',
          'Support prioritaire',
          'Intégrations tierces',
        ],
        cta: 'Démarrer l\'essai gratuit',
        href: '#',
        highlighted: true,
        badge: 'Populaire',
      },
      {
        name: 'Enterprise',
        price: 'Sur devis',
        description: 'Pour les grandes organisations avec des besoins spécifiques et des exigences de conformité.',
        features: [
          'Tout ce qu\'inclut Pro',
          'Stockage personnalisé',
          'Membres illimités',
          'SSO & SAML',
          'SLA garanti 99,99 %',
          'Gestionnaire de compte dédié',
        ],
        cta: 'Contacter les ventes',
        href: '#',
      },
    ]}
  />
</div>
