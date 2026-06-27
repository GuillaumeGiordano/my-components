<script lang="ts">
  import '$lib/styles/demo-page.css';
  import DownloadSection from '$lib/components/sections/DownloadSection.svelte';
  import { Smartphone, Globe } from '@lucide/svelte';
</script>

<svelte:head>
  <title>Download — Sections — My Components</title>
</svelte:head>

{#snippet phoneMockup()}
  <div class="phone-wrap">
    <div class="phone">
      <div class="phone-notch"></div>
      <div class="phone-screen">
        <div class="screen-header">
          <div class="screen-dot"></div>
          <div class="screen-title">Flōw</div>
        </div>
        <div class="screen-card"></div>
        <div class="screen-card small"></div>
        <div class="screen-card small"></div>
      </div>
      <div class="phone-home"></div>
    </div>
  </div>
{/snippet}

{#snippet phoneMockupSplit()}
  <div class="phone-wrap large">
    <div class="phone">
      <div class="phone-notch"></div>
      <div class="phone-screen">
        <div class="screen-header">
          <div class="screen-dot"></div>
          <div class="screen-title">Flōw</div>
        </div>
        <div class="screen-card"></div>
        <div class="screen-card small"></div>
        <div class="screen-card small"></div>
      </div>
      <div class="phone-home"></div>
    </div>
  </div>
{/snippet}

<div class="page">
  <div class="page-header">
    <h1>DownloadSection</h1>
    <p>Section téléchargement avec boutons de stores stylisés, statistiques et visuel optionnel.</p>
  </div>

  <section class="variant">
    <h2>Centré — iOS, Android et Web avec stats</h2>
    <DownloadSection
      badge="Disponible partout"
      title="Flōw dans votre poche, sur tous vos appareils"
      description="Téléchargez l'application Flōw et accédez à vos projets, notifications et tableaux de bord où que vous soyez."
      stores={[
        { platform: 'ios', label: 'App Store', sublabel: "Disponible sur l'", href: '#', icon: Smartphone },
        { platform: 'android', label: 'Google Play', sublabel: 'Disponible sur', href: '#', icon: Smartphone },
        { platform: 'web', label: 'Application web', sublabel: "Accéder à l'", href: '#', icon: Globe },
      ]}
      stats={[
        { value: '4.9', label: 'Note moyenne' },
        { value: '50k+', label: 'Téléchargements' },
        { value: '100+', label: 'Pays' },
      ]}
      visual={phoneMockup}
      align="center"
    />
  </section>

  <section class="variant">
    <h2>Split — texte + visuel</h2>
    <DownloadSection
      badge="Application mobile"
      title="Restez connecté à votre équipe"
      description="Recevez des notifications en temps réel, approuvez des tâches et commentez des projets directement depuis votre smartphone."
      stores={[
        { platform: 'ios', label: 'App Store', sublabel: "Télécharger sur l'", href: '#', icon: Smartphone },
        { platform: 'android', label: 'Google Play', sublabel: 'Télécharger sur', href: '#', icon: Smartphone },
      ]}
      stats={[
        { value: '4.8', label: 'Score App Store' },
        { value: '20k+', label: 'Avis clients' },
      ]}
      visual={phoneMockupSplit}
      align="split"
    />
  </section>
</div>

<style>
  .phone-wrap {
    display: flex;
    justify-content: center;
    padding: 16px 0;
  }

  .phone-wrap.large .phone {
    width: 220px;
    height: 440px;
  }

  .phone {
    width: 180px;
    height: 360px;
    background: #1a1a2e;
    border-radius: 32px;
    box-shadow: 0 0 0 2px #2d2d4e, 0 24px 64px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 8px 16px;
    overflow: hidden;
  }

  .phone-notch {
    width: 60px;
    height: 14px;
    background: #0f0f1a;
    border-radius: 0 0 10px 10px;
    margin-bottom: 8px;
    flex-shrink: 0;
  }

  .phone-screen {
    flex: 1;
    width: 100%;
    background: #f8fafc;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px;
  }

  .screen-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 2px;
  }

  .screen-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
  }

  .screen-title { font-size: 11px; font-weight: 700; color: #1e1b4b; }
  .screen-card { height: 48px; border-radius: 8px; background: #e2e8f0; }
  .screen-card.small { height: 32px; }

  .phone-home {
    width: 40px;
    height: 4px;
    background: #3d3d5c;
    border-radius: 2px;
    margin-top: 10px;
    flex-shrink: 0;
  }
</style>
