import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore, BUILT_IN_THEMES } from '../store/themeStore';
import { EDITOR_FONTS, FONT_SIZES, LINE_HEIGHTS } from '../utils/fonts';
import { Theme } from '../types/theme';

interface SettingsScreenProps {
  onClose: () => void;
}

type SettingsTab = 'appearance' | 'editor' | 'keymap' | 'git';

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onClose }) => {
  const { currentTheme, editorFont, fontSize, lineHeight, setTheme, setEditorFont, setFontSize, setLineHeight } = useThemeStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');
  const [enableLineNumbers, setEnableLineNumbers] = useState(true);
  const [enableMinimap, setEnableMinimap] = useState(false);
  const [enableAutosave, setEnableAutosave] = useState(true);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return <AppearanceSettings />;
      case 'editor':
        return <EditorSettings />;
      case 'keymap':
        return <KeymapSettings />;
      case 'git':
        return <GitSettings />;
      default:
        return null;
    }
  };

  const AppearanceSettings = () => (
    <View style={styles.settingsContent}>
      <View style={styles.settingSection}>
        <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
          Theme
        </Text>
        
        <View style={styles.subsection}>
          <Text style={[styles.subsectionTitle, { color: currentTheme.ui.foreground }]}>
            Dark Themes
          </Text>
          <View style={styles.themeGrid}>
            {BUILT_IN_THEMES.filter(t => t.type === 'dark').map((theme) => (
              <TouchableOpacity
                key={theme.id}
                style={[
                  styles.themeCard,
                  {
                    backgroundColor: theme.editor.background,
                    borderColor: theme.id === currentTheme.id ? currentTheme.editor.keyword : currentTheme.ui.border,
                    borderWidth: theme.id === currentTheme.id ? 3 : 1,
                  },
                ]}
                onPress={() => setTheme(theme)}
              >
                <View style={styles.themePreview}>
                  <View style={[styles.themeColorBar, { backgroundColor: theme.editor.keyword }]} />
                  <View style={[styles.themeColorBar, { backgroundColor: theme.editor.string }]} />
                  <View style={[styles.themeColorBar, { backgroundColor: theme.editor.function }]} />
                </View>
                <Text style={[styles.themeName, { color: theme.editor.foreground }]}>
                  {theme.name}
                </Text>
                {theme.id === currentTheme.id && (
                  <View style={[styles.selectedBadge, { backgroundColor: currentTheme.editor.keyword }]}>
                    <MaterialCommunityIcons name="check" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.subsection}>
          <Text style={[styles.subsectionTitle, { color: currentTheme.ui.foreground }]}>
            Light Themes
          </Text>
          <View style={styles.themeGrid}>
            {BUILT_IN_THEMES.filter(t => t.type === 'light').map((theme) => (
              <TouchableOpacity
                key={theme.id}
                style={[
                  styles.themeCard,
                  {
                    backgroundColor: theme.editor.background,
                    borderColor: theme.id === currentTheme.id ? currentTheme.editor.keyword : currentTheme.ui.border,
                    borderWidth: theme.id === currentTheme.id ? 3 : 1,
                  },
                ]}
                onPress={() => setTheme(theme)}
              >
                <View style={styles.themePreview}>
                  <View style={[styles.themeColorBar, { backgroundColor: theme.editor.keyword }]} />
                  <View style={[styles.themeColorBar, { backgroundColor: theme.editor.string }]} />
                  <View style={[styles.themeColorBar, { backgroundColor: theme.editor.function }]} />
                </View>
                <Text style={[styles.themeName, { color: theme.editor.foreground }]}>
                  {theme.name}
                </Text>
                {theme.id === currentTheme.id && (
                  <View style={[styles.selectedBadge, { backgroundColor: currentTheme.editor.keyword }]}>
                    <MaterialCommunityIcons name="check" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const EditorSettings = () => (
    <View style={styles.settingsContent}>
      <View style={styles.settingSection}>
        <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
          Font Settings
        </Text>
        
        <View style={styles.subsection}>
          <Text style={[styles.subsectionTitle, { color: currentTheme.ui.foreground }]}>
            Font Family
          </Text>
          {EDITOR_FONTS.map((font) => (
            <TouchableOpacity
              key={font.id}
              style={[
                styles.optionItem,
                {
                  backgroundColor: font.id === editorFont.id ? currentTheme.ui.selectionBackground : 'transparent',
                  borderColor: currentTheme.ui.border,
                },
              ]}
              onPress={() => setEditorFont(font)}
            >
              <View style={styles.optionInfo}>
                <Text style={[styles.optionName, { color: currentTheme.ui.foreground, fontFamily: font.family }]}>
                  {font.name}
                </Text>
                <Text style={[styles.optionDescription, { color: currentTheme.ui.foreground, opacity: 0.7 }]}>
                  {font.description}
                </Text>
              </View>
              {font.id === editorFont.id && (
                <MaterialCommunityIcons name="check-circle" size={20} color={currentTheme.editor.keyword} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.subsection}>
          <Text style={[styles.subsectionTitle, { color: currentTheme.ui.foreground }]}>
            Font Size: {fontSize}px
          </Text>
          <View style={styles.sizeGrid}>
            {FONT_SIZES.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  {
                    backgroundColor: size === fontSize ? currentTheme.editor.keyword : currentTheme.ui.buttonBackground,
                    borderColor: currentTheme.ui.border,
                  },
                ]}
                onPress={() => setFontSize(size)}
              >
                <Text style={[styles.sizeText, { color: size === fontSize ? '#fff' : currentTheme.ui.foreground }]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.subsection}>
          <Text style={[styles.subsectionTitle, { color: currentTheme.ui.foreground }]}>
            Line Height: {lineHeight}
          </Text>
          <View style={styles.sizeGrid}>
            {LINE_HEIGHTS.map((height) => (
              <TouchableOpacity
                key={height}
                style={[
                  styles.sizeOption,
                  {
                    backgroundColor: height === lineHeight ? currentTheme.editor.keyword : currentTheme.ui.buttonBackground,
                    borderColor: currentTheme.ui.border,
                  },
                ]}
                onPress={() => setLineHeight(height)}
              >
                <Text style={[styles.sizeText, { color: height === lineHeight ? '#fff' : currentTheme.ui.foreground }]}>
                  {height}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.settingSection}>
        <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
          Editor Behavior
        </Text>
        
        <View style={[styles.settingRow, { borderBottomColor: currentTheme.ui.border }]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: currentTheme.ui.foreground }]}>
              Line Numbers
            </Text>
            <Text style={[styles.settingDescription, { color: currentTheme.ui.foreground, opacity: 0.7 }]}>
              Show line numbers in the gutter
            </Text>
          </View>
          <Switch
            value={enableLineNumbers}
            onValueChange={setEnableLineNumbers}
            trackColor={{ false: currentTheme.ui.border, true: currentTheme.editor.keyword }}
          />
        </View>

        <View style={[styles.settingRow, { borderBottomColor: currentTheme.ui.border }]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: currentTheme.ui.foreground }]}>
              Minimap
            </Text>
            <Text style={[styles.settingDescription, { color: currentTheme.ui.foreground, opacity: 0.7 }]}>
              Show code minimap for quick navigation
            </Text>
          </View>
          <Switch
            value={enableMinimap}
            onValueChange={setEnableMinimap}
            trackColor={{ false: currentTheme.ui.border, true: currentTheme.editor.keyword }}
          />
        </View>

        <View style={[styles.settingRow, { borderBottomColor: currentTheme.ui.border }]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: currentTheme.ui.foreground }]}>
              Auto Save
            </Text>
            <Text style={[styles.settingDescription, { color: currentTheme.ui.foreground, opacity: 0.7 }]}>
              Automatically save changes
            </Text>
          </View>
          <Switch
            value={enableAutosave}
            onValueChange={setEnableAutosave}
            trackColor={{ false: currentTheme.ui.border, true: currentTheme.editor.keyword }}
          />
        </View>
      </View>
    </View>
  );

  const KeymapSettings = () => (
    <View style={styles.settingsContent}>
      <View style={styles.settingSection}>
        <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
          Keyboard Shortcuts
        </Text>
        
        <View style={styles.keymapList}>
          {[
            { action: 'Save File', shortcut: 'Ctrl+S' },
            { action: 'Find', shortcut: 'Ctrl+F' },
            { action: 'Replace', shortcut: 'Ctrl+H' },
            { action: 'Go to Line', shortcut: 'Ctrl+G' },
            { action: 'Comment Line', shortcut: 'Ctrl+/' },
            { action: 'Duplicate Line', shortcut: 'Ctrl+D' },
            { action: 'Delete Line', shortcut: 'Ctrl+Y' },
            { action: 'Toggle Sidebar', shortcut: 'Ctrl+B' },
          ].map((item, index) => (
            <View
              key={index}
              style={[styles.keymapItem, { borderBottomColor: currentTheme.ui.border }]}
            >
              <Text style={[styles.keymapAction, { color: currentTheme.ui.foreground }]}>
                {item.action}
              </Text>
              <View style={[styles.keymapShortcut, { backgroundColor: currentTheme.ui.buttonBackground }]}>
                <Text style={[styles.keymapShortcutText, { color: currentTheme.ui.buttonForeground }]}>
                  {item.shortcut}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const GitSettings = () => (
    <View style={styles.settingsContent}>
      <View style={styles.settingSection}>
        <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
          Git Configuration
        </Text>
        
        <View style={[styles.settingRow, { borderBottomColor: currentTheme.ui.border }]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: currentTheme.ui.foreground }]}>
              Auto Fetch
            </Text>
            <Text style={[styles.settingDescription, { color: currentTheme.ui.foreground, opacity: 0.7 }]}>
              Automatically fetch from remote
            </Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: currentTheme.ui.border, true: currentTheme.editor.keyword }}
          />
        </View>

        <View style={[styles.settingRow, { borderBottomColor: currentTheme.ui.border }]}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: currentTheme.ui.foreground }]}>
              Show Gutter Indicators
            </Text>
            <Text style={[styles.settingDescription, { color: currentTheme.ui.foreground, opacity: 0.7 }]}>
              Show Git changes in editor gutter
            </Text>
          </View>
          <Switch
            value={true}
            onValueChange={() => {}}
            trackColor={{ false: currentTheme.ui.border, true: currentTheme.editor.keyword }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: currentTheme.ui.border }]}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="cog" size={24} color={currentTheme.ui.foreground} />
          <Text style={[styles.headerTitle, { color: currentTheme.ui.foreground }]}>
            Settings
          </Text>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color={currentTheme.ui.foreground} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Sidebar */}
        <View style={[styles.sidebar, { backgroundColor: currentTheme.ui.toolWindowBackground, borderRightColor: currentTheme.ui.border }]}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'appearance' && { backgroundColor: currentTheme.ui.selectionBackground },
            ]}
            onPress={() => setActiveTab('appearance')}
          >
            <MaterialCommunityIcons 
              name="palette" 
              size={20} 
              color={activeTab === 'appearance' ? currentTheme.editor.keyword : currentTheme.ui.foreground} 
            />
            <Text style={[
              styles.tabText,
              { color: activeTab === 'appearance' ? currentTheme.editor.keyword : currentTheme.ui.foreground },
            ]}>
              Appearance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'editor' && { backgroundColor: currentTheme.ui.selectionBackground },
            ]}
            onPress={() => setActiveTab('editor')}
          >
            <MaterialCommunityIcons 
              name="file-document-edit" 
              size={20} 
              color={activeTab === 'editor' ? currentTheme.editor.keyword : currentTheme.ui.foreground} 
            />
            <Text style={[
              styles.tabText,
              { color: activeTab === 'editor' ? currentTheme.editor.keyword : currentTheme.ui.foreground },
            ]}>
              Editor
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'keymap' && { backgroundColor: currentTheme.ui.selectionBackground },
            ]}
            onPress={() => setActiveTab('keymap')}
          >
            <MaterialCommunityIcons 
              name="keyboard" 
              size={20} 
              color={activeTab === 'keymap' ? currentTheme.editor.keyword : currentTheme.ui.foreground} 
            />
            <Text style={[
              styles.tabText,
              { color: activeTab === 'keymap' ? currentTheme.editor.keyword : currentTheme.ui.foreground },
            ]}>
              Keymap
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'git' && { backgroundColor: currentTheme.ui.selectionBackground },
            ]}
            onPress={() => setActiveTab('git')}
          >
            <MaterialCommunityIcons 
              name="git" 
              size={20} 
              color={activeTab === 'git' ? currentTheme.editor.keyword : currentTheme.ui.foreground} 
            />
            <Text style={[
              styles.tabText,
              { color: activeTab === 'git' ? currentTheme.editor.keyword : currentTheme.ui.foreground },
            ]}>
              Git
            </Text>
          </TouchableOpacity>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.mainContent}>
          {renderTabContent()}
        </ScrollView>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    borderRightWidth: 1,
    paddingVertical: 8,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
  },
  settingsContent: {
    padding: 20,
  },
  settingSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  subsection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    opacity: 0.8,
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  themeCard: {
    width: 140,
    height: 100,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'space-between',
    position: 'relative',
  },
  themePreview: {
    flexDirection: 'row',
    gap: 4,
  },
  themeColorBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  themeName: {
    fontSize: 12,
    fontWeight: '500',
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderWidth: 1,
  },
  optionInfo: {
    flex: 1,
  },
  optionName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    minWidth: 60,
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
  },
  keymapList: {
    marginTop: 8,
  },
  keymapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  keymapAction: {
    fontSize: 14,
    fontWeight: '500',
  },
  keymapShortcut: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  keymapShortcutText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
