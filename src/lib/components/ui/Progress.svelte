<script lang="ts">
	let {
		value = 0,
		max = 100,
		variant = 'linear',
		size = 'md',
		label,
		showValue = false,
		animated = false,
		color = 'primary',
	}: {
		value?: number;
		max?: number;
		variant?: 'linear' | 'circular';
		size?: 'sm' | 'md' | 'lg';
		label?: string;
		showValue?: boolean;
		animated?: boolean;
		color?: 'primary' | 'success' | 'warning' | 'danger';
	} = $props();

	const pct = $derived(Math.min(100, Math.max(0, (value / max) * 100)));

	// Circular SVG params
	const circularSizes = { sm: 48, md: 64, lg: 80 };
	const strokeWidths  = { sm: 4,  md: 5,  lg: 6  };

	const diameter    = $derived(circularSizes[size as keyof typeof circularSizes]);
	const strokeWidth = $derived(strokeWidths[size as keyof typeof strokeWidths]);
	const radius      = $derived((diameter - strokeWidth) / 2);
	const circumference = $derived(2 * Math.PI * radius);
	const dashoffset    = $derived(circumference * (1 - pct / 100));

	const colorVar: Record<string, string> = {
		primary: 'var(--primary)',
		success: 'var(--success, #22c55e)',
		warning: 'var(--warning, #f59e0b)',
		danger:  'var(--danger,  #ef4444)',
	};
	const trackColor: Record<string, string> = {
		primary: 'var(--primary-subtle)',
		success: 'color-mix(in srgb, var(--success, #22c55e) 18%, transparent)',
		warning: 'color-mix(in srgb, var(--warning, #f59e0b) 18%, transparent)',
		danger:  'color-mix(in srgb, var(--danger,  #ef4444) 18%, transparent)',
	};
</script>

{#if variant === 'circular'}
	<div class="circular" style:width="{diameter}px" style:height="{diameter}px">
		<svg width={diameter} height={diameter} viewBox="0 0 {diameter} {diameter}">
			<!-- Track -->
			<circle
				cx={diameter / 2}
				cy={diameter / 2}
				r={radius}
				fill="none"
				stroke={trackColor[color]}
				stroke-width={strokeWidth}
			/>
			<!-- Progress -->
			<circle
				cx={diameter / 2}
				cy={diameter / 2}
				r={radius}
				fill="none"
				stroke={colorVar[color]}
				stroke-width={strokeWidth}
				stroke-linecap="round"
				stroke-dasharray={circumference}
				stroke-dashoffset={dashoffset}
				transform="rotate(-90 {diameter / 2} {diameter / 2})"
				class:animated
			/>
		</svg>
		{#if showValue}
			<span class="circular-value" style:font-size="{size === 'sm' ? 10 : size === 'md' ? 13 : 16}px">
				{Math.round(pct)}%
			</span>
		{/if}
	</div>
{:else}
	<div class="linear-wrap">
		{#if label || showValue}
			<div class="linear-header">
				{#if label}<span class="linear-label">{label}</span>{/if}
				{#if showValue}<span class="linear-pct">{Math.round(pct)}%</span>{/if}
			</div>
		{/if}
		<div
			class="linear-track track--{size}"
			role="progressbar"
			aria-valuenow={value}
			aria-valuemin={0}
			aria-valuemax={max}
			aria-label={label}
		>
			<div
				class="linear-bar"
				class:animated
				style:width="{pct}%"
				style:background={colorVar[color]}
			></div>
		</div>
	</div>
{/if}

<style>
	/* --- Linear ---------------------------------------------------------- */
	.linear-wrap { display: flex; flex-direction: column; gap: 6px; }

	.linear-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.linear-label { font-size: 13px; font-weight: 500; color: var(--text-base); }
	.linear-pct   { font-size: 12px; color: var(--text-muted); }

	.linear-track {
		width: 100%;
		background: var(--bg-hover);
		border-radius: var(--radius-full);
		overflow: hidden;
	}

	.track--sm { height: 4px; }
	.track--md { height: 8px; }
	.track--lg { height: 12px; }

	.linear-bar {
		height: 100%;
		border-radius: var(--radius-full);
		transition: width 0.4s ease;
	}

	.linear-bar.animated {
		background-image: linear-gradient(
			90deg,
			transparent 25%,
			rgba(255,255,255,0.3) 50%,
			transparent 75%
		) !important;
		background-size: 200% 100%;
		animation: bar-shimmer 1.4s ease infinite;
	}

	/* --- Circular -------------------------------------------------------- */
	.circular {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.circular svg {
		position: absolute;
		inset: 0;
	}

	.circular-value {
		position: relative;
		font-weight: 700;
		color: var(--text-heading);
	}

	circle.animated {
		animation: spin-dash 1.4s ease infinite;
	}

	@keyframes bar-shimmer {
		from { background-position: 200% 0; }
		to   { background-position: -200% 0; }
	}

	@keyframes spin-dash {
		0%   { stroke-dashoffset: var(--circ, 150); }
		50%  { stroke-dashoffset: 30; }
		100% { stroke-dashoffset: var(--circ, 150); transform: rotate(360deg); }
	}
</style>
