import { create } from 'zustand';

export interface FileNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: FileNode[];
  isExpanded?: boolean;
  gitStatus?: 'added' | 'modified' | 'deleted' | 'untracked' | 'ignored';
}

export interface OpenFile {
  id: string;
  path: string;
  name: string;
  content: string;
  language: string;
  isDirty: boolean;
  cursorPosition: { line: number; column: number };
}

interface ProjectState {
  projectPath: string | null;
  projectName: string | null;
  fileTree: FileNode[];
  openFiles: OpenFile[];
  activeFileId: string | null;
  
  setProject: (path: string, name: string) => void;
  setFileTree: (tree: FileNode[]) => void;
  openFile: (file: OpenFile) => void;
  closeFile: (fileId: string) => void;
  setActiveFile: (fileId: string) => void;
  updateFileContent: (fileId: string, content: string) => void;
  updateFileDirty: (fileId: string, isDirty: boolean) => void;
  getActiveFile: () => OpenFile | undefined;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projectPath: null,
  projectName: null,
  fileTree: [],
  openFiles: [],
  activeFileId: null,
  
  setProject: (path, name) => set({ projectPath: path, projectName: name }),
  
  setFileTree: (tree) => set({ fileTree: tree }),
  
  openFile: (file) =>
    set((state) => {
      const existingFile = state.openFiles.find((f) => f.id === file.id);
      if (existingFile) {
        return { activeFileId: file.id };
      }
      return {
        openFiles: [...state.openFiles, file],
        activeFileId: file.id,
      };
    }),
  
  closeFile: (fileId) =>
    set((state) => {
      const newOpenFiles = state.openFiles.filter((f) => f.id !== fileId);
      const newActiveFileId =
        state.activeFileId === fileId
          ? newOpenFiles[0]?.id || null
          : state.activeFileId;
      return {
        openFiles: newOpenFiles,
        activeFileId: newActiveFileId,
      };
    }),
  
  setActiveFile: (fileId) => set({ activeFileId: fileId }),
  
  updateFileContent: (fileId, content) =>
    set((state) => ({
      openFiles: state.openFiles.map((f) =>
        f.id === fileId ? { ...f, content } : f
      ),
    })),
  
  updateFileDirty: (fileId, isDirty) =>
    set((state) => ({
      openFiles: state.openFiles.map((f) =>
        f.id === fileId ? { ...f, isDirty } : f
      ),
    })),
  
  getActiveFile: () => {
    const state = get();
    return state.openFiles.find((f) => f.id === state.activeFileId);
  },
}));
