// Theme store — persists dark/light + color theme in localStorage
export const COLOR_THEMES = [
    { id: 'default', label: 'Blue', color: '#2563eb' },
    { id: 'violet', label: 'Violet', color: '#7c3aed' },
    { id: 'emerald', label: 'Emerald', color: '#059669' },
    { id: 'rose', label: 'Rose', color: '#e11d48' },
    { id: 'orange', label: 'Orange', color: '#ea580c' },
    { id: 'slate', label: 'Slate', color: '#475569' },
];
const THEME_CLASSES = COLOR_THEMES.map((t) => `theme-${t.id}`);
function createTheme() {
    let mode = $state('light');
    let colorTheme = $state('default');
    function init() {
        const storedMode = localStorage.getItem('theme');
        const storedColor = localStorage.getItem('color-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        mode = storedMode ?? (prefersDark ? 'dark' : 'light');
        colorTheme = storedColor ?? 'default';
        applyMode(mode);
        applyColor(colorTheme);
    }
    function applyMode(m) {
        document.documentElement.classList.toggle('dark', m === 'dark');
    }
    function applyColor(c) {
        // Remove all theme classes then add the new one
        document.documentElement.classList.remove(...THEME_CLASSES);
        if (c !== 'default') {
            document.documentElement.classList.add(`theme-${c}`);
        }
    }
    function toggle() {
        mode = mode === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', mode);
        applyMode(mode);
    }
    function setColor(c) {
        colorTheme = c;
        localStorage.setItem('color-theme', c);
        applyColor(c);
    }
    return {
        get current() { return mode; },
        get isDark() { return mode === 'dark'; },
        get colorTheme() { return colorTheme; },
        init,
        toggle,
        setColor,
    };
}
export const theme = createTheme();
