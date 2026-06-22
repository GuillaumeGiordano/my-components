<script lang="ts">
  import type { Snippet } from "svelte";

  type FooterLink = { label: string; href: string };
  type FooterColumn = { heading: string; links: FooterLink[] };

  let {
    brand,
    tagline = "",
    columns = [] as FooterColumn[],
    copyright = `© ${new Date().getFullYear()} Brand. Tous droits réservés.`,
  }: {
    brand?: Snippet;
    tagline?: string;
    columns?: FooterColumn[];
    copyright?: string;
  } = $props();
</script>

<footer class="footer">
  <div class="footer-inner">
    <div class="footer-brand">
      {@render brand?.()}
      {#if tagline}
        <p class="tagline">{tagline}</p>
      {/if}
    </div>

    {#if columns.length > 0}
      <div class="footer-columns">
        {#each columns as column}
          <div class="footer-col">
            <h3 class="col-heading">{column.heading}</h3>
            <ul class="col-links">
              {#each column.links as link}
                <li>
                  <a href={link.href} class="footer-link">{link.label}</a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="footer-bottom">
    <p class="copyright">{copyright}</p>
  </div>
</footer>

<style>
  .footer {
    background: var(--footer-bg);
    color: var(--footer-text);
    transition:
      background var(--transition-base),
      color var(--transition-base);
  }

  .footer-inner {
    display: flex;
    gap: 48px;
    padding: 48px 32px 40px;
    flex-wrap: wrap;
  }

  .footer-brand {
    flex: 1;
    min-width: 160px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .brand-name {
    font-size: 18px;
    font-weight: 700;
    color: var(--footer-brand);
  }

  .tagline {
    font-size: 14px;
    color: var(--footer-text-muted);
    line-height: 1.6;
    max-width: 240px;
  }

  .footer-columns {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
  }

  .footer-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 120px;
  }

  .col-heading {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--footer-brand);
  }

  .col-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .footer-link {
    font-size: 14px;
    color: var(--footer-text-muted);
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .footer-link:hover {
    color: var(--footer-text);
  }

  .footer-bottom {
    padding: 16px 32px;
    border-top: 1px solid var(--footer-border);
  }

  .copyright {
    font-size: 13px;
    color: var(--footer-text-subtle);
  }

  @media (max-width: 640px) {
    .footer-inner {
      flex-direction: column;
      gap: 32px;
      padding: 32px 20px 28px;
    }

    .footer-columns {
      gap: 28px;
    }

    .footer-bottom {
      padding: 16px 20px;
    }
  }
</style>
