<script lang="ts">
	import type { Snippet } from 'svelte';

	type Breakpoint = 'mobile' | 'tablet' | 'desktop';

	const BREAKPOINTS: Record<Breakpoint, { label: string; width: string; icon: string }> = {
		mobile: { label: 'Mobile', width: '375px', icon: '📱' },
		tablet: { label: 'Tablette', width: '768px', icon: '📟' },
		desktop: { label: 'Desktop', width: '100%', icon: '🖥️' }
	};

	let { children }: { children: Snippet } = $props();
	let breakpoint = $state<Breakpoint>('desktop');
</script>

<div class="preview-root">
	<div class="toolbar">
		{#each Object.entries(BREAKPOINTS) as [key, { label, icon }]}
			<button
				class="toolbar-btn"
				class:active={breakpoint === key}
				onclick={() => (breakpoint = key as Breakpoint)}
			>
				<span class="icon">{icon}</span>
				<span class="label">{label}</span>
				{#if key !== 'desktop'}
					<span class="width-hint">{BREAKPOINTS[key as Breakpoint].width}</span>
				{/if}
			</button>
		{/each}
	</div>

	<div class="preview-stage">
		<div
			class="preview-frame"
			class:has-max-width={breakpoint !== 'desktop'}
			style="max-width: {BREAKPOINTS[breakpoint].width}"
		>
			{@render children()}
		</div>
	</div>
</div>

<style>
	.preview-root {
		display: flex;
		flex-direction: column;
		gap: 0;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		overflow: hidden;
		background: #fff;
	}

	.toolbar {
		display: flex;
		gap: 4px;
		padding: 8px 12px;
		background: #f8fafc;
		border-bottom: 1px solid #e2e8f0;
	}

	.toolbar-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		border: 1px solid transparent;
		border-radius: 6px;
		background: transparent;
		cursor: pointer;
		font-size: 13px;
		color: #64748b;
		transition: all 0.15s ease;
	}

	.toolbar-btn:hover {
		background: #e2e8f0;
		color: #1e293b;
	}

	.toolbar-btn.active {
		background: #fff;
		border-color: #e2e8f0;
		color: #1e293b;
		font-weight: 500;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
	}

	.width-hint {
		font-size: 11px;
		color: #94a3b8;
		font-family: monospace;
	}

	.preview-stage {
		padding: 24px;
		background: #f1f5f9;
		min-height: 200px;
		display: flex;
		justify-content: center;
	}

	.preview-frame {
		width: 100%;
		background: #fff;
		border-radius: 4px;
		transition: max-width 0.3s ease;
		overflow: hidden;
	}

	.preview-frame.has-max-width {
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
</style>
