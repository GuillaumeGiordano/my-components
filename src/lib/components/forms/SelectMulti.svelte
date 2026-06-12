<script lang="ts">
	import { ChevronDown, X, Check } from '@lucide/svelte';
	import { AlertCircle } from '@lucide/svelte';
	import { uniqueId } from '$lib/utils/id';

	type Option = { value: string; label: string; disabled?: boolean };

	let {
		id: _id,
		name,
		label,
		value = $bindable([] as string[]),
		options = [] as Option[],
		placeholder = 'Sélectionner…',
		hint = '',
		error = '',
		required = false,
		disabled = false
	}: {
		id?: string;
		name?: string;
		label: string;
		value?: string[];
		options?: Option[];
		placeholder?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
	} = $props();

	const uid = uniqueId('selectmulti');
	const id = $derived(_id ?? name ?? uid);

	const listboxId = $derived(`${id}-listbox`);
	const hintId = $derived(hint ? `${id}-hint` : undefined);
	const errorId = $derived(error ? `${id}-error` : undefined);
	const describedby = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);

	let open = $state(false);
	let containerEl = $state<HTMLDivElement | null>(null);

	const selectedLabels = $derived(
		options.filter((o) => value.includes(o.value)).map((o) => o.label)
	);

	function toggle(optValue: string) {
		if (value.includes(optValue)) {
			value = value.filter((v) => v !== optValue);
		} else {
			value = [...value, optValue];
		}
	}

	function removeTag(optValue: string, e: MouseEvent) {
		e.stopPropagation();
		value = value.filter((v) => v !== optValue);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
		if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open = !open; }
	}

	$effect(() => {
		function onClickOutside(e: MouseEvent) {
			if (containerEl && !containerEl.contains(e.target as Node)) open = false;
		}
		document.addEventListener('mousedown', onClickOutside);
		return () => document.removeEventListener('mousedown', onClickOutside);
	});
</script>

<!-- Hidden inputs for form submission -->
{#each value as v (v)}
	<input type="hidden" {name} value={v} />
{/each}

<div class="field" class:has-error={!!error} bind:this={containerEl}>
	<label class="label" for={id}>
		{label}
		{#if required}
			<span class="required" aria-hidden="true" title="Champ obligatoire">*</span>
		{/if}
	</label>

	{#if hint}
		<p id={hintId} class="hint">{hint}</p>
	{/if}

	<div
		{id}
		role="combobox"
		aria-expanded={open}
		aria-haspopup="listbox"
		aria-controls={listboxId}
		aria-required={required}
		aria-invalid={!!error}
		aria-describedby={describedby}
		aria-disabled={disabled}
		tabindex={disabled ? -1 : 0}
		class="trigger"
		class:open
		class:is-disabled={disabled}
		onkeydown={handleKeydown}
		onclick={() => !disabled && (open = !open)}
	>
		<div class="trigger-content">
			{#if value.length === 0}
				<span class="placeholder">{placeholder}</span>
			{:else if value.length <= 3}
				<div class="tags">
					{#each options.filter(o => value.includes(o.value)) as opt (opt.value)}
						<span class="tag">
							{opt.label}
							<button
								type="button"
								aria-label="Retirer {opt.label}"
								class="tag-remove"
								onclick={(e) => removeTag(opt.value, e)}
							><X size={11} /></button>
						</span>
					{/each}
				</div>
			{:else}
				<span class="count-badge">{value.length} sélectionnés</span>
			{/if}
		</div>
		<ChevronDown size={16} class="chevron" />
	</div>

	{#if open}
		<ul
			id={listboxId}
			role="listbox"
			aria-multiselectable="true"
			aria-label={label}
			class="listbox"
		>
			{#each options as opt (opt.value)}
				{@const selected = value.includes(opt.value)}
				<li
					role="option"
					aria-selected={selected}
					aria-disabled={opt.disabled}
					class="option"
					class:selected
					class:opt-disabled={opt.disabled}
					onclick={() => !opt.disabled && toggle(opt.value)}
					onkeydown={(e) => e.key === 'Enter' && !opt.disabled && toggle(opt.value)}
					tabindex={opt.disabled ? -1 : 0}
				>
					<span class="option-check" aria-hidden="true">
						{#if selected}<Check size={13} />{/if}
					</span>
					{opt.label}
				</li>
			{/each}
		</ul>
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
		position: relative;
	}

	.label {
		font-size: 14px;
		font-weight: 500;
		color: var(--text-base);
		display: flex;
		align-items: center;
		gap: 3px;
	}

	.required { color: var(--danger); font-size: 16px; line-height: 1; }
	.hint { font-size: 13px; color: var(--text-subtle); margin: 0; }

	.trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		min-height: 38px;
		padding: 4px 10px 4px 12px;
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
		user-select: none;
	}

	.trigger:focus-visible,
	.trigger.open {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
		outline: none;
	}

	.has-error .trigger { border-color: var(--danger); }
	.has-error .trigger:focus-visible { box-shadow: 0 0 0 3px color-mix(in srgb, var(--danger) 20%, transparent); }

	.trigger.is-disabled { opacity: 0.5; cursor: not-allowed; }

	.trigger-content { flex: 1; min-width: 0; }

	.placeholder { font-size: 14px; color: var(--text-subtle); }

	.tags { display: flex; flex-wrap: wrap; gap: 4px; }

	.tag {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 2px 6px 2px 8px;
		background: var(--primary-subtle);
		color: var(--primary-subtle-fg);
		border-radius: var(--radius-full);
		font-size: 12px;
		font-weight: 500;
	}

	.tag-remove {
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		cursor: pointer;
		color: currentColor;
		padding: 1px;
		border-radius: var(--radius-full);
		opacity: 0.7;
		transition: opacity var(--transition-fast);
	}
	.tag-remove:hover { opacity: 1; }

	.count-badge {
		display: inline-flex;
		padding: 2px 10px;
		background: var(--primary-subtle);
		color: var(--primary-subtle-fg);
		border-radius: var(--radius-full);
		font-size: 12px;
		font-weight: 500;
	}

	.trigger :global(.chevron) {
		flex-shrink: 0;
		color: var(--text-subtle);
		transition: transform var(--transition-fast);
	}

	.trigger.open :global(.chevron) { transform: rotate(180deg); }

	.listbox {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		z-index: 50;
		list-style: none;
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		max-height: 240px;
		overflow-y: auto;
		padding: 4px;
	}

	.option {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 10px;
		border-radius: var(--radius-sm);
		font-size: 14px;
		color: var(--text-base);
		cursor: pointer;
		transition: background var(--transition-fast);
	}

	.option:hover:not(.opt-disabled) { background: var(--bg-muted); }
	.option.selected { color: var(--primary); font-weight: 500; }
	.option.opt-disabled { opacity: 0.45; cursor: not-allowed; }
	.option:focus-visible { outline: 2px solid var(--primary); outline-offset: -2px; }

	.option-check {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
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
