export type ShapeVariant = 'sharp' | 'default' | 'rounded' | 'pill';
export type ShadowVariant = 'flat' | 'default' | 'elevated';
export type TypographyVariant = 'tight' | 'default' | 'relaxed';
export type FontVariant = 'sans' | 'mono' | 'condensed' | 'geometric';
export type TransitionVariant = 'instant' | 'snappy' | 'default' | 'smooth' | 'spring';
export type TextureVariant = 'none' | 'dots' | 'lines' | 'grid';
export type TrackingVariant = 'tight-body' | 'default' | 'wide';
type ColorSet = {
    primary: string;
    primaryHover: string;
    primaryFg: string;
    primarySubtle: string;
    primarySubtleFg: string;
};
type BgSet = {
    base: string;
    subtle: string;
    muted: string;
    hover: string;
};
type BorderSet = {
    border: string;
    borderStrong: string;
};
export type Theme = {
    id: string;
    label: string;
    description: string;
    shape: ShapeVariant;
    shadow: ShadowVariant;
    typography: TypographyVariant;
    font: FontVariant;
    transition: TransitionVariant;
    texture: TextureVariant;
    tracking: TrackingVariant;
    light: ColorSet;
    dark: ColorSet;
    bgLight?: BgSet;
    bgDark?: BgSet;
    borderLight?: BorderSet;
    borderDark?: BorderSet;
    textureColor?: {
        light: string;
        dark: string;
    };
    preview: {
        primary: string;
        radiusMd: string;
        shadowCss: string;
    };
};
export declare const THEMES: Theme[];
export declare const theme: {
    readonly current: "light" | "dark";
    readonly isDark: boolean;
    readonly activeTheme: Theme;
    init: () => void;
    toggle: () => void;
    setTheme: (id: string) => void;
};
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
export declare const THEME_INIT_SCRIPT = "(function(){var d=document.documentElement;var m=localStorage.getItem('theme');var dark=m?m==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(dark)d.classList.add('dark');var cls=localStorage.getItem('theme-classes');if(cls)cls.split(' ').forEach(function(c){if(c)d.classList.add(c);});try{var vars=JSON.parse(localStorage.getItem('theme-vars')||'null');if(vars)vars.forEach(function(v){d.style.setProperty(v[0],v[1]);});}catch(e){}})();";
/** @deprecated Use THEMES instead */
export declare const COLOR_THEMES: {
    id: any;
    label: string;
    color: string;
}[];
/** @deprecated Use Theme['id'] instead */
export type ColorTheme = string;
export {};
