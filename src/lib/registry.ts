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
			},
			{
				slug: 'number-input',
				label: 'Number Input',
				description: 'Champ numérique avec boutons +/− — min, max, step configurables'
			},
			{
				slug: 'slider',
				label: 'Slider',
				description: 'Curseur de valeur numérique — min/max/step, formatage personnalisé'
			},
			{
				slug: 'otp',
				label: 'OTP Input',
				description: 'Saisie de code de vérification 4–6 chiffres — coller, navigation clavier'
			},
			{
				slug: 'tag-input',
				label: 'Tag Input',
				description: 'Saisie de tags — Entrée ou virgule pour valider, Backspace pour supprimer'
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
			},
			{
				slug: 'alert',
				label: 'Alert',
				description: 'Bloc de notification inline — 4 variantes, titre optionnel, dismissible'
			},
			{
				slug: 'toast',
				label: 'Toast',
				description: 'Notification flottante déclenchée par toast.success/error/warning/info()'
			},
			{
				slug: 'spinner',
				label: 'Spinner',
				description: 'Indicateur de chargement circulaire — 5 tailles, 3 couleurs'
			},
			{
				slug: 'skeleton',
				label: 'Skeleton',
				description: 'Placeholder shimmer animé — rect, text, circle'
			},
			{
				slug: 'progress',
				label: 'Progress',
				description: 'Barre linéaire et anneau circulaire — 4 couleurs, 3 tailles'
			},
			{
				slug: 'breadcrumb',
				label: 'Breadcrumb',
				description: 'Fil d\'Ariane accessible avec icône home et collapse automatique'
			},
			{
				slug: 'empty-state',
				label: 'Empty State',
				description: 'Placeholder affiché quand une liste est vide — icône, titre, CTA'
			},
			{
				slug: 'stepper',
				label: 'Stepper',
				description: 'Indicateur multi-étapes — horizontal/vertical, numéroté/pointillé'
			},
			{
				slug: 'table',
				label: 'Table',
				description: 'Tableau de données avec tri, sélection par checkbox'
			},
			{
				slug: 'pagination',
				label: 'Pagination',
				description: 'Navigation entre pages avec collapse automatique des numéros intermédiaires'
			},
			{
				slug: 'divider',
				label: 'Divider',
				description: 'Séparateur horizontal/vertical avec label optionnel'
			},
			{
				slug: 'kbd',
				label: 'Kbd',
				description: 'Affichage de raccourcis clavier stylisés'
			},
			{
				slug: 'rating',
				label: 'Rating',
				description: 'Évaluation par étoiles — interactif ou lecture seule, 1 à N étoiles'
			},
			{
				slug: 'copy-button',
				label: 'Copy Button',
				description: 'Bouton copier avec feedback visuel automatique après 2 secondes'
			},
			{
				slug: 'scroll-to-top',
				label: 'Scroll To Top',
				description: 'Bouton fixe de retour en haut — apparaît après 300px de scroll, animation fluide'
			},
			{
				slug: 'timeline',
				label: 'Timeline',
				description: 'Historique chronologique vertical avec icônes et variantes de couleur'
			},
			{
				slug: 'chatbot',
				label: 'Chatbot',
				description: 'Widget conversationnel flottant — branchez votre propre handler IA (Claude, OpenAI…)'
			},
			{
				slug: 'carousel',
				label: 'Carousel',
				description: 'Carrousel de diapositives — flèches, points, autoplay, swipe tactile, navigation clavier'
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
				slug: 'about',
				label: 'About',
				description: '3 variantes : split texte+visuel, mission+stats animées+valeurs, story fondateur+timeline jalons'
			},
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
				slug: 'image-cards',
				label: 'Image Cards',
				description: 'Grille de cartes full-image avec overlay sombre, accent coloré et texte — 2 à 4 colonnes'
			},
			{
				slug: 'newsletter',
				label: 'Newsletter',
				description: 'Formulaire d\'inscription avec validation, état de succès — variantes default et card'
			},
			{
				slug: 'logo-cloud',
				label: 'Logo Cloud',
				description: 'Logos clients en grille statique ou défilement infini — variante muted avec hover'
			},
			{
				slug: 'process',
				label: 'Process',
				description: 'Étapes numérotées avec connecteurs — layout horizontal ou vertical, responsive'
			},
			{
				slug: 'comparison',
				label: 'Comparison Table',
				description: 'Tableau comparatif sticky avec check/cross/texte, catégories et tooltips'
			},
			{
				slug: 'blog-grid',
				label: 'Blog Grid',
				description: 'Grille d\'articles avec image, badge catégorie, auteur et temps de lecture'
			},
			{
				slug: 'contact',
				label: 'Contact',
				description: 'Formulaire de contact avec infos latérales — variantes split et centré'
			},
			{
				slug: 'split-feature',
				label: 'Split Feature',
				description: 'Sections alternées texte + visuel avec bullets et CTA — responsive'
			},
			{
				slug: 'video',
				label: 'Video',
				description: 'Section vidéo avec overlay play, miniature et embed YouTube/Vimeo'
			},
			{
				slug: 'integrations',
				label: 'Integrations',
				description: 'Grille d\'intégrations avec statuts disponible/bêta/bientôt'
			},
			{
				slug: 'download',
				label: 'Download',
				description: 'Section téléchargement avec boutons store stylisés et statistiques'
			},
			{
				slug: 'announcement',
				label: 'Announcement Bar',
				description: 'Barre d\'annonce sticky avec 4 variantes de couleur et fermeture animée'
			},
			{
				slug: 'cookie',
				label: 'Cookie Banner',
				description: 'Bannière de consentement RGPD — 3 positions, persistance localStorage'
			},
			{
				slug: 'error',
				label: 'Error / 404',
				description: 'Page d\'erreur plein écran — code, titre, description, CTA secondaire'
			},
			{
				slug: 'coming-soon',
				label: 'Coming Soon',
				description: 'Page de lancement avec compte à rebours et formulaire d\'inscription'
			},
			{
				slug: 'onboarding',
				label: 'Onboarding',
				description: 'Écran de bienvenue multi-étapes — Stepper + navigation + visuel'
			},
			{
				slug: 'premium-hero',
				label: '✦ Premium Hero',
				description: 'Hero dark ultra-animé — orbes flottants, scroll reveal mot par mot, bento 3D tilt, bouton magnétique, bordure shimmer'
			}
		]
	}
];
