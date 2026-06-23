<script lang="ts">
  import Button from "$lib/components/buttons/Button.svelte";
  import LogoGG from "$lib/components/logo/LogoGG.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import HeroSection from "$lib/components/sections/HeroSection.svelte";
  import FeaturesSection from "$lib/components/sections/FeaturesSection.svelte";
  import ChecklistSection from "$lib/components/sections/ChecklistSection.svelte";
  import FAQSection from "$lib/components/sections/FAQSection.svelte";
  import CTABannerSection from "$lib/components/sections/CTABannerSection.svelte";
  import ParticleBackground from "$lib/components/ui/ParticleBackground.svelte";
  import {
    Home,
    Sparkles,
    ListChecks,
    HelpCircle,
    Images,
    Maximize2,
    Filter,
    Gauge,
    Share2,
    Palette,
  } from "@lucide/svelte";

  const navItems = [
    { icon: Home, label: "Accueil", href: "/g2webdev" },
    { icon: Sparkles, label: "Atouts", href: "#atouts" },
    { icon: ListChecks, label: "Inclus", href: "#inclus" },
    { icon: HelpCircle, label: "FAQ", href: "#faq" },
  ];

  const faqs = [
    {
      question: "Le portfolio est-il adapté aux photographes et créatifs ?",
      answer:
        "Absolument. La galerie met vos visuels en valeur avec une lightbox plein écran, des transitions soignées et un chargement optimisé pour préserver la qualité d'image.",
    },
    {
      question: "Pourrai-je ajouter de nouvelles réalisations moi-même ?",
      answer:
        "Oui. Nous pouvons intégrer une gestion de contenu simple pour ajouter projets, images et descriptions en autonomie, avec une formation à la livraison.",
    },
    {
      question: "Peut-on filtrer les projets par catégorie ?",
      answer:
        "Oui, des filtres par catégorie ou par tag peuvent être ajoutés pour aider vos visiteurs à parcourir vos réalisations rapidement.",
    },
    {
      question: "Les images seront-elles optimisées ?",
      answer:
        "Oui. Compression intelligente, formats modernes (WebP/AVIF) et chargement progressif garantissent rapidité sans sacrifier la qualité.",
    },
  ];
</script>

<svelte:head>
  <title>Portfolio & galerie en ligne — G2 Webdev</title>
  <meta
    name="description"
    content="Mettez vos réalisations en valeur dans une galerie soignée, responsive et rapide, avec lightbox et filtres par catégorie."
  />
</svelte:head>

<Navbar items={navItems} spy>
  {#snippet brand()}
    <LogoGG width={36} height={36} open={false} />
  {/snippet}
  {#snippet actionBtn()}
    <Button size="sm" variant="primary" href="/g2webdev#contact">Demander un devis</Button>
  {/snippet}
</Navbar>

<ParticleBackground>
  <HeroSection
    id="presentation"
    title="Un portfolio qui met vos réalisations en lumière"
    highlight="en lumière"
    description="Mettez vos projets en valeur dans une galerie élégante et entièrement responsive. Lightbox plein écran, filtres par catégorie et images ultra-optimisées : vos créations parlent d'elles-mêmes."
    primaryCta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
    secondaryCta={{ label: "Retour à l'accueil", href: "/g2webdev" }}
    align="center"
  />
</ParticleBackground>

<FeaturesSection
  id="atouts"
  title="Une vitrine à la hauteur de votre travail"
  description="Un écrin soigné, pensé pour valoriser vos visuels et donner envie de vous contacter."
  columns={3}
  features={[
    {
      icon: Images,
      title: "Galerie responsive",
      description:
        "Une grille élégante qui s'adapte à tous les écrans et sublime vos visuels.",
    },
    {
      icon: Maximize2,
      title: "Lightbox plein écran",
      description:
        "Vos images en grand, avec navigation au clavier et au doigt, sans quitter la page.",
    },
    {
      icon: Filter,
      title: "Filtres par catégorie",
      description:
        "Vos visiteurs parcourent vos réalisations par thème ou type de projet en un clic.",
    },
    {
      icon: Gauge,
      title: "Images optimisées",
      description:
        "Formats modernes et chargement progressif pour la vitesse, sans perte de qualité.",
    },
    {
      icon: Palette,
      title: "Design sur mesure",
      description:
        "Une mise en page unique, accordée à votre univers créatif et à votre identité.",
    },
    {
      icon: Share2,
      title: "Partage & réseaux",
      description:
        "Liens vers vos réseaux et partage facile de vos projets pour étendre votre portée.",
    },
  ]}
/>

<ChecklistSection
  id="inclus"
  title="Ce qui est inclus"
  description="Tout le nécessaire pour un portfolio professionnel et évolutif."
  withBackground="bg-base"
  columns={2}
  items={[
    { label: "Galerie responsive avec lightbox" },
    { label: "Filtres par catégorie / tag" },
    { label: "Optimisation des images (WebP/AVIF)" },
    { label: "Page contact & liens réseaux" },
    { label: "Référencement naturel de base" },
    { label: "Nom de domaine + hébergement (1ʳᵉ année)" },
    { label: "Gestion de contenu pour ajouter des projets" },
    { label: "Code source livré, 100 % à vous" },
  ]}
/>

<CTABannerSection
  title="Donnez à vos créations la vitrine qu'elles méritent"
  description="Recevez un devis gratuit et sans engagement sous 48h. Parlons de votre portfolio."
  primaryCta={{ label: "Demander un devis gratuit", href: "/g2webdev#contact" }}
/>

<FAQSection
  id="faq"
  title="Questions fréquentes"
  description="Les réponses aux questions les plus posées sur le portfolio."
  withBackground="bg-base"
  columns={2}
  {faqs}
/>

<Footer
  tagline="Agence web dans le Var, création de sites sur mesure."
  columns={[
    {
      heading: "Offres",
      links: [
        { label: "Site vitrine", href: "/g2webdev/site-vitrine" },
        { label: "Portfolio", href: "/g2webdev/portfolio" },
        { label: "E-commerce", href: "/g2webdev/e-commerce" },
        { label: "Application web", href: "/g2webdev/application-web" },
      ],
    },
    {
      heading: "Navigation",
      links: [
        { label: "Accueil", href: "/g2webdev" },
        { label: "Méthode", href: "/g2webdev#process" },
        { label: "Contact", href: "/g2webdev#contact" },
      ],
    },
  ]}
  copyright={`© ${new Date().getFullYear()} G2 Webdev. Tous droits réservés.`}
>
  {#snippet brand()}
    <LogoGG width={32} height={32} open={true} />
  {/snippet}
</Footer>

<style>
  :global(#presentation),
  :global(#atouts),
  :global(#inclus),
  :global(#faq) {
    scroll-margin-top: var(--header-height);
  }
</style>
