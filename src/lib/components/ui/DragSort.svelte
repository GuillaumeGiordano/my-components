<script lang="ts" generics="T">
	import type { Snippet } from 'svelte';

	let {
		items      = $bindable([] as T[]),
		renderItem,
	}: {
		items?:     T[];
		renderItem: Snippet<[T, number]>;
	} = $props();

	let dragIndex: number | null = null;
	let overIndex: number | null = null;

	function dragstart(i: number) { dragIndex = i; }

	function dragend() { dragIndex = null; overIndex = null; }

	function dragover(e: DragEvent, i: number) {
		e.preventDefault();
		if (i !== overIndex) overIndex = i;
	}

	function drop(i: number) {
		if (dragIndex === null || dragIndex === i) { dragend(); return; }
		const copy = [...items];
		const [moved] = copy.splice(dragIndex, 1);
		copy.splice(i, 0, moved);
		items    = copy;
		dragend();
	}
</script>

<ul class="ds" role="list">
	{#each items as item, i (item)}
		<li
			class="ds-item"
			class:ds-item--dragging={i === dragIndex}
			class:ds-item--over={i === overIndex && i !== dragIndex}
			draggable="true"
			ondragstart={() => dragstart(i)}
			ondragover={(e) => dragover(e, i)}
			ondrop={() => drop(i)}
			ondragend={dragend}
			role="listitem"
		>
			<span class="ds-handle" aria-hidden="true">
				<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
					<circle cx="4.5" cy="3" r="1.2"/><circle cx="9.5" cy="3" r="1.2"/>
					<circle cx="4.5" cy="7" r="1.2"/><circle cx="9.5" cy="7" r="1.2"/>
					<circle cx="4.5" cy="11" r="1.2"/><circle cx="9.5" cy="11" r="1.2"/>
				</svg>
			</span>
			<div class="ds-content">{@render renderItem(item, i)}</div>
		</li>
	{/each}
</ul>

<style>
	.ds {
		display: flex;
		flex-direction: column;
		gap: 4px;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.ds-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 14px;
		background: var(--bg-base);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		transition:
			background 150ms ease,
			border-color 150ms ease,
			opacity 150ms ease,
			transform 150ms ease;
		user-select: none;
	}

	.ds-item:hover { background: var(--bg-hover); }

	.ds-item--dragging {
		opacity: 0.35;
		transform: scale(0.98);
	}

	.ds-item--over {
		border-color: var(--primary);
		background: color-mix(in srgb, var(--primary) 6%, var(--bg-base));
	}

	.ds-handle {
		cursor: grab;
		color: var(--text-subtle);
		display: flex;
		align-items: center;
		flex-shrink: 0;

		&:active { cursor: grabbing; }
	}

	.ds-content { flex: 1; }
</style>
