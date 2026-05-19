<script lang="ts">
	import { X } from '@lucide/svelte';

	let {
		tags = $bindable<string[]>([]),
		label,
		placeholder = 'Ajouter un tag…',
		disabled = false,
		maxTags,
		error,
		hint,
		onchange,
	}: {
		tags?: string[];
		label?: string;
		placeholder?: string;
		disabled?: boolean;
		maxTags?: number;
		error?: string;
		hint?: string;
		onchange?: (tags: string[]) => void;
	} = $props();

	const uid = Math.random().toString(36).slice(2);
	let inputVal = $state('');
	let inputEl  = $state<HTMLInputElement | null>(null);

	const maxReached = $derived(maxTags !== undefined && tags.length >= maxTags);

	function addTag() {
		const tag = inputVal.trim();
		if (!tag || maxReached || tags.includes(tag)) {
			inputVal = '';
			return;
		}
		tags = [...tags, tag];
		inputVal = '';
		onchange?.(tags);
	}

	function removeTag(tag: string) {
		tags = tags.filter((t) => t !== tag);
		onchange?.(tags);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ',') {
			e.preventDefault();
			addTag();
		} else if (e.key === 'Backspace' && inputVal === '' && tags.length > 0) {
			removeTag(tags[tags.length - 1]);
		}
	}
</script>

<div class="field" class:field--error={!!error}>
	{#if label}
		<label class="field-label" for={uid}>{label}</label>
	{/if}

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="tag-wrap"
		onclick={() => inputEl?.focus()}
	>
		{#each tags as tag}
			<span class="tag">
				{tag}
				{#if !disabled}
					<button
						class="tag-remove"
						onclick={(e) => { e.stopPropagation(); removeTag(tag); }}
						aria-label="Supprimer {tag}"
					>
						<X size={11} strokeWidth={3} />
					</button>
				{/if}
			</span>
		{/each}

		{#if !maxReached && !disabled}
			<input
				id={uid}
				bind:this={inputEl}
				bind:value={inputVal}
				type="text"
				class="tag-input"
				{placeholder}
				{disabled}
				onkeydown={handleKeydown}
				onblur={addTag}
				size={Math.max(4, inputVal.length + 2)}
			/>
		{/if}
	</div>

	{#if maxReached}
		<p class="field-hint">Maximum {maxTags} tags atteint.</p>
	{:else if error}
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

	.tag-wrap {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding: 8px 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--bg-base);
		cursor: text;
		min-height: 42px;
		align-items: center;
		transition: border-color var(--transition-fast);
	}

	.tag-wrap:focus-within { border-color: var(--primary); }
	.field--error .tag-wrap { border-color: var(--danger, #ef4444); }

	.tag {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		padding: 2px 8px 2px 10px;
		border-radius: var(--radius-full);
		background: var(--primary-subtle);
		color: var(--primary-subtle-fg);
		font-size: 12px;
		font-weight: 500;
	}

	.tag-remove {
		display: flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		padding: 1px;
		cursor: pointer;
		color: inherit;
		border-radius: 50%;
		opacity: 0.6;
		transition: opacity var(--transition-fast);
	}

	.tag-remove:hover { opacity: 1; }

	.tag-input {
		border: none;
		outline: none;
		background: transparent;
		font-size: 13px;
		color: var(--text-base);
		flex: 1;
		min-width: 80px;
	}

	.tag-input::placeholder { color: var(--text-subtle); }

	.field-error { font-size: 12px; color: var(--danger, #ef4444); margin: 0; }
	.field-hint  { font-size: 12px; color: var(--text-subtle);     margin: 0; }
</style>
