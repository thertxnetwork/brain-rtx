// File icon utilities
// This file provides icon information for file types
// Note: The actual icon rendering is now handled by FileIcon component using MaterialCommunityIcons

export interface FileIconInfo {
  name: string;
  color: string;
  description: string;
}

export const FILE_ICON_INFO: { [key: string]: FileIconInfo } = {
  // JavaScript/TypeScript
  js: { name: 'language-javascript', color: '#F7DF1E', description: 'JavaScript file' },
  jsx: { name: 'react', color: '#61DAFB', description: 'React JSX file' },
  ts: { name: 'language-typescript', color: '#3178C6', description: 'TypeScript file' },
  tsx: { name: 'react', color: '#3178C6', description: 'React TSX file' },
  
  // Web
  html: { name: 'language-html5', color: '#E34F26', description: 'HTML file' },
  css: { name: 'language-css3', color: '#1572B6', description: 'CSS file' },
  scss: { name: 'sass', color: '#CC6699', description: 'SCSS file' },
  
  // Data
  json: { name: 'code-json', color: '#CBCB41', description: 'JSON file' },
  xml: { name: 'xml', color: '#F77604', description: 'XML file' },
  yaml: { name: 'file-code', color: '#CB171E', description: 'YAML file' },
  yml: { name: 'file-code', color: '#CB171E', description: 'YAML file' },
  
  // Documentation
  md: { name: 'language-markdown', color: '#083FA1', description: 'Markdown file' },
  txt: { name: 'text-box', color: '#666666', description: 'Text file' },
  
  // Programming Languages
  py: { name: 'language-python', color: '#3776AB', description: 'Python file' },
  java: { name: 'language-java', color: '#007396', description: 'Java file' },
  c: { name: 'language-c', color: '#A8B9CC', description: 'C file' },
  cpp: { name: 'language-cpp', color: '#00599C', description: 'C++ file' },
  go: { name: 'language-go', color: '#00ADD8', description: 'Go file' },
  rs: { name: 'language-rust', color: '#CE412B', description: 'Rust file' },
  php: { name: 'language-php', color: '#777BB4', description: 'PHP file' },
  rb: { name: 'language-ruby', color: '#CC342D', description: 'Ruby file' },
  swift: { name: 'language-swift', color: '#FA7343', description: 'Swift file' },
  kt: { name: 'language-kotlin', color: '#7F52FF', description: 'Kotlin file' },
};
export interface FolderIconInfo {
  name: string;
  color: string;
  description: string;
}

export const FOLDER_ICON_INFO: { [key: string]: FolderIconInfo } = {
  src: { name: 'folder-cog', color: '#42A5F5', description: 'Source folder' },
  lib: { name: 'folder-multiple', color: '#AB47BC', description: 'Library folder' },
  test: { name: 'test-tube', color: '#66BB6A', description: 'Test folder' },
  dist: { name: 'folder-cog', color: '#EF5350', description: 'Distribution folder' },
  public: { name: 'folder-network', color: '#29B6F6', description: 'Public folder' },
  assets: { name: 'folder-image', color: '#26A69A', description: 'Assets folder' },
  components: { name: 'folder-multiple', color: '#7E57C2', description: 'Components folder' },
  node_modules: { name: 'nodejs', color: '#339933', description: 'Node modules' },
  '.git': { name: 'git', color: '#F05032', description: 'Git folder' },
  docs: { name: 'folder-text', color: '#5E35B1', description: 'Documentation folder' },
};

/**
 * Get icon info for a file based on its extension
 */
export function getFileIconInfo(filename: string): FileIconInfo | null {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (ext && FILE_ICON_INFO[ext]) {
    return FILE_ICON_INFO[ext];
  }
  return null;
}

/**
 * Get icon info for a folder based on its name
 */
export function getFolderIconInfo(foldername: string): FolderIconInfo | null {
  const lowerName = foldername.toLowerCase();
  if (FOLDER_ICON_INFO[lowerName]) {
    return FOLDER_ICON_INFO[lowerName];
  }
  return null;
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
