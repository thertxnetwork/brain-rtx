import { create } from 'zustand';
import { Theme } from '../types/theme';
import { EditorFont, DEFAULT_FONT, DEFAULT_FONT_SIZE, DEFAULT_LINE_HEIGHT } from '../utils/fonts';

// Import all themes
import darcula from '../themes/darcula.json';
import intellijLight from '../themes/intellij-light.json';
import oneDark from '../themes/one-dark.json';
import monokaiPro from '../themes/monokai-pro.json';
import dracula from '../themes/dracula.json';
import nightOwl from '../themes/night-owl.json';
import materialOcean from '../themes/material-ocean.json';
import solarizedDark from '../themes/solarized-dark.json';
import gruvboxDark from '../themes/gruvbox-dark.json';
import githubDark from '../themes/github-dark.json';
import nord from '../themes/nord.json';
import tokyoNight from '../themes/tokyo-night.json';
import ayuDark from '../themes/ayu-dark.json';
import cobalt2 from '../themes/cobalt2.json';
import highContrastLight from '../themes/high-contrast-light.json';
import solarizedLight from '../themes/solarized-light.json';
import githubLight from '../themes/github-light.json';

export const BUILT_IN_THEMES: Theme[] = [
  darcula as Theme,
  intellijLight as Theme,
  oneDark as Theme,
  monokaiPro as Theme,
  dracula as Theme,
  nightOwl as Theme,
  materialOcean as Theme,
  solarizedDark as Theme,
  gruvboxDark as Theme,
  githubDark as Theme,
  nord as Theme,
  tokyoNight as Theme,
  ayuDark as Theme,
  cobalt2 as Theme,
  highContrastLight as Theme,
  solarizedLight as Theme,
  githubLight as Theme,
];

interface ThemeState {
  currentTheme: Theme;
  customThemes: Theme[];
  editorFont: EditorFont;
  fontSize: number;
  lineHeight: number;
  setTheme: (theme: Theme) => void;
  addCustomTheme: (theme: Theme) => void;
  removeCustomTheme: (themeId: string) => void;
  getAllThemes: () => Theme[];
  getThemeById: (themeId: string) => Theme | undefined;
  setEditorFont: (font: EditorFont) => void;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  currentTheme: BUILT_IN_THEMES[0], // Default to Darcula
  customThemes: [],
  editorFont: DEFAULT_FONT,
  fontSize: DEFAULT_FONT_SIZE,
  lineHeight: DEFAULT_LINE_HEIGHT,
  
  setTheme: (theme) => set({ currentTheme: theme }),
  
  addCustomTheme: (theme) => 
    set((state) => ({ 
      customThemes: [...state.customThemes, theme] 
    })),
  
  removeCustomTheme: (themeId) =>
    set((state) => ({
      customThemes: state.customThemes.filter((t) => t.id !== themeId),
    })),
  
  getAllThemes: () => [...BUILT_IN_THEMES, ...get().customThemes],
  
  getThemeById: (themeId) => {
    const allThemes = get().getAllThemes();
    return allThemes.find((t) => t.id === themeId);
  },
  
  setEditorFont: (font) => set({ editorFont: font }),
  
  setFontSize: (size) => set({ fontSize: size }),
  
  setLineHeight: (height) => set({ lineHeight: height }),
}));
