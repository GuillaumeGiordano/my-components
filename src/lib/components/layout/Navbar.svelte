<script lang="ts">
  import { Menu, X } from "@lucide/svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import LogoGG from "../logo/LogoGG.svelte";
  import type { Snippet } from "svelte";

  type NavLink = { label: string; href: string };

  let {
    links = [] as NavLink[],
    ctaLabel = "",
    ctaHref = "#",
    brand,
  }: {
    links?: NavLink[];
    ctaLabel?: string;
    ctaHref?: string;
    brand?: Snippet;
  } = $props();

  let menuOpen = $state(false);
</script>

<header class="navbar">
  <div class="navbar-inner">
    {@render brand?.()}

    <nav class="navbar-links" aria-label="Navigation principale">
      {#each links as link}
        <a href={link.href} class="nav-link">{link.label}</a>
      {/each}
    </nav>

    <div class="navbar-actions">
      {#if ctaLabel}
        <span class="cta-desktop">
          <Button href={ctaHref} size="sm">{ctaLabel}</Button>
        </span>
      {/if}

      <span class="hamburger-wrap">
        <Button
          variant="ghost"
          icon={menuOpen ? X : Menu}
          onclick={() => (menuOpen = !menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        />
      </span>
    </div>
  </div>

  {#if menuOpen}
    <nav class="mobile-menu" aria-label="Navigation mobile">
      {#each links as link}
        <a href={link.href} class="mobile-link" onclick={() => (menuOpen = false)}
          >{link.label}</a
        >
      {/each}
      {#if ctaLabel}
        <span class="cta-mobile">
          <Button href={ctaHref} size="md">{ctaLabel}</Button>
        </span>
      {/if}
    </nav>
  {/if}
</header>

<style>
  .navbar {
    background: var(--bg-base);
    border-bottom: 1px solid var(--border);
    position: relative;
    transition:
      background var(--transition-base),
      border-color var(--transition-base);
  }

  .navbar-inner {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 0 24px;
    height: 60px;
  }

  .navbar-links {
    display: flex;
    gap: 4px;
    flex: 1;
  }

  .nav-link {
    padding: 6px 12px;
    font-size: 14px;
    color: var(--text-muted);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition:
      background var(--transition-fast),
      color var(--transition-fast);
  }

  .nav-link:hover {
    background: var(--bg-muted);
    color: var(--text-base);
  }

  .navbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }

  .hamburger-wrap {
    display: none;
  }

  .mobile-menu {
    display: flex;
    flex-direction: column;
    padding: 8px 16px 16px;
    border-top: 1px solid var(--border);
    gap: 2px;
    background: var(--bg-base);
  }

  .mobile-link {
    padding: 10px 8px;
    font-size: 15px;
    color: var(--text-muted);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition:
      background var(--transition-fast),
      color var(--transition-fast);
  }

  .mobile-link:hover {
    background: var(--bg-muted);
    color: var(--text-base);
  }

  .cta-mobile {
    display: block;
    margin-top: 8px;
  }

  /* Full-width CTA in mobile menu */
  .cta-mobile :global(.btn) {
    width: 100%;
    justify-content: center;
  }

  @container (max-width: 640px) {
    .navbar-links,
    .cta-desktop {
      display: none;
    }

    .hamburger-wrap {
      display: flex;
    }
  }
</style>
