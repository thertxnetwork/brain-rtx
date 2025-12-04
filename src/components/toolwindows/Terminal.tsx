import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../../store/themeStore';

export interface TerminalProps {
  cwd?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ cwd = '~' }) => {
  const { currentTheme } = useThemeStore();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: 'Brain RTX Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands' },
  ]);

  const handleCommand = () => {
    if (!input.trim()) return;

    const newHistory = [...history, { type: 'input' as const, text: `$ ${input}` }];

    // Simulate command execution
    const output = executeCommand(input.trim());
    newHistory.push({ type: 'output' as const, text: output });

    setHistory(newHistory);
    setInput('');
  };

  const executeCommand = (cmd: string): string => {
    const parts = cmd.split(' ');
    const command = parts[0];

    switch (command) {
      case 'help':
        return 'Available commands:\n  help - Show this help\n  clear - Clear terminal\n  ls - List files\n  pwd - Print working directory\n  echo - Print text';
      case 'clear':
        setHistory([]);
        return '';
      case 'ls':
        return 'src\npackage.json\nREADME.md\nnode_modules';
      case 'pwd':
        return cwd;
      case 'echo':
        return parts.slice(1).join(' ');
      default:
        return `Command not found: ${command}`;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.editor.background }]}>
      <View style={[styles.header, { 
        backgroundColor: currentTheme.ui.toolWindowBackground,
        borderBottomColor: currentTheme.ui.toolWindowBorder,
      }]}>
        <Text style={[styles.headerText, { color: currentTheme.ui.foreground }]}>
          💻 Terminal
        </Text>
        <TouchableOpacity onPress={() => setHistory([])}>
          <Text style={[styles.clearButton, { color: currentTheme.ui.foreground }]}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.output}>
        {history.map((item, index) => (
          <Text
            key={index}
            style={[
              styles.line,
              {
                color: item.type === 'input' 
                  ? currentTheme.editor.keyword 
                  : currentTheme.editor.foreground,
                fontFamily: currentTheme.fontFamily,
              },
            ]}
          >
            {item.text}
          </Text>
        ))}
      </ScrollView>

      <View style={[styles.inputContainer, { borderTopColor: currentTheme.ui.border }]}>
        <Text style={[styles.prompt, { color: currentTheme.editor.keyword }]}>$ </Text>
        <TextInput
          style={[
            styles.input,
            {
              color: currentTheme.editor.foreground,
              fontFamily: currentTheme.fontFamily,
            },
          ]}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleCommand}
          placeholder="Enter command..."
          placeholderTextColor={currentTheme.editor.comment}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  clearButton: {
    fontSize: 12,
    opacity: 0.7,
  },
  output: {
    flex: 1,
    padding: 12,
  },
  line: {
    fontSize: 13,
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
  },
  prompt: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 13,
    padding: 0,
  },
});
