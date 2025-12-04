import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';
import { useProjectStore } from '../../store/projectStore';

interface NavigationBarProps {
  onOpenSettings?: () => void;
  onToggleSidebar?: () => void;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ onOpenSettings, onToggleSidebar }) => {
  const { currentTheme } = useThemeStore();
  const { projectName } = useProjectStore();
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.background, borderBottomColor: currentTheme.ui.border }]}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.iconButton} onPress={onToggleSidebar}>
          <MaterialCommunityIcons name="menu" size={22} color={currentTheme.ui.foreground} />
        </TouchableOpacity>
        <Text style={[styles.projectName, { color: currentTheme.ui.foreground }]}>
          {projectName || 'Brain RTX'}
        </Text>
      </View>
      
      <View style={styles.centerSection}>
        <TouchableOpacity style={[styles.button, { backgroundColor: currentTheme.ui.buttonBackground }]}>
          <MaterialCommunityIcons name="play" size={16} color={currentTheme.ui.buttonForeground} />
          <Text style={[styles.buttonText, { color: currentTheme.ui.buttonForeground }]}>Run</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: currentTheme.ui.buttonBackground }]}>
          <MaterialCommunityIcons name="bug" size={16} color={currentTheme.ui.buttonForeground} />
          <Text style={[styles.buttonText, { color: currentTheme.ui.buttonForeground }]}>Debug</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIcons name="source-branch" size={20} color={currentTheme.ui.foreground} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={onOpenSettings}>
          <MaterialCommunityIcons name="cog" size={20} color={currentTheme.ui.foreground} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  centerSection: {
    flexDirection: 'row',
    gap: 8,
  },
  rightSection: {
    flexDirection: 'row',
    gap: 4,
    marginLeft: 16,
  },
  projectName: {
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    gap: 6,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '500',
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
