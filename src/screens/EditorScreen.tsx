import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationBar } from '../components/ui/NavigationBar';
import { StatusBar } from '../components/ui/StatusBar';
import { TabBar } from '../components/editor/TabBar';
import { CodeEditor } from '../components/editor/CodeEditor';
import { ProjectTree } from '../components/toolwindows/ProjectTree';
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher';
import { useThemeStore } from '../store/themeStore';

export const EditorScreen: React.FC = () => {
  const { currentTheme } = useThemeStore();
  const [isProjectTreeVisible, setIsProjectTreeVisible] = useState(true);
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.background }]}>
      <NavigationBar />
      
      <View style={styles.mainContent}>
        {isProjectTreeVisible && (
          <View style={styles.sidebar}>
            <ProjectTree />
          </View>
        )}
        
        <View style={styles.editorArea}>
          <TabBar />
          <CodeEditor />
        </View>
      </View>
      
      <View style={styles.bottomBar}>
        <ThemeSwitcher />
      </View>
      
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0, 0, 0, 0.1)',
  },
  editorArea: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
});
