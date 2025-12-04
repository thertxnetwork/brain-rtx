// File system service for handling file operations
import * as FileSystem from 'expo-file-system';

export interface FileInfo {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  modifiedTime?: number;
}

export class FileSystemService {
  /**
   * Read a file's contents
   */
  static async readFile(path: string): Promise<string> {
    try {
      const content = await FileSystem.readAsStringAsync(path);
      return content;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  }

  /**
   * Write content to a file
   */
  static async writeFile(path: string, content: string): Promise<void> {
    try {
      await FileSystem.writeAsStringAsync(path, content);
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  }

  /**
   * List files in a directory
   */
  static async listDirectory(path: string): Promise<FileInfo[]> {
    try {
      const files = await FileSystem.readDirectoryAsync(path);
      const fileInfos: FileInfo[] = [];

      for (const file of files) {
        const filePath = `${path}/${file}`;
        const info = await FileSystem.getInfoAsync(filePath);
        
        fileInfos.push({
          name: file,
          path: filePath,
          type: info.isDirectory ? 'directory' : 'file',
          size: info.exists && !info.isDirectory ? (info as any).size : undefined,
          modifiedTime: info.exists ? (info as any).modificationTime : undefined,
        });
      }

      return fileInfos.sort((a, b) => {
        // Directories first, then files
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
    } catch (error) {
      console.error('Error listing directory:', error);
      throw error;
    }
  }

  /**
   * Check if a path exists
   */
  static async exists(path: string): Promise<boolean> {
    try {
      const info = await FileSystem.getInfoAsync(path);
      return info.exists;
    } catch (error) {
      return false;
    }
  }

  /**
   * Create a directory
   */
  static async createDirectory(path: string): Promise<void> {
    try {
      await FileSystem.makeDirectoryAsync(path, { intermediates: true });
    } catch (error) {
      console.error('Error creating directory:', error);
      throw error;
    }
  }

  /**
   * Delete a file or directory
   */
  static async delete(path: string): Promise<void> {
    try {
      await FileSystem.deleteAsync(path, { idempotent: true });
    } catch (error) {
      console.error('Error deleting:', error);
      throw error;
    }
  }

  /**
   * Get file extension
   */
  static getExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
  }

  /**
   * Get language from file extension
   */
  static getLanguageFromExtension(filename: string): string {
    const ext = this.getExtension(filename);
    const languageMap: { [key: string]: string } = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      json: 'json',
      md: 'markdown',
      css: 'css',
      scss: 'scss',
      html: 'html',
      xml: 'xml',
      py: 'python',
      java: 'java',
      c: 'c',
      cpp: 'cpp',
      h: 'c',
      hpp: 'cpp',
      go: 'go',
      rs: 'rust',
      php: 'php',
      rb: 'ruby',
      swift: 'swift',
      kt: 'kotlin',
      sql: 'sql',
      sh: 'shell',
      bash: 'shell',
      yaml: 'yaml',
      yml: 'yaml',
      toml: 'toml',
      dockerfile: 'dockerfile',
    };
    return languageMap[ext] || 'plaintext';
  }
}
