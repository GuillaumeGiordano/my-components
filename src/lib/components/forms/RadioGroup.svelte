<script lang="ts">
	import { AlertCircle } from '@lucide/svelte';
	import { uniqueId } from '$lib/utils/id';

	type RadioOption = { value: string; label: string; hint?: string; disabled?: boolean };

	let {
		name,
		legend,
		value = $bindable(''),
		options = [] as RadioOption[],
		hint = '',
		error = '',
		required = false,
		disabled = false,
		orientation = 'vertical'
	}: {
		name?: string;
		legend: string;
		value?: string;
		options?: RadioOption[];
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		orientation?: 'vertical' | 'horizontal';
	} = $props();

	const uid = uniqueId('radiogroup');
	const groupId = $derived(name ?? uid);
	const hintId = $derived(hint ? `${groupId}-hint` : undefined);
	const errorId = $derived(error ? `${groupId}-error` : undefined);
	const describedby = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);
</script>

<!--
  fieldset + legend = pattern RGAA recommandé pour les groupes de radios.
  Le legend est lu par les lecteurs d'écran avant chaque option.
-->
<fieldset
	class="field"
	class:has-error={!!error}
	class:is-disabled={disabled}
	aria-describedby={describedby}
>
	<legend class="legend">
		{legend}
		{#if required}
			<span class="required" aria-hidden="true" title="Champ obligatoire">*</span>
		{/if}
	</legend>

	{#if hint}
		<p id={hintId} class="hint">{hint}</p>
	{/if}

	<div class="options" class:horizontal={orientation === 'horizontal'}>
		{#each options as opt (opt.value)}
			{@const optId = `${name}-${opt.value}`}
			<div class="option" class:is-disabled={disabled || opt.disabled}>
				<input
					id={optId}
					{name}
					type="radio"
					value={opt.value}
					bind:group={value}
					disabled={disabled || opt.disabled}
					aria-describedby={opt.hint ? `${optId}-hint` : undefined}
					class="radio"
				/>
				<div class="option-content">
					<label class="option-label" for={optId}>{opt.label}</label>
					{#if opt.hint}
						<p id="{optId}-hint" class="option-hint">{opt.hint}</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	{#if error}
		<p id={errorId} class="error-msg" role="alert">
			<AlertCircle size={14} aria-hidden="true" />
			{error}
		</p>
	{/if}
</fieldset>

<style>
	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
		border: none;
		padding: 0;
		margin: 0;
	}

	.legend {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-base);
		padding: 0;
		margin-bottom: 4px;
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.required {
		color: var(--danger);
		font-size: 16px;
		line-height: 1;
	}

	.hint {
		font-size: 13px;
		color: var(--text-subtle);
		margin: 0;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.options.horizontal {
		flex-direction: row;
		flex-wrap: wrap;
		gap: 16px;
	}

	.option {
		display: flex;
		align-items: flex-start;
		gap: 10px;
	}

	.radio {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		margin-top: 1px;
		accent-color: var(--primary);
		cursor: pointer;
		outline-offset: 2px;
	}

	.radio:focus-visible {
		outline: 2px solid var(--primary);
	}

	.radio:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.option-content {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.option-label {
		font-size: 14px;
		color: var(--text-base);
		cursor: pointer;
		line-height: 1.5;
	}

	.option.is-disabled .option-label {
		cursor: not-allowed;
		color: var(--text-subtle);
	}

	.option-hint {
		font-size: 12px;
		color: var(--text-subtle);
		margin: 0;
	}

	.error-msg {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 13px;
		color: var(--danger);
		margin: 0;
	}
</style>
