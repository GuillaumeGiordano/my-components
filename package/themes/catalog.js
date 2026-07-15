// Theme catalog — pure data, NO runes ($state).
// This module is the single source of truth for the theme list. It is imported by:
//   - the runtime store (theme.svelte.ts / studio.svelte.ts)
//   - the Node generator (scripts/generate-themes.ts) that emits static CSS files
// Keep it free of Svelte runes so it can run under plain `node`.
export const THEMES = [
    // ── Thèmes fondamentaux ───────────────────────────────────────────────────
    {
        id: 'default', label: 'Default', description: 'Bleu · classique · équilibré',
        shape: 'default', shadow: 'default', typography: 'default',
        font: 'sans', transition: 'default', texture: 'none', tracking: 'default',
        light: { primary: '#2563eb', primaryHover: '#1d4ed8', primaryFg: '#ffffff', primarySubtle: '#dbeafe', primarySubtleFg: '#1d4ed8' },
        dark: { primary: '#3b82f6', primaryHover: '#2563eb', primaryFg: '#ffffff', primarySubtle: '#1e3a8a', primarySubtleFg: '#93c5fd' },
        preview: { primary: '#2563eb', radiusMd: '6px', shadowCss: '0 4px 8px rgba(37,99,235,0.18)' },
    },
    {
        id: 'midnight', label: 'Midnight', description: 'Violet · angulaire · dramatique',
        shape: 'sharp', shadow: 'elevated', typography: 'tight',
        font: 'sans', transition: 'smooth', texture: 'none', tracking: 'default',
        light: { primary: '#7c3aed', primaryHover: '#6d28d9', primaryFg: '#ffffff', primarySubtle: '#ede9fe', primarySubtleFg: '#5b21b6' },
        dark: { primary: '#a78bfa', primaryHover: '#8b5cf6', primaryFg: '#ffffff', primarySubtle: '#2e1065', primarySubtleFg: '#c4b5fd' },
        preview: { primary: '#7c3aed', radiusMd: '2px', shadowCss: '0 10px 30px rgba(124,58,237,0.28)' },
    },
    {
        id: 'nature', label: 'Nature', description: 'Vert · arrondi · aéré',
        shape: 'rounded', shadow: 'default', typography: 'relaxed',
        font: 'geometric', transition: 'smooth', texture: 'dots', tracking: 'default',
        light: { primary: '#059669', primaryHover: '#047857', primaryFg: '#ffffff', primarySubtle: '#d1fae5', primarySubtleFg: '#065f46' },
        dark: { primary: '#34d399', primaryHover: '#10b981', primaryFg: '#022c22', primarySubtle: '#022c22', primarySubtleFg: '#6ee7b7' },
        textureColor: { light: 'rgba(5,150,105,0.06)', dark: 'rgba(52,211,153,0.05)' },
        preview: { primary: '#059669', radiusMd: '10px', shadowCss: '0 4px 12px rgba(5,150,105,0.18)' },
    },
    {
        id: 'corporate', label: 'Corporate', description: 'Gris · carré · épuré',
        shape: 'sharp', shadow: 'flat', typography: 'tight',
        font: 'mono', transition: 'snappy', texture: 'lines', tracking: 'tight-body',
        light: { primary: '#475569', primaryHover: '#334155', primaryFg: '#ffffff', primarySubtle: '#f1f5f9', primarySubtleFg: '#1e293b' },
        dark: { primary: '#94a3b8', primaryHover: '#cbd5e1', primaryFg: '#0f172a', primarySubtle: '#1e293b', primarySubtleFg: '#cbd5e1' },
        textureColor: { light: 'rgba(0,0,0,0.04)', dark: 'rgba(255,255,255,0.025)' },
        preview: { primary: '#475569', radiusMd: '2px', shadowCss: 'none' },
    },
    {
        id: 'warm', label: 'Warm', description: 'Orange · arrondi · chaleureux',
        shape: 'rounded', shadow: 'elevated', typography: 'default',
        font: 'geometric', transition: 'smooth', texture: 'none', tracking: 'default',
        light: { primary: '#ea580c', primaryHover: '#c2410c', primaryFg: '#ffffff', primarySubtle: '#ffedd5', primarySubtleFg: '#9a3412' },
        dark: { primary: '#fb923c', primaryHover: '#f97316', primaryFg: '#ffffff', primarySubtle: '#431407', primarySubtleFg: '#fdba74' },
        preview: { primary: '#ea580c', radiusMd: '10px', shadowCss: '0 8px 24px rgba(234,88,12,0.22)' },
    },
    {
        id: 'playful', label: 'Playful', description: 'Rose · pill · rebondissant',
        shape: 'pill', shadow: 'default', typography: 'relaxed',
        font: 'geometric', transition: 'spring', texture: 'none', tracking: 'default',
        light: { primary: '#e11d48', primaryHover: '#be123c', primaryFg: '#ffffff', primarySubtle: '#ffe4e6', primarySubtleFg: '#9f1239' },
        dark: { primary: '#fb7185', primaryHover: '#f43f5e', primaryFg: '#ffffff', primarySubtle: '#4c0519', primarySubtleFg: '#fda4af' },
        preview: { primary: '#e11d48', radiusMd: '20px', shadowCss: '0 4px 12px rgba(225,29,72,0.18)' },
    },
    // ── Thèmes pop-culture ───────────────────────────────────────────────────
    {
        // Rouge sabre laser · architecture impériale 100% angles droits
        id: 'dark-side', label: 'Dark Side', description: 'Rouge Sith · angles impériaux · Empire',
        shape: 'sharp', shadow: 'elevated', typography: 'tight',
        font: 'condensed', transition: 'snappy', texture: 'none', tracking: 'tight-body',
        light: { primary: '#dc2626', primaryHover: '#7f1d1d', primaryFg: '#ffffff', primarySubtle: '#fee2e2', primarySubtleFg: '#991b1b' },
        dark: { primary: '#ef4444', primaryHover: '#450a0a', primaryFg: '#ffffff', primarySubtle: '#450a0a', primarySubtleFg: '#fca5a5' },
        bgDark: { base: '#100000', subtle: '#1a0000', muted: '#1a0000', hover: '#2d0000' },
        borderDark: { border: 'rgba(220,38,38,0.22)', borderStrong: 'rgba(220,38,38,0.40)' },
        preview: { primary: '#dc2626', radiusMd: '2px', shadowCss: '0 10px 36px rgba(220,38,38,0.55)' },
    },
    {
        // Orange combinaisons X-Wing · formes combatives
        id: 'rebel', label: 'Rebel', description: 'Orange X-Wing · combatif · Rébellion',
        shape: 'rounded', shadow: 'elevated', typography: 'default',
        font: 'sans', transition: 'default', texture: 'none', tracking: 'default',
        light: { primary: '#c2410c', primaryHover: '#7c2d12', primaryFg: '#ffffff', primarySubtle: '#ffedd5', primarySubtleFg: '#7c2d12' },
        dark: { primary: '#fb923c', primaryHover: '#fed7aa', primaryFg: '#1a0800', primarySubtle: '#3a1500', primarySubtleFg: '#fed7aa' },
        preview: { primary: '#c2410c', radiusMd: '10px', shadowCss: '0 8px 28px rgba(194,65,12,0.42)' },
    },
    {
        // Rouge + hover noir — le costume du mercenaire
        id: 'deadpool', label: 'Deadpool', description: 'Rouge & noir · brutal · sans filtre',
        shape: 'default', shadow: 'elevated', typography: 'tight',
        font: 'condensed', transition: 'snappy', texture: 'none', tracking: 'tight-body',
        light: { primary: '#dc2626', primaryHover: '#0a0a0a', primaryFg: '#ffffff', primarySubtle: '#fee2e2', primarySubtleFg: '#991b1b' },
        dark: { primary: '#ef4444', primaryHover: '#111111', primaryFg: '#ffffff', primarySubtle: '#450a0a', primarySubtleFg: '#fca5a5' },
        bgDark: { base: '#0f0000', subtle: '#150000', muted: '#150000', hover: '#200000' },
        borderDark: { border: 'rgba(220,38,38,0.18)', borderStrong: 'rgba(220,38,38,0.32)' },
        preview: { primary: '#dc2626', radiusMd: '6px', shadowCss: '0 10px 32px rgba(220,38,38,0.50)' },
    },
    {
        // Bleu cape → rouge shield au hover · angles du sceau S
        id: 'man-of-steel', label: 'Man of Steel', description: 'Bleu cape → rouge shield · angles du S',
        shape: 'sharp', shadow: 'elevated', typography: 'tight',
        font: 'condensed', transition: 'snappy', texture: 'none', tracking: 'tight-body',
        light: { primary: '#1565c0', primaryHover: '#b91c1c', primaryFg: '#ffffff', primarySubtle: '#e3f2fd', primarySubtleFg: '#0a3069' },
        dark: { primary: '#3b82f6', primaryHover: '#ef4444', primaryFg: '#ffffff', primarySubtle: '#0a1628', primarySubtleFg: '#93c5fd' },
        borderLight: { border: 'rgba(21,101,192,0.18)', borderStrong: 'rgba(21,101,192,0.32)' },
        borderDark: { border: 'rgba(59,130,246,0.20)', borderStrong: 'rgba(239,68,68,0.25)' },
        preview: { primary: '#1565c0', radiusMd: '2px', shadowCss: '0 10px 28px rgba(21,101,192,0.42)' },
    },
    {
        // Circuits imprimés cyan néon sur fond quasi-noir
        id: 'tron', label: 'Tron', description: 'Cyan néon · circuits 90° · glow électrique',
        shape: 'sharp', shadow: 'elevated', typography: 'tight',
        font: 'mono', transition: 'instant', texture: 'grid', tracking: 'wide',
        light: { primary: '#0891b2', primaryHover: '#164e63', primaryFg: '#ffffff', primarySubtle: '#cffafe', primarySubtleFg: '#155e75' },
        dark: { primary: '#22d3ee', primaryHover: '#67e8f9', primaryFg: '#001a1f', primarySubtle: '#002b36', primarySubtleFg: '#67e8f9' },
        bgDark: { base: '#001a1f', subtle: '#002b36', muted: '#003344', hover: '#004455' },
        borderDark: { border: 'rgba(34,211,238,0.22)', borderStrong: 'rgba(34,211,238,0.45)' },
        textureColor: { light: 'rgba(8,145,178,0.07)', dark: 'rgba(34,211,238,0.07)' },
        preview: { primary: '#22d3ee', radiusMd: '2px', shadowCss: '0 0 32px rgba(34,211,238,0.70)' },
    },
    {
        // Jaune éclair · carrosserie arrondie · 88 mph
        id: 'delorean', label: 'DeLorean', description: 'Jaune éclair · carrosserie pill · 88 mph',
        shape: 'pill', shadow: 'elevated', typography: 'relaxed',
        font: 'geometric', transition: 'spring', texture: 'none', tracking: 'default',
        light: { primary: '#ca8a04', primaryHover: '#713f12', primaryFg: '#000000', primarySubtle: '#fefce8', primarySubtleFg: '#713f12' },
        dark: { primary: '#fbbf24', primaryHover: '#fef08a', primaryFg: '#1c0f00', primarySubtle: '#2d1b00', primarySubtleFg: '#fde68a' },
        preview: { primary: '#fbbf24', radiusMd: '20px', shadowCss: '0 8px 32px rgba(251,191,36,0.55)' },
    },
    {
        // Jaune Bat-signal sur noir absolu · brutaliste/flat
        id: 'gotham', label: 'Gotham', description: 'Jaune Bat-signal · noir absolu au hover · flat',
        shape: 'sharp', shadow: 'flat', typography: 'tight',
        font: 'condensed', transition: 'instant', texture: 'none', tracking: 'tight-body',
        light: { primary: '#ca8a04', primaryHover: '#000000', primaryFg: '#000000', primarySubtle: '#fefce8', primarySubtleFg: '#713f12' },
        dark: { primary: '#facc15', primaryHover: '#000000', primaryFg: '#000000', primarySubtle: '#1a1100', primarySubtleFg: '#fef08a' },
        bgDark: { base: '#0a0900', subtle: '#110f00', muted: '#110f00', hover: '#1c1900' },
        borderDark: { border: 'rgba(202,138,4,0.22)', borderStrong: 'rgba(202,138,4,0.40)' },
        preview: { primary: '#facc15', radiusMd: '2px', shadowCss: 'none' },
    },
    {
        // Or royal → bordeaux velours au hover · ivoire en light / nuit royale en dark
        id: 'versailles', label: 'Versailles', description: 'Or royal · ivoire · Rococo',
        shape: 'rounded', shadow: 'elevated', typography: 'tight',
        font: 'geometric', transition: 'smooth', texture: 'lines', tracking: 'default',
        light: { primary: '#c9950c', primaryHover: '#7b1f3a', primaryFg: '#ffffff', primarySubtle: '#fdf3dc', primarySubtleFg: '#7b4a00' },
        dark: { primary: '#d4a843', primaryHover: '#e8c97a', primaryFg: '#12080e', primarySubtle: '#2a1800', primarySubtleFg: '#e8c97a' },
        bgLight: { base: '#faf3e0', subtle: '#f0e6c8', muted: '#e8d9b0', hover: '#dcc890' },
        bgDark: { base: '#12080e', subtle: '#1e0f16', muted: '#1e0f16', hover: '#2d1622' },
        borderLight: { border: 'rgba(201,149,12,0.22)', borderStrong: 'rgba(201,149,12,0.40)' },
        borderDark: { border: 'rgba(212,168,67,0.22)', borderStrong: 'rgba(212,168,67,0.42)' },
        textureColor: { light: 'rgba(180,120,20,0.05)', dark: 'rgba(212,168,67,0.04)' },
        preview: { primary: '#c9950c', radiusMd: '10px', shadowCss: '0 8px 28px rgba(201,149,12,0.38)' },
    },
    {
        // Hot-pink fuchsia · tout arrondi · fond rose même en light mode
        id: 'barbie', label: 'Barbie', description: 'Hot-pink · pill · pétillant',
        shape: 'pill', shadow: 'elevated', typography: 'relaxed',
        font: 'geometric', transition: 'spring', texture: 'dots', tracking: 'default',
        light: { primary: '#e91e8c', primaryHover: '#c2185b', primaryFg: '#ffffff', primarySubtle: '#fce4ec', primarySubtleFg: '#880e4f' },
        dark: { primary: '#f72585', primaryHover: '#ff6eb4', primaryFg: '#ffffff', primarySubtle: '#3d0025', primarySubtleFg: '#ff9ecf' },
        bgLight: { base: '#fff0f7', subtle: '#ffe4f0', muted: '#ffd6e8', hover: '#ffc2da' },
        bgDark: { base: '#1a0011', subtle: '#2d0017', muted: '#2d0017', hover: '#3d0020' },
        borderLight: { border: 'rgba(233,30,140,0.18)', borderStrong: 'rgba(233,30,140,0.32)' },
        borderDark: { border: 'rgba(247,37,133,0.22)', borderStrong: 'rgba(247,37,133,0.42)' },
        textureColor: { light: 'rgba(233,30,140,0.07)', dark: 'rgba(247,37,133,0.06)' },
        preview: { primary: '#e91e8c', radiusMd: '20px', shadowCss: '0 8px 28px rgba(233,30,140,0.48)' },
    },
    {
        // Pluie de caractères verts · terminal · flat
        id: 'matrix', label: 'Matrix', description: 'Vert code · terminal · pluie de caractères',
        shape: 'sharp', shadow: 'flat', typography: 'tight',
        font: 'mono', transition: 'instant', texture: 'grid', tracking: 'wide',
        light: { primary: '#15803d', primaryHover: '#052e16', primaryFg: '#ffffff', primarySubtle: '#dcfce7', primarySubtleFg: '#14532d' },
        dark: { primary: '#4ade80', primaryHover: '#86efac', primaryFg: '#000000', primarySubtle: '#001a00', primarySubtleFg: '#86efac' },
        bgDark: { base: '#000800', subtle: '#001200', muted: '#001500', hover: '#002200' },
        borderDark: { border: 'rgba(74,222,128,0.20)', borderStrong: 'rgba(74,222,128,0.38)' },
        textureColor: { light: 'rgba(21,128,61,0.06)', dark: 'rgba(74,222,128,0.06)' },
        preview: { primary: '#4ade80', radiusMd: '2px', shadowCss: 'none' },
    },
    // ── Nouveaux thèmes ────────────────────────────────────────────────────────
    {
        // Vert acide xénomorphe · terminal Nostromo · organique-mécanique
        id: 'alien', label: 'Alien', description: 'Vert acide · Nostromo · organique',
        shape: 'sharp', shadow: 'elevated', typography: 'tight',
        font: 'mono', transition: 'smooth', texture: 'grid', tracking: 'wide',
        light: { primary: '#4d7c0f', primaryHover: '#1a2e00', primaryFg: '#ffffff', primarySubtle: '#ecfccb', primarySubtleFg: '#365314' },
        dark: { primary: '#bef264', primaryHover: '#d9f99d', primaryFg: '#0a1400', primarySubtle: '#0a1400', primarySubtleFg: '#d9f99d' },
        bgDark: { base: '#040900', subtle: '#080f00', muted: '#080f00', hover: '#0f1a00' },
        borderDark: { border: 'rgba(190,242,100,0.18)', borderStrong: 'rgba(190,242,100,0.35)' },
        textureColor: { light: 'rgba(77,124,15,0.06)', dark: 'rgba(190,242,100,0.06)' },
        preview: { primary: '#bef264', radiusMd: '2px', shadowCss: '0 0 28px rgba(190,242,100,0.55)' },
    },
    {
        // Violet Na'vi → cyan bioluminescent au hover · jungle alien de nuit
        id: 'avatar', label: 'Avatar', description: 'Violet Na\'vi → cyan bio · Pandora',
        shape: 'rounded', shadow: 'elevated', typography: 'relaxed',
        font: 'geometric', transition: 'smooth', texture: 'dots', tracking: 'default',
        light: { primary: '#6d28d9', primaryHover: '#0891b2', primaryFg: '#ffffff', primarySubtle: '#ede9fe', primarySubtleFg: '#4c1d95' },
        dark: { primary: '#a78bfa', primaryHover: '#22d3ee', primaryFg: '#0a0014', primarySubtle: '#1e0040', primarySubtleFg: '#c4b5fd' },
        bgDark: { base: '#020014', subtle: '#050028', muted: '#050028', hover: '#0a003f' },
        borderDark: { border: 'rgba(167,139,250,0.20)', borderStrong: 'rgba(34,211,238,0.28)' },
        textureColor: { light: 'rgba(109,40,217,0.05)', dark: 'rgba(167,139,250,0.06)' },
        preview: { primary: '#a78bfa', radiusMd: '10px', shadowCss: '0 0 28px rgba(167,139,250,0.55)' },
    },
    {
        // Rouge sang de l'Upside Down · TV static · années 80 condensed
        id: 'stranger-things', label: 'Stranger Things', description: 'Rouge Upside Down · TV static · 1983',
        shape: 'default', shadow: 'elevated', typography: 'tight',
        font: 'condensed', transition: 'snappy', texture: 'dots', tracking: 'tight-body',
        light: { primary: '#b91c1c', primaryHover: '#450a0a', primaryFg: '#ffffff', primarySubtle: '#fee2e2', primarySubtleFg: '#991b1b' },
        dark: { primary: '#ef4444', primaryHover: '#7f1d1d', primaryFg: '#ffffff', primarySubtle: '#3b0000', primarySubtleFg: '#fca5a5' },
        bgDark: { base: '#090000', subtle: '#120000', muted: '#120000', hover: '#1e0000' },
        borderDark: { border: 'rgba(239,68,68,0.20)', borderStrong: 'rgba(239,68,68,0.40)' },
        textureColor: { light: 'rgba(185,28,28,0.06)', dark: 'rgba(239,68,68,0.07)' },
        preview: { primary: '#b91c1c', radiusMd: '6px', shadowCss: '0 10px 32px rgba(185,28,28,0.52)' },
    },
    {
        // Beskar cuivre + pierre sombre · This is the Way
        id: 'mandalorian', label: 'Mandalorian', description: 'Beskar cuivre · pierre · This is the Way',
        shape: 'sharp', shadow: 'flat', typography: 'tight',
        font: 'condensed', transition: 'instant', texture: 'lines', tracking: 'tight-body',
        light: { primary: '#b5894a', primaryHover: '#292524', primaryFg: '#ffffff', primarySubtle: '#fef3c7', primarySubtleFg: '#78350f' },
        dark: { primary: '#d4a96a', primaryHover: '#a3a3a3', primaryFg: '#0c0a09', primarySubtle: '#1c1410', primarySubtleFg: '#d4a96a' },
        bgDark: { base: '#0c0a09', subtle: '#1c1917', muted: '#1c1917', hover: '#292524' },
        borderDark: { border: 'rgba(212,169,106,0.20)', borderStrong: 'rgba(212,169,106,0.38)' },
        textureColor: { light: 'rgba(100,83,60,0.05)', dark: 'rgba(212,169,106,0.04)' },
        preview: { primary: '#b5894a', radiusMd: '2px', shadowCss: 'none' },
    },
    {
        // Vert serpent → argent au hover · donjons de Poudlard
        id: 'slytherin', label: 'Slytherin', description: 'Vert serpent → argent · donjons froids',
        shape: 'sharp', shadow: 'elevated', typography: 'tight',
        font: 'condensed', transition: 'smooth', texture: 'lines', tracking: 'tight-body',
        light: { primary: '#166534', primaryHover: '#6b7280', primaryFg: '#ffffff', primarySubtle: '#dcfce7', primarySubtleFg: '#14532d' },
        dark: { primary: '#22c55e', primaryHover: '#d1d5db', primaryFg: '#000000', primarySubtle: '#032010', primarySubtleFg: '#86efac' },
        bgDark: { base: '#030d07', subtle: '#071410', muted: '#071410', hover: '#0d2018' },
        borderDark: { border: 'rgba(34,197,94,0.18)', borderStrong: 'rgba(34,197,94,0.32)' },
        textureColor: { light: 'rgba(22,101,52,0.06)', dark: 'rgba(34,197,94,0.05)' },
        preview: { primary: '#166534', radiusMd: '2px', shadowCss: '0 8px 24px rgba(22,101,52,0.32)' },
    },
    {
        // Or + ivoire clair · hover navy Art Déco · géométrie 1920s
        id: 'art-deco', label: 'Art Déco', description: 'Or 1920s → navy · géométrie stricte',
        shape: 'sharp', shadow: 'flat', typography: 'tight',
        font: 'condensed', transition: 'snappy', texture: 'lines', tracking: 'tight-body',
        light: { primary: '#b8860b', primaryHover: '#1e1b4b', primaryFg: '#ffffff', primarySubtle: '#fef9e7', primarySubtleFg: '#713f12' },
        dark: { primary: '#e8c97a', primaryHover: '#c7d2fe', primaryFg: '#0a0900', primarySubtle: '#1e1600', primarySubtleFg: '#e8c97a' },
        bgLight: { base: '#faf6ec', subtle: '#f0e8cc', muted: '#e8d9b0', hover: '#d9c481' },
        bgDark: { base: '#0a0900', subtle: '#141200', muted: '#141200', hover: '#1e1a00' },
        borderLight: { border: 'rgba(184,134,11,0.22)', borderStrong: 'rgba(184,134,11,0.45)' },
        borderDark: { border: 'rgba(232,201,122,0.22)', borderStrong: 'rgba(232,201,122,0.45)' },
        textureColor: { light: 'rgba(184,134,11,0.06)', dark: 'rgba(232,201,122,0.04)' },
        preview: { primary: '#b8860b', radiusMd: '2px', shadowCss: 'none' },
    },
    {
        // Rouge → bleu primaire au hover · grille Bauhaus · fonctionnel pur
        id: 'bauhaus', label: 'Bauhaus', description: 'Rouge → bleu primaire · grille · fonctionnel',
        shape: 'sharp', shadow: 'flat', typography: 'tight',
        font: 'condensed', transition: 'instant', texture: 'grid', tracking: 'tight-body',
        light: { primary: '#dc2626', primaryHover: '#1d4ed8', primaryFg: '#ffffff', primarySubtle: '#fee2e2', primarySubtleFg: '#991b1b' },
        dark: { primary: '#f87171', primaryHover: '#60a5fa', primaryFg: '#ffffff', primarySubtle: '#450a0a', primarySubtleFg: '#fca5a5' },
        borderLight: { border: 'rgba(220,38,38,0.15)', borderStrong: 'rgba(29,78,216,0.25)' },
        textureColor: { light: 'rgba(0,0,0,0.05)', dark: 'rgba(255,255,255,0.04)' },
        preview: { primary: '#dc2626', radiusMd: '2px', shadowCss: 'none' },
    },
    {
        // Fuchsia → cyan au hover · grille perspective · rétro-futur 80s
        id: 'vaporwave', label: 'Vaporwave', description: 'Fuchsia → cyan · grille perspective · 80s',
        shape: 'pill', shadow: 'elevated', typography: 'relaxed',
        font: 'geometric', transition: 'smooth', texture: 'grid', tracking: 'default',
        light: { primary: '#a21caf', primaryHover: '#0e7490', primaryFg: '#ffffff', primarySubtle: '#fdf4ff', primarySubtleFg: '#701a75' },
        dark: { primary: '#e879f9', primaryHover: '#22d3ee', primaryFg: '#1a0020', primarySubtle: '#2d0040', primarySubtleFg: '#f0abfc' },
        bgDark: { base: '#0d0017', subtle: '#1a0028', muted: '#1a0028', hover: '#220038' },
        borderDark: { border: 'rgba(232,121,249,0.18)', borderStrong: 'rgba(34,211,238,0.25)' },
        textureColor: { light: 'rgba(162,28,175,0.05)', dark: 'rgba(232,121,249,0.05)' },
        preview: { primary: '#e879f9', radiusMd: '20px', shadowCss: '0 8px 28px rgba(232,121,249,0.48)' },
    },
    {
        // Orange → violet inattendu · formes pill · chaos joyeux Memphis design
        id: 'memphis', label: 'Memphis', description: 'Orange → violet · pill · chaos joyeux',
        shape: 'pill', shadow: 'default', typography: 'relaxed',
        font: 'geometric', transition: 'spring', texture: 'dots', tracking: 'default',
        light: { primary: '#f97316', primaryHover: '#7c3aed', primaryFg: '#ffffff', primarySubtle: '#fff7ed', primarySubtleFg: '#9a3412' },
        dark: { primary: '#fb923c', primaryHover: '#a78bfa', primaryFg: '#1a0800', primarySubtle: '#3a1500', primarySubtleFg: '#fed7aa' },
        textureColor: { light: 'rgba(249,115,22,0.07)', dark: 'rgba(251,146,60,0.06)' },
        preview: { primary: '#f97316', radiusMd: '20px', shadowCss: '0 6px 20px rgba(249,115,22,0.35)' },
    },
    {
        // Orange incandescent sur obsidienne · lave volcanique
        id: 'lave', label: 'Lave', description: 'Orange incandescent · obsidienne · volcanique',
        shape: 'sharp', shadow: 'elevated', typography: 'tight',
        font: 'condensed', transition: 'snappy', texture: 'none', tracking: 'tight-body',
        light: { primary: '#ea580c', primaryHover: '#450a0a', primaryFg: '#ffffff', primarySubtle: '#fff7ed', primarySubtleFg: '#7c2d12' },
        dark: { primary: '#fb923c', primaryHover: '#ffd700', primaryFg: '#0f0500', primarySubtle: '#2d0c00', primarySubtleFg: '#fdba74' },
        bgDark: { base: '#0f0500', subtle: '#1a0a00', muted: '#1a0a00', hover: '#2d1200' },
        borderDark: { border: 'rgba(251,146,60,0.22)', borderStrong: 'rgba(251,146,60,0.45)' },
        preview: { primary: '#ea580c', radiusMd: '2px', shadowCss: '0 10px 32px rgba(234,88,12,0.55)' },
    },
    {
        // Bleu abyssal bioluminescent · créatures des profondeurs · nuit océanique
        id: 'abyssal', label: 'Abyssal', description: 'Bleu bioluminescent · fonds marins · profond',
        shape: 'rounded', shadow: 'elevated', typography: 'relaxed',
        font: 'geometric', transition: 'smooth', texture: 'dots', tracking: 'default',
        light: { primary: '#0369a1', primaryHover: '#0c4a6e', primaryFg: '#ffffff', primarySubtle: '#e0f2fe', primarySubtleFg: '#075985' },
        dark: { primary: '#38bdf8', primaryHover: '#7dd3fc', primaryFg: '#000a14', primarySubtle: '#001e38', primarySubtleFg: '#7dd3fc' },
        bgDark: { base: '#000a14', subtle: '#001428', muted: '#001428', hover: '#002040' },
        borderDark: { border: 'rgba(56,189,248,0.18)', borderStrong: 'rgba(56,189,248,0.38)' },
        textureColor: { light: 'rgba(3,105,161,0.05)', dark: 'rgba(56,189,248,0.07)' },
        preview: { primary: '#38bdf8', radiusMd: '10px', shadowCss: '0 0 28px rgba(56,189,248,0.52)' },
    },
    {
        // Rose pétale délicat · fond sakura en light mode · cerisier japonais
        id: 'sakura', label: 'Sakura', description: 'Rose pétale · fond sakura · cerisier',
        shape: 'pill', shadow: 'elevated', typography: 'relaxed',
        font: 'sans', transition: 'smooth', texture: 'dots', tracking: 'default',
        light: { primary: '#be185d', primaryHover: '#500724', primaryFg: '#ffffff', primarySubtle: '#fce7f3', primarySubtleFg: '#831843' },
        dark: { primary: '#f472b6', primaryHover: '#fce7f3', primaryFg: '#1a0010', primarySubtle: '#3d0020', primarySubtleFg: '#fbcfe8' },
        bgLight: { base: '#fff8fb', subtle: '#fce7f3', muted: '#fad1e8', hover: '#fbcfe8' },
        borderLight: { border: 'rgba(190,24,93,0.14)', borderStrong: 'rgba(190,24,93,0.28)' },
        textureColor: { light: 'rgba(190,24,93,0.06)', dark: 'rgba(244,114,182,0.05)' },
        preview: { primary: '#be185d', radiusMd: '20px', shadowCss: '0 6px 20px rgba(190,24,93,0.30)' },
    },
];
// ── Axis → CSS variable values (mirror of tokens.css theme classes) ─────────
// Only non-default axes emit anything (matching the runtime's applyThemeClasses).
const SHAPE_RADII = {
    sharp: { '--radius-sm': '2px', '--radius-md': '3px', '--radius-lg': '4px', '--radius-xl': '6px' },
    rounded: { '--radius-sm': '6px', '--radius-md': '10px', '--radius-lg': '14px', '--radius-xl': '20px' },
    pill: { '--radius-sm': '10px', '--radius-md': '20px', '--radius-lg': '32px', '--radius-xl': '48px' },
};
const SHADOWS = {
    flat: { '--shadow-sm': 'none', '--shadow-md': 'none', '--shadow-lg': 'none' },
    elevated: {
        '--shadow-sm': '0 2px 8px rgba(0, 0, 0, 0.12)',
        '--shadow-md': '0 8px 24px rgba(0, 0, 0, 0.18)',
        '--shadow-lg': '0 20px 48px rgba(0, 0, 0, 0.22)',
    },
};
const TYPO = {
    tight: { weight: '800', tracking: '-0.04em', leading: '1.45' },
    relaxed: { weight: '600', tracking: '-0.01em', leading: '1.75' },
};
const FONTS = {
    mono: {
        display: 'ui-monospace, "Cascadia Code", Consolas, "Courier New", monospace',
        body: 'ui-monospace, "Cascadia Code", Consolas, "Courier New", monospace',
    },
    condensed: { display: 'Impact, "Arial Narrow", "Franklin Gothic Medium", sans-serif' },
    geometric: {
        display: '"Trebuchet MS", "Century Gothic", Futura, sans-serif',
        body: '"Trebuchet MS", "Century Gothic", Futura, sans-serif',
    },
};
const TRANSITIONS = {
    instant: { fast: '0.04s ease', base: '0.07s ease' },
    snappy: { fast: '0.08s ease', base: '0.13s ease' },
    smooth: { fast: '0.25s ease', base: '0.4s ease' },
    spring: {
        fast: '0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        base: '0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
};
const TRACKING = {
    wide: '0.04em',
    'tight-body': '-0.01em',
};
const TEXTURE_BG = {
    dots: 'background-image: radial-gradient(circle, var(--texture-color, rgba(0, 0, 0, 0.055)) 1px, transparent 1px); background-size: 20px 20px;',
    lines: 'background-image: repeating-linear-gradient(0deg, var(--texture-color, rgba(0, 0, 0, 0.04)) 0px, var(--texture-color, rgba(0, 0, 0, 0.04)) 1px, transparent 1px, transparent 28px);',
    grid: 'background-image: linear-gradient(var(--texture-color, rgba(0, 0, 0, 0.05)) 1px, transparent 1px), linear-gradient(90deg, var(--texture-color, rgba(0, 0, 0, 0.05)) 1px, transparent 1px); background-size: 24px 24px;',
};
// ── Static CSS generator ────────────────────────────────────────────────────
function block(selector, decls) {
    if (decls.length === 0)
        return '';
    return `${selector} {\n${decls.map((d) => `  ${d}`).join('\n')}\n}\n`;
}
/**
 * Turn a Theme into a self-contained CSS string that overrides the base tokens.
 * Mode-independent axes (radius, shadow, font, transition, tracking, typography)
 * go in `:root`; colors/bg/border/texture-color are emitted per mode (`:root`
 * for light, `.dark` for dark). No JavaScript, no classes required.
 */
export function themeToCss(t) {
    const rootDecls = [];
    const darkDecls = [];
    const extraRules = [];
    // Colors — light in :root, dark in .dark
    rootDecls.push(`--primary: ${t.light.primary};`, `--primary-hover: ${t.light.primaryHover};`, `--primary-fg: ${t.light.primaryFg};`, `--primary-subtle: ${t.light.primarySubtle};`, `--primary-subtle-fg: ${t.light.primarySubtleFg};`);
    darkDecls.push(`--primary: ${t.dark.primary};`, `--primary-hover: ${t.dark.primaryHover};`, `--primary-fg: ${t.dark.primaryFg};`, `--primary-subtle: ${t.dark.primarySubtle};`, `--primary-subtle-fg: ${t.dark.primarySubtleFg};`);
    // Background tints (optional)
    if (t.bgLight) {
        rootDecls.push(`--bg-base: ${t.bgLight.base};`, `--bg-subtle: ${t.bgLight.subtle};`, `--bg-muted: ${t.bgLight.muted};`, `--bg-hover: ${t.bgLight.hover};`);
    }
    if (t.bgDark) {
        darkDecls.push(`--bg-base: ${t.bgDark.base};`, `--bg-subtle: ${t.bgDark.subtle};`, `--bg-muted: ${t.bgDark.muted};`, `--bg-hover: ${t.bgDark.hover};`);
    }
    // Border tints (optional)
    if (t.borderLight) {
        rootDecls.push(`--border: ${t.borderLight.border};`, `--border-strong: ${t.borderLight.borderStrong};`);
    }
    if (t.borderDark) {
        darkDecls.push(`--border: ${t.borderDark.border};`, `--border-strong: ${t.borderDark.borderStrong};`);
    }
    // Texture color (optional) — per mode
    if (t.textureColor) {
        rootDecls.push(`--texture-color: ${t.textureColor.light};`);
        darkDecls.push(`--texture-color: ${t.textureColor.dark};`);
    }
    // Shape (radius) — mode-independent
    const radii = SHAPE_RADII[t.shape];
    if (radii)
        for (const [k, v] of Object.entries(radii))
            rootDecls.push(`${k}: ${v};`);
    // Shadow — mode-independent
    const shadow = SHADOWS[t.shadow];
    if (shadow)
        for (const [k, v] of Object.entries(shadow))
            rootDecls.push(`${k}: ${v};`);
    // Font — sets display/body font-family variables
    const font = FONTS[t.font];
    if (font) {
        rootDecls.push(`--font-display: ${font.display};`);
        if (font.body)
            rootDecls.push(`--font-body: ${font.body};`);
    }
    // Transitions — mode-independent
    const tr = TRANSITIONS[t.transition];
    if (tr)
        rootDecls.push(`--transition-fast: ${tr.fast};`, `--transition-base: ${tr.base};`);
    // Tracking — body letter-spacing
    const tk = TRACKING[t.tracking];
    if (tk)
        rootDecls.push(`--tracking-body: ${tk};`);
    // Typography — heading tokens + concrete overrides on headings/body
    const typo = TYPO[t.typography];
    if (typo) {
        rootDecls.push(`--heading-weight: ${typo.weight};`, `--heading-tracking: ${typo.tracking};`, `--leading-base: ${typo.leading};`);
        extraRules.push(`h1, h2, h3, h4 {\n  font-weight: ${typo.weight} !important;\n  letter-spacing: ${typo.tracking} !important;\n}\n`, `body, p {\n  line-height: ${typo.leading};\n}\n`);
    }
    // Font body family on <body> (mono/geometric set --font-body)
    if (font?.body)
        extraRules.push(`body {\n  font-family: var(--font-body);\n}\n`);
    // Texture overlay
    if (t.texture !== 'none') {
        extraRules.push(`html::before {\n  content: "";\n  position: fixed;\n  inset: 0;\n  pointer-events: none;\n  z-index: 1;\n  ${TEXTURE_BG[t.texture]}\n}\n`);
    }
    const header = `/* ==========================================================================\n` +
        `   Thème "${t.id}" — ${t.label} · ${t.description}\n` +
        `   Généré depuis THEMES (src/lib/themes/catalog.ts) — NE PAS ÉDITER À LA MAIN.\n` +
        `   Régénérer avec: pnpm generate:themes\n` +
        `   ========================================================================== */\n\n`;
    return (header +
        block(':root', rootDecls) +
        (darkDecls.length ? '\n' + block('.dark', darkDecls) : '') +
        (extraRules.length ? '\n' + extraRules.join('\n') : ''));
}
/** @deprecated Use THEMES instead */
export const COLOR_THEMES = THEMES.map((t) => ({ id: t.id, label: t.label, color: t.light.primary }));
