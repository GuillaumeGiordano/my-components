<script lang="ts">
	import { AlertCircle } from '@lucide/svelte';
	import { uniqueId } from '../../utils/id';

	let {
		id: _id,
		name,
		label,
		value = $bindable(''),
		placeholder = '',
		hint = '',
		error = '',
		required = false,
		disabled = false,
		readonly = false,
		rows = 4,
		maxlength,
		resize = 'vertical'
	}: {
		id?: string;
		name?: string;
		label: string;
		value?: string;
		placeholder?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		rows?: number;
		maxlength?: number;
		resize?: 'none' | 'vertical' | 'horizontal' | 'both';
	} = $props();

	const id = _id ?? name ?? uniqueId('textarea');

	const hintId = hint ? `${id}-hint` : undefined;
	const errorId = error ? `${id}-error` : undefined;
	const describedby = [hintId, errorId].filter(Boolean).join(' ') || undefined;

	const charCount = $derived(value.length);
</script>

<div class="field" class:has-error={!!error} class:is-disabled={disabled}>
	<div class="label-row">
		<label class="label" for={id}>
			{label}
			{#if required}
				<span class="required" aria-hidden="true" title="Champ obligatoire">*</span>
			{/if}
		</label>

		{#if maxlength}
			<span class="char-count" aria-live="polite" aria-label="{charCount} sur {maxlength} caractères">
				{charCount}<span aria-hidden="true">/{maxlength}</span>
			</span>
		{/if}
	</div>

	{#if hint}
		<p id={hintId} class="hint">{hint}</p>
	{/if}

	<textarea
		{id}
		{name}
		bind:value
		{placeholder}
		{disabled}
		{readonly}
		{rows}
		aria-required={required}
		aria-invalid={!!error}
		aria-describedby={describedby}
		class="textarea"
		style="resize: {resize}"
	></textarea>

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

	.label-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 8px;
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

	.char-count {
		font-size: 12px;
		color: var(--text-subtle);
		font-variant-numeric: tabular-nums;
	}

	.hint {
		font-size: 13px;
		color: var(--text-subtle);
		margin: 0;
	}

	.textarea {
		width: 100%;
		padding: 10px 12px;
		font-size: 14px;
		font-family: var(--font-sans);
		color: var(--text-base);
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		outline: none;
		line-height: 1.5;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast),
			background var(--transition-base);
	}

	.textarea::placeholder {
		color: var(--text-subtle);
	}

	.textarea:focus {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
	}

	.textarea:disabled {
		background: var(--bg-muted);
		color: var(--text-subtle);
		cursor: not-allowed;
	}

	.textarea[readonly] {
		background: var(--bg-subtle);
		cursor: default;
	}

	.has-error .textarea {
		border-color: #dc2626;
	}

	.has-error .textarea:focus {
		border-color: #dc2626;
		box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
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
