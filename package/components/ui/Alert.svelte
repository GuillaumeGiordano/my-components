<script lang="ts">
  import type { Component, Snippet } from "svelte";
  import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "@lucide/svelte";

  let {
    variant = "info",
    title,
    children,
    dismissible = true,
    icon,
    onclose,
  }: {
    variant?: "success" | "error" | "warning" | "info";
    title?: string;
    children?: Snippet;
    dismissible?: boolean;
    icon?: Component;
    onclose?: () => void;
  } = $props();

  const defaultIcons: Record<string, Component> = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  let visible = $state(true);
  let dismissing = $state(false);
  let alertEl = $state<HTMLDivElement | null>(null);

  const AlertIcon = $derived(icon ?? defaultIcons[variant]);

  function dismiss() {
    dismissing = true;
    alertEl?.addEventListener(
      "animationend",
      () => {
        visible = false;
        onclose?.();
      },
      { once: true },
    );
  }
</script>

{#if visible}
  <div
    bind:this={alertEl}
    class="alert alert--{variant}"
    class:alert--dismissing={dismissing}
    role={variant === "error" ? "alert" : "status"}
    aria-live={variant === "error" ? "assertive" : "polite"}
  >
    <div class="alert__icon">
      <AlertIcon size={18} />
    </div>

    <div class="alert__body">
      {#if title}
        <p class="alert__title">{title}</p>
      {/if}
      {#if children}
        <div class="alert__message">{@render children()}</div>
      {/if}
    </div>

    {#if dismissible}
      <button class="alert__close" onclick={dismiss} aria-label="Fermer">
        <X size={16} />
      </button>
    {/if}
  </div>
{/if}

<style>
  .alert {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-radius: var(--radius-md);
    border: 1px solid transparent;
    animation: alert-in 0.2s ease both;
  }

  .alert--dismissing {
    animation: alert-out 0.18s ease forwards;
  }

  /* Variants */
  .alert--info {
    background: color-mix(in srgb, var(--info, #3b82f6) 10%, transparent);
    border-color: color-mix(in srgb, var(--info, #3b82f6) 25%, transparent);
    color: var(--info-fg, #1d4ed8);
  }

  .alert--success {
    background: color-mix(in srgb, var(--success, #22c55e) 10%, transparent);
    border-color: color-mix(in srgb, var(--success, #22c55e) 25%, transparent);
    color: var(--success-fg, #15803d);
  }

  .alert--warning {
    background: color-mix(in srgb, var(--warning, #f59e0b) 10%, transparent);
    border-color: color-mix(in srgb, var(--warning, #f59e0b) 25%, transparent);
    color: var(--warning-fg, #92400e);
  }

  .alert--error {
    background: color-mix(in srgb, var(--danger, #ef4444) 10%, transparent);
    border-color: color-mix(in srgb, var(--danger, #ef4444) 25%, transparent);
    color: var(--danger-fg, #b91c1c);
  }

  /* Icon */
  .alert__icon {
    flex-shrink: 0;
    margin-top: 1px;
    display: flex;
  }

  /* Body */
  .alert__body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .alert__title {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    line-height: 1.4;
  }

  .alert__message {
    font-size: 13px;
    line-height: 1.6;
    color: inherit;
  }

  /* Close */
  .alert__close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: var(--radius-sm);
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
    padding: 0;
    transition: background var(--transition-fast);
    margin-top: 1px;
  }

  .alert__close:hover {
    background: color-mix(in srgb, currentColor 12%, transparent);
  }

  /* Animations */
  @keyframes alert-in {
    from {
      transform: translateY(-6px);
    }
    to {
      transform: none;
    }
  }

  @keyframes alert-out {
    from {
      transform: none;
    }
    to {
      transform: translateY(-6px);
    }
  }
</style>
