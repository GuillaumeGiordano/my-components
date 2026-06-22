<script lang="ts">
  import Button from "$lib/components/buttons/Button.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import LogoGG from "$lib/components/logo/LogoGG.svelte";
  import ContactSection from "$lib/components/sections/ContactSection.svelte";
  import CTABannerSection from "$lib/components/sections/CTABannerSection.svelte";
  import FAQSection from "$lib/components/sections/FAQSection.svelte";
  import FeaturesSection from "$lib/components/sections/FeaturesSection.svelte";
  import ProcessSection from "$lib/components/sections/ProcessSection.svelte";
  import StatsSection from "$lib/components/sections/StatsSection.svelte";
  import Chatbot from "$lib/components/ui/Chatbot.svelte";
  import ParticleBackground from "$lib/components/ui/ParticleBackground.svelte";
  import Tilt3D from "$lib/components/ui/Tilt3D.svelte";
  import FloatingGroup from "$lib/FloatingGroup.svelte";
  import HeroSection from "$lib/components/sections/HeroSection.svelte";
  import {
    Home,
    FileText,
    Settings,
    Users,
    Rocket,
    Sparkles,
    BarChart2,
    Monitor,
    Image,
    ShoppingCart,
    AppWindow,
    CalendarCheck,
    HelpCircle,
    Mail,
  } from "@lucide/svelte";

  import knowledge from "./knowledge.json";
  import ScrollOverSection from "$lib/components/sections/ScrollOverSection.svelte";

  // Navbar items — anchors match each section's `id`; scroll spy is handled by <Navbar spy>
  const navItems = [
    { icon: Home, label: "Accueil", href: "#hero" },
    { icon: BarChart2, label: "Chiffres", href: "#stats" },
    { icon: CalendarCheck, label: "Méthode", href: "#process" },
    { icon: FileText, label: "Devis", href: "#cta-banner" },
    { icon: Sparkles, label: "Services", href: "#features" },
    { icon: HelpCircle, label: "FAQ", href: "#faq" },
    { icon: Mail, label: "Contact", href: "#contact" },
  ];

  function handleSubmit(data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) {
    // Simulate API call
    return new Promise<void>((resolve) => setTimeout(resolve, 1000));
  }

  const faqs = [
    {
      question: "Combien coûte un site web sur mesure ?",
      answer:
        "Nos tarifs sont établis sur devis selon la complexité du projet. Chaque projet étant unique, nous privilégions une tarification transparente adaptée à votre budget. Nous fournissons systématiquement un devis détaillé et gratuit avant tout engagement.",
    },
    {
      question: "Quels sont les délais de réalisation ?",
      answer:
        "Comptez 1 semaine pour une landing page, 2 à 4 semaines pour un site vitrine et 4 à 12 semaines pour une application web, selon la complexité. Les délais sont définis conjointement au démarrage du projet.",
    },
    {
      question: "Utilisez-vous des templates ou tout est sur mesure ?",
      answer:
        "Tout est développé sur mesure avec SvelteKit et TypeScript. Nous nous appuyons sur notre bibliothèque de composants maison (@guillaumeg/ui) qui permet de livrer vite sans sacrifier la qualité ni la flexibilité.",
    },
    {
      question: "Proposez-vous la maintenance après livraison ?",
      answer:
        "Oui. Nous proposons des contrats de maintenance incluant les mises à jour de sécurité, la surveillance des dépendances et la correction des bugs signalés.",
    },
    {
      question: "Quelles technologies utilisez-vous ?",
      answer:
        "Nous travaillons principalement avec SvelteKit, TypeScript, Tailwind CSS et Node.js. Nous utilisons également notre propre bibliothèque de composants UI (@guillaumeg/ui) pour accélérer le développement.",
    },
    {
      question: "Comment se déroule une collaboration à distance ?",
      answer:
        "Échanges par email et visio (Google Meet). Suivi de projet via Linear ou Notion. Chaque livraison intermédiaire dispose d'une URL de preview Vercel pour validation avant mise en production.",
    },
    {
      question: "Le référencement (SEO) est-il inclus ?",
      answer:
        "Oui. Chaque site est livré avec les bases du référencement naturel : balises méta, données structurées, sitemap, performances optimisées et version mobile soignée. Un accompagnement SEO plus poussé peut être ajouté selon vos objectifs.",
    },
    {
      question: "Mon site sera-t-il adapté aux mobiles ?",
      answer:
        'Absolument. Tous les projets sont développés en "mobile-first" et testés sur smartphones, tablettes et ordinateurs afin d\'offrir une expérience fluide sur tous les écrans.',
    },
    {
      question: "À qui appartient le site une fois livré ?",
      answer:
        "Le site vous appartient à 100 %. Vous recevez l'intégralité du code source et les accès (hébergement, nom de domaine, dépôt Git). Aucune dépendance à un abonnement propriétaire.",
    },
    {
      question: "Gérez-vous le nom de domaine et l'hébergement ?",
      answer:
        "Oui, nous pouvons prendre en charge l'achat du nom de domaine, la configuration de l'hébergement et la mise en ligne. Vous restez propriétaire de tous les comptes et accès.",
    },
    {
      question: "Pouvez-vous reprendre un site existant ?",
      answer:
        "Oui. Nous réalisons des refontes de sites existants : modernisation du design, amélioration des performances et du référencement, ou migration vers une technologie plus récente.",
    },
    {
      question: "Proposez-vous une formation pour gérer mon site ?",
      answer:
        "Oui. À la livraison, nous vous formons à l'utilisation de votre site (mise à jour des contenus, ajout de pages, gestion des images). Un guide écrit ou une session visio peut être inclus selon vos besoins.",
    },
  ];
</script>

<svelte:head>
  <title>G2 Webdev</title>
</svelte:head>

<Navbar items={navItems} spy>
  {#snippet brand()}
    <LogoGG width={28} height={28} open={false} />
  {/snippet}

  {#snippet actionBtn()}
    <Button size="sm" variant="primary" href="#">Commencer</Button>
  {/snippet}
</Navbar>

<ScrollOverSection>
  {#snippet background()}
    <ParticleBackground />
  {/snippet}

  <HeroSection
    id="hero"
    title="Agence web dans le Var, création de sites sur mesure"
    highlight="création de sites"
    description="G2 Webdev conçoit des sites internet modernes, rapides et optimisés pour le référencement (SEO), et accompagne les entreprises, artisans et indépendants du Var dans leur croissance digitale. Une question ? Notre agent IA vous répond à tout moment, directement sur le site."
    primaryCta={{ label: "Comment ca marche ?", href: "#" }}
    secondaryCta={{ label: "Nous contacter", href: "#" }}
    align="left"
  >
    {#snippet visual()}
      <div class="demo">
        <Tilt3D>
          <div class="card card--vitrine">
            <div class="card-header">
              <div class="card-icon"><Monitor size={22} /></div>
              <span class="card-tag">Le plus demandé</span>
            </div>
            <h3>Site vitrine</h3>
            <p>
              Présentez votre activité avec un site élégant, rapide et pensé pour
              convertir vos visiteurs.
            </p>
            <Button variant="primary" size="sm" href="#">En savoir plus</Button>
          </div>
        </Tilt3D>

        <Tilt3D>
          <div class="card card--portfolio">
            <div class="card-header">
              <div class="card-icon"><Image size={22} /></div>
              <span class="card-tag">Créatifs</span>
            </div>
            <h3>Portfolio</h3>
            <p>
              Mettez vos réalisations en valeur dans une galerie soignée et entièrement
              responsive.
            </p>
            <Button variant="primary" size="sm" href="#">En savoir plus</Button>
          </div>
        </Tilt3D>

        <Tilt3D>
          <div class="card card--ecom">
            <div class="card-header">
              <div class="card-icon"><ShoppingCart size={22} /></div>
              <span class="card-tag">Vente en ligne</span>
            </div>
            <h3>E-commerce</h3>
            <p>
              Une boutique sécurisée et performante pour vendre vos produits partout,
              24h/24.
            </p>
            <Button variant="primary" size="sm" href="#">En savoir plus</Button>
          </div>
        </Tilt3D>

        <Tilt3D>
          <div class="card card--app">
            <div class="card-header">
              <div class="card-icon"><AppWindow size={22} /></div>
              <span class="card-tag">Sur mesure</span>
            </div>
            <h3>Application web</h3>
            <p>
              Des outils métier sur mesure, accessibles partout et taillés pour votre
              organisation.
            </p>
            <Button variant="primary" size="sm" href="#">En savoir plus</Button>
          </div>
        </Tilt3D>
      </div>
    {/snippet}
  </HeroSection>

  <StatsSection
    id="stats"
    withBackground="bg-base"
    stats={[
      {
        value: "4",
        suffix: "+",
        label: "Années d'expérience",
        description: "en développement web professionnel",
      },
      {
        value: "1",
        suffix: ".",
        label: "Interlocuteur unique",
        description: "du devis à la mise en ligne",
      },
      {
        value: "48",
        suffix: "h",
        label: "Délai de réponse",
        description: "garanti en jours ouvrés",
      },
      {
        value: "100",
        suffix: "%",
        label: "Sur-mesure et flexible",
        description: "aucun site sous template revendu",
      },
    ]}
  />

  <ProcessSection
    id="process"
    title="Votre projet, étape par étape"
    description="De l'écoute de votre besoin à la mise en ligne, nous vous accompagnons à chaque étape de votre projet web."
    steps={[
      {
        icon: CalendarCheck,
        title: "Prendre rendez-vous",
        description:
          "Réservez un premier échange, en visio ou sur place, pour nous présenter votre projet.",
        badge: "Gratuit",
        cta: { label: "Prendre rendez-vous", href: "#contact" },
      },
      {
        icon: FileText,
        title: "Atelier d'expression du besoin, 20 min",
        description:
          "Un échange pour comprendre vos objectifs, vos cibles et vos contraintes, et définir ensemble le périmètre du projet.",
        badge: "Offert",
        cta: {
          label: "En savoir plus",
          href: "/g2webdev/atelier-expression-du-besoin",
        },
      },
      {
        icon: Sparkles,
        title: "Conception, design & développement",
        description:
          "Maquettes, identité visuelle puis développement de votre site, validés avec vous à chaque étape.",
      },
      {
        icon: Rocket,
        title: "Mise en ligne",
        description:
          "Tests sur tous les écrans, mise en ligne et optimisation pour le référencement (SEO).",
      },
      {
        icon: Settings,
        title: "Maintenance & suivi",
        description:
          "Mises à jour, sauvegardes et conseils pour faire évoluer votre site au rythme de votre activité.",
      },
    ]}
    layout="vertical"
  />

  <CTABannerSection
    id="cta-banner"
    title="Votre projet web à partir de 490€"
    description="Recevez un devis gratuit et sans engagement sous 48h. Parlons de votre projet et obtenez une estimation claire et adaptée à vos besoins."
    withBackground="bg-base"
    primaryCta={{ label: "Demander un devis gratuit", href: "#contact" }}
  />

  <FeaturesSection
    id="features"
    title="Tout ce dont votre équipe a besoin"
    description="Une plateforme pensée pour les équipes modernes : rapide, sécurisée et facile à intégrer dans vos workflows existants."
    columns={3}
    features={[
      {
        icon: BarChart2,
        title: "SEO",
        description:
          "Optimisation technique et éditoriale pour améliorer votre visibilité sur Google et attirer un trafic qualifié durable.",
      },
      {
        icon: Rocket,
        title: "Déploiement sur VM",
        description:
          "Mise en production sur serveur dédié ou VM, configurée, sécurisée et prête à monter en charge selon votre activité.",
      },
      {
        icon: Settings,
        title: "Maintenance",
        description:
          "Mises à jour, sauvegardes et surveillance continue pour garder votre site rapide, sécurisé et toujours disponible.",
      },
      {
        icon: Users,
        title: "Accompagnement digital",
        description:
          "Conseil et suivi personnalisés pour définir votre stratégie en ligne et faire évoluer vos outils au rythme de votre croissance.",
      },
      {
        icon: FileText,
        title: "Atelier d'expression du besoin",
        description:
          "Une séance de cadrage pour clarifier vos objectifs, vos cibles et vos fonctionnalités avant de lancer le projet.",
        badge: "Offert",
      },
      {
        icon: Sparkles,
        title: "Refonte site internet",
        description:
          "Modernisation complète de votre site existant : design actuel, performances optimisées et expérience mobile irréprochable.",
      },
    ]}
  />

  <FAQSection
    id="faq"
    title="Questions fréquentes"
    description="Vous ne trouvez pas la réponse ? Contactez-moi, je réponds en moins de 24 heures."
    columns={2}
    {faqs}
  />

  <ContactSection
    id="contact"
    title="Contactez notre équipe"
    description="Vous avez une question, un retour ou une demande spécifique ? Remplissez ce formulaire et nous vous répondrons rapidement."
    onsubmit={handleSubmit}
    variant="centered"
  />
</ScrollOverSection>

<FloatingGroup position="bottom-right">
  <Chatbot
    {knowledge}
    title="G2webdev — Assistant"
    initialMessage="Bonjour ! Je peux vous renseigner sur G2webdev et les composants de la bibliothèque. Comment puis-je vous aider ?"
  />
</FloatingGroup>

<style lang="scss">
  /* Offset anchor targets so they land below the sticky navbar */
  :global(#hero),
  :global(#stats),
  :global(#process),
  :global(#cta-banner),
  :global(#features),
  :global(#faq),
  :global(#contact) {
    scroll-margin-top: calc(var(--header-height) + 3rem);
  }

  .demo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 24px;
  }

  .card {
    --accent: var(--primary);
    position: relative;
    padding: 24px;
    border-radius: 12px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-top: 3px solid var(--accent);
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 8px;

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .card--vitrine {
    --accent: var(--primary);
  }
  .card--portfolio {
    --accent: #8b5cf6;
  }
  .card--ecom {
    --accent: #22c55e;
  }
  .card--app {
    --accent: #f59e0b;
  }
  .card-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    color: var(--accent);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-tag {
    align-self: flex-start;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 12%, transparent);
  }
  .card h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 700;
    color: var(--text-heading);
  }
  .card p {
    margin: 0;
    font-size: 12px;
    color: var(--text-muted);
    line-height: 1.4;
  }
</style>
