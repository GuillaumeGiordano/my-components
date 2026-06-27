<script lang="ts">
	import '$lib/styles/demo-page.css';
	import VideoSection from '$lib/components/sections/VideoSection.svelte';
</script>

<svelte:head>
	<title>VideoSection — Sections — My Components</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<h1>VideoSection</h1>
		<p>Section vidéo avec miniature, overlay de lecture et intégration YouTube/Vimeo.</p>
	</div>

	<section class="variant">
		<h2>Avec miniature et embed YouTube</h2>
		<VideoSection
			badge="Démonstration produit"
			title="Voyez Flōw en action en moins de 3 minutes"
			description="Découvrez comment des équipes comme la vôtre utilisent Flōw pour automatiser leurs processus, collaborer plus efficacement et gagner des heures chaque semaine."
			videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
			thumbnailSrc="https://picsum.photos/seed/product-demo/1280/720"
			thumbnailAlt="Démo du produit Flōw"
			aspectRatio="16/9"
		/>
	</section>

	<section class="variant">
		<h2>Sans miniature (placeholder gradient)</h2>
		<VideoSection
			title="Tutoriel : premiers pas avec Flōw"
			description="Un tour d'horizon complet pour configurer votre espace de travail en quelques minutes."
			videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
			aspectRatio="16/9"
		/>
	</section>

	<section class="variant">
		<h2>Format 4/3 avec badge et miniature</h2>
		<VideoSection
			badge="Webinaire"
			title="Comment les équipes agiles adoptent Flōw"
			description="Retour d'expérience de 5 directeurs produit sur leur transition vers des workflows automatisés."
			videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
			thumbnailSrc="https://picsum.photos/seed/webinar-flow/960/720"
			thumbnailAlt="Webinaire Flōw — Équipes agiles"
			aspectRatio="4/3"
		/>
	</section>
</div>
