<script lang="ts">
	import '$lib/styles/demo-page.css';
	import IntegrationsSection from '$lib/components/sections/IntegrationsSection.svelte';
	import {
		MessageSquare,
		Code2,
		BookOpen,
		Pen,
		CreditCard,
		Zap,
		Building2,
		Building,
		HardDrive,
		Layers,
		GitBranch,
		MessageCircle
	} from '@lucide/svelte';
</script>

<svelte:head>
	<title>Integrations — Sections — My Components</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<h1>IntegrationsSection</h1>
		<p>Grille d'intégrations avec statuts, icônes et CTA — idéale pour les pages produit.</p>
	</div>

	<section class="variant">
		<h2>4 colonnes — 12 intégrations</h2>
		<IntegrationsSection
			badge="Intégrations"
			title="Connectez vos outils préférés"
			description="Flōw s'intègre nativement avec les applications que votre équipe utilise au quotidien. Configuration en quelques clics, sans code."
			cta={{ label: 'Voir toutes les intégrations', href: '#' }}
			columns={4}
			integrations={[
				{
					name: 'Slack',
					description: 'Notifications et alertes',
					icon: MessageSquare,
					status: 'available',
					href: '#'
				},
				{
					name: 'GitHub',
					description: 'Suivi des issues et PR',
					icon: Code2,
					status: 'available',
					href: '#'
				},
				{
					name: 'Notion',
					description: 'Synchronisation des docs',
					icon: BookOpen,
					status: 'available',
					href: '#'
				},
				{
					name: 'Figma',
					description: 'Commentaires de design',
					icon: Pen,
					status: 'beta',
					href: '#'
				},
				{
					name: 'Stripe',
					description: 'Données de facturation',
					icon: CreditCard,
					status: 'available',
					href: '#'
				},
				{
					name: 'Zapier',
					description: 'Automatisations avancées',
					icon: Zap,
					status: 'available',
					href: '#'
				},
				{
					name: 'HubSpot',
					description: 'Contacts et pipelines CRM',
					icon: Building2,
					status: 'beta',
					href: '#'
				},
				{
					name: 'Salesforce',
					description: 'Données clients et leads',
					icon: Building,
					status: 'coming-soon'
				},
				{
					name: 'Google Drive',
					description: 'Fichiers et documents',
					icon: HardDrive,
					status: 'available',
					href: '#'
				},
				{
					name: 'Jira',
					description: 'Tickets et sprints',
					icon: Layers,
					status: 'available',
					href: '#'
				},
				{
					name: 'Linear',
					description: 'Gestion de projet agile',
					icon: GitBranch,
					status: 'beta',
					href: '#'
				},
				{
					name: 'Intercom',
					description: 'Support client intégré',
					icon: MessageCircle,
					status: 'coming-soon'
				}
			]}
		/>
	</section>

	<section class="variant">
		<h2>3 colonnes</h2>
		<IntegrationsSection
			title="Les essentiels en 3 colonnes"
			columns={3}
			integrations={[
				{ name: 'Slack', description: 'Notifications en temps réel', icon: MessageSquare, status: 'available', href: '#' },
				{ name: 'GitHub', description: 'Code et revues', icon: Code2, status: 'available', href: '#' },
				{ name: 'Stripe', description: 'Paiements sécurisés', icon: CreditCard, status: 'available', href: '#' },
				{ name: 'Zapier', description: 'Automatisez tout', icon: Zap, status: 'beta', href: '#' },
				{ name: 'Notion', description: 'Base de connaissance', icon: BookOpen, status: 'available', href: '#' },
				{ name: 'Linear', description: 'Suivi des sprints', icon: GitBranch, status: 'coming-soon' }
			]}
		/>
	</section>
</div>
