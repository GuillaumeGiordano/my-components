<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

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
