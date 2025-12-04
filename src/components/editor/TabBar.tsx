import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import { useProjectStore } from '../../store/projectStore';

export const TabBar: React.FC = () => {
  const { currentTheme } = useThemeStore();
  const { openFiles, activeFileId, setActiveFile, closeFile } = useProjectStore();
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.background }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {openFiles.map((file) => (
          <Tab
            key={file.id}
            file={file}
            isActive={file.id === activeFileId}
            theme={currentTheme}
            onSelect={() => setActiveFile(file.id)}
            onClose={() => closeFile(file.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

interface TabProps {
  file: any;
  isActive: boolean;
  theme: any;
  onSelect: () => void;
  onClose: () => void;
}

const Tab: React.FC<TabProps> = ({ file, isActive, theme, onSelect, onClose }) => (
  <TouchableOpacity
    style={[
      styles.tab,
      {
        backgroundColor: isActive ? theme.ui.activeTab : theme.ui.inactiveTab,
        borderRightColor: theme.ui.border,
      },
    ]}
    onPress={onSelect}
  >
    <Text style={[styles.tabText, { color: theme.ui.foreground }]}>
      {file.isDirty ? '● ' : ''}{file.name}
    </Text>
    <TouchableOpacity
      style={styles.closeButton}
      onPress={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <Text style={[styles.closeIcon, { color: theme.ui.foreground }]}>✕</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    height: 36,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRightWidth: 1,
    minWidth: 120,
  },
  tabText: {
    fontSize: 13,
    marginRight: 8,
  },
  closeButton: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 12,
    opacity: 0.6,
  },
});
