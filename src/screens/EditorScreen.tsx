import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationBar } from '../components/ui/NavigationBar';
import { StatusBar } from '../components/ui/StatusBar';
import { TabBar } from '../components/editor/TabBar';
import { CodeEditor } from '../components/editor/CodeEditor';
import { ProjectTree } from '../components/toolwindows/ProjectTree';
import { Terminal } from '../components/toolwindows/Terminal';
import { Problems } from '../components/toolwindows/Problems';
import { GitPanel } from '../components/toolwindows/GitPanel';
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher';
import { FontSelector } from '../components/ui/FontSelector';
import { useThemeStore } from '../store/themeStore';

type BottomPanel = 'terminal' | 'problems' | 'git' | null;

export const EditorScreen: React.FC = () => {
  const { currentTheme } = useThemeStore();
  const [isProjectTreeVisible, setIsProjectTreeVisible] = useState(true);
  const [activeBottomPanel, setActiveBottomPanel] = useState<BottomPanel>('terminal');
  const [isBottomPanelVisible, setIsBottomPanelVisible] = useState(true);
  
  const renderBottomPanel = () => {
    switch (activeBottomPanel) {
      case 'terminal':
        return <Terminal />;
      case 'problems':
        return <Problems />;
      case 'git':
        return <GitPanel />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.background }]}>
      <NavigationBar />
      
      <View style={styles.mainContent}>
        {isProjectTreeVisible && (
          <View style={styles.sidebar}>
            <ProjectTree />
          </View>
        )}
        
        <View style={styles.centerPanel}>
          <View style={styles.editorArea}>
            <TabBar />
            <CodeEditor />
          </View>

          {isBottomPanelVisible && (
            <View style={styles.bottomPanel}>
              <View style={[styles.bottomPanelTabs, { 
                backgroundColor: currentTheme.ui.toolWindowBackground,
                borderTopColor: currentTheme.ui.border,
              }]}>
                <TouchableOpacity
                  style={[
                    styles.panelTab,
                    activeBottomPanel === 'terminal' && { 
                      borderBottomColor: currentTheme.editor.keyword,
                      borderBottomWidth: 2,
                    },
                  ]}
                  onPress={() => setActiveBottomPanel('terminal')}
                >
                  <Text style={[styles.panelTabText, { color: currentTheme.ui.foreground }]}>
                    💻 Terminal
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.panelTab,
                    activeBottomPanel === 'problems' && { 
                      borderBottomColor: currentTheme.editor.keyword,
                      borderBottomWidth: 2,
                    },
                  ]}
                  onPress={() => setActiveBottomPanel('problems')}
                >
                  <Text style={[styles.panelTabText, { color: currentTheme.ui.foreground }]}>
                    ⚠️ Problems
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.panelTab,
                    activeBottomPanel === 'git' && { 
                      borderBottomColor: currentTheme.editor.keyword,
                      borderBottomWidth: 2,
                    },
                  ]}
                  onPress={() => setActiveBottomPanel('git')}
                >
                  <Text style={[styles.panelTabText, { color: currentTheme.ui.foreground }]}>
                    🌿 Git
                  </Text>
                </TouchableOpacity>

                <View style={styles.panelTabSpacer} />

                <TouchableOpacity
                  style={styles.panelTab}
                  onPress={() => setIsBottomPanelVisible(false)}
                >
                  <Text style={[styles.panelTabText, { color: currentTheme.ui.foreground }]}>
                    ✕
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.bottomPanelContent}>
                {renderBottomPanel()}
              </View>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.bottomBar}>
        {!isBottomPanelVisible && (
          <TouchableOpacity
            style={[styles.showPanelButton, { backgroundColor: currentTheme.ui.buttonBackground }]}
            onPress={() => setIsBottomPanelVisible(true)}
          >
            <Text style={[styles.showPanelButtonText, { color: currentTheme.ui.buttonForeground }]}>
              Show Panel
            </Text>
          </TouchableOpacity>
        )}
        <FontSelector />
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
  centerPanel: {
    flex: 1,
    flexDirection: 'column',
  },
  editorArea: {
    flex: 1,
  },
  bottomPanel: {
    height: 250,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomPanelTabs: {
    flexDirection: 'row',
    height: 36,
    borderTopWidth: 1,
  },
  panelTab: {
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  panelTabText: {
    fontSize: 13,
    fontWeight: '500',
  },
  panelTabSpacer: {
    flex: 1,
  },
  bottomPanelContent: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  showPanelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  showPanelButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
