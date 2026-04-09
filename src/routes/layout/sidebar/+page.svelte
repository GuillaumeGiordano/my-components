<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';

	const groups = [
		{
			label: 'Général',
			items: [
				{ label: 'Tableau de bord', href: '#', icon: '🏠' },
				{ label: 'Analytiques', href: '#', icon: '📊' },
				{ label: 'Rapports', href: '#', icon: '📄' }
			]
		},
		{
			label: 'Paramètres',
			items: [
				{ label: 'Profil', href: '#', icon: '👤' },
				{ label: 'Sécurité', href: '#', icon: '🔒' },
				{ label: 'Notifications', href: '#', icon: '🔔' }
			]
		}
	];

	let collapsed = $state(false);
</script>

<svelte:head>
	<title>Sidebar — Layout — My Components</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<h1>Sidebar</h1>
		<p>Navigation latérale collapsible avec groupes. L'état collapsed est bindable.</p>
	</div>

	<section class="variant">
		<h2>Interactive (collapse partagé)</h2>
		<ComponentPreview>
			<div class="demo-wrap">
				<Sidebar {groups} bind:collapsed activeHref="#" />
				<div class="demo-main">
					<p>Contenu principal</p>
					<p class="state-hint">Sidebar : <strong>{collapsed ? 'réduite' : 'ouverte'}</strong></p>
				</div>
			</div>
		</ComponentPreview>
	</section>

	<section class="variant">
		<h2>Ouverte (par défaut)</h2>
		<ComponentPreview>
			<div class="demo-wrap">
				<Sidebar {groups} activeHref="#" />
				<div class="demo-main"><p>Contenu principal</p></div>
			</div>
		</ComponentPreview>
	</section>

	<div class="props-table">
		<h2>Props</h2>
		<table>
			<thead>
				<tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr>
			</thead>
			<tbody>
				<tr><td>groups</td><td>SidebarGroup[]</td><td>[]</td><td>Groupes de liens</td></tr>
				<tr><td>collapsed</td><td>boolean</td><td>false</td><td>État réduit (bindable)</td></tr>
				<tr><td>activeHref</td><td>string</td><td>''</td><td>Lien actif (mis en surbrillance)</td></tr>
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

	.demo-wrap {
		display: flex;
		min-height: 280px;
	}

	.demo-main {
		flex: 1;
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: #64748b;
		font-size: 14px;
	}

	.state-hint {
		font-size: 13px;
		color: #94a3b8;
	}

	.state-hint strong {
		color: #2563eb;
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
