<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import '$lib/styles/demo-page.css';

	const columns = [
		{
			heading: 'Produit',
			links: [
				{ label: 'Fonctionnalités', href: '#' },
				{ label: 'Tarifs', href: '#' },
				{ label: 'Changelog', href: '#' }
			]
		},
		{
			heading: 'Ressources',
			links: [
				{ label: 'Documentation', href: '#' },
				{ label: 'Blog', href: '#' },
				{ label: 'Tutoriels', href: '#' }
			]
		},
		{
			heading: 'Entreprise',
			links: [
				{ label: 'À propos', href: '#' },
				{ label: 'Carrières', href: '#' },
				{ label: 'Contact', href: '#' }
			]
		}
	];
</script>

<svelte:head>
	<title>Footer — Layout — My Components</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Footer</h1>
		<p>Pied de page avec colonnes de liens, tagline et copyright.</p>
	</div>

	<section class="variant">
		<h2>Complet</h2>
		<ComponentPreview>
			<Footer
				brand="Acme"
				tagline="Des produits simples pour des équipes ambitieuses."
				{columns}
				copyright="© 2026 Acme Corp. Tous droits réservés."
			/>
		</ComponentPreview>
	</section>

	<section class="variant">
		<h2>Minimaliste (sans colonnes)</h2>
		<ComponentPreview>
			<Footer brand="Acme" copyright="© 2026 Acme Corp." />
		</ComponentPreview>
	</section>

	<div class="props-table">
		<h2>Props</h2>
		<table>
			<thead>
				<tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
			</thead>
			<tbody>
				<tr><td>brand</td><td>string</td><td>'Brand'</td><td>Nom de la marque</td></tr>
				<tr><td>tagline</td><td>string</td><td>''</td><td>Phrase d'accroche (masquée si vide)</td></tr>
				<tr><td>columns</td><td>FooterColumn[]</td><td>[]</td><td>Colonnes de liens</td></tr>
				<tr><td>copyright</td><td>string</td><td>auto</td><td>Texte de copyright</td></tr>
			</tbody>
		</table>
	</div>
</div>
