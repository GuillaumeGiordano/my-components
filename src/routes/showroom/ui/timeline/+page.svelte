<script lang="ts">
  import '$lib/styles/demo-page.css';
  import Timeline from '$lib/components/ui/Timeline.svelte';
  import { Rocket, CheckCircle, AlertTriangle, Code2, Package } from '@lucide/svelte';
</script>

<svelte:head><title>Timeline — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Timeline</h1>
    <p>Historique chronologique vertical — icônes et variantes de couleur.</p>
  </div>

  <section class="variant">
    <h2>Changelog produit</h2>
    <div style="max-width: 560px;">
      <Timeline items={[
        {
          title: 'v2.0 — Refonte majeure',
          description: "Nouveau moteur de rendu, performances améliorées de 40%, interface repensée de fond en comble.",
          date: 'Mai 2025',
          icon: Rocket,
          variant: 'primary',
        },
        {
          title: 'v1.8 — Intégrations',
          description: "Ajout des connecteurs Slack, GitHub et Notion. API publique disponible.",
          date: 'Mars 2025',
          icon: Package,
          variant: 'success',
        },
        {
          title: 'v1.5 — Correctif critique',
          description: "Correction d'une faille de sécurité dans le module d'authentification.",
          date: 'Jan. 2025',
          icon: AlertTriangle,
          variant: 'warning',
        },
        {
          title: 'v1.0 — Lancement',
          description: "Première version publique de la plateforme.",
          date: 'Oct. 2024',
          icon: CheckCircle,
          variant: 'success',
        },
      ]} />
    </div>
  </section>

  <section class="variant">
    <h2>Activité utilisateur (sans icône)</h2>
    <div style="max-width: 500px;">
      <Timeline items={[
        { title: 'Déploiement en production', description: 'Branche main → production. 0 erreur.', date: "Aujourd'hui 14:32" },
        { title: 'Pull request mergée', description: 'feat: add dark mode — 12 fichiers modifiés.', date: "Aujourd'hui 13:15" },
        { title: 'Review approuvée', description: 'Marcus Pereira a approuvé vos changements.', date: "Aujourd'hui 11:02", variant: 'success' },
        { title: 'Tests échoués', description: "4 tests unitaires ont échoué sur la CI.", date: "Aujourd'hui 10:47", variant: 'danger' },
        { title: 'Branche créée', description: 'feature/dark-mode créée depuis main.', date: 'Hier 17:30' },
      ]} />
    </div>
  </section>
</div>
