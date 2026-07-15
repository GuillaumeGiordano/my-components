// Consumer theme store — light/dark mode only.
//
// The visual identity (colors, shape, font…) is now applied as STATIC CSS by
// importing one file from "@guillaumeg/ui/themes/<id>.css" (blue by default via
// tokens.css). This store therefore only toggles the `.dark` class + persists it.
//
// For the interactive theme *preview* (the 28-theme picker used in the library
// showroom), see ./themes/studio.svelte.ts — it is opt-in and not needed by apps.
// Re-export the catalog so existing imports (`import { THEMES } from …`) keep working.
export { THEMES, COLOR_THEMES } from './themes/catalog';
function createTheme() {
    let mode = $state('light');
    const listeners = new Set();
    function apply() {
        document.documentElement.classList.toggle('dark', mode === 'dark');
    }
    function init() {
        const storedMode = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        mode = storedMode ?? (prefersDark ? 'dark' : 'light');
        apply();
    }
    function toggle() {
        mode = mode === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', mode);
        apply();
        listeners.forEach((fn) => fn());
    }
    return {
        get current() {
            return mode;
        },
        get isDark() {
            return mode === 'dark';
        },
        init,
        toggle,
        /** Subscribe to mode changes (used by the showroom studio to re-inject colors). */
        onChange(fn) {
            listeners.add(fn);
            return () => listeners.delete(fn);
        },
    };
}
export const theme = createTheme();
/**
 * Anti-flash script for <head> in app.html (before %sveltekit.head%).
 * Applies the persisted light/dark mode before first paint. Colors need no
 * script — they come from the statically imported theme CSS file.
 *
 * Usage: <script>{@html THEME_INIT_SCRIPT}</script>
 */
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement,dark;try{var m=localStorage.getItem('theme');if(m)dark=m==='dark';}catch(e){}if(dark==null)dark=matchMedia('(prefers-color-scheme: dark)').matches;if(dark)d.classList.add('dark');})();`;
