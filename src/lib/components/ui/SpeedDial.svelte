<script lang="ts">
  import type { Component } from 'svelte';
  import { Settings, X } from '@lucide/svelte';
  import { browser } from '$app/environment';
  import { fade } from 'svelte/transition';

  export type SpeedDialItem = {
    icon: Component;
    label: string;
    onclick?: () => void;
    active?: boolean;
  };

  let {
    items = [],
    icon: TriggerIcon = Settings,
  }: {
    items?: SpeedDialItem[];
    icon?: Component;
  } = $props();

  let open = $state(false);
  let hoveredIndex = $state(-1);

  const count = $derived(items.length);

  function itemStyle(i: number): string {
    const dy = -(i + 1) * 60;
    const delay = open ? i * 50 : (count - 1 - i) * 35;
    return `--dy:${dy}px;--delay:${delay}ms`;
  }

  function toggle() {
    open = !open;
    hoveredIndex = -1;
  }

  function handleItemClick(item: SpeedDialItem) {
    open = false;
    hoveredIndex = -1;
    item.onclick?.();
  }

  function onItemPointerEnter(i: number) { hoveredIndex = i; }
  function onItemPointerLeave(i: number) { if (hoveredIndex === i) hoveredIndex = -1; }
  function onItemTouchStart(i: number) { hoveredIndex = i; }
  function onItemTouchEnd() { hoveredIndex = -1; }
  function onItemTouchCancel() { hoveredIndex = -1; }

  $effect(() => {
    if (!browser) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { open = false; hoveredIndex = -1; }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });
</script>

{#if open}
  <div
    class="backdrop"
    transition:fade={{ duration: 200 }}
    onclick={() => { open = false; hoveredIndex = -1; }}
    role="presentation"
    aria-hidden="true"
  ></div>
{/if}

<div class="speed-dial" class:open aria-label="Actions rapides">
  {#each items as item, i}
    <button
      type="button"
      class="sd-item"
      class:active={item.active}
      class:touch-hovered={hoveredIndex === i}
      style={itemStyle(i)}
      aria-label={item.label}
      onclick={() => handleItemClick(item)}
      onpointerenter={() => onItemPointerEnter(i)}
      onpointerleave={() => onItemPointerLeave(i)}
      ontouchstart={() => onItemTouchStart(i)}
      ontouchend={onItemTouchEnd}
      ontouchcancel={onItemTouchCancel}
    >
      <span class="sd-icon"><item.icon size={20} /></span>
      <span class="sd-label">{item.label}</span>
    </button>
  {/each}

  <button
    type="button"
    class="fab"
    onclick={toggle}
    aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
    aria-expanded={open}
    aria-haspopup="true"
  >
    <span class="fab-open"><TriggerIcon size={22} /></span>
    <span class="fab-close"><X size={22} /></span>
  </button>
</div>

<style>
  /* ── Backdrop ── */
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    z-index: 998;
  }

  /* ── Container ── */
  .speed-dial {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 56px;
    height: 56px;
    z-index: 999;
  }

  /* ── FAB ── */
  .fab {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--primary);
    color: var(--primary-fg);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:
      0 4px 16px color-mix(in srgb, var(--primary) 50%, transparent),
      0 2px 8px rgba(0, 0, 0, 0.2);
    transition:
      transform var(--transition-base),
      background var(--transition-fast),
      box-shadow var(--transition-fast);
    z-index: 1;
    user-select: none;
    -webkit-user-select: none;

    &:hover {
      background: var(--primary-hover);
      transform: scale(1.07);
      box-shadow:
        0 6px 22px color-mix(in srgb, var(--primary) 60%, transparent),
        0 3px 10px rgba(0, 0, 0, 0.25);
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 3px;
    }
  }

  /* FAB icon crossfade */
  .fab-open,
  .fab-close {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      opacity 0.22s ease,
      transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }

  .fab-open  { opacity: 1; transform: rotate(0deg) scale(1); }
  .fab-close { opacity: 0; transform: rotate(-90deg) scale(0.4); }

  .open .fab-open  { opacity: 0; transform: rotate(90deg) scale(0.4); }
  .open .fab-close { opacity: 1; transform: rotate(0deg) scale(1); }

  /* ── Items ── */
  .sd-item {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--bg-base);
    border: 1px solid var(--border);
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-md);
    user-select: none;
    -webkit-user-select: none;

    /* Closed */
    transform: translateY(0) scale(0);
    opacity: 0;
    pointer-events: none;

    transition:
      transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
      opacity 0.22s ease,
      background var(--transition-fast),
      color var(--transition-fast),
      border-color var(--transition-fast),
      box-shadow var(--transition-fast);
    transition-delay: 0ms;
  }

  /* Open */
  .open .sd-item {
    transform: translateY(var(--dy)) scale(1);
    opacity: 1;
    pointer-events: auto;
    transition-delay: var(--delay);
  }

  /* Hover / touch */
  .open .sd-item:hover,
  .open .sd-item.touch-hovered {
    background: var(--bg-hover);
    color: var(--text-base);
    transform: translateY(var(--dy)) scale(1.1);
    box-shadow: var(--shadow-lg);
    transition-delay: 0ms;
    z-index: 2;
  }

  /* Active */
  .open .sd-item.active {
    background: var(--primary-subtle);
    color: var(--primary);
    border-color: color-mix(in srgb, var(--primary) 30%, transparent);
  }

  .open .sd-item.active:hover,
  .open .sd-item.active.touch-hovered {
    background: var(--primary-subtle);
  }

  /* ── Icon ── */
  .sd-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  /* ── Label pill ── */
  .sd-label {
    position: absolute;
    right: calc(100% + 12px);
    top: 50%;
    transform: translateY(-50%);
    background: var(--text-heading);
    color: var(--bg-base);
    font-size: 12px;
    font-weight: 600;
    font-family: var(--font-sans);
    padding: 5px 12px;
    border-radius: var(--radius-full);
    white-space: nowrap;
    pointer-events: none;
    user-select: none;
    z-index: 10;
    opacity: 0;
    transition: opacity 0.15s ease;

    &::after {
      content: '';
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-left-color: var(--text-heading);
    }
  }

  .open .sd-item:hover .sd-label,
  .open .sd-item.touch-hovered .sd-label {
    opacity: 1;
  }
</style>
