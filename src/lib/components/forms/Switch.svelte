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
		labelPosition = 'right'
	}: {
		id?: string;
		name?: string;
		label: string;
		checked?: boolean;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
		labelPosition?: 'left' | 'right';
	} = $props();

	const uid = uniqueId('switch');
	const id = $derived(_id ?? name ?? uid);

	const hintId = $derived(hint ? `${id}-hint` : undefined);
	const errorId = $derived(error ? `${id}-error` : undefined);
	const describedby = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);
</script>

<div class="field" class:has-error={!!error} class:is-disabled={disabled}>
	<div class="switch-row" class:label-left={labelPosition === 'left'}>
		<!--
			Utilise un <button role="switch"> pour couvrir le pattern ARIA switch.
			Un <input type="checkbox"> stylisé est une alternative valide,
			mais role="switch" est plus sémantique pour un toggle.
		-->
		<button
			{id}
			{name}
			type="button"
			role="switch"
			aria-checked={checked}
			aria-required={required}
			aria-describedby={describedby}
			{disabled}
			class="switch"
			class:checked
			onclick={() => (checked = !checked)}
		>
			<span class="thumb"></span>
			<span class="sr-only">{label}</span>
		</button>

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

	.switch-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.switch-row.label-left {
		flex-direction: row-reverse;
		justify-content: flex-end;
	}

	/* The switch track */
	.switch {
		position: relative;
		display: inline-flex;
		align-items: center;
		width: 44px;
		height: 24px;
		flex-shrink: 0;
		padding: 0;
		border: 2px solid var(--border);
		border-radius: var(--radius-full);
		background: var(--bg-hover);
		cursor: pointer;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast);
	}

	.switch:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: 2px;
	}

	.switch.checked {
		background: var(--primary);
		border-color: var(--primary);
	}

	.switch:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	/* The thumb */
	.thumb {
		position: absolute;
		left: 2px;
		width: 16px;
		height: 16px;
		border-radius: var(--radius-full);
		background: #fff;
		box-shadow: var(--shadow-sm);
		transition: transform var(--transition-fast);
	}

	.switch.checked .thumb {
		transform: translateX(20px);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		/* margin:-1px + clip-path are what actually keep the box out of the
		   layout: clip:rect() alone hides the text but the 1px box could still
		   widen the document on mobile (visually-hidden pattern). */
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}

	.label {
		font-size: 14px;
		color: var(--text-base);
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 3px;
		line-height: 1.5;
		user-select: none;
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
		margin: 0 0 0 54px;
	}

	.error-msg {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 13px;
		color: var(--danger);
		margin: 0 0 0 54px;
	}
</style>
