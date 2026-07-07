<script lang="ts">
  import type { Component, Snippet } from 'svelte';
  import { ChevronRight } from '@lucide/svelte';
  import { slide } from 'svelte/transition';

  export type SidebarSubItem = {
    label: string;
    href: string;
    active?: boolean;
    icon?: Component;
  };

  let {
    icon,
    label,
    href,
    active = false,
    collapsed = false,
    badge,
    children,
    content,
    onclick,
  }: {
    icon: Component;
    label: string;
    href?: string;
    active?: boolean;
    collapsed?: boolean;
    badge?: number | string;
    children?: SidebarSubItem[];
    /** Custom expandable content (e.g. a picker). Toggles like sub-items. */
    content?: Snippet;
    onclick?: () => void;
  } = $props();

  let open = $state(false);

  const hasChildren = $derived(!!children?.length);
  // Either typed sub-items or a custom content snippet makes the item expandable.
  const expandable = $derived(hasChildren || !!content);
  const hasActiveChild = $derived(children?.some(c => c.active) ?? false);
  const showBadge = $derived(badge !== undefined && badge !== null && badge !== '');

  // Auto-expand if a child matches the active route
  $effect(() => {
    if (hasActiveChild) open = true;
  });

  function handleClick() {
    if (expandable) {
      open = !open;
    } else {
      onclick?.();
    }
  }
</script>

<div class="sidebar-item-root" class:collapsed>

  <!-- ── Main button / link ── -->
  {#if href && !expandable}
    <a
      {href}
      class="item"
      class:active
      aria-current={active ? 'page' : undefined}
    >
      {@render iconSlot()}
      {@render labelSlot()}
      {@render badgeSlot()}
    </a>
  {:else}
    <button
      class="item"
      class:active
      class:open
      onclick={handleClick}
      aria-expanded={expandable ? open : undefined}
    >
      {@render iconSlot()}
      {@render labelSlot()}
      {@render badgeSlot()}
      {#if expandable && !collapsed}
        <span class="chevron" class:rotated={open}>
          <ChevronRight size={14} />
        </span>
      {/if}
    </button>
  {/if}

  <!-- ── Expandable: typed sub-items, or a custom content snippet ── -->
  {#if expandable && open && !collapsed}
    {#if hasChildren}
      <div class="sub-items" transition:slide={{ duration: 200 }}>
        {#each children! as child}
          <a
            href={child.href}
            class="sub-item"
            class:active={child.active}
            aria-current={child.active ? 'page' : undefined}
          >
            {#if child.icon}
              <span class="sub-icon"><child.icon size={14} /></span>
            {:else}
              <span class="sub-dot"></span>
            {/if}
            <span class="sub-label">{child.label}</span>
          </a>
        {/each}
      </div>
    {:else if content}
      <div class="sub-content" transition:slide={{ duration: 200 }}>
        {@render content()}
      </div>
    {/if}
  {/if}

  <!-- ── Collapsed tooltip ── -->
  {#if collapsed}
    <div class="tooltip" role="tooltip">{label}</div>
  {/if}
</div>

<!-- ── Snippets ── -->
{#snippet iconSlot()}
  {@const Icon = icon}
  <span class="icon-wrap">
    <Icon size={16} />
    {#if collapsed && showBadge}
      <span class="badge-dot" aria-label="{badge} notifications"></span>
    {/if}
  </span>
{/snippet}

{#snippet labelSlot()}
  {#if !collapsed}
    <span class="label">{label}</span>
  {/if}
{/snippet}

{#snippet badgeSlot()}
  {#if !collapsed && showBadge}
    <span class="badge">{badge}</span>
  {/if}
{/snippet}

<style>
  /* ── Root ── */
  .sidebar-item-root {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  /* ── Item (link or button) ── */
  .item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border-radius: var(--radius-md);
    font-size: 14px;
    font-weight: 400;
    color: var(--text-muted);
    text-decoration: none;
    border: none;
    background: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    white-space: nowrap;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);
    min-width: 0;

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    &.active {
      background: var(--primary-subtle);
      color: var(--primary-subtle-fg);
      font-weight: 500;
    }
  }

  /* ── Icon ── */
  .icon-wrap {
    position: relative;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* ── Label — fade out when collapsing ── */
  .label {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 1;
    transition: opacity var(--transition-base);
  }

  .collapsed .label { opacity: 0; width: 0; }

  /* ── Badge (expanded) ── */
  .badge {
    margin-left: auto;
    flex-shrink: 0;
    min-width: 20px;
    height: 20px;
    padding: 0 5px;
    border-radius: var(--radius-full);
    background: var(--primary);
    color: var(--primary-fg);
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  /* ── Badge dot (collapsed) ── */
  .badge-dot {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary);
    border: 2px solid var(--bg-subtle);
  }

  /* ── Chevron ── */
  .chevron {
    margin-left: auto;
    flex-shrink: 0;
    color: var(--text-subtle);
    display: flex;
    align-items: center;
    transition: transform var(--transition-fast);
  }

  .chevron.rotated { transform: rotate(90deg); }

  /* ── Sub-items ── */
  .sub-items {
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding-left: 12px;
    margin-top: 2px;
    border-left: 2px solid var(--border);
    margin-left: 17px;
    overflow: hidden;
  }

  .sub-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 8px;
    border-radius: var(--radius-md);
    font-size: 13px;
    color: var(--text-muted);
    text-decoration: none;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--bg-hover);
      color: var(--text-base);
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    &.active {
      color: var(--primary);
      font-weight: 500;
    }
  }

  /* ── Custom expandable content ── */
  .sub-content {
    padding: 8px 4px 4px;
    overflow: hidden;
  }

  .sub-icon {
    display: flex;
    align-items: center;
    color: var(--text-subtle);
  }

  .sub-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--text-subtle);
    flex-shrink: 0;
    margin-left: 3px;
  }

  .sub-item.active .sub-dot {
    background: var(--primary);
  }

  /* ── Tooltip (visible en mode collapsed) ── */
  .tooltip {
    position: absolute;
    left: calc(100% + 10px);
    top: 50%;
    transform: translateY(-50%);
    background: var(--text-heading);
    color: var(--bg-base);
    font-size: 12px;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: var(--radius-md);
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--transition-fast);
    z-index: 100;

    /* Arrow */
    &::before {
      content: '';
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      border: 5px solid transparent;
      border-right-color: var(--text-heading);
    }
  }

  .sidebar-item-root:hover .tooltip { opacity: 1; }
</style>
