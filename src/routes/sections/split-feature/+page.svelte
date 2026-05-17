<script lang="ts">
  import '$lib/styles/demo-page.css';
  import SplitFeatureSection from '$lib/components/sections/SplitFeatureSection.svelte';
</script>

<svelte:head>
  <title>SplitFeature — Sections — My Components</title>
</svelte:head>

{#snippet visuel1()}
  <div class="visual-placeholder gradient-blue">
    <div class="visual-inner">
      <div class="mock-window">
        <div class="mock-bar">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="mock-content">
          <div class="mock-line wide"></div>
          <div class="mock-line medium"></div>
          <div class="mock-line short"></div>
          <div class="mock-avatar-row">
            <div class="mock-avatar"></div>
            <div class="mock-avatar"></div>
            <div class="mock-avatar"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/snippet}

{#snippet visuel2()}
  <div class="visual-placeholder gradient-violet">
    <div class="visual-inner">
      <div class="mock-flow">
        <div class="flow-node source">Déclencheur</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-node action">Condition</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-node result">Action</div>
      </div>
    </div>
  </div>
{/snippet}

{#snippet visuel3()}
  <div class="visual-placeholder gradient-teal">
    <div class="visual-inner">
      <div class="mock-chart">
        <div class="chart-bars">
          <div class="bar" style="height: 40%"></div>
          <div class="bar" style="height: 65%"></div>
          <div class="bar" style="height: 50%"></div>
          <div class="bar" style="height: 80%"></div>
          <div class="bar" style="height: 60%"></div>
          <div class="bar" style="height: 90%"></div>
          <div class="bar" style="height: 70%"></div>
        </div>
        <div class="chart-label">Croissance mensuelle</div>
      </div>
    </div>
  </div>
{/snippet}

<div class="page">
  <div class="page-header">
    <h1>SplitFeature</h1>
    <p>Sections alternant colonnes texte + visuel — idéale pour présenter les fonctionnalités clés.</p>
  </div>

  <SplitFeatureSection
    features={[
      {
        badge: 'Collaboration',
        title: 'Travaillez ensemble, où que vous soyez',
        description: "Synchronisez votre équipe en temps réel grâce à notre espace de travail partagé. Commentez, assignez et validez sans jamais quitter la plateforme.",
        bullets: [
          'Modifications en temps réel avec présence des collaborateurs',
          'Historique complet des versions et retour en arrière en un clic',
          'Permissions granulaires par rôle et par projet',
          "Intégration native avec Slack, Notion et GitHub",
        ],
        cta: { label: 'Découvrir la collaboration', href: '#' },
        visual: visuel1,
      },
      {
        badge: 'Automatisation',
        title: 'Automatisez les tâches répétitives',
        description: "Créez des flux de travail intelligents qui s'adaptent à votre processus. Déclenchez des actions automatiques et générez des rapports sans effort.",
        bullets: [
          "Éditeur de flux visuel sans code requis",
          'Plus de 200 déclencheurs et actions disponibles',
          'Planification et conditions avancées',
          "Journaux d'exécution détaillés pour chaque automatisation",
        ],
        cta: { label: "Explorer les automatisations", href: '#' },
        visual: visuel2,
      },
      {
        badge: 'Analytique',
        title: 'Des insights actionnables à portée de main',
        description: "Suivez vos indicateurs clés en temps réel avec des tableaux de bord personnalisables. Prenez des décisions éclairées grâce à des données fiables.",
        bullets: [
          'Dashboards personnalisables par glisser-déposer',
          'Rapports automatiques envoyés par e-mail chaque semaine',
          'Export en CSV, PDF ou connexion directe à votre BI',
          'Alertes intelligentes sur les anomalies détectées',
        ],
        cta: { label: 'Voir les tableaux de bord', href: '#' },
        visual: visuel3,
      },
    ]}
  />
</div>

<style>
  .visual-placeholder {
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-lg);
    overflow: hidden;
  }

  .gradient-blue { background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%); }
  .gradient-violet { background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 50%, #c4b5fd 100%); }
  .gradient-teal { background: linear-gradient(135deg, #ccfbf1 0%, #99f6e4 50%, #5eead4 100%); }

  .visual-inner {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mock-window {
    width: 100%;
    background: white;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    overflow: hidden;
  }

  .mock-bar {
    background: #f3f4f6;
    padding: 10px 14px;
    display: flex;
    gap: 6px;
    align-items: center;
    border-bottom: 1px solid #e5e7eb;
  }

  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot.red { background: #f87171; }
  .dot.yellow { background: #fbbf24; }
  .dot.green { background: #34d399; }

  .mock-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .mock-line { height: 10px; border-radius: 4px; background: #e5e7eb; }
  .mock-line.wide { width: 90%; }
  .mock-line.medium { width: 65%; }
  .mock-line.short { width: 40%; }

  .mock-avatar-row { display: flex; gap: 8px; margin-top: 4px; }
  .mock-avatar {
    width: 28px; height: 28px; border-radius: 50%;
    background: linear-gradient(135deg, #818cf8, #6366f1);
  }

  .mock-flow { display: flex; flex-direction: column; align-items: center; gap: 8px; }

  .flow-node {
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    color: white;
    min-width: 120px;
    text-align: center;
  }
  .flow-node.source { background: #7c3aed; }
  .flow-node.action { background: #6d28d9; }
  .flow-node.result { background: #5b21b6; }
  .flow-arrow { color: #7c3aed; font-size: 18px; }

  .mock-chart { width: 100%; display: flex; flex-direction: column; gap: 8px; align-items: center; }

  .chart-bars {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 80px;
    padding: 8px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .bar {
    width: 20px;
    border-radius: 4px 4px 0 0;
    background: linear-gradient(180deg, #14b8a6, #0d9488);
  }

  .chart-label { font-size: 12px; font-weight: 600; color: #0d9488; }
</style>
