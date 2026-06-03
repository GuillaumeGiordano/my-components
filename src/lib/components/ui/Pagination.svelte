<script lang="ts">
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';

	let {
		page        = $bindable(1),
		total,
		siblings    = 1,
		perPage     = $bindable(10),
		perPageOptions = [],
		onchange,
		onPerPageChange,
	}: {
		page?:             number;
		total:             number;
		siblings?:         number;
		/** Nombre d'items affichés par page (bindable). */
		perPage?:          number;
		/** Si non vide, affiche un sélecteur à droite de la pagination. */
		perPageOptions?:   number[];
		onchange?:         (page: number) => void;
		onPerPageChange?:  (perPage: number) => void;
	} = $props();

	function go(p: number) {
		if (p < 1 || p > total || p === page) return;
		page = p;
		onchange?.(p);
	}

	function changePerPage(e: Event) {
		const val = parseInt((e.target as HTMLSelectElement).value);
		if (val === perPage) return;
		perPage = val;
		page = 1;        // reset page quand on change le nombre d'items
		onchange?.(1);
		onPerPageChange?.(val);
	}

	// Generate the list of page numbers + "..." placeholders
	const pages = $derived((): (number | '...')[] => {
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

		const left  = Math.max(2, page - siblings);
		const right = Math.min(total - 1, page + siblings);
		const result: (number | '...')[] = [1];

		if (left > 2)          result.push('...');
		for (let i = left; i <= right; i++) result.push(i);
		if (right < total - 1) result.push('...');
		result.push(total);

		return result;
	});
</script>

<div class="pg">
	<!-- Boutons de navigation -->
	<nav class="pagination" aria-label="Pagination">
		<button
			class="page-btn page-btn--nav"
			onclick={() => go(page - 1)}
			disabled={page === 1}
			aria-label="Page précédente"
		>
			<ChevronLeft size={16} />
		</button>

		{#each pages() as p}
			{#if p === '...'}
				<span class="page-dots">…</span>
			{:else}
				<button
					class="page-btn"
					class:page-btn--active={p === page}
					onclick={() => go(p)}
					aria-label="Page {p}"
					aria-current={p === page ? 'page' : undefined}
				>
					{p}
				</button>
			{/if}
		{/each}

		<button
			class="page-btn page-btn--nav"
			onclick={() => go(page + 1)}
			disabled={page === total}
			aria-label="Page suivante"
		>
			<ChevronRight size={16} />
		</button>
	</nav>

	<!-- Sélecteur du nombre d'items par page -->
	{#if perPageOptions.length > 0}
		<label class="pg-per-page">
			<span class="pg-per-page-label">Afficher</span>
			<select
				class="pg-per-page-select"
				value={perPage}
				onchange={changePerPage}
				aria-label="Nombre d'éléments par page"
			>
				{#each perPageOptions as opt}
					<option value={opt}>{opt}</option>
				{/each}
			</select>
			<span class="pg-per-page-label">/ page</span>
		</label>
	{/if}
</div>

<style>
	/* ── Wrapper flex ── */
	.pg {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
	}

	/* ── Pagination nav (inchangé) ── */
	.pagination {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-wrap: wrap;
	}

	.page-btn {
		min-width: 36px;
		height: 36px;
		padding: 0 8px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		background: var(--bg-base);
		color: var(--text-base);
		font-size: 13px;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast),
			color var(--transition-fast);
	}

	.page-btn:hover:not(:disabled):not(.page-btn--active) {
		background: var(--bg-hover);
		border-color: var(--border-strong);
	}

	.page-btn--active {
		background: var(--primary);
		border-color: var(--primary);
		color: var(--primary-fg);
		cursor: default;
	}

	.page-btn--nav {
		color: var(--text-muted);
	}

	.page-btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.page-dots {
		min-width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-subtle);
		font-size: 13px;
		user-select: none;
	}

	/* ── Sélecteur par page ── */
	.pg-per-page {
		display: flex;
		align-items: center;
		gap: 6px;
		cursor: default;
	}

	.pg-per-page-label {
		font-size: 13px;
		color: var(--text-muted);
		white-space: nowrap;
		user-select: none;
	}

	.pg-per-page-select {
		height: 36px;
		padding: 0 28px 0 10px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		background: var(--bg-base);
		color: var(--text-base);
		font-size: 13px;
		font-family: var(--font-sans);
		cursor: pointer;
		appearance: auto;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast);

		&:hover {
			background: var(--bg-hover);
			border-color: var(--border-strong);
		}

		&:focus-visible {
			outline: 2px solid var(--primary);
			outline-offset: 2px;
		}
	}
</style>
