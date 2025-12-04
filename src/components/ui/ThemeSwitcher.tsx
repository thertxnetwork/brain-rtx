import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { useThemeStore, BUILT_IN_THEMES } from '../../store/themeStore';
import { Theme } from '../../types/theme';

export const ThemeSwitcher: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { currentTheme, setTheme, getAllThemes } = useThemeStore();
  
  const handleThemeSelect = (theme: Theme) => {
    setTheme(theme);
    setIsVisible(false);
  };
  
  return (
    <>
      <TouchableOpacity 
        style={[styles.trigger, { backgroundColor: currentTheme.ui.buttonBackground }]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={[styles.triggerText, { color: currentTheme.ui.buttonForeground }]}>
          🎨 {currentTheme.name}
        </Text>
      </TouchableOpacity>
      
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity 
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View 
            style={[styles.modal, { backgroundColor: currentTheme.ui.background }]}
            onStartShouldSetResponder={() => true}
          >
            <View style={[styles.header, { borderBottomColor: currentTheme.ui.border }]}>
              <Text style={[styles.title, { color: currentTheme.ui.foreground }]}>
                Select Theme
              </Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text style={[styles.closeButton, { color: currentTheme.ui.foreground }]}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.themeList}>
              <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
                Dark Themes
              </Text>
              {BUILT_IN_THEMES.filter(t => t.type === 'dark').map((theme) => (
                <ThemeItem
                  key={theme.id}
                  theme={theme}
                  isSelected={theme.id === currentTheme.id}
                  currentTheme={currentTheme}
                  onSelect={handleThemeSelect}
                />
              ))}
              
              <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
                Light Themes
              </Text>
              {BUILT_IN_THEMES.filter(t => t.type === 'light').map((theme) => (
                <ThemeItem
                  key={theme.id}
                  theme={theme}
                  isSelected={theme.id === currentTheme.id}
                  currentTheme={currentTheme}
                  onSelect={handleThemeSelect}
                />
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

interface ThemeItemProps {
  theme: Theme;
  isSelected: boolean;
  currentTheme: Theme;
  onSelect: (theme: Theme) => void;
}

const ThemeItem: React.FC<ThemeItemProps> = ({ theme, isSelected, currentTheme, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.themeItem,
      { 
        backgroundColor: isSelected ? currentTheme.ui.selectionBackground : 'transparent',
        borderColor: currentTheme.ui.border,
      }
    ]}
    onPress={() => onSelect(theme)}
  >
    <View style={styles.themeInfo}>
      <Text style={[styles.themeName, { color: currentTheme.ui.foreground }]}>
        {theme.name}
      </Text>
      {theme.description && (
        <Text style={[styles.themeDescription, { color: currentTheme.ui.foreground, opacity: 0.7 }]}>
          {theme.description}
        </Text>
      )}
    </View>
    <View style={styles.colorPreview}>
      <View style={[styles.colorBlock, { backgroundColor: theme.editor.background }]} />
      <View style={[styles.colorBlock, { backgroundColor: theme.editor.keyword }]} />
      <View style={[styles.colorBlock, { backgroundColor: theme.editor.string }]} />
      <View style={[styles.colorBlock, { backgroundColor: theme.editor.function }]} />
    </View>
  </TouchableOpacity>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  trigger: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    margin: 8,
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: Math.min(width - 40, 600),
    maxHeight: '80%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: '300',
  },
  themeList: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    opacity: 0.8,
  },
  themeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
    marginBottom: 4,
    borderWidth: 1,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    fontSize: 15,
    fontWeight: '500',
  },
  themeDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  colorPreview: {
    flexDirection: 'row',
    gap: 4,
  },
  colorBlock: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
});
