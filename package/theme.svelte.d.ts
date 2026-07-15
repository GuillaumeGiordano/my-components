export { THEMES, COLOR_THEMES } from './themes/catalog';
export type { Theme, ColorTheme, ShapeVariant, ShadowVariant, TypographyVariant, FontVariant, TransitionVariant, TextureVariant, TrackingVariant, } from './themes/catalog';
export declare const theme: {
    readonly current: "light" | "dark";
    readonly isDark: boolean;
    init: () => void;
    toggle: () => void;
    /** Subscribe to mode changes (used by the showroom studio to re-inject colors). */
    onChange(fn: () => void): () => void;
};
/**
 * Anti-flash script for <head> in app.html (before %sveltekit.head%).
 * Applies the persisted light/dark mode before first paint. Colors need no
 * script — they come from the statically imported theme CSS file.
 *
 * Usage: <script>{@html THEME_INIT_SCRIPT}</script>
 */
export declare const THEME_INIT_SCRIPT = "(function(){var d=document.documentElement,dark;try{var m=localStorage.getItem('theme');if(m)dark=m==='dark';}catch(e){}if(dark==null)dark=matchMedia('(prefers-color-scheme: dark)').matches;if(dark)d.classList.add('dark');})();";
