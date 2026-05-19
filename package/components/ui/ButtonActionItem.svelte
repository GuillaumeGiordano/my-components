<script lang="ts">
  import type { Component } from "svelte";

  let {
    label,
    icon: Icon,
    variant = "default",
    disabled = false,
    onclick,
  }: {
    label: string;
    icon?: Component;
    variant?: "default" | "danger";
    disabled?: boolean;
    onclick?: () => void;
  } = $props();
</script>

<button class="item variant-{variant}" {disabled} role="menuitem" {onclick}>
  {#if Icon}
    <span class="icon"><Icon size={15} /></span>
  {/if}
  {label}
</button>

<style>
  .item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 7px 10px;
    border: none;
    background: transparent;
    border-radius: var(--radius-md);
    font-family: var(--font-sans);
    font-size: 14px;
    color: var(--text-base);
    cursor: pointer;
    text-align: left;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover:not(:disabled) {
      background: var(--bg-hover);
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }

  .variant-danger {
    color: #dc2626;
    &:hover:not(:disabled) {
      background: #fef2f2;
    }
  }

  .icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: var(--text-muted);
  }

  .variant-danger .icon {
    color: #dc2626;
  }
</style>
