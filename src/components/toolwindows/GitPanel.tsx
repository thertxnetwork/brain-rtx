import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useThemeStore } from '../../store/themeStore';

interface GitFile {
  path: string;
  status: 'modified' | 'added' | 'deleted' | 'untracked';
  additions: number;
  deletions: number;
}

export const GitPanel: React.FC = () => {
  const { currentTheme } = useThemeStore();

  const [branch, setBranch] = React.useState('main');
  const [changedFiles, setChangedFiles] = React.useState<GitFile[]>([
    { path: 'src/index.ts', status: 'modified', additions: 5, deletions: 2 },
    { path: 'src/components/Button.tsx', status: 'added', additions: 42, deletions: 0 },
    { path: 'src/utils/old.ts', status: 'deleted', additions: 0, deletions: 15 },
    { path: 'test/new-test.ts', status: 'untracked', additions: 0, deletions: 0 },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'modified':
        return 'M';
      case 'added':
        return 'A';
      case 'deleted':
        return 'D';
      case 'untracked':
        return '?';
      default:
        return ' ';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'modified':
        return currentTheme.git.modified;
      case 'added':
        return currentTheme.git.added;
      case 'deleted':
        return currentTheme.git.deleted;
      case 'untracked':
        return currentTheme.git.untracked;
      default:
        return currentTheme.ui.foreground;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.toolWindowBackground }]}>
      <View style={[styles.header, { borderBottomColor: currentTheme.ui.toolWindowBorder }]}>
        <Text style={[styles.headerText, { color: currentTheme.ui.foreground }]}>
          🌿 Git
        </Text>
        <TouchableOpacity style={[styles.branchButton, { backgroundColor: currentTheme.ui.buttonBackground }]}>
          <Text style={[styles.branchText, { color: currentTheme.ui.buttonForeground }]}>
            {branch} ▼
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: currentTheme.ui.buttonBackground }]}>
          <Text style={[styles.actionButtonText, { color: currentTheme.ui.buttonForeground }]}>
            Commit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: currentTheme.ui.buttonBackground }]}>
          <Text style={[styles.actionButtonText, { color: currentTheme.ui.buttonForeground }]}>
            Pull
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: currentTheme.ui.buttonBackground }]}>
          <Text style={[styles.actionButtonText, { color: currentTheme.ui.buttonForeground }]}>
            Push
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { borderTopColor: currentTheme.ui.border }]}>
        <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
          Changed Files ({changedFiles.length})
        </Text>
      </View>

      <ScrollView style={styles.filesList}>
        {changedFiles.map((file, index) => (
          <TouchableOpacity
            key={index}
            style={styles.fileItem}
          >
            <Text
              style={[
                styles.statusBadge,
                {
                  color: getStatusColor(file.status),
                  backgroundColor: `${getStatusColor(file.status)}20`,
                },
              ]}
            >
              {getStatusIcon(file.status)}
            </Text>
            <View style={styles.fileInfo}>
              <Text style={[styles.filePath, { color: currentTheme.ui.foreground }]}>
                {file.path}
              </Text>
              {(file.additions > 0 || file.deletions > 0) && (
                <View style={styles.changes}>
                  {file.additions > 0 && (
                    <Text style={[styles.additions, { color: currentTheme.git.added }]}>
                      +{file.additions}
                    </Text>
                  )}
                  {file.deletions > 0 && (
                    <Text style={[styles.deletions, { color: currentTheme.git.deleted }]}>
                      -{file.deletions}
                    </Text>
                  )}
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
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
  branchButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  branchText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    padding: 12,
    borderTopWidth: 1,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  filesList: {
    flex: 1,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 12,
  },
  statusBadge: {
    width: 20,
    height: 20,
    borderRadius: 3,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 12,
    fontWeight: '600',
    marginRight: 12,
  },
  fileInfo: {
    flex: 1,
  },
  filePath: {
    fontSize: 13,
    marginBottom: 2,
  },
  changes: {
    flexDirection: 'row',
    gap: 8,
  },
  additions: {
    fontSize: 11,
    fontWeight: '500',
  },
  deletions: {
    fontSize: 11,
    fontWeight: '500',
  },
});
