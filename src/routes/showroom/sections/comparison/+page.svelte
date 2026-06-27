<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ComparisonSection from '$lib/components/sections/ComparisonSection.svelte';

  const plans = [
    {
      name: 'Starter',
      cta: { label: 'Commencer gratuitement', href: '#' },
    },
    {
      name: 'Pro',
      highlighted: true,
      badge: 'Recommandé',
      cta: { label: 'Essayer 14 jours', href: '#' },
    },
    {
      name: 'Enterprise',
      cta: { label: 'Contacter les ventes', href: '#' },
    },
  ];

  const features = [
    // Category: Fonctionnalités de base
    { category: 'Fonctionnalités de base', label: '', values: [null, null, null] },
    {
      label: 'Projets actifs',
      tooltip: 'Nombre de projets simultanément actifs dans votre espace.',
      values: ['3 projets', '20 projets', 'Illimité'],
    },
    {
      label: 'Membres par espace',
      values: ['5 membres', '50 membres', 'Illimité'],
    },
    {
      label: 'Stockage inclus',
      values: ['5 Go', '100 Go', '2 To'],
    },
    {
      label: 'Historique des versions',
      tooltip: "Durée de conservation de l'historique des modifications.",
      values: ['7 jours', '90 jours', 'Illimité'],
    },
    {
      label: 'Intégrations tierces',
      values: [false, true, true],
    },
    {
      label: 'API access',
      values: [false, true, true],
    },

    // Category: Collaboration
    { category: 'Collaboration', label: '', values: [null, null, null] },
    {
      label: 'Édition en temps réel',
      values: [true, true, true],
    },
    {
      label: 'Commentaires et annotations',
      values: [true, true, true],
    },
    {
      label: 'Espaces privés',
      values: [false, true, true],
    },
    {
      label: 'Gestion des rôles avancée',
      tooltip: 'Création de rôles personnalisés avec permissions granulaires.',
      values: [false, false, true],
    },
    {
      label: 'SSO / SAML',
      values: [false, false, true],
    },

    // Category: Support
    { category: 'Support', label: '', values: [null, null, null] },
    {
      label: 'Support par email',
      values: [true, true, true],
    },
    {
      label: 'Support prioritaire',
      values: [false, true, true],
    },
    {
      label: 'Gestionnaire de compte dédié',
      values: [false, false, true],
    },
    {
      label: 'SLA garanti',
      tooltip: 'Accord de niveau de service avec temps de réponse garanti.',
      values: [false, false, true],
    },
  ];
</script>

<svelte:head>
  <title>Comparison — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Comparison Table</h1>
    <p>Tableau comparatif de plans tarifaires avec en-tête sticky et mise en avant du plan recommandé.</p>
  </div>

  <section class="variant">
    <h2>Tableau complet — 3 plans</h2>
    <ComparisonSection
      badge="Tarifs"
      title="Choisissez le plan qui vous correspond"
      description="Des formules adaptées à chaque étape de votre croissance. Commencez gratuitement et évoluez selon vos besoins."
      plans={plans}
      features={features}
    />
  </section>
</div>
