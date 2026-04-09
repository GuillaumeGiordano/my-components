<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';

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
			<Navbar brand="Studio" links={[{ label: 'Travaux', href: '#' }, { label: 'Contact', href: '#' }]} ctaLabel="Me contacter" ctaHref="#" />
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

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.page-header h1 {
		font-size: 26px;
		font-weight: 700;
		color: #0f172a;
		margin-bottom: 6px;
	}

	.page-header p {
		color: #64748b;
		font-size: 15px;
	}

	.variant {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.variant h2 {
		font-size: 14px;
		font-weight: 600;
		color: #64748b;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.props-table h2 {
		font-size: 16px;
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 12px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 13px;
	}

	th {
		text-align: left;
		padding: 8px 12px;
		background: #f8fafc;
		border-bottom: 1px solid #e2e8f0;
		color: #475569;
		font-weight: 600;
	}

	td {
		padding: 8px 12px;
		border-bottom: 1px solid #f1f5f9;
		color: #1e293b;
	}

	td:first-child {
		font-family: monospace;
		color: #7c3aed;
	}

	td:nth-child(2) {
		font-family: monospace;
		color: #0369a1;
	}
</style>
