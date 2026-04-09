<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import StandardLayout from '$lib/components/layout/StandardLayout.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	const navLinks = [
		{ label: 'Accueil', href: '#' },
		{ label: 'Produits', href: '#' },
		{ label: 'Contact', href: '#' }
	];

	const sidebarGroups = [
		{
			label: 'Navigation',
			items: [
				{ label: 'Tableau de bord', href: '#', icon: '🏠' },
				{ label: 'Projets', href: '#', icon: '📁' },
				{ label: 'Équipe', href: '#', icon: '👥' }
			]
		}
	];

	const footerColumns = [
		{
			heading: 'Liens',
			links: [
				{ label: 'Documentation', href: '#' },
				{ label: 'Support', href: '#' }
			]
		}
	];
</script>

<svelte:head>
	<title>Standard Layout — Layout — My Components</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Standard Layout</h1>
		<p>Combinaison Navbar + Sidebar + Main + Footer via snippets Svelte 5.</p>
	</div>

	<section class="variant">
		<h2>Complet (navbar + sidebar + footer)</h2>
		<ComponentPreview>
			<StandardLayout>
				{#snippet header()}
					<Navbar brand="Acme" links={navLinks} ctaLabel="Action" ctaHref="#" />
				{/snippet}

				{#snippet sidebar()}
					<Sidebar groups={sidebarGroups} />
				{/snippet}

				{#snippet main()}
					<div class="demo-content">
						<h3>Contenu principal</h3>
						<p>Cet espace est prévu pour le contenu de la page. La sidebar est à gauche, la navbar en haut, le footer en bas.</p>
					</div>
				{/snippet}

				{#snippet footer()}
					<Footer brand="Acme" columns={footerColumns} copyright="© 2026 Acme" />
				{/snippet}
			</StandardLayout>
		</ComponentPreview>
	</section>

	<section class="variant">
		<h2>Sans sidebar</h2>
		<ComponentPreview>
			<StandardLayout hasSidebar={false}>
				{#snippet header()}
					<Navbar brand="Acme" links={navLinks} />
				{/snippet}

				{#snippet main()}
					<div class="demo-content">
						<h3>Contenu pleine largeur</h3>
						<p>Layout sans sidebar — idéal pour les pages de contenu ou les landing pages.</p>
					</div>
				{/snippet}

				{#snippet footer()}
					<Footer brand="Acme" copyright="© 2026 Acme" />
				{/snippet}
			</StandardLayout>
		</ComponentPreview>
	</section>

	<div class="props-table">
		<h2>Snippets</h2>
		<table>
			<thead>
				<tr><th>Snippet</th><th>Requis</th><th>Description</th></tr>
			</thead>
			<tbody>
				<tr><td>header</td><td>Non</td><td>Zone d'en-tête (ex. Navbar)</td></tr>
				<tr><td>sidebar</td><td>Non</td><td>Colonne latérale (ex. Sidebar)</td></tr>
				<tr><td>main</td><td>Oui</td><td>Zone de contenu principal</td></tr>
				<tr><td>footer</td><td>Non</td><td>Zone de pied de page (ex. Footer)</td></tr>
			</tbody>
		</table>

		<h2 style="margin-top: 20px;">Props</h2>
		<table>
			<thead>
				<tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
			</thead>
			<tbody>
				<tr><td>hasSidebar</td><td>boolean</td><td>true</td><td>Active/désactive la zone sidebar</td></tr>
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

	.demo-content {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.demo-content h3 {
		font-size: 16px;
		font-weight: 600;
		color: #1e293b;
	}

	.demo-content p {
		font-size: 14px;
		color: #64748b;
		line-height: 1.6;
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
