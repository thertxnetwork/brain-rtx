// Theme type definitions for the code editor

export interface EditorColors {
  background: string;
  foreground: string;
  selection: string;
  lineHighlight: string;
  cursor: string;
  comment: string;
  keyword: string;
  string: string;
  number: string;
  function: string;
  variable: string;
  type: string;
  constant: string;
  operator: string;
  punctuation: string;
  error: string;
  warning: string;
  info: string;
}

export interface UIColors {
  background: string;
  foreground: string;
  border: string;
  activeTab: string;
  inactiveTab: string;
  hoverBackground: string;
  selectionBackground: string;
  buttonBackground: string;
  buttonForeground: string;
  buttonHoverBackground: string;
  inputBackground: string;
  inputBorder: string;
  dropdownBackground: string;
  tooltipBackground: string;
  tooltipForeground: string;
  statusBarBackground: string;
  statusBarForeground: string;
  toolWindowBackground: string;
  toolWindowBorder: string;
  sidebarBackground: string;
  sidebarForeground: string;
  gutterBackground: string;
  gutterForeground: string;
  scrollbarThumb: string;
  scrollbarTrack: string;
}

export interface GitColors {
  added: string;
  modified: string;
  deleted: string;
  conflict: string;
  ignored: string;
  untracked: string;
}

export interface Theme {
  id: string;
  name: string;
  type: 'light' | 'dark';
  author?: string;
  description?: string;
  editor: EditorColors;
  ui: UIColors;
  git: GitColors;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

export interface ThemeMetadata {
  id: string;
  name: string;
  type: 'light' | 'dark';
  author?: string;
  description?: string;
}
