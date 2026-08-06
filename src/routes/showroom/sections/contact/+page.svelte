<script lang="ts">
  import '$lib/styles/demo-page.css';
  import ContactSection from '$lib/components/sections/ContactSection.svelte';
  import ContactSectionV2 from '$lib/components/sections/ContactSectionV2.svelte';
  import { Mail, Phone, MapPin } from '@lucide/svelte';

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'bonjour@mycomponents.fr',
      href: 'mailto:bonjour@mycomponents.fr',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+33 1 42 00 00 00',
      href: 'tel:+33142000000',
    },
    {
      icon: MapPin,
      label: 'Adresse',
      value: '42 rue de Rivoli, 75001 Paris',
    },
  ];

  function handleSubmit(data: { name: string; email: string; subject?: string; message: string }) {
    // Simulate API call
    return new Promise<void>((resolve) => setTimeout(resolve, 1000));
  }
</script>

<svelte:head>
  <title>Contact — Sections — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Contact</h1>
    <p>Section de contact avec formulaire intégré, gestion du chargement et confirmation d'envoi.</p>
  </div>

  <section class="variant">
    <h2>Disposition en deux colonnes (split)</h2>
    <ContactSection      title="Une question ? Parlons-en."
      description="Notre équipe est disponible du lundi au vendredi, de 9h à 18h. Nous vous répondrons dans les 24 heures ouvrées."
      info={contactInfo}
      onsubmit={handleSubmit}
      variant="split"
    />
  </section>

  <section class="variant">
    <h2>Disposition centrée</h2>
    <ContactSection      title="Contactez notre équipe"
      description="Vous avez une question, un retour ou une demande spécifique ? Remplissez ce formulaire et nous vous répondrons rapidement."
      onsubmit={handleSubmit}
      variant="centered"
    />
  </section>

  <section class="variant">
    <h2>V2 — Avec carte Google Maps</h2>
    <ContactSectionV2
      badge="Nous trouver"
      title="Venez nous rendre visite."
      description="Notre équipe est disponible du lundi au vendredi, de 9h à 18h. Nous vous répondrons dans les 24 heures ouvrées."
      info={contactInfo}
      onsubmit={handleSubmit}
      mapSrc="https://maps.google.com/maps?q=42+rue+de+Rivoli+75001+Paris&output=embed&hl=fr&z=15"
      mapLabel="42 rue de Rivoli, Paris"
    />
  </section>
</div>
