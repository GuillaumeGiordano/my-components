<script lang="ts">
  import FAQSection from '$lib/components/sections/FAQSection.svelte';
  import '$lib/styles/demo-page.css';
</script>

<svelte:head>
  <title>FAQ — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>FAQ</h1>
    <p>Section de questions fréquentes basée sur le composant Collapse. Disponible en une ou deux colonnes.</p>
  </div>

  <FAQSection    title="Questions fréquentes"
    description="Vous ne trouvez pas la réponse ? Contactez notre équipe, nous répondons en moins de 24 heures."
    columns={2}
    faqs={[
      {
        question: 'Puis-je essayer la plateforme gratuitement ?',
        answer: 'Oui, le plan Starter est entièrement gratuit et sans limite de durée. Vous pouvez créer jusqu\'à 3 projets et inviter 2 membres sans renseigner de carte bancaire.',
      },
      {
        question: 'Comment fonctionne la facturation ?',
        answer: 'La facturation est mensuelle ou annuelle (avec 20 % de réduction). Vous pouvez changer de plan ou résilier à tout moment depuis votre espace de gestion.',
      },
      {
        question: 'Mes données sont-elles hébergées en Europe ?',
        answer: 'Par défaut, toutes les données sont stockées dans des centres de données situés en Union Européenne (Frankfurt, Paris). Un hébergement dans d\'autres régions est disponible sur le plan Enterprise.',
      },
      {
        question: 'Proposez-vous un support en français ?',
        answer: 'Oui, notre équipe de support est francophone et disponible du lundi au vendredi de 9h à 18h (CET). Les plans Pro et Enterprise bénéficient d\'un support prioritaire avec un temps de réponse garanti.',
      },
      {
        question: 'Quelles intégrations sont disponibles ?',
        answer: 'Nous proposons des intégrations natives avec Slack, Jira, GitHub, GitLab, Zapier et plus de 50 autres outils. Une API REST et des webhooks sont disponibles pour les intégrations personnalisées.',
      },
      {
        question: 'Comment migrer mes données existantes ?',
        answer: 'Nous fournissons des outils d\'import CSV, JSON et une API de migration. Notre équipe technique vous accompagne gratuitement pour les migrations complexes sur les plans Pro et Enterprise.',
      },
      {
        question: 'La plateforme est-elle conforme au RGPD ?',
        answer: 'Oui, la plateforme est entièrement conforme au RGPD. Nous proposons un DPA (Data Processing Agreement) standard, la gestion des consentements et le droit à l\'oubli sont intégrés nativement.',
      },
      {
        question: 'Puis-je personnaliser l\'interface à mes couleurs ?',
        answer: 'Les plans Pro et Enterprise permettent de personnaliser les couleurs, le logo et le domaine de la plateforme. Un thème sombre est inclus pour tous les plans.',
      },
    ]}
  />
</div>
