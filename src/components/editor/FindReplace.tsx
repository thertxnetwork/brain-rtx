import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';

interface FindReplaceProps {
  visible: boolean;
  onClose: () => void;
  onFind: (text: string, options: FindOptions) => void;
  onReplace: (findText: string, replaceText: string, replaceAll: boolean) => void;
}

export interface FindOptions {
  caseSensitive: boolean;
  wholeWord: boolean;
  regex: boolean;
}

export const FindReplace: React.FC<FindReplaceProps> = ({ visible, onClose, onFind, onReplace }) => {
  const { currentTheme } = useThemeStore();
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [regex, setRegex] = useState(false);
  const [showReplace, setShowReplace] = useState(false);

  const handleFind = () => {
    if (findText) {
      onFind(findText, { caseSensitive, wholeWord, regex });
    }
  };

  const handleReplace = (replaceAll: boolean) => {
    if (findText && replaceText) {
      onReplace(findText, replaceText, replaceAll);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[styles.container, { backgroundColor: currentTheme.ui.background, borderColor: currentTheme.ui.border }]}
          onStartShouldSetResponder={() => true}
        >
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: currentTheme.ui.border }]}>
            <View style={styles.headerLeft}>
              <MaterialCommunityIcons name="magnify" size={20} color={currentTheme.ui.foreground} />
              <Text style={[styles.title, { color: currentTheme.ui.foreground }]}>
                Find {showReplace ? '& Replace' : ''}
              </Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setShowReplace(!showReplace)}
              >
                <MaterialCommunityIcons 
                  name={showReplace ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={currentTheme.ui.foreground} 
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton} onPress={onClose}>
                <MaterialCommunityIcons name="close" size={20} color={currentTheme.ui.foreground} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Find Input */}
          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: currentTheme.editor.background,
                  color: currentTheme.editor.foreground,
                  borderColor: currentTheme.ui.border,
                },
              ]}
              placeholder="Find"
              placeholderTextColor={currentTheme.ui.foreground + '80'}
              value={findText}
              onChangeText={setFindText}
              onSubmitEditing={handleFind}
            />
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: currentTheme.ui.buttonBackground }]}
              onPress={handleFind}
            >
              <MaterialCommunityIcons name="magnify" size={18} color={currentTheme.ui.buttonForeground} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: currentTheme.ui.buttonBackground }]}
              onPress={handleFind}
            >
              <MaterialCommunityIcons name="arrow-down" size={18} color={currentTheme.ui.buttonForeground} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: currentTheme.ui.buttonBackground }]}
              onPress={handleFind}
            >
              <MaterialCommunityIcons name="arrow-up" size={18} color={currentTheme.ui.buttonForeground} />
            </TouchableOpacity>
          </View>

          {/* Replace Input */}
          {showReplace && (
            <View style={styles.inputRow}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: currentTheme.editor.background,
                    color: currentTheme.editor.foreground,
                    borderColor: currentTheme.ui.border,
                  },
                ]}
                placeholder="Replace"
                placeholderTextColor={currentTheme.ui.foreground + '80'}
                value={replaceText}
                onChangeText={setReplaceText}
              />
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: currentTheme.ui.buttonBackground }]}
                onPress={() => handleReplace(false)}
              >
                <MaterialCommunityIcons name="swap-horizontal" size={18} color={currentTheme.ui.buttonForeground} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: currentTheme.ui.buttonBackground }]}
                onPress={() => handleReplace(true)}
              >
                <MaterialCommunityIcons name="swap-horizontal-bold" size={18} color={currentTheme.ui.buttonForeground} />
              </TouchableOpacity>
            </View>
          )}

          {/* Options */}
          <View style={[styles.optionsRow, { borderTopColor: currentTheme.ui.border }]}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                caseSensitive && { backgroundColor: currentTheme.ui.selectionBackground },
              ]}
              onPress={() => setCaseSensitive(!caseSensitive)}
            >
              <MaterialCommunityIcons 
                name="format-letter-case" 
                size={16} 
                color={caseSensitive ? currentTheme.editor.keyword : currentTheme.ui.foreground} 
              />
              <Text style={[
                styles.optionText,
                { color: caseSensitive ? currentTheme.editor.keyword : currentTheme.ui.foreground },
              ]}>
                Aa
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                wholeWord && { backgroundColor: currentTheme.ui.selectionBackground },
              ]}
              onPress={() => setWholeWord(!wholeWord)}
            >
              <MaterialCommunityIcons 
                name="format-quote-close" 
                size={16} 
                color={wholeWord ? currentTheme.editor.keyword : currentTheme.ui.foreground} 
              />
              <Text style={[
                styles.optionText,
                { color: wholeWord ? currentTheme.editor.keyword : currentTheme.ui.foreground },
              ]}>
                Word
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                regex && { backgroundColor: currentTheme.ui.selectionBackground },
              ]}
              onPress={() => setRegex(!regex)}
            >
              <MaterialCommunityIcons 
                name="regex" 
                size={16} 
                color={regex ? currentTheme.editor.keyword : currentTheme.ui.foreground} 
              />
              <Text style={[
                styles.optionText,
                { color: regex ? currentTheme.editor.keyword : currentTheme.ui.foreground },
              ]}>
                Regex
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  container: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 4,
  },
  headerButton: {
    padding: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    gap: 4,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
