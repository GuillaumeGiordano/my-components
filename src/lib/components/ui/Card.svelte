<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    header,
    footer,
    hoverable = false,
    padding = "md",
    class: cls = "",
  }: {
    children: Snippet;
    header?: Snippet;
    footer?: Snippet;
    hoverable?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
    class?: string;
  } = $props();
</script>

<div class="card pad-{padding} {cls}" class:hoverable>
  {#if header}
    <div class="card-header">{@render header()}</div>
  {/if}
  <div class="card-body">{@render children()}</div>
  {#if footer}
    <div class="card-footer">{@render footer()}</div>
  {/if}
</div>

<style>
  .card {
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    display: flex;
    flex-direction: column;
    transition:
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
  }

  .card.hoverable:hover {
    border-color: var(--border-strong);
    box-shadow: var(--shadow-md);
  }

  .card-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .card-footer {
    padding: 12px 20px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }

  .pad-none .card-body { padding: 0; }
  .pad-sm .card-body { padding: 12px; }
  .pad-md .card-body { padding: 20px; }
  .pad-lg .card-body { padding: 32px; }
</style>
