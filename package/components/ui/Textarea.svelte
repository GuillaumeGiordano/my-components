<script lang="ts">
  let {
    label,
    placeholder = "",
    value = $bindable(""),
    error,
    hint,
    disabled = false,
    rows = 4,
    id,
    ...restProps
  }: {
    label?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    hint?: string;
    disabled?: boolean;
    rows?: number;
    id?: string;
    [key: string]: unknown;
  } = $props();

  const inputId = id ?? `textarea-${Math.random().toString(36).slice(2, 7)}`;
</script>

<div class="textarea-root" class:has-error={!!error} class:disabled>
  {#if label}
    <label class="textarea-label" for={inputId}>{label}</label>
  {/if}
  <textarea
    class="textarea-field"
    {id}
    {placeholder}
    {disabled}
    {rows}
    bind:value
    {...restProps}
  ></textarea>
  {#if error}
    <span class="textarea-error">{error}</span>
  {:else if hint}
    <span class="textarea-hint">{hint}</span>
  {/if}
</div>

<style>
  .textarea-root {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .textarea-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-base);
  }

  .textarea-field {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    font-family: var(--font-sans);
    color: var(--text-base);
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    outline: none;
    resize: vertical;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);

    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
    }

    &::placeholder { color: var(--text-subtle); }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }

  .has-error .textarea-field {
    border-color: #dc2626;
    &:focus { box-shadow: 0 0 0 3px #fecaca; }
  }

  .textarea-error { font-size: 12px; color: #dc2626; }
  .textarea-hint { font-size: 12px; color: var(--text-subtle); }
</style>
