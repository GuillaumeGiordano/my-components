<script lang="ts">
  import ComponentPreview from "$lib/ComponentPreview.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import NavbarMobile from "$lib/components/layout/NavbarMobile.svelte";
  import ButtonActionItem from "$lib/components/ui/ButtonActionItem.svelte";
  import { Home, Search, Bell, User, Settings, HelpCircle, LogOut } from "@lucide/svelte";
  import "$lib/styles/demo-page.css";

  const links = [
    { label: "Accueil", href: "/" },
    { label: "Composants", href: "/ui" },
    { label: "Documentation", href: "/docs" },
  ];

  const mobileItems = [
    { icon: Home, label: "Accueil", href: "/" },
    { icon: Search, label: "Rechercher", href: "/search" },
    { icon: Bell, label: "Notifs", href: "/notifications" },
    { icon: User, label: "Profil", href: "/profile" },
  ];
</script>

<svelte:head><title>NavbarMobile — UI — My Components</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1>NavbarMobile</h1>
    <p>
      Navbar desktop en haut sur grands écrans, barre de navigation fixée en bas sur
      mobile. Utilisez les boutons <strong>Mobile</strong> / <strong>Desktop</strong> pour
      simuler les deux modes.
    </p>
  </div>

  <section class="variant">
    <h2>Responsive</h2>
    <ComponentPreview>
      <div class="responsive-wrapper">
        <div class="show-desktop">
          <Navbar {links} ctaLabel="Démarrer">
            {#snippet brand()}
              <span class="brand">MyApp</span>
            {/snippet}
          </Navbar>
        </div>

        <div class="show-mobile">
          <NavbarMobile fixed={false} items={mobileItems}>
            {#snippet moreItems(close)}
              <ButtonActionItem label="Paramètres" icon={Settings} onclick={close} />
              <ButtonActionItem label="Aide" icon={HelpCircle} onclick={close} />
              <ButtonActionItem
                label="Déconnexion"
                icon={LogOut}
                variant="danger"
                onclick={close}
              />
            {/snippet}
          </NavbarMobile>
        </div>
      </div>
    </ComponentPreview>
  </section>
</div>

<style>
  .brand {
    font-size: 17px;
    font-weight: 700;
    color: var(--text-heading);
  }

  /* ---- Responsive switching via container queries ---- */
  .responsive-wrapper {
    min-height: 64px;
  }

  .show-mobile {
    display: none;
  }

  @container (max-width: 640px) {
    .show-desktop {
      display: none;
    }
    .show-mobile {
      display: block;
    }
  }
</style>
