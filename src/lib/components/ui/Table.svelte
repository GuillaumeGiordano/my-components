<script lang="ts" generics="T extends Record<string, unknown>">
	import type { Snippet } from 'svelte';
	import { ChevronUp, ChevronDown, ChevronsUpDown } from '@lucide/svelte';

	type Column<R> = {
		key: keyof R;
		label: string;
		sortable?: boolean;
		width?: string;
		align?: 'left' | 'center' | 'right';
		cell?: Snippet<[R]>;
	};

	type SortDir = 'asc' | 'desc';

	let {
		columns,
		rows,
		selectable = false,
		striped = false,
		stickyHeader = false,
		emptyLabel = 'Aucune donnée à afficher.',
		selected = $bindable<T[]>([]),
		onrowclick,
		manualSort = false,
		sortKey = $bindable<keyof T | null>(null),
		sortDir = $bindable<SortDir>('asc'),
		onsort,
	}: {
		columns: Column<T>[];
		rows: T[];
		selectable?: boolean;
		striped?: boolean;
		stickyHeader?: boolean;
		emptyLabel?: string;
		selected?: T[];
		onrowclick?: (row: T) => void;
		/**
		 * Server-side ("manual") sorting. When true, the table does NOT sort `rows` itself
		 * (the backend already returned them sorted); it only reflects `sortKey`/`sortDir`
		 * and calls `onsort` on header click so the parent can refetch. Default: client sort.
		 */
		manualSort?: boolean;
		/** Current sort column (bindable). In manual mode, controlled by the parent. */
		sortKey?: keyof T | null;
		/** Current sort direction (bindable). */
		sortDir?: SortDir;
		/** Fired when a sortable header is clicked, with the next sort state. */
		onsort?: (key: keyof T, dir: SortDir) => void;
	} = $props();

	function toggleSort(key: keyof T) {
		const dir: SortDir = sortKey === key && sortDir === 'asc' ? 'desc' : 'asc';
		sortKey = key;
		sortDir = dir;
		onsort?.(key, dir);
	}

	// Manual mode: rows are already sorted by the backend. Otherwise, sort client-side.
	const sorted = $derived.by((): T[] => {
		if (manualSort || !sortKey) return rows;
		return [...rows].sort((a, b) => {
			const av = a[sortKey!];
			const bv = b[sortKey!];
			const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
			return sortDir === 'asc' ? cmp : -cmp;
		});
	});

	// Selection helpers
	const allSelected  = $derived(rows.length > 0 && selected.length === rows.length);
	const someSelected = $derived(selected.length > 0 && selected.length < rows.length);

	function toggleAll() {
		selected = allSelected ? [] : [...rows];
	}

	function toggleRow(row: T) {
		if (selected.includes(row)) {
			selected = selected.filter((r) => r !== row);
		} else {
			selected = [...selected, row];
		}
	}
</script>

<div class="table-wrap">
	<table class="table" class:table--striped={striped}>
		<thead class:sticky={stickyHeader}>
			<tr>
				{#if selectable}
					<th class="th th--check">
						<input
							type="checkbox"
							checked={allSelected}
							indeterminate={someSelected}
							onchange={toggleAll}
							aria-label="Tout sélectionner"
						/>
					</th>
				{/if}
				{#each columns as col (col.key)}
					<th
						class="th"
						class:th--sortable={col.sortable}
						style:width={col.width}
						style:text-align={col.align ?? 'left'}
						onclick={col.sortable ? () => toggleSort(col.key) : undefined}
						aria-sort={
							sortKey === col.key
								? sortDir === 'asc' ? 'ascending' : 'descending'
								: col.sortable ? 'none' : undefined
						}
					>
						<span class="th-inner">
							{col.label}
							{#if col.sortable}
								<span class="sort-icon">
									{#if sortKey === col.key}
										{#if sortDir === 'asc'}
											<ChevronUp size={14} />
										{:else}
											<ChevronDown size={14} />
										{/if}
									{:else}
										<ChevronsUpDown size={14} />
									{/if}
								</span>
							{/if}
						</span>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#if sorted.length === 0}
				<tr>
					<td
						class="td td--empty"
						colspan={selectable ? columns.length + 1 : columns.length}
					>
						{emptyLabel}
					</td>
				</tr>
			{:else}
				{#each sorted as row, i (i)}
					<tr
						class="tr"
						class:tr--selected={selected.includes(row)}
						class:tr--clickable={!!onrowclick}
						onclick={() => onrowclick?.(row)}
					>
						{#if selectable}
							<td class="td td--check" onclick={(e) => { e.stopPropagation(); toggleRow(row); }}>
								<input
									type="checkbox"
									checked={selected.includes(row)}
									onchange={() => toggleRow(row)}
									aria-label="Sélectionner la ligne"
								/>
							</td>
						{/if}
						{#each columns as col (col.key)}
							<td class="td" style:text-align={col.align ?? 'left'}>
								{#if col.cell}
									{@render col.cell(row)}
								{:else}
									{row[col.key] ?? '—'}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style>
	.table-wrap {
		width: 100%;
		overflow-x: auto;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
	}

	.table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
	}

	/* ---- Header --------------------------------------------------------- */
	thead { background: var(--bg-subtle); }

	.sticky { position: sticky; top: 0; z-index: 1; }

	.th {
		padding: 10px 14px;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-subtle);
		border-bottom: 1px solid var(--border);
		white-space: nowrap;
		user-select: none;
	}

	.th--check { width: 40px; }

	.th--sortable {
		cursor: pointer;
	}

	.th--sortable:hover { color: var(--text-base); }

	.th-inner {
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}

	.sort-icon { color: var(--text-subtle); display: flex; }

	/* ---- Body ----------------------------------------------------------- */
	.tr { border-bottom: 1px solid var(--border); }
	.tr:last-child { border-bottom: none; }

	.tr--clickable { cursor: pointer; }

	.tr:hover { background: var(--bg-subtle); }
	.tr--selected { background: var(--primary-subtle) !important; }

	.table--striped .tr:nth-child(even) { background: var(--bg-subtle); }
	.table--striped .tr:nth-child(even):hover { background: var(--bg-hover); }

	.td {
		padding: 12px 14px;
		color: var(--text-base);
		vertical-align: middle;
	}

	.td--check { width: 40px; }

	.td--empty {
		text-align: center;
		color: var(--text-subtle);
		padding: 40px;
	}

	/* Checkbox reset */
	input[type='checkbox'] {
		width: 15px;
		height: 15px;
		cursor: pointer;
		accent-color: var(--primary);
	}
</style>
