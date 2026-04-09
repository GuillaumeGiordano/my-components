<script lang="ts">
	import ComponentPreview from '$lib/ComponentPreview.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import { LayoutDashboard, BarChart2, FileText, User, Lock, Bell } from '@lucide/svelte';
	import '$lib/styles/demo-page.css';

	const groups = [
		{
			label: 'Général',
			items: [
				{ label: 'Tableau de bord', href: '#', icon: LayoutDashboard },
				{ label: 'Analytiques', href: '#', icon: BarChart2 },
				{ label: 'Rapports', href: '#', icon: FileText }
			]
		},
		{
			label: 'Paramètres',
			items: [
				{ label: 'Profil', href: '#', icon: User },
				{ label: 'Sécurité', href: '#', icon: Lock },
				{ label: 'Notifications', href: '#', icon: Bell }
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
		color: var(--text-muted);
		font-size: 14px;
	}

	.state-hint {
		font-size: 13px;
		color: var(--text-subtle);
	}

	.state-hint strong {
		color: var(--primary);
	}
</style>
