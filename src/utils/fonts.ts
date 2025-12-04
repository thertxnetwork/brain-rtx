// Font configurations for the code editor

export interface EditorFont {
  id: string;
  name: string;
  family: string;
  description: string;
  previewText: string;
}

export const EDITOR_FONTS: EditorFont[] = [
  {
    id: 'jetbrains-mono',
    name: 'JetBrains Mono',
    family: 'JetBrains Mono, monospace',
    description: 'Modern monospace font with code ligatures',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'fira-code',
    name: 'Fira Code',
    family: 'Fira Code, monospace',
    description: 'Popular font with programming ligatures',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'source-code-pro',
    name: 'Source Code Pro',
    family: 'Source Code Pro, monospace',
    description: 'Adobe\'s monospace font family',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'cascadia-code',
    name: 'Cascadia Code',
    family: 'Cascadia Code, monospace',
    description: 'Microsoft\'s monospace font with ligatures',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'menlo',
    name: 'Menlo',
    family: 'Menlo, Monaco, monospace',
    description: 'Default macOS monospace font',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'consolas',
    name: 'Consolas',
    family: 'Consolas, monospace',
    description: 'Microsoft\'s monospace font',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'courier-new',
    name: 'Courier New',
    family: 'Courier New, Courier, monospace',
    description: 'Classic monospace font',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'monaco',
    name: 'Monaco',
    family: 'Monaco, monospace',
    description: 'Classic Mac monospace font',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'inconsolata',
    name: 'Inconsolata',
    family: 'Inconsolata, monospace',
    description: 'Humanist monospace font',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'ubuntu-mono',
    name: 'Ubuntu Mono',
    family: 'Ubuntu Mono, monospace',
    description: 'Ubuntu\'s monospace font',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'roboto-mono',
    name: 'Roboto Mono',
    family: 'Roboto Mono, monospace',
    description: 'Google\'s monospace font',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'dejavu-sans-mono',
    name: 'DejaVu Sans Mono',
    family: 'DejaVu Sans Mono, monospace',
    description: 'Open source monospace font',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'anonymous-pro',
    name: 'Anonymous Pro',
    family: 'Anonymous Pro, monospace',
    description: 'Font designed for coding',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'hack',
    name: 'Hack',
    family: 'Hack, monospace',
    description: 'Typeface designed for source code',
    previewText: 'const hello = () => "world";',
  },
  {
    id: 'sf-mono',
    name: 'SF Mono',
    family: 'SF Mono, Monaco, monospace',
    description: 'Apple\'s San Francisco Mono',
    previewText: 'const hello = () => "world";',
  },
];

// Default font
export const DEFAULT_FONT = EDITOR_FONTS[0]; // JetBrains Mono

// Font sizes
export const FONT_SIZES = [10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24];
export const DEFAULT_FONT_SIZE = 14;

// Line heights
export const LINE_HEIGHTS = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2.0];
export const DEFAULT_LINE_HEIGHT = 1.5;
