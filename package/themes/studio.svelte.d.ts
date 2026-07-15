import { type Theme } from './catalog';
export declare const themeStudio: {
    readonly activeTheme: Theme;
    init: () => void;
    setTheme: (id: string) => void;
};
/**
 * Full anti-flash script for the SHOWROOM only (reads theme-classes + theme-vars
 * from localStorage). Consumer apps use the slim THEME_INIT_SCRIPT instead.
 */
export declare const THEME_STUDIO_INIT_SCRIPT = "(function(){var d=document.documentElement,dark;try{var m=localStorage.getItem('theme');if(m)dark=m==='dark';}catch(e){}if(dark==null)dark=matchMedia('(prefers-color-scheme: dark)').matches;if(dark)d.classList.add('dark');try{var cls=localStorage.getItem('theme-classes');if(cls)cls.split(' ').forEach(function(c){if(c)d.classList.add(c);});var vars=JSON.parse(localStorage.getItem('theme-vars')||'null');if(vars)vars.forEach(function(v){d.style.setProperty(v[0],v[1]);});}catch(e){}})();";
