<script lang="ts">
	import { Minus, Plus } from '@lucide/svelte';

	let {
		value = $bindable(0),
		min,
		max,
		step = 1,
		label,
		disabled = false,
		error,
		hint,
		onchange,
	}: {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		label?: string;
		disabled?: boolean;
		error?: string;
		hint?: string;
		onchange?: (v: number) => void;
	} = $props();

	const uid = Math.random().toString(36).slice(2);

	function clamp(v: number): number {
		let n = v;
		if (min !== undefined) n = Math.max(min, n);
		if (max !== undefined) n = Math.min(max, n);
		return n;
	}

	function increment() {
		if (disabled) return;
		value = clamp(value + step);
		onchange?.(value);
	}

	function decrement() {
		if (disabled) return;
		value = clamp(value - step);
		onchange?.(value);
	}

	function handleInput(e: Event) {
		const raw = parseFloat((e.target as HTMLInputElement).value);
		if (!isNaN(raw)) {
			value = clamp(raw);
			onchange?.(value);
		}
	}

	const canDecrement = $derived(min === undefined || value > min);
	const canIncrement = $derived(max === undefined || value < max);
</script>

<div class="field" class:field--error={!!error}>
	{#if label}
		<label class="field-label" for={uid}>{label}</label>
	{/if}

	<div class="number-wrap">
		<button
			class="stepper-btn"
			onclick={decrement}
			disabled={disabled || !canDecrement}
			tabindex="-1"
			aria-label="Diminuer"
		>
			<Minus size={14} />
		</button>

		<input
			id={uid}
			type="number"
			class="number-input"
			bind:value
			{min}
			{max}
			{step}
			{disabled}
			oninput={handleInput}
			aria-invalid={!!error}
		/>

		<button
			class="stepper-btn"
			onclick={increment}
			disabled={disabled || !canIncrement}
			tabindex="-1"
			aria-label="Augmenter"
		>
			<Plus size={14} />
		</button>
	</div>

	{#if error}
		<p class="field-error">{error}</p>
	{:else if hint}
		<p class="field-hint">{hint}</p>
	{/if}
</div>

<style>
	.field { display: flex; flex-direction: column; gap: 6px; }

	.field-label {
		font-size: 13px;
		font-weight: 600;
		color: var(--text-base);
	}

	.number-wrap {
		display: inline-flex;
		align-items: stretch;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--bg-base);
		transition: border-color var(--transition-fast);
		width: fit-content;
	}

	.number-wrap:focus-within { border-color: var(--primary); }
	.field--error .number-wrap { border-color: var(--danger, #ef4444); }

	.stepper-btn {
		width: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--bg-subtle);
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		transition: background var(--transition-fast), color var(--transition-fast);
		flex-shrink: 0;
	}

	.stepper-btn:hover:not(:disabled) {
		background: var(--bg-hover);
		color: var(--text-base);
	}

	.stepper-btn:disabled { opacity: 0.4; cursor: not-allowed; }

	.number-input {
		width: 72px;
		height: 38px;
		text-align: center;
		border: none;
		border-left: 1px solid var(--border);
		border-right: 1px solid var(--border);
		background: transparent;
		font-size: 14px;
		font-weight: 600;
		color: var(--text-base);
		outline: none;
		-moz-appearance: textfield;
	}

	.number-input::-webkit-inner-spin-button,
	.number-input::-webkit-outer-spin-button { -webkit-appearance: none; }

	.field-error { font-size: 12px; color: var(--danger, #ef4444); margin: 0; }
	.field-hint  { font-size: 12px; color: var(--text-subtle);     margin: 0; }
</style>
