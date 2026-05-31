<script lang="ts">
  import { Menu, Share2, Trash2, X } from "@lucide/svelte";
  import Button from "$lib/components/buttons/Button.svelte";
  import type { Snippet } from "svelte";

  type NavLink = { label: string; href: string };

  let {
    links = [] as NavLink[],
    brand,
    actionBtn,
  }: {
    links?: NavLink[];
    brand?: Snippet;
    actionBtn?: Snippet;
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
      {#if actionBtn}
        <span class="cta-desktop">
          {@render actionBtn?.()}
        </span>
      {/if}

      <span class="hamburger-wrap">
        {#if actionBtn}
          <span class="cta-mobile">
            {@render actionBtn?.()}
          </span>
        {/if}
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
        <a href={link.href} class="mobile-link" onclick={() => (menuOpen = false)}>
          {link.label}
        </a>
      {/each}
    </nav>
  {/if}
</header>

<style>
  .navbar {
    background: var(--bg-base);
    border-bottom: 1px solid var(--border);
    position: sticky;
    transition:
      background var(--transition-base),
      border-color var(--transition-base);
    top: 0;
    z-index: 99;
  }

  .navbar-inner {
    max-width: 1200px;
    margin: auto;
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
      align-items: center;
      gap: 4px;
    }
  }

  @media (max-width: 640px) {
    .navbar-links,
    .cta-desktop {
      display: none;
    }

    .hamburger-wrap {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
</style>
