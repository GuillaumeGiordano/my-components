<script lang="ts">
  import type { Snippet } from "svelte";
  import { X } from "@lucide/svelte";
  import { uniqueId } from "$lib/utils/id";

  let {
    id,
    title,
    variant = "default",
    size = "md",
    overlayClose = false,
    children,
    footer,
  }: {
    id: string;
    title?: string;
    variant?: "default" | "drawer" | "bottom-sheet";
    size?: "sm" | "md" | "lg" | "full";
    overlayClose?: boolean;
    children: Snippet;
    footer?: Snippet<[() => void]>;
  } = $props();

  const titleId = uniqueId("modal");
  let dialogEl: HTMLDialogElement | null = $state(null);
  let panelEl: HTMLDivElement | null = $state(null);

  function closeWithAnimation() {
    if (!dialogEl?.open) return;
    dialogEl.classList.add("is-closing");
    panelEl?.addEventListener(
      "animationend",
      () => {
        dialogEl?.classList.remove("is-closing");
        dialogEl?.close();
      },
      { once: true },
    );
  }

  function close(e: MouseEvent) {
    if (e.target === e.currentTarget && overlayClose) closeWithAnimation();
  }
</script>

<dialog
  class="modal-root {variant}"
  {id}
  bind:this={dialogEl}
  oncancel={(e) => {
    e.preventDefault();
    closeWithAnimation();
  }}
  onclick={(e) => close(e)}
>
  <div class="panel size-{size}" bind:this={panelEl}>
    <div class="panel-header">
      {#if title}
        <h2 id={titleId} class="panel-title">{title}</h2>
      {:else}
        <span></span>
      {/if}

      <button
        class="close-btn"
        onclick={closeWithAnimation}
        aria-label="Fermer la fenêtre"
      >
        <X size={18} />
      </button>
    </div>

    <div class="panel-body">
      {@render children()}
    </div>

    {#if footer}
      <div class="panel-footer">
        {@render footer(closeWithAnimation)}
      </div>
    {/if}
  </div>
</dialog>

<style lang="scss">
  .modal-root {
    border: none;
    padding: 0;
    background: transparent;
    outline: none;

    width: 100dvw;
    max-width: 100dvw;
    height: 100dvh;
    max-height: 100dvh;

    display: none;

    &[open] {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Visual backdrop */
    &::backdrop {
      background: rgba(15, 23, 42, 0.5);
      backdrop-filter: blur(2px);
    }

    &[open]::backdrop {
      animation: backdrop-in 0.22s ease forwards;
    }

    &.is-closing::backdrop {
      animation: backdrop-out 0.22s ease forwards;
    }

    /* Drawer: align panel to the right edge */
    &.drawer[open] {
      align-items: stretch;
      justify-content: flex-end;
    }

    /* Bottom-sheet: align panel to the bottom edge */
    &.bottom-sheet[open] {
      align-items: flex-end;
      justify-content: stretch;
    }
  }

  /* ================================================================
     Panel — the actual visual box
  ================================================================ */
  .panel {
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: calc(100dvh - 48px);

    /* --- Size variants (default only) --- */
    &.size-sm {
      width: min(400px, calc(100dvw - 32px));
    }
    &.size-md {
      width: min(560px, calc(100dvw - 32px));
    }
    &.size-lg {
      width: min(720px, calc(100dvw - 32px));
    }
    &.size-full {
      width: calc(100dvw - 32px);
    }
  }

  /* Default panel animations */
  .modal-root[open] .panel {
    animation: modal-in 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .modal-root.is-closing .panel {
    animation: modal-out 0.22s ease forwards;
  }

  /* Drawer panel overrides */
  .modal-root.drawer {
    overflow: hidden;
  }
  .modal-root.drawer .panel {
    border-radius: var(--radius-xl) 0 0 var(--radius-xl);
    height: 100dvh;
    max-height: 100dvh;
    width: min(440px, 92dvw);
  }
  .modal-root.drawer[open] .panel {
    animation: drawer-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .modal-root.drawer.is-closing .panel {
    animation: drawer-out 0.22s ease forwards;
  }

  /* Bottom-sheet panel overrides */
  .modal-root.bottom-sheet {
    overflow: hidden;
  }
  .modal-root.bottom-sheet .panel {
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    width: 100%;
    max-height: 85dvh;
  }
  .modal-root.bottom-sheet[open] .panel {
    animation: sheet-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .modal-root.bottom-sheet.is-closing .panel {
    animation: sheet-out 0.22s ease forwards;
  }

  /* ================================================================
     Panel inner layout
  ================================================================ */
  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }

  .panel-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-heading);
    margin: 0;
  }

  .close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    cursor: pointer;
    color: var(--text-subtle);
    border-radius: var(--radius-md);
    flex-shrink: 0;
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
  }

  .panel-body {
    padding: 20px;
    overflow-y: auto;
    flex: 1;
  }

  .panel-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 20px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }

  /* ================================================================
     Keyframes
  ================================================================ */
  @keyframes backdrop-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes backdrop-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes modal-in {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes modal-out {
    to {
      opacity: 0;
      transform: translateY(8px) scale(0.97);
    }
  }

  @keyframes drawer-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: none;
      opacity: 1;
    }
  }

  @keyframes drawer-out {
    from {
      transform: none;
      opacity: 1;
    }
    to {
      transform: translateX(35%);
      opacity: 0;
    }
  }

  @keyframes sheet-in {
    from {
      transform: translateY(100%);
      opacity: 0.6;
    }
    to {
      transform: none;
      opacity: 1;
    }
  }

  @keyframes sheet-out {
    from {
      transform: none;
      opacity: 1;
    }
    to {
      transform: translateY(50%);
      opacity: 0;
    }
  }
</style>
