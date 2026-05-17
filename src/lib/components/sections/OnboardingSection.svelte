<script lang="ts">
	import type { Component, Snippet } from 'svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import Stepper from '$lib/components/ui/Stepper.svelte';

	type OnboardingStep = {
		label: string;
		title: string;
		description: string;
		icon?: Component;
		visual?: Snippet;
	};

	let {
		steps,
		current = $bindable(0),
		onComplete,
		onSkip,
	}: {
		steps: OnboardingStep[];
		current?: number;
		onComplete?: () => void;
		onSkip?: () => void;
	} = $props();

	const isLast  = $derived(current === steps.length - 1);
	const isFirst  = $derived(current === 0);
	const active   = $derived(steps[current]);

	function next() {
		if (isLast) { onComplete?.(); return; }
		current++;
	}

	function prev() {
		if (isFirst) return;
		current--;
	}
</script>

<section class="onboard">
	<div class="onboard-inner">
		<!-- Stepper header -->
		<div class="onboard-header">
			<Stepper
				steps={steps.map((s) => ({ label: s.label, icon: s.icon }))}
				{current}
				variant="dotted"
			/>
			{#if onSkip}
				<button class="skip-btn" onclick={onSkip}>Passer</button>
			{/if}
		</div>

		<!-- Content -->
		<div class="onboard-body">
			{#if active.visual}
				<div class="onboard-visual">
					{@render active.visual()}
				</div>
			{/if}

			<div class="onboard-text">
				<h2 class="onboard-title">{active.title}</h2>
				<p class="onboard-desc">{active.description}</p>
			</div>
		</div>

		<!-- Navigation -->
		<div class="onboard-nav">
			<Button variant="ghost" onclick={prev} disabled={isFirst}>Précédent</Button>
			<span class="onboard-counter">{current + 1} / {steps.length}</span>
			<Button variant="primary" onclick={next}>
				{isLast ? 'Commencer' : 'Suivant'}
			</Button>
		</div>
	</div>
</section>

<style>
	.onboard {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px 24px;
		background: var(--bg-base);
	}

	.onboard-inner {
		width: 100%;
		max-width: 600px;
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	/* Header */
	.onboard-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.skip-btn {
		background: none;
		border: none;
		font-size: 13px;
		color: var(--text-subtle);
		cursor: pointer;
		padding: 4px 8px;
		border-radius: var(--radius-md);
		transition: color var(--transition-fast), background var(--transition-fast);
	}

	.skip-btn:hover {
		color: var(--text-base);
		background: var(--bg-hover);
	}

	/* Body */
	.onboard-body {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 32px;
		text-align: center;
	}

	.onboard-visual {
		width: 100%;
		max-width: 420px;
	}

	.onboard-text {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.onboard-title {
		font-size: clamp(22px, 4vw, 32px);
		font-weight: 700;
		color: var(--text-heading);
		letter-spacing: -0.02em;
		margin: 0;
	}

	.onboard-desc {
		font-size: 15px;
		color: var(--text-muted);
		line-height: 1.7;
		margin: 0;
	}

	/* Nav */
	.onboard-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.onboard-counter {
		font-size: 13px;
		color: var(--text-subtle);
		font-weight: 500;
	}
</style>
