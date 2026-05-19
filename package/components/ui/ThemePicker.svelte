<script lang="ts">
	import { theme, COLOR_THEMES } from '../../theme.svelte';
	import { Check } from '@lucide/svelte';
</script>

<div class="theme-picker">
	<p class="picker-label">Thème</p>
	<div class="swatches">
		{#each COLOR_THEMES as t}
			<button
				class="swatch"
				class:active={theme.colorTheme === t.id}
				style="--swatch-color: {t.color}"
				onclick={() => theme.setColor(t.id)}
				title={t.label}
				aria-label={t.label}
				aria-pressed={theme.colorTheme === t.id}
			>
				{#if theme.colorTheme === t.id}
					<Check size={12} strokeWidth={3} />
				{/if}
			</button>
		{/each}
	</div>
</div>

<style>
	.theme-picker {
		padding: 12px 8px 8px;
		border-top: 1px solid var(--border);
	}

	.picker-label {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-subtle);
		margin: 0 0 8px 2px;
	}

	.swatches {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		padding: 0 2px;
	}

	.swatch {
		width: 24px;
		height: 24px;
		border-radius: var(--radius-full);
		background: var(--swatch-color);
		border: 2px solid transparent;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		transition:
			transform var(--transition-fast),
			border-color var(--transition-fast);
		padding: 0;
	}

	.swatch:hover {
		transform: scale(1.15);
	}

	.swatch.active {
		border-color: var(--text-base);
		transform: scale(1.1);
	}
</style>
