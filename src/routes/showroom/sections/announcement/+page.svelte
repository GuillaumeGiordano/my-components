<script lang="ts">
  import '$lib/styles/demo-page.css';
  import AnnouncementBar from '$lib/components/sections/AnnouncementBar.svelte';
  import { Megaphone, AlertTriangle, CheckCircle, Sparkles } from '@lucide/svelte';
</script>

<svelte:head>
  <title>AnnouncementBar — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>AnnouncementBar</h1>
    <p>Barre d'annonce persistante ou fixe — 4 variantes avec ou sans CTA.</p>
  </div>

  <section class="variant">
    <h2>Default — avec CTA</h2>
    <div class="bar-demo">
      <AnnouncementBar
        message="Flōw v2.0 est disponible — découvrez les nouvelles fonctionnalités."
        cta={{ label: 'Voir les nouveautés', href: '#' }}
        variant="default"
        fixed={false}
        icon={Megaphone}
      />
    </div>
  </section>

  <section class="variant">
    <h2>Default — sans CTA, non dismissible</h2>
    <div class="bar-demo">
      <AnnouncementBar
        message="Maintenance planifiée le dimanche 25 mai de 2h à 4h (heure de Paris)."
        variant="default"
        fixed={false}
        dismissible={false}
      />
    </div>
  </section>

  <section class="variant">
    <h2>Primary — avec CTA</h2>
    <div class="bar-demo">
      <AnnouncementBar
        message="Offre limitée : 3 mois offerts sur le plan Pro pour toute nouvelle inscription."
        cta={{ label: "Profiter de l'offre", href: '#' }}
        variant="primary"
        fixed={false}
        icon={Sparkles}
      />
    </div>
  </section>

  <section class="variant">
    <h2>Primary — sans CTA</h2>
    <div class="bar-demo">
      <AnnouncementBar
        message="Bienvenue ! Votre période d'essai gratuit de 14 jours a commencé."
        variant="primary"
        fixed={false}
        dismissible={false}
      />
    </div>
  </section>

  <section class="variant">
    <h2>Warning — avec CTA</h2>
    <div class="bar-demo">
      <AnnouncementBar
        message="Votre abonnement expire dans 3 jours. Renouvelez pour ne pas perdre vos données."
        cta={{ label: 'Renouveler maintenant', href: '#' }}
        variant="warning"
        fixed={false}
        icon={AlertTriangle}
      />
    </div>
  </section>

  <section class="variant">
    <h2>Warning — sans CTA</h2>
    <div class="bar-demo">
      <AnnouncementBar
        message="Une mise à jour critique est disponible pour votre espace de travail."
        variant="warning"
        fixed={false}
      />
    </div>
  </section>

  <section class="variant">
    <h2>Success — avec CTA</h2>
    <div class="bar-demo">
      <AnnouncementBar
        message="Votre migration vers Flōw Pro est terminée. Toutes vos données sont sécurisées."
        cta={{ label: 'Explorer les nouvelles options', href: '#' }}
        variant="success"
        fixed={false}
        icon={CheckCircle}
      />
    </div>
  </section>

  <section class="variant">
    <h2>Success — sans CTA, non dismissible</h2>
    <div class="bar-demo">
      <AnnouncementBar
        message="Intégration Slack activée avec succès pour votre espace de travail."
        variant="success"
        fixed={false}
        dismissible={false}
        icon={CheckCircle}
      />
    </div>
  </section>
</div>

<style>
  .bar-demo {
    position: relative;
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 1px solid var(--border);
  }
</style>
