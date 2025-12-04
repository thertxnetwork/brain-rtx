import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';

export interface TerminalProps {
  cwd?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ cwd = '~' }) => {
  const { currentTheme } = useThemeStore();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'error'; text: string }>>([
    { type: 'output', text: 'Brain RTX Terminal v1.0' },
    { type: 'output', text: 'Type "help" for available commands' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleCommand = () => {
    if (!input.trim()) return;

    const newHistory = [...history, { type: 'input' as const, text: `$ ${input}` }];
    
    // Add to command history
    setCommandHistory([...commandHistory, input]);
    setHistoryIndex(-1);

    // Simulate command execution
    const result = executeCommand(input.trim());
    if (result.output) {
      newHistory.push({ type: result.error ? 'error' : 'output', text: result.output });
    }

    setHistory(newHistory);
    setInput('');
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const executeCommand = (cmd: string): { output: string; error: boolean } => {
    const parts = cmd.split(' ');
    const command = parts[0];

    switch (command) {
      case 'help':
        return {
          output: 'Available commands:\n  help - Show this help\n  clear - Clear terminal\n  ls - List files\n  pwd - Print working directory\n  echo - Print text\n  date - Show current date\n  whoami - Show current user\n  cat - Display file contents\n  mkdir - Create directory\n  rm - Remove file',
          error: false,
        };
      case 'clear':
        setHistory([]);
        return { output: '', error: false };
      case 'ls':
        return { 
          output: 'src/\npackage.json\nREADME.md\nnode_modules/\ntsconfig.json',
          error: false,
        };
      case 'pwd':
        return { output: cwd, error: false };
      case 'echo':
        return { output: parts.slice(1).join(' '), error: false };
      case 'date':
        return { output: new Date().toString(), error: false };
      case 'whoami':
        return { output: 'developer', error: false };
      case 'cat':
        if (parts[1]) {
          return { output: `// Contents of ${parts[1]}\n// File preview not implemented yet`, error: false };
        }
        return { output: 'cat: missing file operand', error: true };
      case 'mkdir':
        if (parts[1]) {
          return { output: `Created directory: ${parts[1]}`, error: false };
        }
        return { output: 'mkdir: missing directory name', error: true };
      case 'rm':
        if (parts[1]) {
          return { output: `Removed: ${parts[1]}`, error: false };
        }
        return { output: 'rm: missing file operand', error: true };
      default:
        return { output: `Command not found: ${command}`, error: true };
    }
  };

  const navigateHistory = (direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return;

    let newIndex = historyIndex;
    
    if (direction === 'up') {
      newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
    } else {
      newIndex = historyIndex > -1 ? historyIndex - 1 : -1;
    }

    setHistoryIndex(newIndex);
    setInput(newIndex >= 0 ? commandHistory[commandHistory.length - 1 - newIndex] : '');
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.editor.background }]}>
      <View style={[styles.header, { 
        backgroundColor: currentTheme.ui.toolWindowBackground,
        borderBottomColor: currentTheme.ui.toolWindowBorder,
      }]}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="console" size={18} color={currentTheme.ui.foreground} />
          <Text style={[styles.headerText, { color: currentTheme.ui.foreground }]}>
            Terminal
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigateHistory('up')} style={styles.headerButton}>
            <MaterialCommunityIcons name="chevron-up" size={18} color={currentTheme.ui.foreground} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateHistory('down')} style={styles.headerButton}>
            <MaterialCommunityIcons name="chevron-down" size={18} color={currentTheme.ui.foreground} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setHistory([])} style={styles.headerButton}>
            <MaterialCommunityIcons name="delete-sweep" size={18} color={currentTheme.ui.foreground} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.output}
        contentContainerStyle={styles.outputContent}
      >
        {history.map((item, index) => (
          <Text
            key={index}
            style={[
              styles.line,
              {
                color: item.type === 'input' 
                  ? currentTheme.editor.keyword 
                  : item.type === 'error'
                  ? currentTheme.git.deleted
                  : currentTheme.editor.foreground,
                fontFamily: 'monospace',
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
          ref={inputRef}
          style={[
            styles.input,
            {
              color: currentTheme.editor.foreground,
              fontFamily: 'monospace',
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 4,
  },
  headerButton: {
    padding: 4,
  },
  output: {
    flex: 1,
    padding: 12,
  },
  outputContent: {
    paddingBottom: 12,
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
