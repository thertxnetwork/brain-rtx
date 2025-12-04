// File icon utilities

export const FILE_ICONS: { [key: string]: string } = {
  // JavaScript/TypeScript
  js: '📜',
  jsx: '⚛️',
  ts: '📘',
  tsx: '⚛️',
  
  // Web
  html: '🌐',
  htm: '🌐',
  css: '🎨',
  scss: '🎨',
  sass: '🎨',
  less: '🎨',
  
  // Data
  json: '📋',
  xml: '📄',
  yaml: '📝',
  yml: '📝',
  toml: '📝',
  
  // Documentation
  md: '📝',
  markdown: '📝',
  txt: '📄',
  
  // Programming Languages
  py: '🐍',
  java: '☕',
  c: '🔷',
  cpp: '🔷',
  h: '🔷',
  hpp: '🔷',
  go: '🔷',
  rs: '🦀',
  php: '🐘',
  rb: '💎',
  swift: '🐦',
  kt: '🟣',
  scala: '🔺',
  
  // Shell
  sh: '🔧',
  bash: '🔧',
  zsh: '🔧',
  fish: '🐟',
  
  // Config
  gitignore: '🚫',
  dockerignore: '🚫',
  env: '🔐',
  
  // Build
  dockerfile: '🐳',
  'docker-compose': '🐳',
  makefile: '🔨',
  
  // Package managers
  'package.json': '📦',
  'package-lock.json': '🔒',
  'yarn.lock': '🧶',
  'pom.xml': '🏗️',
  'build.gradle': '🐘',
  'cargo.toml': '📦',
  'gemfile': '💎',
  'requirements.txt': '📋',
  
  // Git
  gitconfig: '🔧',
  gitattributes: '🔧',
  
  // Images
  png: '🖼️',
  jpg: '🖼️',
  jpeg: '🖼️',
  gif: '🖼️',
  svg: '🎨',
  ico: '🖼️',
  
  // Archives
  zip: '📦',
  tar: '📦',
  gz: '📦',
  rar: '📦',
  
  // Default
  default: '📄',
};

export const FOLDER_ICONS: { [key: string]: string } = {
  src: '📁',
  lib: '📚',
  test: '🧪',
  tests: '🧪',
  __tests__: '🧪',
  dist: '📦',
  build: '🔨',
  public: '🌍',
  assets: '🎨',
  images: '🖼️',
  img: '🖼️',
  styles: '🎨',
  css: '🎨',
  components: '⚛️',
  utils: '🔧',
  helpers: '🔧',
  config: '⚙️',
  node_modules: '📦',
  '.git': '🌿',
  '.github': '🌿',
  docs: '📚',
  scripts: '📜',
  default: '📁',
};

/**
 * Get icon for a file based on its name or extension
 */
export function getFileIcon(filename: string): string {
  const lowerFilename = filename.toLowerCase();
  
  // Check for exact filename matches
  if (FILE_ICONS[lowerFilename]) {
    return FILE_ICONS[lowerFilename];
  }
  
  // Check for extension
  const ext = filename.split('.').pop()?.toLowerCase();
  if (ext && FILE_ICONS[ext]) {
    return FILE_ICONS[ext];
  }
  
  return FILE_ICONS.default;
}

/**
 * Get icon for a folder based on its name
 */
export function getFolderIcon(foldername: string): string {
  const lowerFoldername = foldername.toLowerCase();
  return FOLDER_ICONS[lowerFoldername] || FOLDER_ICONS.default;
}

/**
 * Check if file should be hidden
 */
export function shouldHideFile(filename: string): boolean {
  const hiddenPatterns = [
    /^\./,  // Hidden files (starting with .)
    /^node_modules$/,
    /^\.git$/,
    /^\.DS_Store$/,
    /^Thumbs\.db$/,
    /\.swp$/,
    /~$/,
  ];
  
  return hiddenPatterns.some(pattern => pattern.test(filename));
}

/**
 * Sort files and folders
 */
export function sortFilesAndFolders(
  items: Array<{ name: string; type: 'file' | 'directory' }>
): Array<{ name: string; type: 'file' | 'directory' }> {
  return items.sort((a, b) => {
    // Folders first
    if (a.type !== b.type) {
      return a.type === 'directory' ? -1 : 1;
    }
    // Then alphabetically
    return a.name.localeCompare(b.name);
  });
}
