<script lang="ts">
	import type { Component } from 'svelte';
	import { Check } from '@lucide/svelte';

	type Step = {
		label: string;
		description?: string;
		icon?: Component;
	};

	let {
		steps,
		current = 0,
		orientation = 'horizontal',
		variant = 'numbered',
	}: {
		steps: Step[];
		current?: number;
		orientation?: 'horizontal' | 'vertical';
		variant?: 'numbered' | 'dotted';
	} = $props();

	function status(i: number): 'done' | 'active' | 'pending' {
		if (i < current) return 'done';
		if (i === current) return 'active';
		return 'pending';
	}
</script>

<div class="stepper stepper--{orientation} stepper--{variant}">
	{#each steps as step, i}
		{@const s = status(i)}
		{@const StepIcon = step.icon}
		{@const isLast = i === steps.length - 1}

		<div class="step step--{s}">
			<!-- Indicator -->
			<div class="step__indicator">
				<div class="step__bubble">
					{#if s === 'done'}
						<Check size={14} strokeWidth={3} />
					{:else if StepIcon && variant !== 'dotted'}
						<StepIcon size={14} />
					{:else if variant === 'numbered'}
						<span>{i + 1}</span>
					{/if}
				</div>

				{#if !isLast}
					<div class="step__connector"></div>
				{/if}
			</div>

			<!-- Label -->
			<div class="step__content">
				<span class="step__label">{step.label}</span>
				{#if step.description && orientation === 'vertical'}
					<span class="step__desc">{step.description}</span>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	/* ---- Layout --------------------------------------------------------- */
	.stepper--horizontal {
		display: flex;
		align-items: flex-start;
		gap: 0;
		width: 100%;
	}

	.stepper--vertical {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	/* ---- Step ----------------------------------------------------------- */
	.step {
		display: flex;
		flex: 1;
	}

	.stepper--horizontal .step {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.stepper--vertical .step {
		flex-direction: row;
		align-items: flex-start;
		gap: 12px;
		flex: none;
	}

	/* ---- Indicator (bubble + connector) --------------------------------- */
	.step__indicator {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.stepper--horizontal .step__indicator {
		flex-direction: row;
		width: 100%;
		justify-content: center;
		position: relative;
	}

	.stepper--vertical .step__indicator {
		flex-direction: column;
		align-items: center;
	}

	/* Bubble */
	.step__bubble {
		width: 32px;
		height: 32px;
		border-radius: var(--radius-full);
		border: 2px solid var(--border-strong);
		background: var(--bg-base);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 700;
		color: var(--text-subtle);
		flex-shrink: 0;
		transition:
			background var(--transition-base),
			border-color var(--transition-base),
			color var(--transition-base);
		z-index: 1;
		position: relative;
	}

	.stepper--dotted .step__bubble {
		width: 12px;
		height: 12px;
		border-width: 2px;
	}

	/* Active */
	.step--active .step__bubble {
		border-color: var(--primary);
		background: var(--primary-subtle);
		color: var(--primary);
	}

	/* Done */
	.step--done .step__bubble {
		border-color: var(--primary);
		background: var(--primary);
		color: var(--primary-fg);
	}

	/* Connector line */
	.step__connector {
		background: var(--border-strong);
		transition: background var(--transition-base);
	}

	.stepper--horizontal .step__connector {
		height: 2px;
		flex: 1;
	}

	/* In horizontal layout the connector must span between bubbles */
	.stepper--horizontal .step__indicator {
		gap: 0;
	}

	.stepper--horizontal .step:not(:last-child) .step__indicator::after {
		content: '';
		display: block;
		height: 2px;
		flex: 1;
		background: var(--border-strong);
		transition: background var(--transition-base);
	}

	.stepper--horizontal .step--done:not(:last-child) .step__indicator::after {
		background: var(--primary);
	}

	.stepper--vertical .step__connector {
		width: 2px;
		min-height: 32px;
		flex: 1;
		margin: 4px 0;
	}

	.step--done .step__connector,
	.step--active .step__connector {
		background: var(--primary);
	}

	/* ---- Content -------------------------------------------------------- */
	.step__content {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 8px 4px 0;
	}

	.stepper--vertical .step__content {
		padding: 4px 0 24px;
	}

	.step__label {
		font-size: 13px;
		font-weight: 600;
		color: var(--text-subtle);
		transition: color var(--transition-fast);
	}

	.step--active .step__label { color: var(--primary); }
	.step--done   .step__label { color: var(--text-base); }

	.step__desc {
		font-size: 12px;
		color: var(--text-muted);
		line-height: 1.5;
	}
</style>
