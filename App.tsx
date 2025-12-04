import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { EditorScreen } from './src/screens/EditorScreen';
import { useProjectStore } from './src/store/projectStore';
import { useThemeStore } from './src/store/themeStore';

export default function App() {
  const { projectPath, setProject, setFileTree } = useProjectStore();
  const { currentTheme } = useThemeStore();
  const [hasProject, setHasProject] = useState(false);

  const handleOpenProject = () => {
    // Simulate opening a project
    setProject('/home/user/projects/demo-project', 'demo-project');
    setFileTree([
      {
        id: '1',
        name: 'src',
        path: '/src',
        type: 'directory',
        isExpanded: true,
        children: [
          {
            id: '2',
            name: 'index.ts',
            path: '/src/index.ts',
            type: 'file',
            gitStatus: 'modified',
          },
          {
            id: '3',
            name: 'App.tsx',
            path: '/src/App.tsx',
            type: 'file',
          },
          {
            id: '4',
            name: 'components',
            path: '/src/components',
            type: 'directory',
            children: [
              {
                id: '5',
                name: 'Button.tsx',
                path: '/src/components/Button.tsx',
                type: 'file',
                gitStatus: 'added',
              },
            ],
          },
        ],
      },
      {
        id: '6',
        name: 'package.json',
        path: '/package.json',
        type: 'file',
      },
      {
        id: '7',
        name: 'README.md',
        path: '/README.md',
        type: 'file',
      },
    ]);
    setHasProject(true);
  };

  const handleNewProject = () => {
    // Simulate creating a new project
    setProject('/home/user/projects/new-project', 'new-project');
    setFileTree([
      {
        id: '1',
        name: 'src',
        path: '/src',
        type: 'directory',
        children: [],
      },
    ]);
    setHasProject(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.ui.background }]}>
      <StatusBar style={currentTheme.type === 'dark' ? 'light' : 'dark'} />
      {!hasProject ? (
        <WelcomeScreen 
          onOpenProject={handleOpenProject}
          onNewProject={handleNewProject}
        />
      ) : (
        <EditorScreen />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
