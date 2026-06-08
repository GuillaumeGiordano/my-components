<script lang="ts">
	import { Play } from '@lucide/svelte';
	import Badge from '../ui/Badge.svelte';

	let {
		badge,
		title,
		description,
		videoUrl,
		thumbnailSrc,
		thumbnailAlt = 'Aperçu de la vidéo',
		aspectRatio = '16/9',
		autoplay = false,
		withBackground = "",
	}: {
		badge?: string;
		title: string;
		description?: string;
		videoUrl?: string;
		thumbnailSrc?: string;
		thumbnailAlt?: string;
		aspectRatio?: '16/9' | '4/3' | '1/1';
		autoplay?: boolean;
		withBackground?: "bg-base" | "";
	} = $props();


	let playing = $state(false);

	// Build the embed URL with autoplay=1 appended
	const embedUrl = $derived(() => {
		if (!videoUrl) return '';
		const separator = videoUrl.includes('?') ? '&' : '?';
		return `${videoUrl}${separator}autoplay=1`;
	});

	function handlePlay() {
		playing = true;
	}
</script>

<section class="video-section {withBackground}">
	<div class="container">
		<!-- Section header -->
		<div class="section-header">
			{#if badge}
				<Badge label={badge} variant="primary" />
			{/if}
			<h2 class="section-title">{title}</h2>
			{#if description}
				<p class="section-desc">{description}</p>
			{/if}
		</div>

		<!-- Video container -->
		<div class="video-wrapper" style="--aspect: {aspectRatio}">
			<div class="video-inner">
				{#if playing && videoUrl}
					<!-- Embed iframe shown after user clicks play -->
					<iframe
						src={embedUrl()}
						title={thumbnailAlt}
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				{:else}
					<!-- Thumbnail or gradient placeholder -->
					{#if thumbnailSrc}
						<img src={thumbnailSrc} alt={thumbnailAlt} class="thumbnail" />
					{:else}
						<div class="thumbnail-placeholder"></div>
					{/if}

					<!-- Play button overlay -->
					<div class="play-overlay">
						<button class="play-btn" onclick={handlePlay} aria-label="Lire la vidéo">
							<Play size={32} fill="currentColor" />
						</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.video-section {
		padding: 100px 24px;
		background: var(--bg-base);
	}

	.container {
		max-width: 900px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 48px;
	}

	/* --- Header --- */
	.section-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 16px;
	}

	.section-title {
		font-size: clamp(26px, 4vw, 42px);
		font-weight: 700;
		color: var(--text-heading);
		line-height: 1.2;
		letter-spacing: -0.02em;
		margin: 0;
	}

	.section-desc {
		font-size: 18px;
		color: var(--text-muted);
		line-height: 1.7;
		max-width: 600px;
		margin: 0;
	}

	/* --- Video wrapper with aspect-ratio --- */
	.video-wrapper {
		width: 100%;
	}

	.video-inner {
		position: relative;
		width: 100%;
		aspect-ratio: var(--aspect);
		border-radius: var(--radius-xl);
		overflow: hidden;
		box-shadow: var(--shadow-lg);
		background: #0f172a;
	}

	/* Thumbnail image */
	.thumbnail {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Gradient placeholder when no thumbnail */
	.thumbnail-placeholder {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e1b4b 100%);
	}

	/* --- Play overlay --- */
	.play-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		/* Subtle dark veil over the thumbnail */
		background: rgba(0, 0, 0, 0.25);
		transition: background var(--transition-base);
	}

	.play-overlay:hover {
		background: rgba(0, 0, 0, 0.35);
	}

	/* Play button circle */
	.play-btn {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.92);
		color: var(--primary);
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		/* Offset the play icon 2px right for optical balance */
		padding-left: 4px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
		transition:
			transform var(--transition-fast),
			background var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.play-btn:hover {
		transform: scale(1.08);
		background: white;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
	}

	.play-btn:active {
		transform: scale(0.97);
	}

	/* Iframe fills the container */
	iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: none;
	}

	@media (max-width: 768px) {
		.video-section {
			padding: 64px 16px;
		}
	}

	.withBackground { background: var(--bg-base); }
</style>
