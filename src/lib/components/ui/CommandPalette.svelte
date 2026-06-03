<script lang="ts" module>
	export type CommandItem = {
		id:        string;
		label:     string;
		group?:    string;
		shortcut?: string;
		icon?:     string;
		action:    () => void;
	};
</script>

<script lang="ts">
	import { Search } from '@lucide/svelte';
	import { onMount, onDestroy } from 'svelte';

	let {
		items        = [] as CommandItem[],
		triggerKey   = 'k',
		placeholder  = 'Rechercher une commande…',
	}: {
		items?:       CommandItem[];
		triggerKey?:  string;
		placeholder?: string;
	} = $props();

	let open        = $state(false);
	let query       = $state('');
	let activeIdx   = $state(0);
	let inputEl:    HTMLInputElement;

	const filtered = $derived(
		query.trim()
			? items.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
			: items
	);

	$effect(() => { if (open) setTimeout(() => inputEl?.focus(), 10); });
	$effect(() => { activeIdx = 0; });  // reset on filter change

	function close() { open = false; query = ''; }
	function pick(item: CommandItem) { close(); item.action(); }

	function onKeyDown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key === triggerKey) { e.preventDefault(); open = !open; return; }
		if (!open) return;
		if (e.key === 'Escape') { close(); return; }
		if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = (activeIdx + 1) % Math.max(1, filtered.length); }
		if (e.key === 'ArrowUp')   { e.preventDefault(); activeIdx = (activeIdx - 1 + Math.max(1, filtered.length)) % Math.max(1, filtered.length); }
		if (e.key === 'Enter' && filtered[activeIdx]) pick(filtered[activeIdx]);
	}

	onMount(()  => window.addEventListener('keydown', onKeyDown));
	onDestroy(() => window.removeEventListener('keydown', onKeyDown));
</script>

{#if open}
	<div class="cp-backdrop" onclick={close} aria-hidden="true"></div>

	<div class="cp" role="dialog" aria-modal="true" aria-label="Palette de commandes">
		<div class="cp-search">
			<Search size={16} class="cp-icon" />
			<input
				bind:this={inputEl}
				bind:value={query}
				class="cp-input"
				{placeholder}
				oninput={() => (activeIdx = 0)}
				onkeydown={onKeyDown}
				autocomplete="off"
				spellcheck={false}
			/>
			<kbd class="cp-esc" onclick={close}>Esc</kbd>
		</div>

		<ul class="cp-list" role="listbox">
			{#if filtered.length === 0}
				<li class="cp-empty">Aucun résultat pour « {query} »</li>
			{:else}
				{#each filtered as item, i}
					<li
						class="cp-item"
						class:cp-item--active={i === activeIdx}
						role="option"
						aria-selected={i === activeIdx}
						onclick={() => pick(item)}
						onmouseenter={() => (activeIdx = i)}
					>
						{#if item.icon}<span class="cp-item-icon">{item.icon}</span>{/if}
						<span class="cp-item-label">{item.label}</span>
						{#if item.group}<span class="cp-item-group">{item.group}</span>{/if}
						{#if item.shortcut}<kbd class="cp-item-kbd">{item.shortcut}</kbd>{/if}
					</li>
				{/each}
			{/if}
		</ul>

		<div class="cp-footer">
			<span><kbd>↑↓</kbd> naviguer</span>
			<span><kbd>↵</kbd> sélectionner</span>
			<span><kbd>Esc</kbd> fermer</span>
		</div>
	</div>
{/if}

<style>
	.cp-backdrop {
		position: fixed; inset: 0;
		background: rgba(0,0,0,0.5);
		backdrop-filter: blur(4px);
		z-index: 9990;
		animation: cp-fade 150ms ease both;
	}

	.cp {
		position: fixed;
		top: 20%;
		left: 50%;
		transform: translateX(-50%);
		width: min(580px, calc(100vw - 32px));
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-xl, 14px);
		box-shadow: 0 24px 80px rgba(0,0,0,0.35);
		z-index: 9991;
		overflow: hidden;
		animation: cp-pop 180ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
	}

	@keyframes cp-fade { from { opacity: 0; } to { opacity: 1; } }
	@keyframes cp-pop  {
		from { opacity: 0; transform: translateX(-50%) scale(0.94) translateY(-8px); }
		to   { opacity: 1; transform: translateX(-50%) scale(1)    translateY(0); }
	}

	.cp-search {
		display: flex; align-items: center; gap: 10px;
		padding: 14px 16px;
		border-bottom: 1px solid var(--border);
	}

	:global(.cp-icon) { color: var(--text-subtle); flex-shrink: 0; }

	.cp-input {
		flex: 1;
		border: none; background: transparent; outline: none;
		font-size: 15px; color: var(--text-base);
		font-family: var(--font-sans);
		&::placeholder { color: var(--text-subtle); }
	}

	.cp-esc {
		padding: 2px 7px; border-radius: var(--radius-sm);
		border: 1px solid var(--border); background: var(--bg-subtle);
		font-size: 11px; color: var(--text-subtle); cursor: pointer;
		&:hover { background: var(--bg-hover); }
	}

	.cp-list {
		list-style: none; margin: 0; padding: 6px;
		max-height: 340px; overflow-y: auto;
	}

	.cp-item {
		display: flex; align-items: center; gap: 10px;
		padding: 9px 12px;
		border-radius: var(--radius-md);
		cursor: pointer; font-size: 13px; color: var(--text-base);
		transition: background 100ms ease;
	}

	.cp-item--active { background: var(--bg-hover); }

	.cp-item-icon  { font-size: 16px; flex-shrink: 0; }
	.cp-item-label { flex: 1; font-weight: 500; }
	.cp-item-group { font-size: 11px; color: var(--text-subtle); }
	.cp-item-kbd   {
		padding: 1px 6px; border-radius: var(--radius-sm);
		border: 1px solid var(--border); background: var(--bg-subtle);
		font-size: 11px; color: var(--text-subtle); font-family: var(--font-mono);
	}

	.cp-empty { padding: 24px; text-align: center; font-size: 13px; color: var(--text-subtle); }

	.cp-footer {
		display: flex; gap: 16px; padding: 8px 16px;
		border-top: 1px solid var(--border);
		background: var(--bg-subtle);
		font-size: 11px; color: var(--text-subtle);
	}
	.cp-footer kbd {
		padding: 1px 5px; border-radius: 3px;
		border: 1px solid var(--border); background: var(--bg-base);
		font-size: 10px; color: var(--text-muted);
	}
</style>
