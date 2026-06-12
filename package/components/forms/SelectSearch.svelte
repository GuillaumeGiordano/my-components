<script lang="ts">
	import { ChevronDown, X, Search } from '@lucide/svelte';
	import { AlertCircle } from '@lucide/svelte';
	import { uniqueId } from '../../utils/id';

	type Option = { value: string; label: string; disabled?: boolean };

	let {
		id: _id,
		name,
		label,
		value = $bindable(''),
		options = [] as Option[],
		placeholder = 'Sélectionner…',
		searchPlaceholder = 'Rechercher…',
		hint = '',
		error = '',
		required = false,
		disabled = false
	}: {
		id?: string;
		name?: string;
		label: string;
		value?: string;
		options?: Option[];
		placeholder?: string;
		searchPlaceholder?: string;
		hint?: string;
		error?: string;
		required?: boolean;
		disabled?: boolean;
	} = $props();

	const uid = uniqueId('selectsearch');
	const id = $derived(_id ?? name ?? uid);

	const listboxId = $derived(`${id}-listbox`);
	const searchId = $derived(`${id}-search`);
	const hintId = $derived(hint ? `${id}-hint` : undefined);
	const errorId = $derived(error ? `${id}-error` : undefined);
	const describedby = $derived([hintId, errorId].filter(Boolean).join(' ') || undefined);

	let open = $state(false);
	let query = $state('');
	let activeIndex = $state(0);
	let containerEl = $state<HTMLDivElement | null>(null);
	let searchEl = $state<HTMLInputElement | null>(null);

	const selectedOption = $derived(options.find((o) => o.value === value));

	const filtered = $derived(
		query.trim()
			? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
			: options
	);

	function openDropdown() {
		if (disabled) return;
		open = true;
		query = '';
		activeIndex = filtered.findIndex((o) => o.value === value) ?? 0;
		// Focus the search input once the dropdown renders
		setTimeout(() => searchEl?.focus(), 0);
	}

	function closeDropdown() {
		open = false;
		query = '';
	}

	function selectOption(opt: Option) {
		if (opt.disabled) return;
		value = opt.value;
		closeDropdown();
	}

	function clearValue(e: MouseEvent) {
		e.stopPropagation();
		value = '';
	}

	function handleTriggerKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
			e.preventDefault();
			openDropdown();
		}
	}

	function handleSearchKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				activeIndex = Math.max(activeIndex - 1, 0);
				break;
			case 'Enter':
				e.preventDefault();
				if (filtered[activeIndex]) selectOption(filtered[activeIndex]);
				break;
			case 'Escape':
				closeDropdown();
				break;
			case 'Tab':
				closeDropdown();
				break;
		}
	}

	$effect(() => {
		function onClickOutside(e: MouseEvent) {
			if (containerEl && !containerEl.contains(e.target as Node)) closeDropdown();
		}
		document.addEventListener('mousedown', onClickOutside);
		return () => document.removeEventListener('mousedown', onClickOutside);
	});
</script>

<input type="hidden" {name} {value} />

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

	<!-- Trigger — hauteur fixe, identique aux autres selects -->
	<button
		{id}
		type="button"
		role="combobox"
		aria-expanded={open}
		aria-haspopup="listbox"
		aria-controls={listboxId}
		aria-required={required}
		aria-invalid={!!error}
		aria-describedby={describedby}
		{disabled}
		class="trigger"
		class:open
		onclick={openDropdown}
		onkeydown={handleTriggerKeydown}
	>
		<span class="trigger-label" class:placeholder={!selectedOption}>
			{selectedOption?.label ?? placeholder}
		</span>

		<span class="trigger-actions">
			{#if value && !disabled}
				<span
					role="button"
					tabindex="0"
					aria-label="Effacer la sélection"
					class="clear-btn"
					onmousedown={(e) => { e.stopPropagation(); clearValue(e); }}
					onkeydown={(e) => e.key === 'Enter' && clearValue(e as unknown as MouseEvent)}
				>
					<X size={13} />
				</span>
			{/if}
			<ChevronDown size={16} class="chevron" />
		</span>
	</button>

	<!-- Dropdown avec recherche intégrée -->
	{#if open}
		<div id={listboxId} class="dropdown" role="dialog" aria-label="Rechercher dans {label}">
			<!-- Barre de recherche dans la liste -->
			<div class="search-bar">
				<Search size={14} class="search-icon" />
				<input
					bind:this={searchEl}
					id={searchId}
					type="text"
					role="searchbox"
					aria-label="Rechercher dans {label}"
					aria-controls="{listboxId}-list"
					class="search-input"
					placeholder={searchPlaceholder}
					bind:value={query}
					oninput={() => (activeIndex = 0)}
					onkeydown={handleSearchKeydown}
				/>
			</div>

			<ul id="{listboxId}-list" role="listbox" aria-label={label} class="listbox">
				{#if filtered.length === 0}
					<li class="no-results" aria-live="polite">Aucun résultat</li>
				{:else}
					{#each filtered as opt, i (opt.value)}
						<li
							role="option"
							aria-selected={opt.value === value}
							aria-disabled={opt.disabled}
							class="option"
							class:active={i === activeIndex}
							class:selected={opt.value === value}
							class:opt-disabled={opt.disabled}
							onmousedown={(e) => { e.preventDefault(); selectOption(opt); }}
							onmouseenter={() => (activeIndex = i)}
						>
							{opt.label}
						</li>
					{/each}
				{/if}
			</ul>
		</div>
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

	/* Trigger — même hauteur que Select natif */
	.trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		width: 100%;
		height: 38px;
		padding: 0 10px 0 12px;
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-family: var(--font-sans);
		text-align: left;
		transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
	}

	.trigger:focus-visible,
	.trigger.open {
		border-color: var(--primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 20%, transparent);
		outline: none;
	}

	.has-error .trigger { border-color: var(--danger); }
	.has-error .trigger.open { box-shadow: 0 0 0 3px color-mix(in srgb, var(--danger) 20%, transparent); }

	.trigger:disabled { opacity: 0.5; cursor: not-allowed; }

	.trigger-label {
		flex: 1;
		font-size: 14px;
		color: var(--text-base);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.trigger-label.placeholder { color: var(--text-subtle); }

	.trigger-actions {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-shrink: 0;
	}

	.clear-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2px;
		color: var(--text-subtle);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: color var(--transition-fast);
	}
	.clear-btn:hover { color: var(--text-base); }

	.trigger :global(.chevron) {
		color: var(--text-subtle);
		transition: transform var(--transition-fast);
	}
	.trigger.open :global(.chevron) { transform: rotate(180deg); }

	/* Dropdown */
	.dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		z-index: 50;
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
		overflow: hidden;
	}

	/* Barre de recherche en haut du dropdown */
	.search-bar {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 10px;
		border-bottom: 1px solid var(--border);
	}

	.search-bar :global(.search-icon) {
		flex-shrink: 0;
		color: var(--text-subtle);
	}

	.search-input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		font-size: 13px;
		font-family: var(--font-sans);
		color: var(--text-base);
	}

	.search-input::placeholder { color: var(--text-subtle); }

	.listbox {
		list-style: none;
		max-height: 200px;
		overflow-y: auto;
		padding: 4px;
	}

	.no-results {
		padding: 10px 12px;
		font-size: 13px;
		color: var(--text-subtle);
		text-align: center;
	}

	.option {
		padding: 8px 12px;
		border-radius: var(--radius-sm);
		font-size: 14px;
		color: var(--text-base);
		cursor: pointer;
		transition: background var(--transition-fast);
	}

	.option.active,
	.option:hover:not(.opt-disabled) { background: var(--bg-muted); }
	.option.selected { color: var(--primary); font-weight: 500; }
	.option.opt-disabled { opacity: 0.45; cursor: not-allowed; }

	.error-msg {
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 13px;
		color: var(--danger);
		margin: 0;
	}
</style>
