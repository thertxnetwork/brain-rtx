import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';

interface GitFile {
  path: string;
  status: 'modified' | 'added' | 'deleted' | 'untracked';
  additions: number;
  deletions: number;
  staged: boolean;
}

export const GitPanel: React.FC = () => {
  const { currentTheme } = useThemeStore();

  const [branch, setBranch] = useState('main');
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [commitMessage, setCommitMessage] = useState('');
  const [changedFiles, setChangedFiles] = useState<GitFile[]>([
    { path: 'src/index.ts', status: 'modified', additions: 5, deletions: 2, staged: false },
    { path: 'src/components/Button.tsx', status: 'added', additions: 42, deletions: 0, staged: false },
    { path: 'src/utils/old.ts', status: 'deleted', additions: 0, deletions: 15, staged: false },
    { path: 'test/new-test.ts', status: 'untracked', additions: 0, deletions: 0, staged: false },
  ]);

  const toggleStage = (index: number) => {
    const newFiles = [...changedFiles];
    newFiles[index].staged = !newFiles[index].staged;
    setChangedFiles(newFiles);
  };

  const stageAll = () => {
    setChangedFiles(changedFiles.map(file => ({ ...file, staged: true })));
  };

  const unstageAll = () => {
    setChangedFiles(changedFiles.map(file => ({ ...file, staged: false })));
  };

  const handleCommit = () => {
    if (commitMessage.trim() && changedFiles.some(f => f.staged)) {
      console.log('Committing:', commitMessage);
      setCommitMessage('');
      setShowCommitModal(false);
      // Remove staged files
      setChangedFiles(changedFiles.filter(f => !f.staged));
    }
  };

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

  const stagedFiles = changedFiles.filter(f => f.staged);
  const unstagedFiles = changedFiles.filter(f => !f.staged);

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.ui.toolWindowBackground }]}>
      <View style={[styles.header, { borderBottomColor: currentTheme.ui.toolWindowBorder }]}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons name="source-branch" size={18} color={currentTheme.ui.foreground} />
          <Text style={[styles.headerText, { color: currentTheme.ui.foreground }]}>
            Git
          </Text>
        </View>
        <TouchableOpacity style={[styles.branchButton, { backgroundColor: currentTheme.ui.buttonBackground }]}>
          <Text style={[styles.branchText, { color: currentTheme.ui.buttonForeground }]}>
            {branch}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={14} color={currentTheme.ui.buttonForeground} />
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: currentTheme.editor.keyword }]}
          onPress={() => setShowCommitModal(true)}
          disabled={stagedFiles.length === 0}
        >
          <MaterialCommunityIcons name="source-commit" size={16} color="#fff" />
          <Text style={[styles.actionButtonText, { color: '#fff' }]}>
            Commit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: currentTheme.ui.buttonBackground }]}>
          <MaterialCommunityIcons name="download" size={16} color={currentTheme.ui.buttonForeground} />
          <Text style={[styles.actionButtonText, { color: currentTheme.ui.buttonForeground }]}>
            Pull
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: currentTheme.ui.buttonBackground }]}>
          <MaterialCommunityIcons name="upload" size={16} color={currentTheme.ui.buttonForeground} />
          <Text style={[styles.actionButtonText, { color: currentTheme.ui.buttonForeground }]}>
            Push
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.filesList}>
        {/* Staged Changes */}
        {stagedFiles.length > 0 && (
          <>
            <View style={[styles.section, { borderTopColor: currentTheme.ui.border }]}>
              <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
                Staged Changes ({stagedFiles.length})
              </Text>
              <TouchableOpacity onPress={unstageAll}>
                <MaterialCommunityIcons name="minus-circle" size={18} color={currentTheme.ui.foreground} />
              </TouchableOpacity>
            </View>
            {stagedFiles.map((file, index) => (
              <TouchableOpacity
                key={`staged-${index}`}
                style={styles.fileItem}
                onPress={() => toggleStage(changedFiles.indexOf(file))}
              >
                <MaterialCommunityIcons 
                  name="checkbox-marked" 
                  size={20} 
                  color={currentTheme.editor.keyword} 
                />
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
          </>
        )}

        {/* Unstaged Changes */}
        {unstagedFiles.length > 0 && (
          <>
            <View style={[styles.section, { borderTopColor: currentTheme.ui.border }]}>
              <Text style={[styles.sectionTitle, { color: currentTheme.ui.foreground }]}>
                Changes ({unstagedFiles.length})
              </Text>
              <TouchableOpacity onPress={stageAll}>
                <MaterialCommunityIcons name="plus-circle" size={18} color={currentTheme.ui.foreground} />
              </TouchableOpacity>
            </View>
            {unstagedFiles.map((file, index) => (
              <TouchableOpacity
                key={`unstaged-${index}`}
                style={styles.fileItem}
                onPress={() => toggleStage(changedFiles.indexOf(file))}
              >
                <MaterialCommunityIcons 
                  name="checkbox-blank-outline" 
                  size={20} 
                  color={currentTheme.ui.foreground} 
                  style={{ opacity: 0.5 }}
                />
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
          </>
        )}
      </ScrollView>

      {/* Commit Modal */}
      <Modal
        visible={showCommitModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCommitModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCommitModal(false)}
        >
          <View
            style={[styles.commitModal, { backgroundColor: currentTheme.ui.background, borderColor: currentTheme.ui.border }]}
            onStartShouldSetResponder={() => true}
          >
            <View style={[styles.modalHeader, { borderBottomColor: currentTheme.ui.border }]}>
              <Text style={[styles.modalTitle, { color: currentTheme.ui.foreground }]}>
                Commit Changes
              </Text>
              <TouchableOpacity onPress={() => setShowCommitModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color={currentTheme.ui.foreground} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <Text style={[styles.modalLabel, { color: currentTheme.ui.foreground }]}>
                Commit Message
              </Text>
              <TextInput
                style={[
                  styles.commitInput,
                  {
                    backgroundColor: currentTheme.editor.background,
                    color: currentTheme.editor.foreground,
                    borderColor: currentTheme.ui.border,
                  },
                ]}
                placeholder="Enter commit message..."
                placeholderTextColor={currentTheme.ui.foreground + '80'}
                value={commitMessage}
                onChangeText={setCommitMessage}
                multiline
                numberOfLines={4}
                autoFocus
              />
              <Text style={[styles.modalInfo, { color: currentTheme.ui.foreground, opacity: 0.7 }]}>
                {stagedFiles.length} file{stagedFiles.length !== 1 ? 's' : ''} staged
              </Text>
            </View>
            <View style={[styles.modalActions, { borderTopColor: currentTheme.ui.border }]}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: currentTheme.ui.toolWindowBackground }]}
                onPress={() => setShowCommitModal(false)}
              >
                <Text style={[styles.modalButtonText, { color: currentTheme.ui.foreground }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: currentTheme.editor.keyword }]}
                onPress={handleCommit}
                disabled={!commitMessage.trim()}
              >
                <Text style={[styles.modalButtonText, { color: '#fff' }]}>
                  Commit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  branchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    gap: 4,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingVertical: 8,
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
    gap: 8,
  },
  statusBadge: {
    width: 20,
    height: 20,
    borderRadius: 3,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 12,
    fontWeight: '600',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commitModal: {
    width: 400,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalContent: {
    padding: 16,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  commitInput: {
    minHeight: 80,
    borderRadius: 4,
    borderWidth: 1,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  modalInfo: {
    fontSize: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
