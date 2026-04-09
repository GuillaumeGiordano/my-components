<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import '$lib/styles/demo-page.css';

	const links = [
		{ label: 'Accueil', href: '#' },
		{ label: 'Produits', href: '#' },
		{ label: 'Tarifs', href: '#' },
		{ label: 'À propos', href: '#' }
	];
</script>

<svelte:head>
	<title>Navbar — Layout — My Components</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Navbar</h1>
		<p>Barre de navigation responsive. Se transforme en menu hamburger sous 640 px.</p>
	</div>

	<section class="variant">
		<h2>Avec CTA</h2>
		<ComponentPreview>
			<Navbar brand="Acme" {links} ctaLabel="Démarrer" ctaHref="#" />
		</ComponentPreview>
	</section>

	<section class="variant">
		<h2>Sans CTA</h2>
		<ComponentPreview>
			<Navbar brand="Acme" {links} />
		</ComponentPreview>
	</section>

	<section class="variant">
		<h2>Liens minimaux</h2>
		<ComponentPreview>
			<Navbar
				brand="Studio"
				links={[{ label: 'Travaux', href: '#' }, { label: 'Contact', href: '#' }]}
				ctaLabel="Me contacter"
				ctaHref="#"
			/>
		</ComponentPreview>
	</section>

	<div class="props-table">
		<h2>Props</h2>
		<table>
			<thead>
				<tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
			</thead>
			<tbody>
				<tr><td>brand</td><td>string</td><td>'Brand'</td><td>Nom / logo texte</td></tr>
				<tr><td>links</td><td>NavLink[]</td><td>[]</td><td>Liens de navigation</td></tr>
				<tr><td>ctaLabel</td><td>string</td><td>''</td><td>Texte du bouton CTA (masqué si vide)</td></tr>
				<tr><td>ctaHref</td><td>string</td><td>'#'</td><td>URL du bouton CTA</td></tr>
			</tbody>
		</table>
	</div>
</div>
