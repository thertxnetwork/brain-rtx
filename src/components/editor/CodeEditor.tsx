import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Dimensions } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import { useProjectStore } from '../../store/projectStore';

export const CodeEditor: React.FC = () => {
  const { currentTheme, editorFont, fontSize, lineHeight } = useThemeStore();
  const { getActiveFile, updateFileContent, updateFileDirty } = useProjectStore();
  const activeFile = getActiveFile();
  
  const [code, setCode] = useState(activeFile?.content || '');
  
  const handleCodeChange = (text: string) => {
    setCode(text);
    if (activeFile) {
      updateFileContent(activeFile.id, text);
      updateFileDirty(activeFile.id, text !== activeFile.content);
    }
  };
  
  const lines = code.split('\n');
  const lineHeightValue = fontSize * lineHeight;
  
  return (
    <View style={[styles.container, { backgroundColor: currentTheme.editor.background }]}>
      <View style={styles.editorWrapper}>
        {/* Gutter with line numbers */}
        <View style={[styles.gutter, { backgroundColor: currentTheme.ui.gutterBackground }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {lines.map((_, index) => (
              <Text
                key={index}
                style={[
                  styles.lineNumber,
                  { 
                    color: currentTheme.ui.gutterForeground,
                    height: lineHeightValue,
                    lineHeight: lineHeightValue,
                    fontSize: fontSize - 1,
                  },
                ]}
              >
                {index + 1}
              </Text>
            ))}
          </ScrollView>
        </View>
        
        {/* Code area */}
        <ScrollView style={styles.codeArea} horizontal>
          <TextInput
            style={[
              styles.codeInput,
              {
                color: currentTheme.editor.foreground,
                fontFamily: editorFont.family,
                fontSize: fontSize,
                lineHeight: lineHeightValue,
              },
            ]}
            multiline
            value={code}
            onChangeText={handleCodeChange}
            placeholder={activeFile ? '' : '// Open a file to start coding...'}
            placeholderTextColor={currentTheme.editor.comment}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editorWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  gutter: {
    width: 50,
    paddingRight: 8,
    paddingTop: 8,
  },
  lineNumber: {
    textAlign: 'right',
  },
  codeArea: {
    flex: 1,
  },
  codeInput: {
    flex: 1,
    padding: 8,
    textAlignVertical: 'top',
    minWidth: Dimensions.get('window').width - 50,
  },
});
