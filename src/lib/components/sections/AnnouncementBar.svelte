<script lang="ts">
	import type { Component } from 'svelte';
	import { X } from '@lucide/svelte';

	let {
		message,
		cta,
		variant = 'default',
		dismissible = true,
		icon: IconComponent,
		fixed = true
	}: {
		message: string;
		cta?: { label: string; href: string };
		variant?: 'default' | 'primary' | 'warning' | 'success';
		dismissible?: boolean;
		icon?: Component;
		fixed?: boolean;
	} = $props();

	let dismissed = $state(false);

	function dismiss() {
		dismissed = true;
	}
</script>

{#if !dismissed}
	<div
		class="announcement-bar variant-{variant}"
		class:is-fixed={fixed}
		role="banner"
	>
		<div class="inner">
			<!-- Optional icon -->
			{#if IconComponent}
				<span class="bar-icon">
					<IconComponent size={15} />
				</span>
			{/if}

			<!-- Message -->
			<span class="bar-message">{message}</span>

			<!-- Optional CTA link -->
			{#if cta}
				<a href={cta.href} class="bar-cta">{cta.label} &rarr;</a>
			{/if}
		</div>

		<!-- Dismiss button -->
		{#if dismissible}
			<button class="dismiss-btn" onclick={dismiss} aria-label="Fermer l'annonce">
				<X size={14} />
			</button>
		{/if}
	</div>
{/if}

<style>
	.announcement-bar {
		width: 100%;
		height: 46px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 48px;
		font-family: var(--font-sans);
		font-size: 13.5px;
		position: relative;
		/* Slide-down reveal animation */
		animation: slideDown 0.25s ease;
	}

	@keyframes slideDown {
		from { transform: translateY(-100%); opacity: 0; }
		to   { transform: translateY(0);     opacity: 1; }
	}

	.is-fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
	}

	/* --- Variants --- */
	.variant-default {
		background: var(--bg-subtle);
		color: var(--text-base);
		border-bottom: 1px solid var(--border);
	}

	.variant-primary {
		background: var(--primary);
		color: var(--primary-fg);
	}

	.variant-warning {
		background: #fef3c7;
		color: #92400e;
		border-bottom: 1px solid #fde68a;
	}

	.variant-success {
		background: #dcfce7;
		color: #14532d;
		border-bottom: 1px solid #bbf7d0;
	}

	/* --- Inner layout --- */
	.inner {
		display: flex;
		align-items: center;
		gap: 10px;
		/* Center with flex — ignore the dismiss button width */
		margin: 0 auto;
	}

	.bar-icon {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		opacity: 0.8;
	}

	.bar-message {
		line-height: 1.4;
	}

	/* CTA link — inherit color, underlined */
	.bar-cta {
		font-weight: 600;
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 2px;
		white-space: nowrap;
		transition: opacity var(--transition-fast);
	}

	.bar-cta:hover {
		opacity: 0.75;
	}

	/* --- Dismiss button --- */
	.dismiss-btn {
		position: absolute;
		right: 14px;
		top: 50%;
		transform: translateY(-50%);
		background: transparent;
		border: none;
		cursor: pointer;
		color: inherit;
		opacity: 0.6;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: var(--radius-sm);
		transition:
			opacity var(--transition-fast),
			background var(--transition-fast);
	}

	.dismiss-btn:hover {
		opacity: 1;
		background: rgba(0, 0, 0, 0.08);
	}

	/* Mobile: hide sublabel text, keep it readable */
	@media (max-width: 600px) {
		.announcement-bar {
			height: auto;
			min-height: 44px;
			padding: 8px 44px 8px 16px;
		}

		.inner {
			flex-wrap: wrap;
			justify-content: center;
			gap: 6px;
		}
	}
</style>
