<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		header,
		sidebar,
		main,
		footer,
		hasSidebar = true
	}: {
		header?: Snippet;
		sidebar?: Snippet;
		main: Snippet;
		footer?: Snippet;
		hasSidebar?: boolean;
	} = $props();
</script>

<div class="standard-layout">
	{#if header}
		<div class="layout-header">
			{@render header()}
		</div>
	{/if}

	<div class="layout-body" class:no-sidebar={!hasSidebar || !sidebar}>
		{#if hasSidebar && sidebar}
			<div class="layout-sidebar">
				{@render sidebar()}
			</div>
		{/if}

		<div class="layout-main">
			{@render main()}
		</div>
	</div>

	{#if footer}
		<div class="layout-footer">
			{@render footer()}
		</div>
	{/if}
</div>

<style>
	.standard-layout {
		display: flex;
		flex-direction: column;
		min-height: 400px;
	}

	.layout-header {
		flex-shrink: 0;
	}

	.layout-body {
		display: flex;
		flex: 1;
		min-height: 0;
	}

	.layout-body.no-sidebar {
		display: block;
	}

	.layout-sidebar {
		flex-shrink: 0;
	}

	.layout-main {
		flex: 1;
		padding: 24px;
		overflow-y: auto;
		background: #fff;
	}

	.layout-footer {
		flex-shrink: 0;
	}
</style>
