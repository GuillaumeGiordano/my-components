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
				slug: 'search-filters',
				label: 'Search Filters',
				description: 'Barre de filtres collapsible au-dessus d\'un tableau ou d\'une grille — champs libres via slot, grille configurable, badge filtres actifs'
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
				slug: 'sidebar-item',
				label: 'Sidebar Item',
				description: 'Bouton de navigation sidebar — icône, label, badge notif, collapse avec sous-items, tooltip en mode réduit'
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
			},
			{
				slug: 'section-scrollbar',
				label: 'Section Scrollbar',
				description: 'Barre de scroll verticale avec points de section cliquables et thumb draggable — synchronisée avec la page'
			},
			{
				slug: 'nav-section-wheel',
				label: 'Nav Section Wheel',
				description: 'Roue de navigation verticale fixée sur le bord droit — 3 sections visibles, coupée en haut/bas, synchronisée avec le scroll'
			},
			{
				slug: 'speed-dial',
				label: 'Speed Dial',
				description: 'Bouton FAB fixe qui déploie un menu vertical vers le haut — items icône avec label au hover'
				},
				{
				slug: 'speed-dial-bar',
				label: 'Speed Dial Bar',
				description: 'Barre fixe en bas avec scroll horizontal infini en boucle et sous-menus au-dessus'
			},
			{
				slug: 'floating-group',
				label: 'Floating Group',
				description: 'Conteneur fixe bas gauche/droite pour regrouper plusieurs éléments flottants (SpeedDial, ScrollToTop…)'
			},
			{
				slug: 'typewriter',
				label: 'Type Writer',
				description: 'Préfixe statique + mots animés lettre par lettre en boucle — effet machine à écrire'
			},
			{
				slug: 'glow-card',
				label: 'Glow Card',
				description: 'Carte avec une lueur colorée qui suit la position du curseur — pseudo-element + CSS custom properties'
			},
			{
				slug: 'spotlight',
				label: 'Spotlight',
				description: 'Section sombre avec un halo lumineux qui suit la souris — effet torche'
			},
			{
				slug: 'word-cloud',
				label: 'Word Cloud',
				description: 'Nuage de mots — taille proportionnelle au poids, rotation déterministe, hover interactif'
			},
			{
				slug: 'konami-code',
				label: 'Konami Code',
				description: 'Déclenche un easter egg quand l\'utilisateur tape une séquence de touches configurable'
			},
			{
				slug: 'drag-sort',
				label: 'Drag Sort',
				description: 'Liste réordonnée par glisser-déposer — HTML5 natif, composant générique <T>, sans dépendance'
			},
			{
				slug: 'swipe-card',
				label: 'Swipe Card',
				description: 'Cartes empilées swipables gauche/droite — Pointer Events, rotation physique, générique <T>'
			},
			{
				slug: 'infinite-scroll',
				label: 'Infinite Scroll',
				description: 'Sentinel IntersectionObserver qui déclenche le chargement des données suivantes automatiquement'
			},
			{
				slug: 'particle-background',
				label: 'Particle Background',
				description: 'Réseau de particules animées sur canvas — rebond sur les bords, connexions selon la distance'
			},
			{
				slug: 'starfield-background',
				label: 'Starfield Background',
				description: 'Voyage dans les étoiles — projection 3D→2D avec traînées de motion blur sur canvas'
			},
			{
				slug: 'matrix-background',
				label: 'Matrix Background',
				description: 'Pluie de caractères katakana style Matrix — fond semi-transparent pour les traînées, canvas'
			},
			{
				slug: 'bubble-background',
				label: 'Bubble Background',
				description: 'Bulles transparentes qui montent avec reflet spéculaire — dérive aléatoire, canvas'
			},
			{
				slug: 'noise-background',
				label: 'Noise Background',
				description: 'Blobs flous en mouvement lent — effet liquid noise / lava lamp coloré, canvas + blur'
			},
			{
				slug: 'gradient-background',
				label: 'Gradient Background',
				description: 'Dégradé animé CSS pur — background-size 400%, couleurs et vitesse configurables, zéro JS runtime'
			},
			{
				slug: 'aurora-background',
				label: 'Aurora Background',
				description: 'Aurore boréale CSS — 4 couches floues animées indépendamment, fond sombre recommandé'
			},
			{
				slug: 'geometric-background',
				label: 'Geometric Background',
				description: 'Formes géométriques flottantes CSS — positions déterministes (stable SSR), animations indépendantes'
			},
			{
				slug: 'ocean-background',
				label: 'Ocean Background',
				description: 'Fond marin animé — rayons lumineux, caustiques par interférence sinusoïdale, bulles flottantes. 3 profondeurs.'
			},
			{
				slug: 'fire-background',
				label: 'Fire Background',
				description: 'Flammes canvas — particules HSL jaune→orange→rouge avec turbulence sinusoïdale'
			},
			{
				slug: 'rain-background',
				label: 'Rain Background',
				description: 'Pluie canvas — gouttes diagonales (vent configurable), ripples elliptiques à l\'impact'
			},
			{
				slug: 'snow-background',
				label: 'Snow Background',
				description: 'Flocons canvas — oscillation sinusoïdale par phase individuelle, vent configurable'
			},
			{
				slug: 'thunder-background',
				label: 'Thunder Background',
				description: 'Orage canvas — éclairs par déplacement récursif, flash de scène, timing aléatoire'
			},
			{
				slug: 'sand-background',
				label: 'Sand Background',
				description: 'Tempête de sable canvas — grains elliptiques avec parallaxe de profondeur, turbulence sinusoïdale'
			},
			{
				slug: 'neon-grid-background',
				label: 'Neon Grid Background',
				description: 'Grille synthwave perspective animée — lignes convergentes, soleil rétro, glow canvas'
			},
			{
				slug: 'glitch-text',
				label: 'Glitch Text',
				description: 'Effet glitch RGB — deux clones décalés avec clip-path aléatoire, fréquence et intensité configurables'
			},
			{
				slug: 'neon-text',
				label: 'Neon Text',
				description: 'Lueur néon CSS — couches de text-shadow, mode pulse lent ou flicker aléatoire'
			},
			{
				slug: 'scramble-text',
				label: 'Scramble Text',
				description: 'Lettres aléatoires avant révélation de gauche à droite — clic pour rejouer'
			},
			{
				slug: 'morph-text',
				label: 'Morph Text',
				description: 'Transition blur entre les mots — filter:blur CSS pur, zéro canvas'
			},
			{
				slug: 'cursor-trail',
				label: 'Cursor Trail',
				description: 'Traînée de particules qui suit le curseur — canvas fixed pointer-events:none, couleur configurable'
			},
			{
				slug: 'magnetic-button',
				label: 'Magnetic Button',
				description: 'Bouton qui s\'attire vers le curseur dans un rayon — force proportionnelle à la proximité'
			},
			{
				slug: 'tilt-3d',
				label: 'Tilt 3D',
				description: 'Carte pivotante en 3D selon la position du curseur — rotateX/Y + reflet glare optionnel'
			},
			{
				slug: 'scratch-card',
				label: 'Scratch Card',
				description: 'Effet gratte-carte canvas — destination-out pour effacer, révélation automatique selon un seuil'
			},
			{
				slug: 'count-up',
				label: 'Count Up',
				description: 'Chiffre animé de 0 à sa valeur quand il entre dans le viewport — IntersectionObserver + easing cubique'
			},
			{
				slug: 'confetti-button',
				label: 'Confetti Button',
				description: 'Clic → pluie de confettis canvas — formes mixtes, gravité, drag, couleurs configurables'
			},
			{
				slug: 'command-palette',
				label: 'Command Palette',
				description: 'Palette de commandes ⌘K — recherche fuzzy, navigation clavier, groupes, raccourcis'
			},
			{
				slug: 'marquee',
				label: 'Marquee',
				description: 'Scroll horizontal infini — CSS pur, duplication seamless, pause au survol, direction configurable'
			},
			{
				slug: 'sticky-story',
				label: 'Sticky Story',
				description: 'Section qui se colle au viewport — scroll budget par slide, transitions entre slides. Style Apple / Stripe'
			},
			{
				slug: 'text-reveal',
				label: 'Text Reveal',
				description: 'Chaque mot s\'allume en passant une ligne de lecture virtuelle synchronisée avec le scroll'
			},
			{
				slug: 'horizontal-scroll',
				label: 'Horizontal Scroll',
				description: 'Scroll vertical → défilement horizontal piloté — technique portfolio / timeline'
			},
			{
				slug: 'parallax-section',
				label: 'Parallax Section',
				description: 'Couche fond à vitesse réduite + contenu à vitesse normale — illusion de profondeur 3D'
			},
			{
				slug: 'zoom-reveal',
				label: 'Zoom Reveal',
				description: 'Élément scale(0.72→1) + fade en entrant dans le viewport — easing cubique'
			},
			{
				slug: 'scroll-reveal',
				label: 'Scroll Reveal',
				description: 'IntersectionObserver + stagger CSS via --i sur chaque enfant. 5 animations : fade-up, fade, zoom, slide-right, flip'
			},
			{
				slug: 'scroll-counter',
				label: 'Scroll Counter',
				description: 'Nombre directement lié à la position de scroll — monte et descend avec le scroll'
			},
			{
				slug: 'scroll-progress',
				label: 'Scroll Progress',
				description: 'Sidebar fixe : ligne de progression + dots de section cliquables avec smooth scroll'
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
			{ slug: 'navbar-mobile', label: 'Navbar Mobile', description: 'Barre de navigation pour les appareils mobiles' },
			{ slug: 'navbar-mobile-radial', label: 'Navbar Mobile Radial', description: 'Bouton flottant en bas à droite — menu radial en arc avec animation staggerée' },
			{ slug: 'navbar-mobile-radial-scroll', label: 'Radial Défilant', description: 'FAB radial avec 4 items visibles — glisser pour faire défiler les items en arc' },
			{ slug: 'navbar-mobile-wheel', label: 'Navbar Mobile Wheel', description: 'Roue rotative flottante — 3 items visibles, snap automatique, synchronisée avec le scroll de la page' }
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
