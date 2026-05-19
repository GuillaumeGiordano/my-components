<script lang="ts">
	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		label,
		showValue = true,
		formatValue,
		disabled = false,
		hint,
		onchange,
	}: {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		label?: string;
		showValue?: boolean;
		formatValue?: (v: number) => string;
		disabled?: boolean;
		hint?: string;
		onchange?: (v: number) => void;
	} = $props();

	const uid = Math.random().toString(36).slice(2);

	const pct = $derived(((value - min) / (max - min)) * 100);
	const display = $derived(formatValue ? formatValue(value) : String(value));

	function handleInput(e: Event) {
		value = parseFloat((e.target as HTMLInputElement).value);
		onchange?.(value);
	}
</script>

<div class="field" class:field--disabled={disabled}>
	{#if label || showValue}
		<div class="field-header">
			{#if label}
				<label class="field-label" for={uid}>{label}</label>
			{/if}
			{#if showValue}
				<span class="field-value">{display}</span>
			{/if}
		</div>
	{/if}

	<div class="slider-wrap">
		<div class="slider-track">
			<div class="slider-fill" style:width="{pct}%"></div>
		</div>
		<input
			id={uid}
			type="range"
			class="slider-input"
			bind:value
			{min}
			{max}
			{step}
			{disabled}
			oninput={handleInput}
			style:--pct="{pct}%"
		/>
	</div>

	{#if hint}
		<p class="field-hint">{hint}</p>
	{/if}
</div>

<style>
	.field { display: flex; flex-direction: column; gap: 8px; }
	.field--disabled { opacity: 0.5; pointer-events: none; }

	.field-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.field-label {
		font-size: 13px;
		font-weight: 600;
		color: var(--text-base);
	}

	.field-value {
		font-size: 13px;
		font-weight: 700;
		color: var(--primary);
		min-width: 32px;
		text-align: right;
	}

	/* Track wrapper positions the real input over the visual track */
	.slider-wrap {
		position: relative;
		height: 20px;
		display: flex;
		align-items: center;
	}

	.slider-track {
		position: absolute;
		inset: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 6px;
		background: var(--bg-hover);
		border-radius: var(--radius-full);
		overflow: hidden;
		pointer-events: none;
	}

	.slider-fill {
		height: 100%;
		background: var(--primary);
		border-radius: var(--radius-full);
		transition: width 0.05s linear;
	}

	/* Real input — transparent, sits on top */
	.slider-input {
		position: relative;
		width: 100%;
		height: 100%;
		appearance: none;
		background: transparent;
		cursor: pointer;
		outline: none;
		margin: 0;
	}

	.slider-input::-webkit-slider-thumb {
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--primary);
		border: 2px solid #fff;
		box-shadow: var(--shadow-sm);
		cursor: pointer;
		transition: transform var(--transition-fast), box-shadow var(--transition-fast);
	}

	.slider-input::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--primary);
		border: 2px solid #fff;
		box-shadow: var(--shadow-sm);
		cursor: pointer;
	}

	.slider-input:hover::-webkit-slider-thumb,
	.slider-input:focus::-webkit-slider-thumb {
		transform: scale(1.2);
		box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary) 20%, transparent);
	}

	.field-hint {
		font-size: 12px;
		color: var(--text-subtle);
		margin: 0;
	}
</style>
