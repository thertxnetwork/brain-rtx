import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';
import { EDITOR_FONTS, FONT_SIZES, LINE_HEIGHTS, EditorFont } from '../../utils/fonts';

export const FontSelector: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { currentTheme, editorFont, fontSize, lineHeight, setEditorFont, setFontSize, setLineHeight } = useThemeStore();
  
  return (
    <>
      <TouchableOpacity 
        style={[styles.trigger, { backgroundColor: currentTheme.ui.buttonBackground }]}
        onPress={() => setIsVisible(true)}
      >
        <MaterialCommunityIcons name="format-font" size={16} color={currentTheme.ui.buttonForeground} />
        <Text style={[styles.triggerText, { color: currentTheme.ui.buttonForeground }]}>
          {editorFont.name} • {fontSize}px
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
                Editor Font Settings
              </Text>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Text style={[styles.closeButton, { color: currentTheme.ui.foreground }]}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.content}>
              {/* Font Family Section */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
                  Font Family
                </Text>
                <View style={styles.fontList}>
                  {EDITOR_FONTS.map((font) => (
                    <FontItem
                      key={font.id}
                      font={font}
                      isSelected={font.id === editorFont.id}
                      currentTheme={currentTheme}
                      onSelect={() => setEditorFont(font)}
                    />
                  ))}
                </View>
              </View>

              {/* Font Size Section */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
                  Font Size: {fontSize}px
                </Text>
                <View style={styles.sizeList}>
                  {FONT_SIZES.map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.sizeItem,
                        {
                          backgroundColor: size === fontSize 
                            ? currentTheme.ui.selectionBackground 
                            : currentTheme.ui.buttonBackground,
                          borderColor: currentTheme.ui.border,
                        },
                      ]}
                      onPress={() => setFontSize(size)}
                    >
                      <Text style={[styles.sizeText, { color: currentTheme.ui.foreground }]}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Line Height Section */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
                  Line Height: {lineHeight}
                </Text>
                <View style={styles.sizeList}>
                  {LINE_HEIGHTS.map((height) => (
                    <TouchableOpacity
                      key={height}
                      style={[
                        styles.sizeItem,
                        {
                          backgroundColor: height === lineHeight 
                            ? currentTheme.ui.selectionBackground 
                            : currentTheme.ui.buttonBackground,
                          borderColor: currentTheme.ui.border,
                        },
                      ]}
                      onPress={() => setLineHeight(height)}
                    >
                      <Text style={[styles.sizeText, { color: currentTheme.ui.foreground }]}>
                        {height}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Preview Section */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
                  Preview
                </Text>
                <View style={[
                  styles.preview,
                  { 
                    backgroundColor: currentTheme.editor.background,
                    borderColor: currentTheme.ui.border,
                  }
                ]}>
                  <Text style={[
                    styles.previewText,
                    {
                      color: currentTheme.editor.foreground,
                      fontFamily: editorFont.family,
                      fontSize: fontSize,
                      lineHeight: fontSize * lineHeight,
                    },
                  ]}>
                    {`// ${editorFont.name} - ${fontSize}px - ${lineHeight}\n${editorFont.previewText}\nfunction example() {\n  return "Hello, World!";\n}\n\nconst result = example();`}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

interface FontItemProps {
  font: EditorFont;
  isSelected: boolean;
  currentTheme: any;
  onSelect: () => void;
}

const FontItem: React.FC<FontItemProps> = ({ font, isSelected, currentTheme, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.fontItem,
      {
        backgroundColor: isSelected ? currentTheme.ui.selectionBackground : 'transparent',
        borderColor: currentTheme.ui.border,
      },
    ]}
    onPress={onSelect}
  >
    <View style={styles.fontInfo}>
      <Text style={[styles.fontName, { color: currentTheme.ui.foreground, fontFamily: font.family }]}>
        {font.name}
      </Text>
      <Text style={[styles.fontDescription, { color: currentTheme.ui.foreground, opacity: 0.7 }]}>
        {font.description}
      </Text>
      <Text style={[styles.fontPreview, { color: currentTheme.ui.foreground, opacity: 0.6, fontFamily: font.family }]}>
        {font.previewText}
      </Text>
    </View>
    {isSelected && (
      <MaterialCommunityIcons name="check" size={20} color={currentTheme.editor.keyword} />
    )}
  </TouchableOpacity>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    margin: 8,
    gap: 6,
  },
  triggerText: {
    fontSize: 12,
    fontWeight: '500',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: Math.min(width - 40, 700),
    maxHeight: '90%',
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
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  fontList: {
    gap: 8,
  },
  fontItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
  },
  fontInfo: {
    flex: 1,
  },
  fontName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  fontDescription: {
    fontSize: 12,
    marginBottom: 4,
  },
  fontPreview: {
    fontSize: 11,
  },
  sizeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    minWidth: 60,
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 13,
    fontWeight: '500',
  },
  preview: {
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
  },
  previewText: {
    fontSize: 13,
  },
});
