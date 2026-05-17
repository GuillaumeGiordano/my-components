<script lang="ts">
  import NewsletterSection from '$lib/components/sections/NewsletterSection.svelte';
  import '$lib/styles/demo-page.css';
</script>

<svelte:head>
  <title>Newsletter — Sections</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Newsletter</h1>
    <p>Formulaire d'inscription à une newsletter avec validation côté client et état de succès animé. Deux variantes : default (centré) et card (encadré).</p>
  </div>

  <NewsletterSection
    variant="default"
    badge="Newsletter"
    title="Restez au courant des dernières nouveautés"
    description="Chaque semaine, recevez nos meilleurs conseils en design système, développement Svelte et expérience développeur. Pas de spam — désabonnement en un clic."
    placeholder="votre@email.com"
    ctaLabel="S'abonner"
    hint="Plus de 3 000 développeurs et designers sont déjà abonnés."
  />

  <NewsletterSection
    variant="card"
    badge="Ressources gratuites"
    title="Obtenez le guide complet"
    description="Inscrivez-vous et recevez immédiatement notre guide de 40 pages sur les design tokens et l'accessibilité en Svelte."
    placeholder="votre@email.com"
    ctaLabel="Recevoir le guide"
    hint="Votre adresse e-mail ne sera jamais partagée ni revendue."
  />
</div>
