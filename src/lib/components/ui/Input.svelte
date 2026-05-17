<script lang="ts">
  import type { Component } from "svelte";

  let {
    label,
    type = "text",
    placeholder = "",
    value = $bindable(""),
    error,
    hint,
    disabled = false,
    icon: Icon,
    id,
    ...restProps
  }: {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    error?: string;
    hint?: string;
    disabled?: boolean;
    icon?: Component;
    id?: string;
    [key: string]: unknown;
  } = $props();

  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 7)}`;
</script>

<div class="input-root" class:has-error={!!error} class:disabled>
  {#if label}
    <label class="input-label" for={inputId}>{label}</label>
  {/if}

  <div class="input-wrap">
    {#if Icon}
      <span class="input-icon"><Icon size={16} /></span>
    {/if}
    <input
      class="input-field"
      class:with-icon={!!Icon}
      {id}
      {type}
      {placeholder}
      {disabled}
      bind:value
      {...restProps}
    />
  </div>

  {#if error}
    <span class="input-error">{error}</span>
  {:else if hint}
    <span class="input-hint">{hint}</span>
  {/if}
</div>

<style>
  .input-root {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .input-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-base);
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 10px;
    display: flex;
    align-items: center;
    color: var(--text-subtle);
    pointer-events: none;
  }

  .input-field {
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    font-family: var(--font-sans);
    color: var(--text-base);
    background: var(--bg-base);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    outline: none;
    transition: border-color var(--transition-fast), box-shadow var(--transition-fast);

    &.with-icon { padding-left: 34px; }

    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
    }

    &::placeholder { color: var(--text-subtle); }
    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }

  .has-error .input-field {
    border-color: #dc2626;
    &:focus { box-shadow: 0 0 0 3px #fecaca; }
  }

  .input-error { font-size: 12px; color: #dc2626; }
  .input-hint { font-size: 12px; color: var(--text-subtle); }
</style>
