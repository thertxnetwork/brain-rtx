import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import { useProjectStore, FileNode } from '../../store/projectStore';

export const ProjectTree: React.FC = () => {
  const { currentTheme } = useThemeStore();
  const { fileTree, projectName } = useProjectStore();
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.toolWindowBackground }]}>
      <View style={[styles.header, { borderBottomColor: currentTheme.ui.toolWindowBorder }]}>
        <Text style={[styles.headerText, { color: currentTheme.ui.foreground }]}>
          📁 {projectName || 'Project'}
        </Text>
      </View>
      <ScrollView style={styles.treeView}>
        {fileTree.map((node) => (
          <TreeNode key={node.id} node={node} level={0} />
        ))}
        {fileTree.length === 0 && (
          <Text style={[styles.emptyText, { color: currentTheme.ui.foreground }]}>
            No project opened
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

interface TreeNodeProps {
  node: FileNode;
  level: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, level }) => {
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
  
  const icon = node.type === 'directory'
    ? isExpanded ? '📂' : '📁'
    : getFileIcon(node.name);
  
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
      >
        <Text style={styles.nodeIcon}>{icon}</Text>
        <Text style={[styles.nodeName, { color: gitStatusColor }]}>
          {node.name}
        </Text>
      </TouchableOpacity>
      {isExpanded && node.children && node.children.map((child) => (
        <TreeNode key={child.id} node={child} level={level + 1} />
      ))}
    </>
  );
};

const getFileIcon = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();
  const iconMap: { [key: string]: string } = {
    js: '📜',
    ts: '📘',
    jsx: '⚛️',
    tsx: '⚛️',
    json: '📋',
    md: '📝',
    css: '🎨',
    html: '🌐',
    py: '🐍',
    java: '☕',
    go: '🔷',
    rs: '🦀',
    php: '🐘',
    rb: '💎',
  };
  return iconMap[ext || ''] || '📄';
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
    borderRightColor: 'rgba(0, 0, 0, 0.1)',
  },
  header: {
    padding: 12,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
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
  nodeIcon: {
    marginRight: 6,
    fontSize: 14,
  },
  nodeName: {
    fontSize: 13,
  },
  emptyText: {
    padding: 16,
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },
});
