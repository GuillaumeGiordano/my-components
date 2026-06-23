<script lang="ts">
  import "$lib/styles/demo-page.css";
  import SectionNavDock from "$lib/components/ui/SectionNavDock.svelte";
  import FloatingGroup from "$lib/FloatingGroup.svelte";
  import { Home, CalendarCheck, FileText, Sparkles, HelpCircle, Mail } from "@lucide/svelte";

  const sections = [
    { label: "Accueil", href: "#nd-home", icon: Home },
    { label: "Méthode", href: "#nd-method", icon: CalendarCheck },
    { label: "Devis", href: "#nd-quote", icon: FileText },
    { label: "Services", href: "#nd-services", icon: Sparkles },
    { label: "FAQ", href: "#nd-faq", icon: HelpCircle },
    { label: "Contact", href: "#nd-contact", icon: Mail },
  ];

  const demoParts = [
    { id: "nd-home", h: "Accueil", t: "Survolez un cercle : un tooltip sombre glisse vers l'intérieur." },
    { id: "nd-method", h: "Méthode", t: "Cliquez un cercle pour défiler jusqu'à la section." },
    { id: "nd-quote", h: "Devis", t: "Ou attrapez le palet coloré et déposez-le sur la cible." },
    { id: "nd-services", h: "Services", t: "Le palet suit la section active au scroll." },
    { id: "nd-faq", h: "FAQ", t: "Au clavier : focus le palet puis ↑ / ↓." },
    { id: "nd-contact", h: "Contact", t: "Le dock est placé via <FloatingGroup>." },
  ];
</script>

<svelte:head>
  <title>Section Nav Dock — UI — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Section Nav Dock</h1>
    <p>
      Cercles d'icônes avec tooltip au survol. Naviguez par <strong>clic</strong>, ou en
      <strong>glissant le palet</strong> (couleur primary) sur la section cible. Le palet
      suit la section active au défilement.
    </p>
  </div>

  {#each demoParts as { id, h, t } (id)}
    <section class="variant demo-section" {id}>
      <h2>{h}</h2>
      <p class="filler">{t}</p>
    </section>
  {/each}
</div>

<FloatingGroup position="right-edge">
  <SectionNavDock {sections} side="right" />
</FloatingGroup>

<style>
  .demo-section {
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .filler {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.7;
  }
</style>
