<script lang="ts">
  import type { Snippet } from 'svelte';
  import { uniqueId } from '$lib/utils/id';

  let {
    tabs,
    value = $bindable(tabs[0]?.id ?? ''),
    variant = 'default',
    children,
  }: {
    tabs: { id: string; label: string }[];
    value?: string;
    variant?: 'default' | 'pills' | 'underline';
    children?: Snippet<[string]>;
  } = $props();

  const baseId = uniqueId('tabs');
  const tabId = (id: string) => `${baseId}-tab-${id}`;
  const panelId = (id: string) => `${baseId}-panel-${id}`;

  let buttonRefs: HTMLButtonElement[] = [];

  function onKeydown(e: KeyboardEvent, index: number) {
    let next = index;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      next = (index - 1 + tabs.length) % tabs.length;
    } else {
      return;
    }
    value = tabs[next].id;
    buttonRefs[next]?.focus();
  }
</script>

<div class="tabs {variant}">
  <div class="tab-list" role="tablist">
    {#each tabs as tab, i}
      <button
        bind:this={buttonRefs[i]}
        id={tabId(tab.id)}
        role="tab"
        aria-selected={value === tab.id}
        aria-controls={panelId(tab.id)}
        class="tab-btn"
        class:active={value === tab.id}
        tabindex={value === tab.id ? 0 : -1}
        onclick={() => (value = tab.id)}
        onkeydown={(e) => onKeydown(e, i)}
      >
        {tab.label}
      </button>
    {/each}
  </div>

  {#if children}
    <div
      id={panelId(value)}
      role="tabpanel"
      aria-labelledby={tabId(value)}
      class="tab-panel"
    >
      {@render children(value)}
    </div>
  {/if}
</div>

<style lang="scss">
  .tabs {
    display: flex;
    flex-direction: column;
  }

  /* ---- Tab list ---- */
  .tab-list {
    display: flex;
    gap: 2px;
  }

  .tab-btn {
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    font-family: var(--font-sans);
    cursor: pointer;
    border: none;
    background: none;
    color: var(--text-muted);
    border-radius: var(--radius-md);
    transition:
      color var(--transition-fast),
      background var(--transition-fast);

    &:hover {
      color: var(--text-base);
    }

    &:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    &.active {
      color: var(--text-base);
    }
  }

  /* ---- Tab panel ---- */
  .tab-panel {
    outline: none;
  }

  /* ==============================
     Variant: default
     Bottom border indicator
  ============================== */
  .tabs.default {
    .tab-list {
      border-bottom: 1px solid var(--border);
      gap: 0;
    }

    .tab-btn {
      border-radius: var(--radius-md) var(--radius-md) 0 0;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      padding: 10px 16px;

      &.active {
        border-bottom-color: var(--primary);
        color: var(--primary);
      }
    }

    .tab-panel {
      padding: 16px 0;
    }
  }

  /* ==============================
     Variant: pills
     Filled pill on active
  ============================== */
  .tabs.pills {
    .tab-list {
      background: var(--bg-subtle);
      border-radius: var(--radius-lg);
      padding: 4px;
      gap: 2px;
    }

    .tab-btn {
      flex: 1;
      text-align: center;
      border-radius: var(--radius-md);
      padding: 7px 16px;

      &.active {
        background: var(--bg-base);
        color: var(--text-base);
        box-shadow: var(--shadow-sm);
      }
    }

    .tab-panel {
      padding: 16px 0;
    }
  }

  /* ==============================
     Variant: underline
     Simple underline, no border on list
  ============================== */
  .tabs.underline {
    .tab-list {
      gap: 8px;
    }

    .tab-btn {
      position: relative;
      padding: 8px 4px;
      border-radius: 0;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--primary);
        border-radius: 2px;
        transform: scaleX(0);
        transition: transform var(--transition-fast);
      }

      &.active {
        color: var(--primary);

        &::after {
          transform: scaleX(1);
        }
      }
    }

    .tab-panel {
      padding: 16px 0;
    }
  }
</style>
