import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../../store/themeStore';

interface Problem {
  id: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  file: string;
  line: number;
  column: number;
}

export const Problems: React.FC = () => {
  const { currentTheme } = useThemeStore();

  // Example problems
  const problems: Problem[] = [
    {
      id: '1',
      severity: 'error',
      message: "Cannot find name 'undefinedVariable'",
      file: 'src/index.ts',
      line: 42,
      column: 10,
    },
    {
      id: '2',
      severity: 'warning',
      message: "Variable 'unusedVar' is declared but never used",
      file: 'src/components/Button.tsx',
      line: 15,
      column: 7,
    },
    {
      id: '3',
      severity: 'info',
      message: 'File uses deprecated API',
      file: 'src/utils/helper.ts',
      line: 8,
      column: 1,
    },
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return '🔴';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '•';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return currentTheme.editor.error;
      case 'warning':
        return currentTheme.editor.warning;
      case 'info':
        return currentTheme.editor.info;
      default:
        return currentTheme.editor.foreground;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.toolWindowBackground }]}>
      <View style={[styles.header, { borderBottomColor: currentTheme.ui.toolWindowBorder }]}>
        <Text style={[styles.headerText, { color: currentTheme.ui.foreground }]}>
          ⚠️ Problems ({problems.length})
        </Text>
        <View style={styles.stats}>
          <Text style={[styles.statText, { color: currentTheme.editor.error }]}>
            🔴 {problems.filter(p => p.severity === 'error').length}
          </Text>
          <Text style={[styles.statText, { color: currentTheme.editor.warning }]}>
            ⚠️ {problems.filter(p => p.severity === 'warning').length}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.problemsList}>
        {problems.map((problem) => (
          <TouchableOpacity
            key={problem.id}
            style={[styles.problemItem, { borderLeftColor: getSeverityColor(problem.severity) }]}
          >
            <Text style={styles.severityIcon}>{getSeverityIcon(problem.severity)}</Text>
            <View style={styles.problemContent}>
              <Text style={[styles.problemMessage, { color: currentTheme.ui.foreground }]}>
                {problem.message}
              </Text>
              <Text style={[styles.problemLocation, { color: currentTheme.ui.foreground }]}>
                {problem.file}:{problem.line}:{problem.column}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {problems.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: currentTheme.ui.foreground }]}>
              ✅ No problems found
            </Text>
          </View>
        )}
      </ScrollView>
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
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  statText: {
    fontSize: 12,
    fontWeight: '500',
  },
  problemsList: {
    flex: 1,
  },
  problemItem: {
    flexDirection: 'row',
    padding: 12,
    borderLeftWidth: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  severityIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  problemContent: {
    flex: 1,
  },
  problemMessage: {
    fontSize: 13,
    marginBottom: 4,
  },
  problemLocation: {
    fontSize: 11,
    opacity: 0.7,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
