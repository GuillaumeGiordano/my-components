<script lang="ts">
  import { theme, THEMES } from '../../theme.svelte';
  import { Check } from '@lucide/svelte';
</script>

<div class="theme-picker">
  <p class="picker-label">Identité visuelle</p>

  <div class="themes-grid">
    {#each THEMES as t}
      {@const active = theme.activeTheme.id === t.id}
      <button
        class="theme-card"
        class:active
        onclick={() => theme.setTheme(t.id)}
        title={t.description}
        aria-label={t.label}
        aria-pressed={active}
      >
        <!-- Mini preview -->
        <div
          class="preview"
          style="
            --pc: {t.preview.primary};
            --pr: {t.preview.radiusMd};
            --ps: {t.preview.shadowCss};
          "
        >
          <div class="preview-bar"></div>
          <div class="preview-body">
            <div class="preview-lines">
              <div class="preview-line"></div>
              <div class="preview-line short"></div>
            </div>
            <div class="preview-btn"></div>
          </div>
        </div>

        <!-- Label -->
        <div class="card-footer">
          <span class="card-name">{t.label}</span>
          {#if active}
            <span class="card-check"><Check size={10} strokeWidth={3} /></span>
          {/if}
        </div>
      </button>
    {/each}
  </div>
</div>

<style>
  .theme-picker {
    padding: 12px 12px 16px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
  }

  .picker-label {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--text-subtle);
    margin: 0 0 10px 2px;
  }

  /* 2-column grid inside the 240px sidebar */
  .themes-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }

  /* ── Card ── */
  .theme-card {
    display: flex;
    flex-direction: column;
    gap: 0;
    border: 1.5px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--bg-base);
    cursor: pointer;
    padding: 0;
    overflow: hidden;
    transition:
      border-color var(--transition-fast),
      transform var(--transition-fast),
      box-shadow var(--transition-fast);
    text-align: left;
  }

  .theme-card:hover {
    border-color: var(--border-strong);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  .theme-card.active {
    border-color: var(--primary);
    box-shadow: 0 0 0 1px var(--primary);
  }

  /* ── Mini preview ── */
  .preview {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 0 0 8px 0;
    background: var(--bg-muted);
    box-shadow: var(--ps);
    border-radius: var(--pr) var(--pr) 0 0;
    overflow: hidden;
  }

  /* Colored accent bar at top */
  .preview-bar {
    height: 4px;
    background: var(--pc);
  }

  .preview-body {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 8px;
    gap: 4px;
  }

  .preview-lines {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .preview-line {
    height: 4px;
    width: 36px;
    background: var(--border-strong);
    border-radius: 2px;
  }

  .preview-line.short {
    width: 24px;
  }

  /* Mini "button" showing color + shape */
  .preview-btn {
    height: 14px;
    width: 28px;
    background: var(--pc);
    border-radius: calc(var(--pr) * 0.6);
    flex-shrink: 0;
  }

  /* ── Card footer ── */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 7px 5px;
  }

  .card-name {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-base);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-check {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: var(--radius-full);
    background: var(--primary);
    color: var(--primary-fg);
    flex-shrink: 0;
  }
</style>
