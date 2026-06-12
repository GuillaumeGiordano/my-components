<script lang="ts">
	import type { Component } from 'svelte';
	import { AlertCircle, Eye, EyeOff } from '@lucide/svelte';
	import { uniqueId } from '$lib/utils/id';

	type InputType =
		| 'text'
		| 'email'
		| 'password'
		| 'number'
		| 'tel'
		| 'url'
		| 'search'
		| 'date'
		| 'time';

	let {
		id: _id,
		name,
		label = '',
		type = 'text',
		value = $bindable(''),
		placeholder = '',
		hint = '',
		error = '',
		required = false,
		disabled = false,
		readonly = false,
		icon: IconLeft,
		iconRight: IconRight,
		autocomplete,
		minlength,
		maxlength,
		min,
		max,
		pattern
	}: {
		id?: string;
		name?: string;
		label?: string;
		type?: InputType;
		value?: string;
		placeholder?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		icon?: Component;
		iconRight?: Component;
		autocomplete?: string;
		minlength?: number;
		maxlength?: number;
		min?: string | number;
		max?: string | number;
		pattern?: string;
	} = $props();

	const uid = uniqueId('input');
	const id = $derived(_id ?? name ?? uid);

	const hintId = $derived(hint ? `${id}-hint` : undefined);
	const errorId = $derived(error ? `${id}-error` : undefined);
	const describedby = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);

	// Password visibility toggle
	let showPassword = $state(false);
	const resolvedType = $derived(type === 'password' && showPassword ? 'text' : type);
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

	<div class="input-wrapper">
		{#if IconLeft}
			<span class="icon icon-left" aria-hidden="true">
				<IconLeft size={16} />
			</span>
		{/if}

		<input
			{id}
			{name}
			type={resolvedType}
			bind:value
			{placeholder}
			{disabled}
			{readonly}
			{autocomplete}
			aria-required={required}
			aria-invalid={!!error}
			aria-describedby={describedby}
			class="input"
			class:has-icon-left={!!IconLeft}
			class:has-icon-right={!!IconRight || type === 'password'}
		/>

		{#if type === 'password'}
			<button
				type="button"
				class="icon icon-right icon-btn"
				aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
				onclick={() => (showPassword = !showPassword)}
			>
				{#if showPassword}
					<EyeOff size={16} />
				{:else}
					<Eye size={16} />
				{/if}
			</button>
		{:else if IconRight}
			<span class="icon icon-right" aria-hidden="true">
				<IconRight size={16} />
			</span>
		{/if}
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

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.input {
		width: 100%;
		height: 38px;
		padding: 0 12px;
		font-size: 14px;
		font-family: var(--font-sans);
		color: var(--text-base);
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		outline: none;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast),
			background var(--transition-base);
	}

	.input::placeholder {
		color: var(--text-subtle);
	}

	.input:focus {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
	}

	.input:disabled {
		background: var(--bg-muted);
		color: var(--text-subtle);
		cursor: not-allowed;
	}

	.input[readonly] {
		background: var(--bg-subtle);
		cursor: default;
	}

	/* Error state */
	.has-error .input {
		border-color: #dc2626;
	}

	.has-error .input:focus {
		border-color: #dc2626;
		box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
	}

	/* Icons */
	.input.has-icon-left  { padding-left: 36px; }
	.input.has-icon-right { padding-right: 36px; }

	.icon {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-subtle);
		pointer-events: none;
	}

	.icon-left  { left: 10px; }
	.icon-right { right: 10px; }

	.icon-btn {
		pointer-events: auto;
		background: transparent;
		border: none;
		cursor: pointer;
		border-radius: var(--radius-sm);
		padding: 2px;
		transition: color var(--transition-fast), background var(--transition-fast);
	}

	.icon-btn:hover {
		color: var(--text-base);
		background: var(--bg-hover);
	}

	/* Focus ring visible au clavier (pas souris) */
	.icon-btn:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: 1px;
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
