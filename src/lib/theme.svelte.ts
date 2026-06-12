// Theme store — persists theme id + dark/light mode in localStorage

type Mode = 'light' | 'dark';
export type ShapeVariant      = 'sharp' | 'default' | 'rounded' | 'pill';
export type ShadowVariant     = 'flat'  | 'default' | 'elevated';
export type TypographyVariant = 'tight' | 'default' | 'relaxed';
export type FontVariant       = 'sans'  | 'mono'    | 'condensed' | 'geometric';
export type TransitionVariant = 'instant' | 'snappy' | 'default' | 'smooth' | 'spring';
export type TextureVariant    = 'none'  | 'dots'    | 'lines' | 'grid';
export type TrackingVariant   = 'tight-body' | 'default' | 'wide';

type ColorSet = {
  primary:         string;
  primaryHover:    string;
  primaryFg:       string;
  primarySubtle:   string;
  primarySubtleFg: string;
};

type BgSet = {
  base:   string;
  subtle: string;
  muted:  string;
  hover:  string;
};

type BorderSet = {
  border:       string;
  borderStrong: string;
};

export type Theme = {
  id:          string;
  label:       string;
  description: string;
  // Visual axes (CSS classes)
  shape:       ShapeVariant;
  shadow:      ShadowVariant;
  typography:  TypographyVariant;
  font:        FontVariant;
  transition:  TransitionVariant;
  texture:     TextureVariant;
  tracking:    TrackingVariant;
  // Colors (JS-injected via style.setProperty)
  light:       ColorSet;
  dark:        ColorSet;
  // Optional bg/border tints (JS-injected)
  bgLight?:      BgSet;
  bgDark?:       BgSet;
  borderLight?:  BorderSet;
  borderDark?:   BorderSet;
  textureColor?: { light: string; dark: string };
  // Picker preview
  preview: {
    primary:   string;
    radiusMd:  string;
    shadowCss: string;
  };
};

export const THEMES: Theme[] = [

  // ── Thèmes fondamentaux ───────────────────────────────────────────────────

  {
    id: 'default', label: 'Default', description: 'Bleu · classique · équilibré',
    shape: 'default', shadow: 'default', typography: 'default',
    font: 'sans', transition: 'default', texture: 'none', tracking: 'default',
    light: { primary: '#2563eb', primaryHover: '#1d4ed8', primaryFg: '#ffffff', primarySubtle: '#dbeafe', primarySubtleFg: '#1d4ed8' },
    dark:  { primary: '#3b82f6', primaryHover: '#2563eb', primaryFg: '#ffffff', primarySubtle: '#1e3a8a', primarySubtleFg: '#93c5fd' },
    preview: { primary: '#2563eb', radiusMd: '6px', shadowCss: '0 4px 8px rgba(37,99,235,0.18)' },
  },
  {
    id: 'midnight', label: 'Midnight', description: 'Violet · angulaire · dramatique',
    shape: 'sharp', shadow: 'elevated', typography: 'tight',
    font: 'sans', transition: 'smooth', texture: 'none', tracking: 'default',
    light: { primary: '#7c3aed', primaryHover: '#6d28d9', primaryFg: '#ffffff', primarySubtle: '#ede9fe', primarySubtleFg: '#5b21b6' },
    dark:  { primary: '#a78bfa', primaryHover: '#8b5cf6', primaryFg: '#ffffff', primarySubtle: '#2e1065', primarySubtleFg: '#c4b5fd' },
    preview: { primary: '#7c3aed', radiusMd: '2px', shadowCss: '0 10px 30px rgba(124,58,237,0.28)' },
  },
  {
    id: 'nature', label: 'Nature', description: 'Vert · arrondi · aéré',
    shape: 'rounded', shadow: 'default', typography: 'relaxed',
    font: 'geometric', transition: 'smooth', texture: 'dots', tracking: 'default',
    light: { primary: '#059669', primaryHover: '#047857', primaryFg: '#ffffff', primarySubtle: '#d1fae5', primarySubtleFg: '#065f46' },
    dark:  { primary: '#34d399', primaryHover: '#10b981', primaryFg: '#022c22', primarySubtle: '#022c22', primarySubtleFg: '#6ee7b7' },
    textureColor: { light: 'rgba(5,150,105,0.06)', dark: 'rgba(52,211,153,0.05)' },
    preview: { primary: '#059669', radiusMd: '10px', shadowCss: '0 4px 12px rgba(5,150,105,0.18)' },
  },
  {
    id: 'corporate', label: 'Corporate', description: 'Gris · carré · épuré',
    shape: 'sharp', shadow: 'flat', typography: 'tight',
    font: 'mono', transition: 'snappy', texture: 'lines', tracking: 'tight-body',
    light: { primary: '#475569', primaryHover: '#334155', primaryFg: '#ffffff', primarySubtle: '#f1f5f9', primarySubtleFg: '#1e293b' },
    dark:  { primary: '#94a3b8', primaryHover: '#cbd5e1', primaryFg: '#0f172a', primarySubtle: '#1e293b', primarySubtleFg: '#cbd5e1' },
    textureColor: { light: 'rgba(0,0,0,0.04)', dark: 'rgba(255,255,255,0.025)' },
    preview: { primary: '#475569', radiusMd: '2px', shadowCss: 'none' },
  },
  {
    id: 'warm', label: 'Warm', description: 'Orange · arrondi · chaleureux',
    shape: 'rounded', shadow: 'elevated', typography: 'default',
    font: 'geometric', transition: 'smooth', texture: 'none', tracking: 'default',
    light: { primary: '#ea580c', primaryHover: '#c2410c', primaryFg: '#ffffff', primarySubtle: '#ffedd5', primarySubtleFg: '#9a3412' },
    dark:  { primary: '#fb923c', primaryHover: '#f97316', primaryFg: '#ffffff', primarySubtle: '#431407', primarySubtleFg: '#fdba74' },
    preview: { primary: '#ea580c', radiusMd: '10px', shadowCss: '0 8px 24px rgba(234,88,12,0.22)' },
  },
  {
    id: 'playful', label: 'Playful', description: 'Rose · pill · rebondissant',
    shape: 'pill', shadow: 'default', typography: 'relaxed',
    font: 'geometric', transition: 'spring', texture: 'none', tracking: 'default',
    light: { primary: '#e11d48', primaryHover: '#be123c', primaryFg: '#ffffff', primarySubtle: '#ffe4e6', primarySubtleFg: '#9f1239' },
    dark:  { primary: '#fb7185', primaryHover: '#f43f5e', primaryFg: '#ffffff', primarySubtle: '#4c0519', primarySubtleFg: '#fda4af' },
    preview: { primary: '#e11d48', radiusMd: '20px', shadowCss: '0 4px 12px rgba(225,29,72,0.18)' },
  },

  // ── Thèmes pop-culture ───────────────────────────────────────────────────

  {
    // Rouge sabre laser · architecture impériale 100% angles droits
    id: 'dark-side', label: 'Dark Side', description: 'Rouge Sith · angles impériaux · Empire',
    shape: 'sharp', shadow: 'elevated', typography: 'tight',
    font: 'condensed', transition: 'snappy', texture: 'none', tracking: 'tight-body',
    light: { primary: '#dc2626', primaryHover: '#7f1d1d', primaryFg: '#ffffff', primarySubtle: '#fee2e2', primarySubtleFg: '#991b1b' },
    dark:  { primary: '#ef4444', primaryHover: '#450a0a', primaryFg: '#ffffff', primarySubtle: '#450a0a', primarySubtleFg: '#fca5a5' },
    bgDark:     { base: '#100000', subtle: '#1a0000', muted: '#1a0000', hover: '#2d0000' },
    borderDark: { border: 'rgba(220,38,38,0.22)', borderStrong: 'rgba(220,38,38,0.40)' },
    preview: { primary: '#dc2626', radiusMd: '2px', shadowCss: '0 10px 36px rgba(220,38,38,0.55)' },
  },
  {
    // Orange combinaisons X-Wing · formes combatives
    id: 'rebel', label: 'Rebel', description: 'Orange X-Wing · combatif · Rébellion',
    shape: 'rounded', shadow: 'elevated', typography: 'default',
    font: 'sans', transition: 'default', texture: 'none', tracking: 'default',
    light: { primary: '#c2410c', primaryHover: '#7c2d12', primaryFg: '#ffffff', primarySubtle: '#ffedd5', primarySubtleFg: '#7c2d12' },
    dark:  { primary: '#fb923c', primaryHover: '#fed7aa', primaryFg: '#1a0800', primarySubtle: '#3a1500', primarySubtleFg: '#fed7aa' },
    preview: { primary: '#c2410c', radiusMd: '10px', shadowCss: '0 8px 28px rgba(194,65,12,0.42)' },
  },
  {
    // Rouge + hover noir — le costume du mercenaire
    id: 'deadpool', label: 'Deadpool', description: 'Rouge & noir · brutal · sans filtre',
    shape: 'default', shadow: 'elevated', typography: 'tight',
    font: 'condensed', transition: 'snappy', texture: 'none', tracking: 'tight-body',
    light: { primary: '#dc2626', primaryHover: '#0a0a0a', primaryFg: '#ffffff', primarySubtle: '#fee2e2', primarySubtleFg: '#991b1b' },
    dark:  { primary: '#ef4444', primaryHover: '#111111', primaryFg: '#ffffff', primarySubtle: '#450a0a', primarySubtleFg: '#fca5a5' },
    bgDark:     { base: '#0f0000', subtle: '#150000', muted: '#150000', hover: '#200000' },
    borderDark: { border: 'rgba(220,38,38,0.18)', borderStrong: 'rgba(220,38,38,0.32)' },
    preview: { primary: '#dc2626', radiusMd: '6px', shadowCss: '0 10px 32px rgba(220,38,38,0.50)' },
  },
  {
    // Bleu cape → rouge shield au hover · angles du sceau S
    id: 'man-of-steel', label: 'Man of Steel', description: 'Bleu cape → rouge shield · angles du S',
    shape: 'sharp', shadow: 'elevated', typography: 'tight',
    font: 'condensed', transition: 'snappy', texture: 'none', tracking: 'tight-body',
    light: { primary: '#1565c0', primaryHover: '#b91c1c', primaryFg: '#ffffff', primarySubtle: '#e3f2fd', primarySubtleFg: '#0a3069' },
    dark:  { primary: '#3b82f6', primaryHover: '#ef4444', primaryFg: '#ffffff', primarySubtle: '#0a1628', primarySubtleFg: '#93c5fd' },
    borderLight: { border: 'rgba(21,101,192,0.18)', borderStrong: 'rgba(21,101,192,0.32)' },
    borderDark:  { border: 'rgba(59,130,246,0.20)', borderStrong: 'rgba(239,68,68,0.25)' },
    preview: { primary: '#1565c0', radiusMd: '2px', shadowCss: '0 10px 28px rgba(21,101,192,0.42)' },
  },
  {
    // Circuits imprimés cyan néon sur fond quasi-noir
    id: 'tron', label: 'Tron', description: 'Cyan néon · circuits 90° · glow électrique',
    shape: 'sharp', shadow: 'elevated', typography: 'tight',
    font: 'mono', transition: 'instant', texture: 'grid', tracking: 'wide',
    light: { primary: '#0891b2', primaryHover: '#164e63', primaryFg: '#ffffff', primarySubtle: '#cffafe', primarySubtleFg: '#155e75' },
    dark:  { primary: '#22d3ee', primaryHover: '#67e8f9', primaryFg: '#001a1f', primarySubtle: '#002b36', primarySubtleFg: '#67e8f9' },
    bgDark:     { base: '#001a1f', subtle: '#002b36', muted: '#003344', hover: '#004455' },
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
    dark:  { primary: '#fbbf24', primaryHover: '#fef08a', primaryFg: '#1c0f00', primarySubtle: '#2d1b00', primarySubtleFg: '#fde68a' },
    preview: { primary: '#fbbf24', radiusMd: '20px', shadowCss: '0 8px 32px rgba(251,191,36,0.55)' },
  },
  {
    // Jaune Bat-signal sur noir absolu · brutaliste/flat
    id: 'gotham', label: 'Gotham', description: 'Jaune Bat-signal · noir absolu au hover · flat',
    shape: 'sharp', shadow: 'flat', typography: 'tight',
    font: 'condensed', transition: 'instant', texture: 'none', tracking: 'tight-body',
    light: { primary: '#ca8a04', primaryHover: '#000000', primaryFg: '#000000', primarySubtle: '#fefce8', primarySubtleFg: '#713f12' },
    dark:  { primary: '#facc15', primaryHover: '#000000', primaryFg: '#000000', primarySubtle: '#1a1100', primarySubtleFg: '#fef08a' },
    bgDark:     { base: '#0a0900', subtle: '#110f00', muted: '#110f00', hover: '#1c1900' },
    borderDark: { border: 'rgba(202,138,4,0.22)', borderStrong: 'rgba(202,138,4,0.40)' },
    preview: { primary: '#facc15', radiusMd: '2px', shadowCss: 'none' },
  },
  {
    // Or royal → bordeaux velours au hover · ivoire en light / nuit royale en dark
    id: 'versailles', label: 'Versailles', description: 'Or royal · ivoire · Rococo',
    shape: 'rounded', shadow: 'elevated', typography: 'tight',
    font: 'geometric', transition: 'smooth', texture: 'lines', tracking: 'default',
    light: { primary: '#c9950c', primaryHover: '#7b1f3a', primaryFg: '#ffffff', primarySubtle: '#fdf3dc', primarySubtleFg: '#7b4a00' },
    dark:  { primary: '#d4a843', primaryHover: '#e8c97a', primaryFg: '#12080e', primarySubtle: '#2a1800', primarySubtleFg: '#e8c97a' },
    bgLight:     { base: '#faf3e0', subtle: '#f0e6c8', muted: '#e8d9b0', hover: '#dcc890' },
    bgDark:      { base: '#12080e', subtle: '#1e0f16', muted: '#1e0f16', hover: '#2d1622' },
    borderLight: { border: 'rgba(201,149,12,0.22)', borderStrong: 'rgba(201,149,12,0.40)' },
    borderDark:  { border: 'rgba(212,168,67,0.22)', borderStrong: 'rgba(212,168,67,0.42)' },
    textureColor: { light: 'rgba(180,120,20,0.05)', dark: 'rgba(212,168,67,0.04)' },
    preview: { primary: '#c9950c', radiusMd: '10px', shadowCss: '0 8px 28px rgba(201,149,12,0.38)' },
  },
  {
    // Hot-pink fuchsia · tout arrondi · fond rose même en light mode
    id: 'barbie', label: 'Barbie', description: 'Hot-pink · pill · pétillant',
    shape: 'pill', shadow: 'elevated', typography: 'relaxed',
    font: 'geometric', transition: 'spring', texture: 'dots', tracking: 'default',
    light: { primary: '#e91e8c', primaryHover: '#c2185b', primaryFg: '#ffffff', primarySubtle: '#fce4ec', primarySubtleFg: '#880e4f' },
    dark:  { primary: '#f72585', primaryHover: '#ff6eb4', primaryFg: '#ffffff', primarySubtle: '#3d0025', primarySubtleFg: '#ff9ecf' },
    bgLight:     { base: '#fff0f7', subtle: '#ffe4f0', muted: '#ffd6e8', hover: '#ffc2da' },
    bgDark:      { base: '#1a0011', subtle: '#2d0017', muted: '#2d0017', hover: '#3d0020' },
    borderLight: { border: 'rgba(233,30,140,0.18)', borderStrong: 'rgba(233,30,140,0.32)' },
    borderDark:  { border: 'rgba(247,37,133,0.22)', borderStrong: 'rgba(247,37,133,0.42)' },
    textureColor: { light: 'rgba(233,30,140,0.07)', dark: 'rgba(247,37,133,0.06)' },
    preview: { primary: '#e91e8c', radiusMd: '20px', shadowCss: '0 8px 28px rgba(233,30,140,0.48)' },
  },
  {
    // Pluie de caractères verts · terminal · flat
    id: 'matrix', label: 'Matrix', description: 'Vert code · terminal · pluie de caractères',
    shape: 'sharp', shadow: 'flat', typography: 'tight',
    font: 'mono', transition: 'instant', texture: 'grid', tracking: 'wide',
    light: { primary: '#15803d', primaryHover: '#052e16', primaryFg: '#ffffff', primarySubtle: '#dcfce7', primarySubtleFg: '#14532d' },
    dark:  { primary: '#4ade80', primaryHover: '#86efac', primaryFg: '#000000', primarySubtle: '#001a00', primarySubtleFg: '#86efac' },
    bgDark:     { base: '#000800', subtle: '#001200', muted: '#001500', hover: '#002200' },
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
    dark:  { primary: '#bef264', primaryHover: '#d9f99d', primaryFg: '#0a1400', primarySubtle: '#0a1400', primarySubtleFg: '#d9f99d' },
    bgDark:      { base: '#040900', subtle: '#080f00', muted: '#080f00', hover: '#0f1a00' },
    borderDark:  { border: 'rgba(190,242,100,0.18)', borderStrong: 'rgba(190,242,100,0.35)' },
    textureColor: { light: 'rgba(77,124,15,0.06)', dark: 'rgba(190,242,100,0.06)' },
    preview: { primary: '#bef264', radiusMd: '2px', shadowCss: '0 0 28px rgba(190,242,100,0.55)' },
  },
  {
    // Violet Na'vi → cyan bioluminescent au hover · jungle alien de nuit
    id: 'avatar', label: 'Avatar', description: 'Violet Na\'vi → cyan bio · Pandora',
    shape: 'rounded', shadow: 'elevated', typography: 'relaxed',
    font: 'geometric', transition: 'smooth', texture: 'dots', tracking: 'default',
    light: { primary: '#6d28d9', primaryHover: '#0891b2', primaryFg: '#ffffff', primarySubtle: '#ede9fe', primarySubtleFg: '#4c1d95' },
    dark:  { primary: '#a78bfa', primaryHover: '#22d3ee', primaryFg: '#0a0014', primarySubtle: '#1e0040', primarySubtleFg: '#c4b5fd' },
    bgDark:      { base: '#020014', subtle: '#050028', muted: '#050028', hover: '#0a003f' },
    borderDark:  { border: 'rgba(167,139,250,0.20)', borderStrong: 'rgba(34,211,238,0.28)' },
    textureColor: { light: 'rgba(109,40,217,0.05)', dark: 'rgba(167,139,250,0.06)' },
    preview: { primary: '#a78bfa', radiusMd: '10px', shadowCss: '0 0 28px rgba(167,139,250,0.55)' },
  },
  {
    // Rouge sang de l'Upside Down · TV static · années 80 condensed
    id: 'stranger-things', label: 'Stranger Things', description: 'Rouge Upside Down · TV static · 1983',
    shape: 'default', shadow: 'elevated', typography: 'tight',
    font: 'condensed', transition: 'snappy', texture: 'dots', tracking: 'tight-body',
    light: { primary: '#b91c1c', primaryHover: '#450a0a', primaryFg: '#ffffff', primarySubtle: '#fee2e2', primarySubtleFg: '#991b1b' },
    dark:  { primary: '#ef4444', primaryHover: '#7f1d1d', primaryFg: '#ffffff', primarySubtle: '#3b0000', primarySubtleFg: '#fca5a5' },
    bgDark:      { base: '#090000', subtle: '#120000', muted: '#120000', hover: '#1e0000' },
    borderDark:  { border: 'rgba(239,68,68,0.20)', borderStrong: 'rgba(239,68,68,0.40)' },
    textureColor: { light: 'rgba(185,28,28,0.06)', dark: 'rgba(239,68,68,0.07)' },
    preview: { primary: '#b91c1c', radiusMd: '6px', shadowCss: '0 10px 32px rgba(185,28,28,0.52)' },
  },
  {
    // Beskar cuivre + pierre sombre · This is the Way
    id: 'mandalorian', label: 'Mandalorian', description: 'Beskar cuivre · pierre · This is the Way',
    shape: 'sharp', shadow: 'flat', typography: 'tight',
    font: 'condensed', transition: 'instant', texture: 'lines', tracking: 'tight-body',
    light: { primary: '#b5894a', primaryHover: '#292524', primaryFg: '#ffffff', primarySubtle: '#fef3c7', primarySubtleFg: '#78350f' },
    dark:  { primary: '#d4a96a', primaryHover: '#a3a3a3', primaryFg: '#0c0a09', primarySubtle: '#1c1410', primarySubtleFg: '#d4a96a' },
    bgDark:      { base: '#0c0a09', subtle: '#1c1917', muted: '#1c1917', hover: '#292524' },
    borderDark:  { border: 'rgba(212,169,106,0.20)', borderStrong: 'rgba(212,169,106,0.38)' },
    textureColor: { light: 'rgba(100,83,60,0.05)', dark: 'rgba(212,169,106,0.04)' },
    preview: { primary: '#b5894a', radiusMd: '2px', shadowCss: 'none' },
  },
  {
    // Vert serpent → argent au hover · donjons de Poudlard
    id: 'slytherin', label: 'Slytherin', description: 'Vert serpent → argent · donjons froids',
    shape: 'sharp', shadow: 'elevated', typography: 'tight',
    font: 'condensed', transition: 'smooth', texture: 'lines', tracking: 'tight-body',
    light: { primary: '#166534', primaryHover: '#6b7280', primaryFg: '#ffffff', primarySubtle: '#dcfce7', primarySubtleFg: '#14532d' },
    dark:  { primary: '#22c55e', primaryHover: '#d1d5db', primaryFg: '#000000', primarySubtle: '#032010', primarySubtleFg: '#86efac' },
    bgDark:      { base: '#030d07', subtle: '#071410', muted: '#071410', hover: '#0d2018' },
    borderDark:  { border: 'rgba(34,197,94,0.18)', borderStrong: 'rgba(34,197,94,0.32)' },
    textureColor: { light: 'rgba(22,101,52,0.06)', dark: 'rgba(34,197,94,0.05)' },
    preview: { primary: '#166534', radiusMd: '2px', shadowCss: '0 8px 24px rgba(22,101,52,0.32)' },
  },
  {
    // Or + ivoire clair · hover navy Art Déco · géométrie 1920s
    id: 'art-deco', label: 'Art Déco', description: 'Or 1920s → navy · géométrie stricte',
    shape: 'sharp', shadow: 'flat', typography: 'tight',
    font: 'condensed', transition: 'snappy', texture: 'lines', tracking: 'tight-body',
    light: { primary: '#b8860b', primaryHover: '#1e1b4b', primaryFg: '#ffffff', primarySubtle: '#fef9e7', primarySubtleFg: '#713f12' },
    dark:  { primary: '#e8c97a', primaryHover: '#c7d2fe', primaryFg: '#0a0900', primarySubtle: '#1e1600', primarySubtleFg: '#e8c97a' },
    bgLight:     { base: '#faf6ec', subtle: '#f0e8cc', muted: '#e8d9b0', hover: '#d9c481' },
    bgDark:      { base: '#0a0900', subtle: '#141200', muted: '#141200', hover: '#1e1a00' },
    borderLight: { border: 'rgba(184,134,11,0.22)', borderStrong: 'rgba(184,134,11,0.45)' },
    borderDark:  { border: 'rgba(232,201,122,0.22)', borderStrong: 'rgba(232,201,122,0.45)' },
    textureColor: { light: 'rgba(184,134,11,0.06)', dark: 'rgba(232,201,122,0.04)' },
    preview: { primary: '#b8860b', radiusMd: '2px', shadowCss: 'none' },
  },
  {
    // Rouge → bleu primaire au hover · grille Bauhaus · fonctionnel pur
    id: 'bauhaus', label: 'Bauhaus', description: 'Rouge → bleu primaire · grille · fonctionnel',
    shape: 'sharp', shadow: 'flat', typography: 'tight',
    font: 'condensed', transition: 'instant', texture: 'grid', tracking: 'tight-body',
    light: { primary: '#dc2626', primaryHover: '#1d4ed8', primaryFg: '#ffffff', primarySubtle: '#fee2e2', primarySubtleFg: '#991b1b' },
    dark:  { primary: '#f87171', primaryHover: '#60a5fa', primaryFg: '#ffffff', primarySubtle: '#450a0a', primarySubtleFg: '#fca5a5' },
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
    dark:  { primary: '#e879f9', primaryHover: '#22d3ee', primaryFg: '#1a0020', primarySubtle: '#2d0040', primarySubtleFg: '#f0abfc' },
    bgDark:      { base: '#0d0017', subtle: '#1a0028', muted: '#1a0028', hover: '#220038' },
    borderDark:  { border: 'rgba(232,121,249,0.18)', borderStrong: 'rgba(34,211,238,0.25)' },
    textureColor: { light: 'rgba(162,28,175,0.05)', dark: 'rgba(232,121,249,0.05)' },
    preview: { primary: '#e879f9', radiusMd: '20px', shadowCss: '0 8px 28px rgba(232,121,249,0.48)' },
  },
  {
    // Orange → violet inattendu · formes pill · chaos joyeux Memphis design
    id: 'memphis', label: 'Memphis', description: 'Orange → violet · pill · chaos joyeux',
    shape: 'pill', shadow: 'default', typography: 'relaxed',
    font: 'geometric', transition: 'spring', texture: 'dots', tracking: 'default',
    light: { primary: '#f97316', primaryHover: '#7c3aed', primaryFg: '#ffffff', primarySubtle: '#fff7ed', primarySubtleFg: '#9a3412' },
    dark:  { primary: '#fb923c', primaryHover: '#a78bfa', primaryFg: '#1a0800', primarySubtle: '#3a1500', primarySubtleFg: '#fed7aa' },
    textureColor: { light: 'rgba(249,115,22,0.07)', dark: 'rgba(251,146,60,0.06)' },
    preview: { primary: '#f97316', radiusMd: '20px', shadowCss: '0 6px 20px rgba(249,115,22,0.35)' },
  },
  {
    // Orange incandescent sur obsidienne · lave volcanique
    id: 'lave', label: 'Lave', description: 'Orange incandescent · obsidienne · volcanique',
    shape: 'sharp', shadow: 'elevated', typography: 'tight',
    font: 'condensed', transition: 'snappy', texture: 'none', tracking: 'tight-body',
    light: { primary: '#ea580c', primaryHover: '#450a0a', primaryFg: '#ffffff', primarySubtle: '#fff7ed', primarySubtleFg: '#7c2d12' },
    dark:  { primary: '#fb923c', primaryHover: '#ffd700', primaryFg: '#0f0500', primarySubtle: '#2d0c00', primarySubtleFg: '#fdba74' },
    bgDark:      { base: '#0f0500', subtle: '#1a0a00', muted: '#1a0a00', hover: '#2d1200' },
    borderDark:  { border: 'rgba(251,146,60,0.22)', borderStrong: 'rgba(251,146,60,0.45)' },
    preview: { primary: '#ea580c', radiusMd: '2px', shadowCss: '0 10px 32px rgba(234,88,12,0.55)' },
  },
  {
    // Bleu abyssal bioluminescent · créatures des profondeurs · nuit océanique
    id: 'abyssal', label: 'Abyssal', description: 'Bleu bioluminescent · fonds marins · profond',
    shape: 'rounded', shadow: 'elevated', typography: 'relaxed',
    font: 'geometric', transition: 'smooth', texture: 'dots', tracking: 'default',
    light: { primary: '#0369a1', primaryHover: '#0c4a6e', primaryFg: '#ffffff', primarySubtle: '#e0f2fe', primarySubtleFg: '#075985' },
    dark:  { primary: '#38bdf8', primaryHover: '#7dd3fc', primaryFg: '#000a14', primarySubtle: '#001e38', primarySubtleFg: '#7dd3fc' },
    bgDark:      { base: '#000a14', subtle: '#001428', muted: '#001428', hover: '#002040' },
    borderDark:  { border: 'rgba(56,189,248,0.18)', borderStrong: 'rgba(56,189,248,0.38)' },
    textureColor: { light: 'rgba(3,105,161,0.05)', dark: 'rgba(56,189,248,0.07)' },
    preview: { primary: '#38bdf8', radiusMd: '10px', shadowCss: '0 0 28px rgba(56,189,248,0.52)' },
  },
  {
    // Rose pétale délicat · fond sakura en light mode · cerisier japonais
    id: 'sakura', label: 'Sakura', description: 'Rose pétale · fond sakura · cerisier',
    shape: 'pill', shadow: 'elevated', typography: 'relaxed',
    font: 'sans', transition: 'smooth', texture: 'dots', tracking: 'default',
    light: { primary: '#be185d', primaryHover: '#500724', primaryFg: '#ffffff', primarySubtle: '#fce7f3', primarySubtleFg: '#831843' },
    dark:  { primary: '#f472b6', primaryHover: '#fce7f3', primaryFg: '#1a0010', primarySubtle: '#3d0020', primarySubtleFg: '#fbcfe8' },
    bgLight:     { base: '#fff8fb', subtle: '#fce7f3', muted: '#fad1e8', hover: '#fbcfe8' },
    borderLight: { border: 'rgba(190,24,93,0.14)', borderStrong: 'rgba(190,24,93,0.28)' },
    textureColor: { light: 'rgba(190,24,93,0.06)', dark: 'rgba(244,114,182,0.05)' },
    preview: { primary: '#be185d', radiusMd: '20px', shadowCss: '0 6px 20px rgba(190,24,93,0.30)' },
  },
];

// ── CSS class lists for cleanup ────────────────────────────────────────────

const SHAPE_CLASSES      = ['shape-sharp', 'shape-rounded', 'shape-pill'];
const SHADOW_CLASSES     = ['shadow-flat', 'shadow-elevated'];
const TYPE_CLASSES       = ['type-tight', 'type-relaxed'];
const FONT_CLASSES       = ['font-mono', 'font-condensed', 'font-geometric'];
const TRANSITION_CLASSES = ['transition-instant', 'transition-snappy', 'transition-smooth', 'transition-spring'];
const TEXTURE_CLASSES    = ['texture-dots', 'texture-lines', 'texture-grid'];
const TRACKING_CLASSES   = ['tracking-wide', 'tracking-tight-body'];

const ALL_THEME_CLASSES  = [
  ...SHAPE_CLASSES, ...SHADOW_CLASSES, ...TYPE_CLASSES,
  ...FONT_CLASSES, ...TRANSITION_CLASSES, ...TEXTURE_CLASSES, ...TRACKING_CLASSES,
];

// ── Inject CSS custom properties ────────────────────────────────────────────

function injectThemeVars(t: Theme, m: 'light' | 'dark') {
  const root   = document.documentElement;
  const colors = m === 'dark' ? t.dark  : t.light;
  const bg     = m === 'dark' ? t.bgDark    : t.bgLight;
  const border = m === 'dark' ? t.borderDark : t.borderLight;

  // Primary colors
  root.style.setProperty('--primary',          colors.primary);
  root.style.setProperty('--primary-hover',    colors.primaryHover);
  root.style.setProperty('--primary-fg',       colors.primaryFg);
  root.style.setProperty('--primary-subtle',   colors.primarySubtle);
  root.style.setProperty('--primary-subtle-fg', colors.primarySubtleFg);

  // Background tints
  if (bg) {
    root.style.setProperty('--bg-base',   bg.base);
    root.style.setProperty('--bg-subtle', bg.subtle);
    root.style.setProperty('--bg-muted',  bg.muted);
    root.style.setProperty('--bg-hover',  bg.hover);
  } else {
    root.style.removeProperty('--bg-base');
    root.style.removeProperty('--bg-subtle');
    root.style.removeProperty('--bg-muted');
    root.style.removeProperty('--bg-hover');
  }

  // Border tints
  if (border) {
    root.style.setProperty('--border',        border.border);
    root.style.setProperty('--border-strong', border.borderStrong);
  } else {
    root.style.removeProperty('--border');
    root.style.removeProperty('--border-strong');
  }

  // Texture color
  if (t.textureColor) {
    root.style.setProperty('--texture-color', m === 'dark' ? t.textureColor.dark : t.textureColor.light);
  } else {
    root.style.removeProperty('--texture-color');
  }
}

// ── Apply CSS classes ──────────────────────────────────────────────────────

function applyThemeClasses(t: Theme) {
  const root = document.documentElement;
  root.classList.remove(...ALL_THEME_CLASSES);

  if (t.shape      !== 'default') root.classList.add(`shape-${t.shape}`);
  if (t.shadow     !== 'default') root.classList.add(`shadow-${t.shadow}`);
  if (t.typography !== 'default') root.classList.add(`type-${t.typography}`);
  if (t.font       !== 'sans')    root.classList.add(`font-${t.font}`);
  if (t.transition !== 'default') root.classList.add(`transition-${t.transition}`);
  if (t.texture    !== 'none')    root.classList.add(`texture-${t.texture}`);
  if (t.tracking   !== 'default') root.classList.add(`tracking-${t.tracking}`);
}

// ── Cache localStorage (read by the inline script in app.html) ────────────

function saveThemeCache(t: Theme, m: 'light' | 'dark') {
  const classes: string[] = [];
  if (t.shape      !== 'default') classes.push(`shape-${t.shape}`);
  if (t.shadow     !== 'default') classes.push(`shadow-${t.shadow}`);
  if (t.typography !== 'default') classes.push(`type-${t.typography}`);
  if (t.font       !== 'sans')    classes.push(`font-${t.font}`);
  if (t.transition !== 'default') classes.push(`transition-${t.transition}`);
  if (t.texture    !== 'none')    classes.push(`texture-${t.texture}`);
  if (t.tracking   !== 'default') classes.push(`tracking-${t.tracking}`);
  localStorage.setItem('theme-classes', classes.join(' '));

  const colors = m === 'dark' ? t.dark  : t.light;
  const bg     = m === 'dark' ? t.bgDark    : t.bgLight;
  const border = m === 'dark' ? t.borderDark : t.borderLight;

  const vars: [string, string][] = [
    ['--primary',           colors.primary],
    ['--primary-hover',     colors.primaryHover],
    ['--primary-fg',        colors.primaryFg],
    ['--primary-subtle',    colors.primarySubtle],
    ['--primary-subtle-fg', colors.primarySubtleFg],
  ];
  if (bg) {
    vars.push(
      ['--bg-base',   bg.base],
      ['--bg-subtle', bg.subtle],
      ['--bg-muted',  bg.muted],
      ['--bg-hover',  bg.hover],
    );
  }
  if (border) {
    vars.push(
      ['--border',        border.border],
      ['--border-strong', border.borderStrong],
    );
  }
  if (t.textureColor) {
    vars.push(['--texture-color', m === 'dark' ? t.textureColor.dark : t.textureColor.light]);
  }
  localStorage.setItem('theme-vars', JSON.stringify(vars));
}

// ── Store ──────────────────────────────────────────────────────────────────

function createTheme() {
  let mode        = $state<'light' | 'dark'>('light');
  let activeTheme = $state<Theme>(THEMES[0]);

  function init() {
    const storedMode  = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const storedTheme = localStorage.getItem('visual-theme') ?? 'default';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    mode        = storedMode ?? (prefersDark ? 'dark' : 'light');
    activeTheme = THEMES.find((t) => t.id === storedTheme) ?? THEMES[0];

    document.documentElement.classList.toggle('dark', mode === 'dark');
    applyThemeClasses(activeTheme);
    injectThemeVars(activeTheme, mode);
    saveThemeCache(activeTheme, mode);
  }

  function toggle() {
    mode = mode === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
    injectThemeVars(activeTheme, mode);
    saveThemeCache(activeTheme, mode);
  }

  function setTheme(id: string) {
    const t = THEMES.find((th) => th.id === id) ?? THEMES[0];
    activeTheme = t;
    localStorage.setItem('visual-theme', id);
    applyThemeClasses(t);
    injectThemeVars(t, mode);
    saveThemeCache(t, mode);
  }

  return {
    get current()     { return mode; },
    get isDark()      { return mode === 'dark'; },
    get activeTheme() { return activeTheme; },
    init,
    toggle,
    setTheme,
  };
}

export const theme = createTheme();

/**
 * Inline script to paste inside <head> in app.html (before %sveltekit.head%).
 * Reads the theme cache from localStorage and applies classes + CSS vars on <html>
 * before the first paint, preventing any flash of unstyled theme.
 *
 * Usage in app.html:
 *   <script>{@html THEME_INIT_SCRIPT}<\/script>
 *
 * Or copy-paste the content directly into a <script> tag in your app.html.
 */
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;var m=localStorage.getItem('theme');var dark=m?m==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(dark)d.classList.add('dark');var cls=localStorage.getItem('theme-classes');if(cls)cls.split(' ').forEach(function(c){if(c)d.classList.add(c);});try{var vars=JSON.parse(localStorage.getItem('theme-vars')||'null');if(vars)vars.forEach(function(v){d.style.setProperty(v[0],v[1]);});}catch(e){}})();`;

/** @deprecated Use THEMES instead */
export const COLOR_THEMES = THEMES.map((t) => ({ id: t.id, label: t.label, color: t.light.primary }));
/** @deprecated Use Theme['id'] instead */
export type ColorTheme = string;
