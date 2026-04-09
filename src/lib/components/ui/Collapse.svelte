<script lang="ts">
  import type { Snippet } from "svelte";
  import { ChevronDown } from "@lucide/svelte";
  import { slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  let {
    name,
    title,
    variant = "default",
    children,
  }: {
    name?: string;
    title: string;
    variant?: "default" | "bordered" | "card";
    children: Snippet;
  } = $props();

  let isOpen = $state(false);
</script>

<details {name} class="my-collapse {variant}">
  <summary class="summary" onclick={() => (isOpen = !isOpen)}>
    <span class="summary-title">{title}</span>
    <span class="chevron-wrap" aria-hidden="true">
      <ChevronDown size={16} />
    </span>
  </summary>

  <div class="content" transition:slide={{ duration: 280, easing: cubicOut }}>
    <div class="inner">
      {@render children()}
    </div>
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

    .chevron-wrap.open {
      transform: rotate(180deg);
      color: var(--primary);
    }

    /* ---- Content ---- */
    .content {
      overflow: hidden;
    }

    &[open] {
      .chevron-wrap {
        transform: rotate(180deg);
        color: var(--primary);
      }
    }
  }
</style>
