export type ComponentEntry = {
	slug: string;
	label: string;
	description?: string;
};

export type ComponentCategory = {
	slug: string;
	label: string;
	components: ComponentEntry[];
};

// Add new categories and components here as you create them
export const categories: ComponentCategory[] = [
	{
		slug: 'forms',
		label: 'Formulaires',
		components: [
			{
				slug: 'input',
				label: 'Champs de base',
				description: 'Input, Textarea, Checkbox, RadioGroup — RGAA'
			},
			{
				slug: 'selects',
				label: 'Selects',
				description: 'Natif, multi-choix, recherche simple et recherche multi'
			},
			{
				slug: 'fichier',
				label: 'Fichier',
				description: 'Zone de dépôt avec glisser-déposer, simple et multiple'
			},
			{
				slug: 'switch',
				label: 'Switch',
				description: 'Bascule accessible avec role="switch"'
			},
			{
				slug: 'date',
				label: 'Date',
				description: 'Sélecteur de date simple et plage de dates (start–end)'
			}
		]
	},
	{
		slug: 'buttons',
		label: 'Buttons',
		components: [
			{
				slug: 'button',
				label: 'Button',
				description: '5 variants, 3 tailles, loading/disabled, icônes, rendu en lien'
			}
		]
	},
	{
		slug: 'ui',
		label: 'UI',
		components: [
			{
				slug: 'tooltip',
				label: 'Tooltip',
				description: 'Info-bulle accessible sur hover/focus, 4 positions, flèche CSS'
			},
			{
				slug: 'collapse',
				label: 'Collapse',
				description: 'Accordéon natif <details>/<summary> avec animation CSS fluide'
			},
			{
				slug: 'tabs',
				label: 'Tabs',
				description: 'Navigation par onglets accessible, 3 variantes visuelles, flèches clavier'
			},
			{
				slug: 'modal',
				label: 'Modal',
				description: 'Dialog natif showModal() — centré, drawer, bottom-sheet — focus trap natif'
			},
			{
				slug: 'badge',
				label: 'Badge',
				description: 'Étiquette compacte, 5 variantes de couleur, tailles sm/md, point animé optionnel'
			},
			{
				slug: 'card',
				label: 'Card',
				description: 'Conteneur polyvalent avec bordure, ombre, hover et padding configurable'
			},
			{
				slug: 'avatar',
				label: 'Avatar',
				description: 'Photo ou initiales, 5 tailles, formes circle/square, fallback automatique'
			},
			{
				slug: 'input-simple',
				label: 'Champ simple',
				description: 'Input avec label, message d\'erreur et icône — version standalone accessible'
			},
			{
				slug: 'button-action',
				label: 'Button Action',
				description: 'Bouton d\'action avec icône et texte, 3 variantes visuelles'
			}
		]
	},
	{
		slug: 'layout',
		label: 'Layout',
		components: [
			{ slug: 'navbar', label: 'Navbar', description: 'Barre de navigation responsive avec menu hamburger' },
			{ slug: 'sidebar', label: 'Sidebar', description: 'Navigation latérale collapsible avec groupes' },
			{ slug: 'footer', label: 'Footer', description: 'Pied de page avec colonnes de liens' },
			{ slug: 'standard-layout', label: 'Standard Layout', description: 'Combinaison Navbar + Sidebar + Main + Footer' },
			{ slug: 'navbar-mobile', label: 'Navbar Mobile', description: 'Barre de navigation pour les appareils mobiles' }
		]
	},
	{
		slug: 'sections',
		label: 'Sections',
		components: [
			{
				slug: 'hero',
				label: 'Hero',
				description: 'Section d\'accroche avec badge, titre colorisé, description et CTAs — alignement centré ou gauche'
			},
			{
				slug: 'features',
				label: 'Features',
				description: 'Grille de fonctionnalités avec icônes et badges — 2, 3 ou 4 colonnes'
			},
			{
				slug: 'pricing',
				label: 'Pricing',
				description: 'Grille de tarifs avec plans, liste de features et plan mis en avant'
			},
			{
				slug: 'testimonials',
				label: 'Testimonials',
				description: 'Grille masonry de témoignages avec avatar, note en étoiles et citation'
			},
			{
				slug: 'faq',
				label: 'FAQ',
				description: 'Questions fréquentes en accordéon natif — 1 ou 2 colonnes'
			},
			{
				slug: 'cta',
				label: 'CTA Banner',
				description: 'Bandeau d\'appel à l\'action centré — variantes default, primary et dark'
			},
			{
				slug: 'stats',
				label: 'Stats',
				description: 'Grille de chiffres clés avec animation au scroll et préfixe/suffixe'
			},
			{
				slug: 'team',
				label: 'Team',
				description: 'Grille de membres avec avatar, bio et liens sociaux'
			},
			{
				slug: 'gallery',
				label: 'Gallery',
				description: 'Grille d\'images avec lightbox intégrée et navigation clavier'
			},
			{
				slug: 'newsletter',
				label: 'Newsletter',
				description: 'Formulaire d\'inscription avec validation, état de succès — variantes default et card'
			}
		]
	}
];
