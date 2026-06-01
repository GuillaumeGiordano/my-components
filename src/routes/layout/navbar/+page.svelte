<script lang="ts">
  import ComponentPreview from "$lib/ComponentPreview.svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import Navbar from "$lib/components/layout/Navbar.svelte";
  import LogoGG from "$lib/components/logo/LogoGG.svelte";
  import ButtonAction from "$lib/components/ui/ButtonAction.svelte";
  import ButtonActionItem from "$lib/components/ui/ButtonActionItem.svelte";
  import "$lib/styles/demo-page.css";
  import { Share2, Trash2 } from "@lucide/svelte";

  const links = [
    { label: "Accueil", href: "#" },
    { label: "Produits", href: "#" },
    { label: "Tarifs", href: "#" },
    { label: "À propos", href: "#" },
  ];
</script>

<svelte:head>
  <title>Navbar — Layout — My Components</title>
</svelte:head>

<div class="page">
  <div class="page-header">
    <h1>Navbar</h1>
    <p>Barre de navigation responsive. Se transforme en menu hamburger sous 640 px.</p>
  </div>

  <section class="variant">
    <h2>Avec CTA</h2>
    <ComponentPreview>
      <Navbar {links}>
        {#snippet brand()}
          <LogoGG width={34} height={34} />
        {/snippet}

        {#snippet actionBtn()}
          <div class="action-wrapper">
            <Button variant="primary" size="sm">06 76 55 34 76</Button>
            <ButtonAction label="Action" variant="primary" size="icon-only" icon={Share2}>
              {#snippet items(close)}
                <ButtonActionItem label="Partager" icon={Share2} onclick={close} />
                <ButtonActionItem
                  label="Supprimer"
                  icon={Trash2}
                  variant="danger"
                  onclick={close}
                />
              {/snippet}
            </ButtonAction>
          </div>
        {/snippet}
      </Navbar>
    </ComponentPreview>
  </section>

  <section class="variant">
    <h2>Sans CTA</h2>
    <ComponentPreview>
      <Navbar {links}>
        {#snippet brand()}
          <LogoGG width={34} height={34} />
        {/snippet}
      </Navbar>
    </ComponentPreview>
  </section>

  <section class="variant">
    <h2>Liens minimaux</h2>
    <ComponentPreview>
      <Navbar
        links={[
          { label: "Travaux", href: "#" },
          { label: "Contact", href: "#" },
        ]}
      >
        {#snippet brand()}
          <LogoGG width={34} height={34} />
        {/snippet}
      </Navbar>
    </ComponentPreview>
  </section>

  <div class="props-table">
    <h2>Props</h2>
    <table>
      <thead>
        <tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
      </thead>
      <tbody>
        <tr><td>brand</td><td>string</td><td>'Brand'</td><td>Nom / logo texte</td></tr>
        <tr><td>links</td><td>NavLink[]</td><td>[]</td><td>Liens de navigation</td></tr>
        <tr
          ><td>ctaLabel</td><td>string</td><td>''</td><td
            >Texte du bouton CTA (masqué si vide)</td
          ></tr
        >
      </tbody>
    </table>
  </div>
</div>

<style lang="scss">
  .action-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }
</style>
