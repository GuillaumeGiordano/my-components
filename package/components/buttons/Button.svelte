<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import { Loader2 } from "@lucide/svelte";

  type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
  type Size = "sm" | "md" | "lg";

  let {
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    href,
    icon: IconLeft,
    iconRight: IconRight,
    children,
    onclick,
    ...restProps
  }: {
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
    href?: string;
    icon?: Component;
    iconRight?: Component;
    children?: Snippet;
    onclick?: (e: MouseEvent) => void;
    [key: string]: unknown;
  } = $props();

  const iconSizes: Record<Size, number> = { sm: 14, md: 15, lg: 17 };
  const iconSize = $derived(iconSizes[size]);
  const isDisabled = $derived(disabled || loading);
  // Icon-only: no children text, has at least one icon
  const iconOnly = $derived(!children && (!!IconLeft || !!IconRight));
</script>

{#if href && !isDisabled}
  <a
    {href}
    class="btn btn-{variant} btn-{size}"
    class:icon-only={iconOnly}
    role="button"
    {...restProps}
  >
    {#if loading}
      <span class="spinner"><Loader2 size={iconSize} /></span>
    {:else if IconLeft}
      <IconLeft size={iconSize} />
    {/if}

    {#if children}
      {@render children()}
    {/if}

    {#if IconRight && !loading}
      <IconRight size={iconSize} />
    {/if}
  </a>
{:else}
  <button
    class="btn btn-{variant} btn-{size}"
    class:icon-only={iconOnly}
    disabled={isDisabled}
    {onclick}
    {...restProps}
  >
    {#if loading}
      <span class="spinner"><Loader2 size={iconSize} /></span>
    {:else if IconLeft}
      <IconLeft size={iconSize} />
    {/if}

    {#if children}
      {@render children()}
    {/if}

    {#if IconRight && !loading}
      <IconRight size={iconSize} />
    {/if}
  </button>
{/if}

<style>
  /* ---- Base ---- */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    font-family: var(--font-sans);
    font-weight: 500;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    cursor: pointer;
    text-decoration: none;
    white-space: nowrap;
    transition:
      background var(--transition-fast),
      color var(--transition-fast),
      border-color var(--transition-fast),
      box-shadow var(--transition-fast),
      opacity var(--transition-fast);
  }

  .btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* ---- Sizes ---- */
  .btn-sm {
    padding: 5px 12px;
    font-size: 12px;
    border-radius: var(--radius-sm);
  }

  .btn-md {
    padding: 8px 16px;
    font-size: 14px;
  }

  .btn-lg {
    padding: 11px 22px;
    font-size: 15px;
    border-radius: var(--radius-lg);
  }

  /* ---- Icon-only square ---- */
  .btn-sm.icon-only {
    padding: 5px;
    width: 28px;
    height: 28px;
  }
  .btn-md.icon-only {
    padding: 8px;
    width: 36px;
    height: 36px;
  }
  .btn-lg.icon-only {
    padding: 11px;
    width: 44px;
    height: 44px;
  }

  /* ---- Variants ---- */
  .btn-primary {
    background: var(--primary);
    color: var(--primary-fg);
    border-color: var(--primary);
  }
  .btn-primary:hover:not(:disabled) {
    background: var(--primary-hover);
    border-color: var(--primary-hover);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  .btn-secondary {
    background: var(--bg-hover);
    color: var(--text-base);
    border-color: var(--border);
  }
  .btn-secondary:hover:not(:disabled) {
    background: var(--border);
    border-color: var(--border-strong);
  }

  .btn-outline {
    background: transparent;
    color: var(--primary);
    border-color: var(--primary);
  }
  .btn-outline:hover:not(:disabled) {
    background: var(--primary-subtle);
  }

  .btn-ghost {
    background: transparent;
    color: var(--text-muted);
    border-color: transparent;
  }
  .btn-ghost:hover:not(:disabled) {
    background: var(--bg-hover);
    color: var(--text-base);
  }

  .btn-danger {
    background: #dc2626;
    color: #fff;
    border-color: #dc2626;
  }
  .btn-danger:hover:not(:disabled) {
    background: #b91c1c;
    border-color: #b91c1c;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }

  /* ---- Loading spinner ---- */
  .spinner {
    display: inline-flex;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
