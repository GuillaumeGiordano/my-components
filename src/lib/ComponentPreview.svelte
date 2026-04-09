<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Smartphone, Tablet, Monitor } from '@lucide/svelte';

	type Breakpoint = 'mobile' | 'tablet' | 'desktop';

	const BREAKPOINTS: Record<Breakpoint, { label: string; width: string; icon: typeof Smartphone }> = {
		mobile: { label: 'Mobile', width: '375px', icon: Smartphone },
		tablet: { label: 'Tablette', width: '768px', icon: Tablet },
		desktop: { label: 'Desktop', width: '100%', icon: Monitor }
	};

	let { children }: { children: Snippet } = $props();
	let breakpoint = $state<Breakpoint>('desktop');
</script>

<div class="preview-root">
	<div class="toolbar">
		{#each Object.entries(BREAKPOINTS) as [key, { label, width, icon: Icon }]}
			<button
				class="toolbar-btn"
				class:active={breakpoint === key}
				onclick={() => (breakpoint = key as Breakpoint)}
			>
				<Icon size={15} />
				<span class="label">{label}</span>
				{#if key !== 'desktop'}
					<span class="width-hint">{width}</span>
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
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		overflow: hidden;
		background: var(--bg-base);
		transition: border-color var(--transition-base);
	}

	.toolbar {
		display: flex;
		gap: 4px;
		padding: 8px 12px;
		background: var(--bg-subtle);
		border-bottom: 1px solid var(--border);
		transition: background var(--transition-base), border-color var(--transition-base);
	}

	.toolbar-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		background: transparent;
		cursor: pointer;
		font-size: 13px;
		color: var(--text-muted);
		transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
	}

	.toolbar-btn:hover {
		background: var(--bg-hover);
		color: var(--text-base);
	}

	.toolbar-btn.active {
		background: var(--bg-base);
		border-color: var(--border);
		color: var(--text-base);
		font-weight: 500;
		box-shadow: var(--shadow-sm);
	}

	.width-hint {
		font-size: 11px;
		color: var(--text-subtle);
		font-family: var(--font-mono);
	}

	.preview-stage {
		padding: 24px;
		background: var(--bg-muted);
		min-height: 200px;
		display: flex;
		justify-content: center;
		transition: background var(--transition-base);
	}

	.preview-frame {
		width: 100%;
		background: var(--bg-base);
		border-radius: var(--radius-sm);
		transition: max-width var(--transition-base), background var(--transition-base);
		overflow: hidden;
	}

	.preview-frame.has-max-width {
		box-shadow: var(--shadow-md);
	}
</style>
