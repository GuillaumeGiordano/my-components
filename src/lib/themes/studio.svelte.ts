// Theme studio — interactive runtime preview engine (opt-in).
//
// This drives the <ThemePicker> so you can preview the 28 themes in the library
// showroom and decide which one to apply to a project. Consumer apps do NOT need
// this: they import a single static CSS file instead (see theme.svelte.ts).
//
// It composes the slim `theme` store for light/dark mode, and injects the active
// theme's colors/axes at runtime via style.setProperty + classes on <html>.

import { THEMES, type Theme } from './catalog';
import { theme } from '../theme.svelte';

// ── CSS class lists for cleanup ────────────────────────────────────────────

const SHAPE_CLASSES = ['shape-sharp', 'shape-rounded', 'shape-pill'];
const SHADOW_CLASSES = ['shadow-flat', 'shadow-elevated'];
const TYPE_CLASSES = ['type-tight', 'type-relaxed'];
const FONT_CLASSES = ['font-mono', 'font-condensed', 'font-geometric'];
const TRANSITION_CLASSES = ['transition-instant', 'transition-snappy', 'transition-smooth', 'transition-spring'];
const TEXTURE_CLASSES = ['texture-dots', 'texture-lines', 'texture-grid'];
const TRACKING_CLASSES = ['tracking-wide', 'tracking-tight-body'];

const ALL_THEME_CLASSES = [
  ...SHAPE_CLASSES, ...SHADOW_CLASSES, ...TYPE_CLASSES,
  ...FONT_CLASSES, ...TRANSITION_CLASSES, ...TEXTURE_CLASSES, ...TRACKING_CLASSES,
];

// ── Inject CSS custom properties ────────────────────────────────────────────

function injectThemeVars(t: Theme, m: 'light' | 'dark') {
  const root = document.documentElement;
  const colors = m === 'dark' ? t.dark : t.light;
  const bg = m === 'dark' ? t.bgDark : t.bgLight;
  const border = m === 'dark' ? t.borderDark : t.borderLight;

  root.style.setProperty('--primary', colors.primary);
  root.style.setProperty('--primary-hover', colors.primaryHover);
  root.style.setProperty('--primary-fg', colors.primaryFg);
  root.style.setProperty('--primary-subtle', colors.primarySubtle);
  root.style.setProperty('--primary-subtle-fg', colors.primarySubtleFg);

  if (bg) {
    root.style.setProperty('--bg-base', bg.base);
    root.style.setProperty('--bg-subtle', bg.subtle);
    root.style.setProperty('--bg-muted', bg.muted);
    root.style.setProperty('--bg-hover', bg.hover);
  } else {
    root.style.removeProperty('--bg-base');
    root.style.removeProperty('--bg-subtle');
    root.style.removeProperty('--bg-muted');
    root.style.removeProperty('--bg-hover');
  }

  if (border) {
    root.style.setProperty('--border', border.border);
    root.style.setProperty('--border-strong', border.borderStrong);
  } else {
    root.style.removeProperty('--border');
    root.style.removeProperty('--border-strong');
  }

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

  if (t.shape !== 'default') root.classList.add(`shape-${t.shape}`);
  if (t.shadow !== 'default') root.classList.add(`shadow-${t.shadow}`);
  if (t.typography !== 'default') root.classList.add(`type-${t.typography}`);
  if (t.font !== 'sans') root.classList.add(`font-${t.font}`);
  if (t.transition !== 'default') root.classList.add(`transition-${t.transition}`);
  if (t.texture !== 'none') root.classList.add(`texture-${t.texture}`);
  if (t.tracking !== 'default') root.classList.add(`tracking-${t.tracking}`);
}

// ── Cache localStorage (read by THEME_STUDIO_INIT_SCRIPT before paint) ──────

function saveThemeCache(t: Theme, m: 'light' | 'dark') {
  const classes: string[] = [];
  if (t.shape !== 'default') classes.push(`shape-${t.shape}`);
  if (t.shadow !== 'default') classes.push(`shadow-${t.shadow}`);
  if (t.typography !== 'default') classes.push(`type-${t.typography}`);
  if (t.font !== 'sans') classes.push(`font-${t.font}`);
  if (t.transition !== 'default') classes.push(`transition-${t.transition}`);
  if (t.texture !== 'none') classes.push(`texture-${t.texture}`);
  if (t.tracking !== 'default') classes.push(`tracking-${t.tracking}`);
  localStorage.setItem('theme-classes', classes.join(' '));

  const colors = m === 'dark' ? t.dark : t.light;
  const bg = m === 'dark' ? t.bgDark : t.bgLight;
  const border = m === 'dark' ? t.borderDark : t.borderLight;

  const vars: [string, string][] = [
    ['--primary', colors.primary],
    ['--primary-hover', colors.primaryHover],
    ['--primary-fg', colors.primaryFg],
    ['--primary-subtle', colors.primarySubtle],
    ['--primary-subtle-fg', colors.primarySubtleFg],
  ];
  if (bg) {
    vars.push(
      ['--bg-base', bg.base],
      ['--bg-subtle', bg.subtle],
      ['--bg-muted', bg.muted],
      ['--bg-hover', bg.hover],
    );
  }
  if (border) {
    vars.push(['--border', border.border], ['--border-strong', border.borderStrong]);
  }
  if (t.textureColor) {
    vars.push(['--texture-color', m === 'dark' ? t.textureColor.dark : t.textureColor.light]);
  }
  localStorage.setItem('theme-vars', JSON.stringify(vars));
}

// ── Store ──────────────────────────────────────────────────────────────────

function createStudio() {
  let activeTheme = $state<Theme>(THEMES[0]);

  function apply(t: Theme) {
    const m = theme.isDark ? 'dark' : 'light';
    applyThemeClasses(t);
    injectThemeVars(t, m);
    saveThemeCache(t, m);
  }

  function init() {
    const storedTheme = localStorage.getItem('visual-theme') ?? 'default';
    activeTheme = THEMES.find((t) => t.id === storedTheme) ?? THEMES[0];
    apply(activeTheme);
    // Re-inject the correct color set whenever light/dark is toggled.
    theme.onChange(() => apply(activeTheme));
  }

  function setTheme(id: string) {
    const t = THEMES.find((th) => th.id === id) ?? THEMES[0];
    activeTheme = t;
    localStorage.setItem('visual-theme', id);
    apply(t);
  }

  return {
    get activeTheme() {
      return activeTheme;
    },
    init,
    setTheme,
  };
}

export const themeStudio = createStudio();

/**
 * Full anti-flash script for the SHOWROOM only (reads theme-classes + theme-vars
 * from localStorage). Consumer apps use the slim THEME_INIT_SCRIPT instead.
 */
export const THEME_STUDIO_INIT_SCRIPT = `(function(){var d=document.documentElement,dark;try{var m=localStorage.getItem('theme');if(m)dark=m==='dark';}catch(e){}if(dark==null)dark=matchMedia('(prefers-color-scheme: dark)').matches;if(dark)d.classList.add('dark');try{var cls=localStorage.getItem('theme-classes');if(cls)cls.split(' ').forEach(function(c){if(c)d.classList.add(c);});var vars=JSON.parse(localStorage.getItem('theme-vars')||'null');if(vars)vars.forEach(function(v){d.style.setProperty(v[0],v[1]);});}catch(e){}})();`;
