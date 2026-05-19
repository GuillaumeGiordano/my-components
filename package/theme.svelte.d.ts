type Mode = 'light' | 'dark';
export type ColorTheme = 'default' | 'violet' | 'emerald' | 'rose' | 'orange' | 'slate';
export declare const COLOR_THEMES: {
    id: ColorTheme;
    label: string;
    color: string;
}[];
export declare const theme: {
    readonly current: Mode;
    readonly isDark: boolean;
    readonly colorTheme: ColorTheme;
    init: () => void;
    toggle: () => void;
    setColor: (c: ColorTheme) => void;
};
export {};
