<script>
  import ComponentPreview from "$lib/ComponentPreview.svelte";
  import NavbarMenu from "$lib/components/layout/NavbarMenu.svelte";
  import FloatingGroup from "$lib/FloatingGroup.svelte";
  import {
    AppWindow,
    CalendarCheck,
    HelpCircle,
    Home,
    Image,
    LayoutGrid,
    Mail,
    Monitor,
    ShoppingCart,
    Sparkles,
  } from "@lucide/svelte";

  const navItems = [
    {
      link: "/g2webdev",
      label: "Accueil",
      icon: Home,
      section: [
        { icon: Home, label: "Accueil", href: "#hero" },
        { icon: CalendarCheck, label: "Méthode", href: "#process" },
        { icon: Sparkles, label: "Services", href: "#features" },
        { icon: HelpCircle, label: "FAQ", href: "#faq" },
        { icon: Mail, label: "Contact", href: "#contact" },
      ],
    },
    {
      link: "/g2webdev/offres",
      label: "Offres",
      icon: LayoutGrid,
      section: [
        { icon: Monitor, label: "Site vitrine", href: "#site-vitrine" },
        { icon: Image, label: "Portfolio", href: "#portfolio" },
        { icon: ShoppingCart, label: "E-commerce", href: "#e-commerce" },
        { icon: AppWindow, label: "Application web", href: "#application-web" },
      ],
    },
  ];
</script>

<ComponentPreview>
  <section id="hero" class="section-test">Accueil</section>
  <section id="process" class="section-test">Méthode</section>
  <section id="features" class="section-test">Services</section>
  <section id="faq" class="section-test">FAQ</section>
  <section id="contact" class="section-test">Contact</section>

  <FloatingGroup position="right">
    <NavbarMenu side="right" {navItems} />
  </FloatingGroup>
</ComponentPreview>

<style lang="scss">
  .section-test {
    height: 900px;
  }
</style>
