import React from 'react';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { ViewStyle } from 'react-native';

export interface FileIconProps {
  filename: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

/**
 * Component to render appropriate icon for a file based on its extension or name
 */
export const FileIcon: React.FC<FileIconProps> = ({ filename, size = 16, color = '#666', style }) => {
  const lowerFilename = filename.toLowerCase();
  const ext = filename.split('.').pop()?.toLowerCase() || '';

  // JavaScript/TypeScript
  if (ext === 'js' || ext === 'mjs' || ext === 'cjs') {
    return <MaterialCommunityIcons name="language-javascript" size={size} color="#F7DF1E" style={style} />;
  }
  if (ext === 'jsx') {
    return <MaterialCommunityIcons name="react" size={size} color="#61DAFB" style={style} />;
  }
  if (ext === 'ts' || ext === 'mts' || ext === 'cts') {
    return <MaterialCommunityIcons name="language-typescript" size={size} color="#3178C6" style={style} />;
  }
  if (ext === 'tsx') {
    return <MaterialCommunityIcons name="react" size={size} color="#3178C6" style={style} />;
  }

  // Web
  if (ext === 'html' || ext === 'htm') {
    return <MaterialCommunityIcons name="language-html5" size={size} color="#E34F26" style={style} />;
  }
  if (ext === 'css') {
    return <MaterialCommunityIcons name="language-css3" size={size} color="#1572B6" style={style} />;
  }
  if (ext === 'scss' || ext === 'sass') {
    return <MaterialCommunityIcons name="sass" size={size} color="#CC6699" style={style} />;
  }
  if (ext === 'less') {
    return <MaterialCommunityIcons name="language-css3" size={size} color="#1D365D" style={style} />;
  }

  // Data formats
  if (ext === 'json') {
    return <MaterialCommunityIcons name="code-json" size={size} color="#CBCB41" style={style} />;
  }
  if (ext === 'xml') {
    return <MaterialCommunityIcons name="xml" size={size} color="#F77604" style={style} />;
  }
  if (ext === 'yaml' || ext === 'yml') {
    return <MaterialCommunityIcons name="file-code" size={size} color="#CB171E" style={style} />;
  }
  if (ext === 'toml') {
    return <MaterialCommunityIcons name="file-code" size={size} color="#9C4221" style={style} />;
  }

  // Documentation
  if (ext === 'md' || ext === 'markdown') {
    return <MaterialCommunityIcons name="language-markdown" size={size} color="#083FA1" style={style} />;
  }
  if (ext === 'txt') {
    return <MaterialCommunityIcons name="text-box" size={size} color={color} style={style} />;
  }
  if (ext === 'pdf') {
    return <MaterialCommunityIcons name="file-pdf-box" size={size} color="#D32F2F" style={style} />;
  }

  // Programming Languages
  if (ext === 'py') {
    return <MaterialCommunityIcons name="language-python" size={size} color="#3776AB" style={style} />;
  }
  if (ext === 'java') {
    return <MaterialCommunityIcons name="language-java" size={size} color="#007396" style={style} />;
  }
  if (ext === 'c') {
    return <MaterialCommunityIcons name="language-c" size={size} color="#A8B9CC" style={style} />;
  }
  if (ext === 'cpp' || ext === 'cc' || ext === 'cxx' || ext === 'h' || ext === 'hpp') {
    return <MaterialCommunityIcons name="language-cpp" size={size} color="#00599C" style={style} />;
  }
  if (ext === 'go') {
    return <MaterialCommunityIcons name="language-go" size={size} color="#00ADD8" style={style} />;
  }
  if (ext === 'rs') {
    return <MaterialCommunityIcons name="language-rust" size={size} color="#CE412B" style={style} />;
  }
  if (ext === 'php') {
    return <MaterialCommunityIcons name="language-php" size={size} color="#777BB4" style={style} />;
  }
  if (ext === 'rb') {
    return <MaterialCommunityIcons name="language-ruby" size={size} color="#CC342D" style={style} />;
  }
  if (ext === 'swift') {
    return <MaterialCommunityIcons name="language-swift" size={size} color="#FA7343" style={style} />;
  }
  if (ext === 'kt' || ext === 'kts') {
    return <MaterialCommunityIcons name="language-kotlin" size={size} color="#7F52FF" style={style} />;
  }
  if (ext === 'lua') {
    return <MaterialCommunityIcons name="language-lua" size={size} color="#2C2D72" style={style} />;
  }
  if (ext === 'r') {
    return <MaterialCommunityIcons name="language-r" size={size} color="#276DC3" style={style} />;
  }

  // Shell
  if (ext === 'sh' || ext === 'bash' || ext === 'zsh' || ext === 'fish') {
    return <MaterialCommunityIcons name="console" size={size} color="#4EAA25" style={style} />;
  }

  // Config files
  if (lowerFilename === '.gitignore' || lowerFilename === '.dockerignore') {
    return <MaterialCommunityIcons name="cancel" size={size} color="#F05032" style={style} />;
  }
  if (ext === 'env' || lowerFilename === '.env' || lowerFilename.startsWith('.env.')) {
    return <MaterialCommunityIcons name="key-variant" size={size} color="#ECD53F" style={style} />;
  }

  // Docker
  if (lowerFilename === 'dockerfile' || lowerFilename.startsWith('dockerfile.')) {
    return <MaterialCommunityIcons name="docker" size={size} color="#2496ED" style={style} />;
  }
  if (lowerFilename === 'docker-compose.yml' || lowerFilename === 'docker-compose.yaml') {
    return <MaterialCommunityIcons name="docker" size={size} color="#2496ED" style={style} />;
  }

  // Build files
  if (lowerFilename === 'makefile' || ext === 'mk') {
    return <MaterialCommunityIcons name="hammer" size={size} color="#6D6D6D" style={style} />;
  }

  // Package managers
  if (lowerFilename === 'package.json') {
    return <MaterialCommunityIcons name="nodejs" size={size} color="#339933" style={style} />;
  }
  if (lowerFilename === 'package-lock.json' || lowerFilename === 'yarn.lock' || lowerFilename === 'pnpm-lock.yaml') {
    return <MaterialCommunityIcons name="lock" size={size} color="#CB3837" style={style} />;
  }
  if (lowerFilename === 'pom.xml') {
    return <MaterialCommunityIcons name="language-java" size={size} color="#C71A36" style={style} />;
  }
  if (lowerFilename === 'build.gradle' || lowerFilename === 'build.gradle.kts') {
    return <MaterialCommunityIcons name="file-code" size={size} color="#02303A" style={style} />;
  }
  if (lowerFilename === 'cargo.toml' || lowerFilename === 'cargo.lock') {
    return <MaterialCommunityIcons name="language-rust" size={size} color="#CE412B" style={style} />;
  }
  if (lowerFilename === 'gemfile' || lowerFilename === 'gemfile.lock') {
    return <MaterialCommunityIcons name="language-ruby" size={size} color="#CC342D" style={style} />;
  }
  if (lowerFilename === 'requirements.txt' || lowerFilename === 'pipfile' || lowerFilename === 'poetry.lock') {
    return <MaterialCommunityIcons name="language-python" size={size} color="#3776AB" style={style} />;
  }

  // Git
  if (lowerFilename === '.gitconfig' || lowerFilename === '.gitattributes') {
    return <MaterialCommunityIcons name="git" size={size} color="#F05032" style={style} />;
  }

  // Images
  if (['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(ext)) {
    return <MaterialCommunityIcons name="file-image" size={size} color="#4CAF50" style={style} />;
  }
  if (ext === 'svg') {
    return <MaterialCommunityIcons name="svg" size={size} color="#FFB13B" style={style} />;
  }
  if (ext === 'ico') {
    return <MaterialCommunityIcons name="image" size={size} color="#4CAF50" style={style} />;
  }

  // Video
  if (['mp4', 'avi', 'mov', 'mkv', 'webm'].includes(ext)) {
    return <MaterialCommunityIcons name="file-video" size={size} color="#FF5722" style={style} />;
  }

  // Audio
  if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(ext)) {
    return <MaterialCommunityIcons name="file-music" size={size} color="#9C27B0" style={style} />;
  }

  // Archives
  if (['zip', 'tar', 'gz', 'rar', '7z', 'bz2', 'xz'].includes(ext)) {
    return <MaterialCommunityIcons name="folder-zip" size={size} color="#FB8C00" style={style} />;
  }

  // Executables
  if (['exe', 'app', 'dmg', 'apk', 'deb', 'rpm'].includes(ext)) {
    return <MaterialCommunityIcons name="application" size={size} color="#607D8B" style={style} />;
  }

  // Default file icon
  return <MaterialCommunityIcons name="file-document-outline" size={size} color={color} style={style} />;
};

export interface FolderIconProps {
  foldername: string;
  isExpanded?: boolean;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

/**
 * Component to render appropriate icon for a folder
 */
export const FolderIcon: React.FC<FolderIconProps> = ({ 
  foldername, 
  isExpanded = false, 
  size = 16, 
  color = '#FFB300',
  style 
}) => {
  const lowerFoldername = foldername.toLowerCase();

  // Special folders
  if (lowerFoldername === 'src' || lowerFoldername === 'source') {
    return <MaterialCommunityIcons name="folder-cog" size={size} color="#42A5F5" style={style} />;
  }
  if (lowerFoldername === 'lib' || lowerFoldername === 'libs') {
    return <MaterialCommunityIcons name="folder-multiple" size={size} color="#AB47BC" style={style} />;
  }
  if (['test', 'tests', '__tests__', 'spec', 'specs'].includes(lowerFoldername)) {
    return <MaterialCommunityIcons name="test-tube" size={size} color="#66BB6A" style={style} />;
  }
  if (['dist', 'build', 'out', 'output'].includes(lowerFoldername)) {
    return <MaterialCommunityIcons name="folder-cog" size={size} color="#EF5350" style={style} />;
  }
  if (['public', 'static', 'www'].includes(lowerFoldername)) {
    return <MaterialCommunityIcons name="folder-network" size={size} color="#29B6F6" style={style} />;
  }
  if (['assets', 'resources'].includes(lowerFoldername)) {
    return <MaterialCommunityIcons name="folder-image" size={size} color="#26A69A" style={style} />;
  }
  if (['images', 'img', 'imgs', 'pictures'].includes(lowerFoldername)) {
    return <MaterialCommunityIcons name="folder-image" size={size} color="#5C6BC0" style={style} />;
  }
  if (['styles', 'css', 'stylesheets'].includes(lowerFoldername)) {
    return <MaterialCommunityIcons name="folder-file" size={size} color="#EC407A" style={style} />;
  }
  if (['components', 'views', 'pages'].includes(lowerFoldername)) {
    return <MaterialCommunityIcons name="folder-multiple" size={size} color="#7E57C2" style={style} />;
  }
  if (['utils', 'utilities', 'helpers', 'common'].includes(lowerFoldername)) {
    return <MaterialCommunityIcons name="folder-wrench" size={size} color="#FF7043" style={style} />;
  }
  if (['config', 'configs', 'configuration'].includes(lowerFoldername)) {
    return <MaterialCommunityIcons name="folder-cog" size={size} color="#78909C" style={style} />;
  }
  if (lowerFoldername === 'node_modules') {
    return <MaterialCommunityIcons name="nodejs" size={size} color="#339933" style={style} />;
  }
  if (lowerFoldername === '.git') {
    return <MaterialCommunityIcons name="git" size={size} color="#F05032" style={style} />;
  }
  if (lowerFoldername === '.github') {
    return <MaterialCommunityIcons name="github" size={size} color="#181717" style={style} />;
  }
  if (['docs', 'doc', 'documentation'].includes(lowerFoldername)) {
    return <MaterialCommunityIcons name="folder-text" size={size} color="#5E35B1" style={style} />;
  }
  if (['scripts', 'script'].includes(lowerFoldername)) {
    return <MaterialCommunityIcons name="folder-wrench" size={size} color="#8D6E63" style={style} />;
  }

  // Default folder icon
  const iconName = isExpanded ? 'folder-open' : 'folder';
  return <MaterialCommunityIcons name={iconName} size={size} color={color} style={style} />;
};
