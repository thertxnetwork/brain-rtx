import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { NavigationBar } from '../components/ui/NavigationBar';
import { StatusBar } from '../components/ui/StatusBar';
import { TabBar } from '../components/editor/TabBar';
import { CodeEditor } from '../components/editor/CodeEditor';
import { ProjectTree } from '../components/toolwindows/ProjectTree';
import { Terminal } from '../components/toolwindows/Terminal';
import { Problems } from '../components/toolwindows/Problems';
import { GitPanel } from '../components/toolwindows/GitPanel';
import { FindReplace, FindOptions } from '../components/editor/FindReplace';
import { SettingsScreen } from './SettingsScreen';
import { useThemeStore } from '../store/themeStore';
import { useSwipeGesture } from '../utils/gestures';

type BottomPanel = 'terminal' | 'problems' | 'git' | null;

export const EditorScreen: React.FC = () => {
  const { currentTheme } = useThemeStore();
  const [isProjectTreeVisible, setIsProjectTreeVisible] = useState(true);
  const [activeBottomPanel, setActiveBottomPanel] = useState<BottomPanel>('terminal');
  const [isBottomPanelVisible, setIsBottomPanelVisible] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);

  // Swipe gestures for mobile
  const editorSwipeGesture = useSwipeGesture({
    onSwipeRight: () => {
      if (!isProjectTreeVisible) {
        setIsProjectTreeVisible(true);
      }
    },
    onSwipeLeft: () => {
      if (isProjectTreeVisible) {
        setIsProjectTreeVisible(false);
      }
    },
    onSwipeUp: () => {
      if (!isBottomPanelVisible) {
        setIsBottomPanelVisible(true);
      }
    },
    onSwipeDown: () => {
      if (isBottomPanelVisible) {
        setIsBottomPanelVisible(false);
      }
    },
  });

  const handleFind = (text: string, options: FindOptions) => {
    console.log('Find:', text, options);
    // Implement find logic here
  };

  const handleReplace = (findText: string, replaceText: string, replaceAll: boolean) => {
    console.log('Replace:', findText, replaceText, replaceAll);
    // Implement replace logic here
  };
  
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

  if (showSettings) {
    return <SettingsScreen onClose={() => setShowSettings(false)} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.background }]}>
      <NavigationBar 
        onOpenSettings={() => setShowSettings(true)} 
        onToggleSidebar={() => setIsProjectTreeVisible(!isProjectTreeVisible)} 
      />
      
      {/* Find/Replace Modal */}
      <FindReplace
        visible={showFindReplace}
        onClose={() => setShowFindReplace(false)}
        onFind={handleFind}
        onReplace={handleReplace}
      />
      
      <View style={styles.mainContent}>
        {isProjectTreeVisible && (
          <View style={styles.sidebar}>
            <ProjectTree />
          </View>
        )}
        
        <View style={styles.centerPanel} {...editorSwipeGesture.panHandlers}>
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
                <Button
                  mode={activeBottomPanel === 'terminal' ? 'contained' : 'text'}
                  onPress={() => setActiveBottomPanel('terminal')}
                  compact
                  icon="console"
                >
                  Terminal
                </Button>

                <Button
                  mode={activeBottomPanel === 'problems' ? 'contained' : 'text'}
                  onPress={() => setActiveBottomPanel('problems')}
                  compact
                  icon="alert-circle"
                >
                  Problems
                </Button>

                <Button
                  mode={activeBottomPanel === 'git' ? 'contained' : 'text'}
                  onPress={() => setActiveBottomPanel('git')}
                  compact
                  icon="source-branch"
                >
                  Git
                </Button>

                <View style={styles.panelTabSpacer} />

                <IconButton
                  icon="close"
                  size={20}
                  onPress={() => setIsBottomPanelVisible(false)}
                />
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
          <Button
            mode="contained"
            onPress={() => setIsBottomPanelVisible(true)}
            compact
          >
            Show Panel
          </Button>
        )}
        <Button
          mode="text"
          onPress={() => setShowFindReplace(true)}
          compact
          icon="magnify"
        >
          Find
        </Button>
        <Button
          mode="text"
          onPress={() => setShowSettings(true)}
          compact
          icon="cog"
        >
          Settings
        </Button>
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
    height: 48,
    borderTopWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
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
    paddingVertical: 4,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
});
