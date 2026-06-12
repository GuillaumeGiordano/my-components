<script lang="ts">
	import { AlertCircle, ChevronDown } from '@lucide/svelte';
	import { uniqueId } from '$lib/utils/id';

	type Option = { value: string; label: string; disabled?: boolean };

	let {
		id: _id,
		name,
		label = '',
		value = $bindable(''),
		options = [] as Option[],
		placeholder = 'Sélectionner…',
		hint = '',
		error = '',
		required = false,
		disabled = false
	}: {
		id?: string;
		name?: string;
		label?: string;
		value?: string;
		options?: Option[];
		placeholder?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
	} = $props();

	const uid = uniqueId('select');
	const id = $derived(_id ?? name ?? uid);

	const hintId = $derived(hint ? `${id}-hint` : undefined);
	const errorId = $derived(error ? `${id}-error` : undefined);
	const describedby = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);
</script>

<div class="field" class:has-error={!!error} class:is-disabled={disabled}>
	{#if label}
		<label class="label" for={id}>
			{label}
			{#if required}
				<span class="required" aria-hidden="true" title="Champ obligatoire">*</span>
			{/if}
		</label>
	{/if}

	{#if hint}
		<p id={hintId} class="hint">{hint}</p>
	{/if}

	<div class="select-wrapper">
		<select
			{id}
			{name}
			bind:value
			{disabled}
			aria-required={required}
			aria-invalid={!!error}
			aria-describedby={describedby}
			class="select"
		>
			{#if placeholder}
				<option value="" disabled selected={!value}>{placeholder}</option>
			{/if}
			{#each options as opt (opt.value)}
				<option value={opt.value} disabled={opt.disabled}>{opt.label}</option>
			{/each}
		</select>

		<span class="chevron" aria-hidden="true">
			<ChevronDown size={16} />
		</span>
	</div>

	{#if error}
		<p id={errorId} class="error-msg" role="alert">
			<AlertCircle size={14} aria-hidden="true" />
			{error}
		</p>
	{/if}
</div>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.label {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-base);
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.required {
		color: #dc2626;
		font-size: 16px;
		line-height: 1;
	}

	.hint {
		font-size: 13px;
		color: var(--text-subtle);
		margin: 0;
	}

	.select-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.select {
		width: 100%;
		height: 38px;
		padding: 0 36px 0 12px;
		font-size: 14px;
		font-family: var(--font-sans);
		color: var(--text-base);
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		outline: none;
		appearance: none;
		cursor: pointer;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast),
			background var(--transition-base);
	}

	.select:focus {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
	}

	.select:disabled {
		background: var(--bg-muted);
		color: var(--text-subtle);
		cursor: not-allowed;
	}

	.has-error .select {
		border-color: #dc2626;
	}

	.has-error .select:focus {
		border-color: #dc2626;
		box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
	}

	.chevron {
		position: absolute;
		right: 10px;
		color: var(--text-subtle);
		pointer-events: none;
		display: flex;
		align-items: center;
	}

	.error-msg {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 13px;
		color: #dc2626;
		margin: 0;
	}
</style>
