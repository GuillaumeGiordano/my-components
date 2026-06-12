<script lang="ts">
  import type { Snippet } from "svelte";
  import { ChevronDown } from "@lucide/svelte";

  let {
    name,
    title,
    variant = "default",
    isOpen = false,
    children,
  }: {
    name?: string;
    title: string;
    variant?: "default" | "bordered" | "card";
    isOpen?: boolean;
    children: Snippet;
  } = $props();

</script>

<details {name} open={isOpen} class="my-collapse {variant}">
  <summary class="summary">
    <span class="summary-title">{title}</span>
    <span class="chevron-wrap" aria-hidden="true">
      <ChevronDown size={16} />
    </span>
  </summary>

  <div class="inner">
    {@render children()}
  </div>
</details>

<style lang="scss">
  .my-collapse {
    summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 14px 16px;
      cursor: pointer;
      user-select: none;
      list-style: none;
      border-radius: var(--radius-md);
      transition: background var(--transition-fast);
    }

    .summary:hover {
      background: var(--bg-hover);
    }

    .summary:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    .summary-title {
      font-size: 15px;
      font-weight: 500;
      color: var(--text-base);
      flex: 1;
    }

    /* ---- Chevron ---- */
    .chevron-wrap {
      display: flex;
      align-items: center;
      color: var(--text-subtle);
      flex-shrink: 0;
      transition:
        transform 0.28s cubic-bezier(0.4, 0, 0.2, 1),
        color var(--transition-fast);
    }

    &[open] .chevron-wrap {
      transform: rotate(180deg);
      color: var(--primary);
    }

    /* ---- Content animation via ::details-content ---- */
    &::details-content {
      block-size: 0;
      display: block;
      overflow: hidden;
    }

    @media (prefers-reduced-motion: no-preference) {
      &::details-content {
        transition-property: block-size, content-visibility;
        transition-behavior: allow-discrete;
        transition-duration: 0.3s;
      }
    }

    &[open]::details-content {
      block-size: auto;
      /* calc-size permet d'animer vers une hauteur auto — non supporté partout */
      block-size: calc-size(max-content, size);
    }

    /* ---- Inner padding ---- */
    .inner {
      padding: 0 16px 14px;
    }

    /* ---- Variants ---- */
    &.bordered {
      border: 1px solid var(--border);
      border-radius: var(--radius-md);

      summary {
        border-radius: var(--radius-md) var(--radius-md) 0 0;
      }

      &[open] summary {
        border-bottom: 1px solid var(--border);
        border-radius: var(--radius-md) var(--radius-md) 0 0;
      }
    }

    &.card {
      background: var(--bg-subtle);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);

      summary {
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
      }

      &[open] summary {
        border-bottom: 1px solid var(--border);
      }

      .inner {
        padding: 12px 16px 16px;
      }
    }
  }
</style>
