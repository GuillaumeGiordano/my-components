<script lang="ts">
	import { AlertCircle } from '@lucide/svelte';
	import { uniqueId } from '$lib/utils/id';

	let {
		id: _id,
		name,
		label,
		checked = $bindable(false),
		hint = '',
		error = '',
		required = false,
		disabled = false,
		indeterminate = false
	}: {
		id?: string;
		name?: string;
		label: string;
		checked?: boolean;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		indeterminate?: boolean;
	} = $props();

	const uid = uniqueId('checkbox');
	const id = $derived(_id ?? name ?? uid);

	const hintId = $derived(hint ? `${id}-hint` : undefined);
	const errorId = $derived(error ? `${id}-error` : undefined);
	const describedby = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);

	// indeterminate must be set via DOM property, not HTML attribute
	let inputEl = $state<HTMLInputElement | null>(null);
	$effect(() => {
		if (inputEl) inputEl.indeterminate = indeterminate;
	});
</script>

<div class="field" class:has-error={!!error} class:is-disabled={disabled}>
	<div class="checkbox-row">
		<input
			bind:this={inputEl}
			{id}
			{name}
			type="checkbox"
			bind:checked
			{disabled}
			aria-required={required}
			aria-invalid={!!error}
			aria-describedby={describedby}
			class="checkbox"
		/>
		<label class="label" for={id}>
			{label}
			{#if required}
				<span class="required" aria-hidden="true" title="Champ obligatoire">*</span>
			{/if}
		</label>
	</div>

	{#if hint}
		<p id={hintId} class="hint">{hint}</p>
	{/if}

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

	.checkbox-row {
		display: flex;
		align-items: flex-start;
		gap: 10px;
	}

	.checkbox {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		margin-top: 1px; /* optical alignment with label text */
		accent-color: var(--primary);
		cursor: pointer;
		border-radius: var(--radius-sm);
		outline-offset: 2px;
	}

	.checkbox:focus-visible {
		outline: 2px solid var(--primary);
	}

	.checkbox:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.label {
		font-size: 14px;
		color: var(--text-base);
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 3px;
		line-height: 1.5;
	}

	.is-disabled .label {
		cursor: not-allowed;
		color: var(--text-subtle);
	}

	.required {
		color: var(--danger);
		font-size: 16px;
		line-height: 1;
	}

	.hint {
		font-size: 13px;
		color: var(--text-subtle);
		margin: 0 0 0 28px;
	}

	.error-msg {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 13px;
		color: var(--danger);
		margin: 0 0 0 28px;
	}
</style>
