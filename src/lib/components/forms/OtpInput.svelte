<script lang="ts">
	let {
		value = $bindable(''),
		length = 6,
		label,
		error,
		hint,
		disabled = false,
		onComplete,
	}: {
		value?: string;
		length?: number;
		label?: string;
		error?: string;
		hint?: string;
		disabled?: boolean;
		onComplete?: (v: string) => void;
	} = $props();

	let inputs = $state<HTMLInputElement[]>([]);
	// Digits array derived from value
	let digits = $state<string[]>(Array.from({ length }, (_, i) => value[i] ?? ''));

	function sync() {
		value = digits.join('');
		if (value.length === length) onComplete?.(value);
	}

	function handleInput(e: Event, i: number) {
		const input = e.target as HTMLInputElement;
		const char  = input.value.replace(/\D/g, '').slice(-1);
		digits[i] = char;
		digits = [...digits]; // trigger reactivity
		sync();
		if (char && i < length - 1) inputs[i + 1]?.focus();
	}

	function handleKeydown(e: KeyboardEvent, i: number) {
		if (e.key === 'Backspace') {
			if (digits[i]) {
				digits[i] = '';
				digits = [...digits];
				sync();
			} else if (i > 0) {
				inputs[i - 1]?.focus();
			}
		} else if (e.key === 'ArrowLeft' && i > 0) {
			inputs[i - 1]?.focus();
		} else if (e.key === 'ArrowRight' && i < length - 1) {
			inputs[i + 1]?.focus();
		}
	}

	function handlePaste(e: ClipboardEvent) {
		e.preventDefault();
		const pasted = e.clipboardData?.getData('text').replace(/\D/g, '').slice(0, length) ?? '';
		digits = Array.from({ length }, (_, i) => pasted[i] ?? '');
		sync();
		const focusIdx = Math.min(pasted.length, length - 1);
		inputs[focusIdx]?.focus();
	}
</script>

<div class="field" class:field--error={!!error}>
	{#if label}
		<label class="field-label">{label}</label>
	{/if}

	<div class="otp-group" role="group" aria-label={label ?? 'Code de vérification'}>
		{#each { length } as _, i}
			<input
				bind:this={inputs[i]}
				type="text"
				inputmode="numeric"
				maxlength="1"
				class="otp-box"
				class:otp-box--filled={!!digits[i]}
				value={digits[i]}
				{disabled}
				oninput={(e) => handleInput(e, i)}
				onkeydown={(e) => handleKeydown(e, i)}
				onpaste={handlePaste}
				onclick={(e) => (e.target as HTMLInputElement).select()}
				aria-label="Chiffre {i + 1}"
			/>
			{#if i === Math.floor(length / 2) - 1 && length % 2 === 0}
				<span class="otp-sep">—</span>
			{/if}
		{/each}
	</div>

	{#if error}
		<p class="field-error">{error}</p>
	{:else if hint}
		<p class="field-hint">{hint}</p>
	{/if}
</div>

<style>
	.field { display: flex; flex-direction: column; gap: 8px; }

	.field-label {
		font-size: 13px;
		font-weight: 600;
		color: var(--text-base);
	}

	.otp-group {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.otp-box {
		width: 44px;
		height: 52px;
		text-align: center;
		font-size: 20px;
		font-weight: 700;
		color: var(--text-heading);
		border: 2px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--bg-base);
		outline: none;
		transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
		caret-color: transparent;
	}

	.otp-box:focus {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
	}

	.otp-box--filled { border-color: var(--border-strong); }

	.field--error .otp-box {
		border-color: var(--danger, #ef4444);
	}

	.otp-sep {
		color: var(--text-subtle);
		font-size: 18px;
		user-select: none;
	}

	.field-error { font-size: 12px; color: var(--danger, #ef4444); margin: 0; }
	.field-hint  { font-size: 12px; color: var(--text-subtle);     margin: 0; }
</style>
