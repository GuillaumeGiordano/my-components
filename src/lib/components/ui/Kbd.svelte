<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		keys,
		children,
		size = 'md',
	}: {
		keys?: string[];   // ['⌘', 'K'] — renders joined with +
		children?: Snippet; // or freeform slot
		size?: 'sm' | 'md';
	} = $props();
</script>

<span class="kbd-group kbd-group--{size}">
	{#if keys}
		{#each keys as key, i}
			<kbd class="kbd">{key}</kbd>
			{#if i < keys.length - 1}
				<span class="kbd-sep">+</span>
			{/if}
		{/each}
	{:else if children}
		<kbd class="kbd">{@render children()}</kbd>
	{/if}
</span>

<style>
	.kbd-group {
		display: inline-flex;
		align-items: center;
		gap: 3px;
	}

	.kbd {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-strong);
		background: var(--bg-subtle);
		color: var(--text-muted);
		font-family: var(--font-mono);
		font-size: 11px;
		line-height: 1.5;
		box-shadow: 0 1px 0 var(--border-strong);
		white-space: nowrap;
	}

	.kbd-group--sm .kbd {
		font-size: 10px;
		padding: 1px 4px;
	}

	.kbd-sep {
		font-size: 10px;
		color: var(--text-subtle);
		user-select: none;
	}
</style>
