import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';
import { useProjectStore, FileNode } from '../../store/projectStore';
import { FileIcon, FolderIcon } from '../ui/FileIcon';
import { FileContextMenu, FileOperationsModal, FileOperation } from '../ui/FileOperations';

export const ProjectTree: React.FC = () => {
  const { currentTheme } = useThemeStore();
  const { fileTree, projectName } = useProjectStore();
  const [contextMenu, setContextMenu] = useState<{ visible: boolean; position: { x: number; y: number }; node: FileNode | null }>({
    visible: false,
    position: { x: 0, y: 0 },
    node: null,
  });
  const [fileOperation, setFileOperation] = useState<FileOperation | null>(null);
  
  const handleContextMenu = (node: FileNode, x: number, y: number) => {
    setContextMenu({ visible: true, position: { x, y }, node });
  };

  const handleContextMenuSelect = (action: string) => {
    if (!contextMenu.node) return;
    
    const operation: FileOperation = {
      type: action as any,
      path: contextMenu.node.path,
      name: contextMenu.node.name,
    };
    
    if (action === 'copy-path') {
      // Copy path to clipboard (would need Clipboard API)
      console.log('Copy path:', contextMenu.node.path);
    } else {
      setFileOperation(operation);
    }
    
    setContextMenu({ visible: false, position: { x: 0, y: 0 }, node: null });
  };

  const handleFileOperationConfirm = (operation: FileOperation, newName?: string) => {
    console.log('File operation:', operation, newName);
    // Here you would implement actual file operations
    setFileOperation(null);
  };
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.toolWindowBackground, borderRightColor: currentTheme.ui.border }]}>
      <View style={[styles.header, { borderBottomColor: currentTheme.ui.toolWindowBorder }]}>
        <FolderIcon foldername={projectName || 'Project'} size={18} style={styles.headerIcon} />
        <Text style={[styles.headerText, { color: currentTheme.ui.foreground }]}>
          {projectName || 'Project'}
        </Text>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => {
            setFileOperation({
              type: 'create-file',
              path: '/',
            });
          }}
        >
          <MaterialCommunityIcons name="file-plus" size={18} color={currentTheme.ui.foreground} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => {
            setFileOperation({
              type: 'create-folder',
              path: '/',
            });
          }}
        >
          <MaterialCommunityIcons name="folder-plus" size={18} color={currentTheme.ui.foreground} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.treeView}>
        {fileTree.map((node) => (
          <TreeNode key={node.id} node={node} level={0} onContextMenu={handleContextMenu} />
        ))}
        {fileTree.length === 0 && (
          <Text style={[styles.emptyText, { color: currentTheme.ui.foreground }]}>
            No project opened
          </Text>
        )}
      </ScrollView>
      
      <FileContextMenu
        visible={contextMenu.visible}
        position={contextMenu.position}
        fileName={contextMenu.node?.name || ''}
        isDirectory={contextMenu.node?.type === 'directory'}
        onClose={() => setContextMenu({ visible: false, position: { x: 0, y: 0 }, node: null })}
        onSelect={handleContextMenuSelect}
      />
      
      <FileOperationsModal
        visible={!!fileOperation}
        operation={fileOperation}
        onClose={() => setFileOperation(null)}
        onConfirm={handleFileOperationConfirm}
      />
    </View>
  );
};

interface TreeNodeProps {
  node: FileNode;
  level: number;
  onContextMenu: (node: FileNode, x: number, y: number) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level, onContextMenu }) => {
  const { currentTheme } = useThemeStore();
  const { openFile } = useProjectStore();
  const [isExpanded, setIsExpanded] = React.useState(node.isExpanded || false);
  
  const handlePress = () => {
    if (node.type === 'directory') {
      setIsExpanded(!isExpanded);
    } else {
      // Open file
      openFile({
        id: node.id,
        path: node.path,
        name: node.name,
        content: '// File content would be loaded here',
        language: getLanguageFromExtension(node.name),
        isDirty: false,
        cursorPosition: { line: 1, column: 1 },
      });
    }
  };
  
  const handleLongPress = () => {
    // In a real app, we'd get the actual position from the event
    onContextMenu(node, 100, 200);
  };
  
  const gitStatusColor = node.gitStatus 
    ? currentTheme.git[node.gitStatus]
    : currentTheme.ui.foreground;
  
  return (
    <>
      <TouchableOpacity
        style={[
          styles.nodeContainer,
          { paddingLeft: 8 + level * 16 },
        ]}
        onPress={handlePress}
        onLongPress={handleLongPress}
      >
        {node.type === 'directory' ? (
          <>
            <MaterialCommunityIcons 
              name={isExpanded ? "chevron-down" : "chevron-right"} 
              size={16} 
              color={currentTheme.ui.foreground} 
              style={styles.chevron}
            />
            <FolderIcon 
              foldername={node.name} 
              isExpanded={isExpanded}
              size={16}
              style={styles.nodeIcon}
            />
          </>
        ) : (
          <>
            <View style={styles.chevronSpacer} />
            <FileIcon 
              filename={node.name}
              size={16}
              style={styles.nodeIcon}
            />
          </>
        )}
        <Text style={[styles.nodeName, { color: gitStatusColor }]}>
          {node.name}
        </Text>
        {node.gitStatus && (
          <Text style={[styles.gitBadge, { color: gitStatusColor }]}>
            {node.gitStatus === 'modified' ? 'M' : node.gitStatus === 'added' ? 'A' : 'D'}
          </Text>
        )}
      </TouchableOpacity>
      {isExpanded && node.children && node.children.map((child) => (
        <TreeNode key={child.id} node={child} level={level + 1} onContextMenu={onContextMenu} />
      ))}
    </>
  );
};

const getLanguageFromExtension = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  const langMap: { [key: string]: string } = {
    js: 'javascript',
    ts: 'typescript',
    jsx: 'javascript',
    tsx: 'typescript',
    json: 'json',
    md: 'markdown',
    css: 'css',
    html: 'html',
    py: 'python',
    java: 'java',
    go: 'go',
    rs: 'rust',
    php: 'php',
    rb: 'ruby',
  };
  return langMap[ext || ''] || 'plaintext';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  headerIcon: {
    marginRight: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  headerButton: {
    padding: 4,
    marginLeft: 4,
  },
  treeView: {
    flex: 1,
    padding: 4,
  },
  nodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingRight: 8,
  },
  chevron: {
    marginRight: 4,
  },
  chevronSpacer: {
    width: 20,
  },
  nodeIcon: {
    marginRight: 8,
  },
  nodeName: {
    fontSize: 13,
    flex: 1,
  },
  gitBadge: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyText: {
    padding: 16,
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },
});
