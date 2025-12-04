import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { useThemeStore } from '../../store/themeStore';
import { useProjectStore } from '../../store/projectStore';

interface NavigationBarProps {
  onOpenSettings?: () => void;
  onToggleSidebar?: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ onOpenSettings, onToggleSidebar }) => {
  const { currentTheme } = useThemeStore();
  const { projectName } = useProjectStore();
  const paperTheme = useTheme();
  
  return (
    <Appbar.Header style={[styles.container, { backgroundColor: currentTheme.ui.background }]}>
      <Appbar.Action icon="menu" onPress={onToggleSidebar} />
      <Appbar.Content title={projectName || 'Brain RTX'} />
      <Appbar.Action icon="play" onPress={() => {}} />
      <Appbar.Action icon="bug" onPress={() => {}} />
      <Appbar.Action icon="source-branch" onPress={() => {}} />
      <Appbar.Action icon="cog" onPress={onOpenSettings} />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 0,
  },
});
