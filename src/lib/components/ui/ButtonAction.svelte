<script lang="ts">
  import type { Snippet, Component } from "svelte";
  import { ChevronDown } from "@lucide/svelte";

  type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
  type Size = "sm" | "md" | "lg";

  let {
    label,
    variant = "secondary",
    size = "md",
    icon: Icon,
    addClass = "",
    items,
  }: {
    label: string;
    variant?: Variant;
    size?: Size;
    icon?: Component;
    addClass?: string;
    items: Snippet<[() => void]>;
  } = $props();

  const iconSizes: Record<Size, number> = { sm: 14, md: 15, lg: 17 };

  let isOpen = $state(false);
  let triggerEl: HTMLButtonElement | null = $state(null);
  let menuEl: HTMLDivElement | null = $state(null);
  let wasOpenOnMousedown = false;

  function reposition() {
    if (!triggerEl || !menuEl) return;
    const rect = triggerEl.getBoundingClientRect();
    const mRect = menuEl.getBoundingClientRect();
    const top = rect.bottom + 6;
    const left = rect.left;
    menuEl.style.top = `${mRect.height + top > window.innerHeight ? rect.top - mRect.height - 6 : top}px`;
    menuEl.style.left = `${left + mRect.width > window.innerWidth ? rect.right - mRect.width : left}px`;
    menuEl.style.minWidth = `${rect.width}px`;
  }

  function handleMousedown() {
    wasOpenOnMousedown = isOpen;
  }

  function openMenu() {
    if (!triggerEl || !menuEl || wasOpenOnMousedown) return;
    menuEl.showPopover();
    reposition();
    window.addEventListener("scroll", reposition, { passive: true, capture: true });
  }

  function closeMenu() {
    menuEl?.hidePopover();
    window.removeEventListener("scroll", reposition, { capture: true });
  }
</script>

<button
  class="trigger btn-{variant} size-{size} {addClass}"
  class:open={isOpen}
  bind:this={triggerEl}
  onmousedown={handleMousedown}
  onclick={openMenu}
  aria-haspopup="menu"
  aria-expanded={isOpen}
>
  {#if Icon}<Icon size={iconSizes[size]} />{/if}
  <span>{label}</span>
  <span class="chevron"><ChevronDown size={iconSizes[size]} /></span>
</button>

<div
  class="menu"
  popover="auto"
  bind:this={menuEl}
  role="menu"
  ontoggle={(e) => {
    isOpen = (e as ToggleEvent).newState === "open";
    if (!isOpen) window.removeEventListener("scroll", reposition, { capture: true });
  }}
>
  {@render items(closeMenu)}
</div>

<style>
  /* ---- Trigger ---- */
  .trigger {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-sans);
    font-weight: 500;
    border-radius: var(--radius-md);
    border: 1px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    transition:
      background var(--transition-fast),
      color var(--transition-fast),
      border-color var(--transition-fast);
  }

  .trigger .chevron {
    display: flex;
    align-items: center;
    transition: transform var(--transition-fast);
    margin-left: auto;
  }
  .trigger.open .chevron {
    transform: rotate(180deg);
  }

  /* sizes */
  .size-sm {
    padding: 5px 12px;
    font-size: 12px;
    border-radius: var(--radius-sm);
  }
  .size-md {
    padding: 8px 16px;
    font-size: 14px;
  }
  .size-lg {
    padding: 11px 22px;
    font-size: 15px;
    border-radius: var(--radius-lg);
  }

  /* variants */
  .btn-primary {
    background: var(--primary);
    color: var(--primary-fg);
    border-color: var(--primary);
  }
  .btn-primary:hover {
    background: var(--primary-hover);
    border-color: var(--primary-hover);
  }

  .btn-secondary {
    background: var(--bg-hover);
    color: var(--text-base);
    border-color: var(--border);
  }
  .btn-secondary:hover {
    background: var(--border);
    border-color: var(--border-strong);
  }

  .btn-outline {
    background: transparent;
    color: var(--primary);
    border-color: var(--primary);
  }
  .btn-outline:hover {
    background: var(--primary-subtle);
  }

  .btn-ghost {
    background: transparent;
    color: var(--text-muted);
    border-color: transparent;
  }
  .btn-ghost:hover {
    background: var(--bg-hover);
    color: var(--text-base);
  }

  .btn-danger {
    background: #dc2626;
    color: #fff;
    border-color: #dc2626;
  }
  .btn-danger:hover {
    background: #b91c1c;
    border-color: #b91c1c;
  }

  /* ---- Menu popover ---- */
  .menu {
    position: fixed;
    inset: unset;
    margin: 0;
    padding: 4px;
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    display: none;
    flex-direction: column;
    gap: 1px;
    min-width: 160px;
    outline: none;

    &:popover-open {
      display: flex;
      animation: menu-in 0.18s cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  @keyframes menu-in {
    from {
      transform: translateY(-6px) scale(0.97);
    }
    to {
      transform: none;
    }
  }
</style>
