import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import { useProjectStore } from '../../store/projectStore';

export const NavigationBar: React.FC = () => {
  const { currentTheme } = useThemeStore();
  const { projectName } = useProjectStore();
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.background }]}>
      <View style={styles.leftSection}>
        <Text style={[styles.projectName, { color: currentTheme.ui.foreground }]}>
          {projectName || 'Brain RTX'}
        </Text>
      </View>
      
      <View style={styles.centerSection}>
        <TouchableOpacity style={[styles.button, { backgroundColor: currentTheme.ui.buttonBackground }]}>
          <Text style={[styles.buttonText, { color: currentTheme.ui.buttonForeground }]}>▶️ Run</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: currentTheme.ui.buttonBackground }]}>
          <Text style={[styles.buttonText, { color: currentTheme.ui.buttonForeground }]}>🐛 Debug</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={[styles.icon, { color: currentTheme.ui.foreground }]}>🌿</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={[styles.icon, { color: currentTheme.ui.foreground }]}>⚙️</Text>
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
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  leftSection: {
    flex: 1,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
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
  icon: {
    fontSize: 18,
  },
});
