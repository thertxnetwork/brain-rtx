import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../store/themeStore';

export interface FileOperation {
  type: 'create-file' | 'create-folder' | 'rename' | 'delete';
  path: string;
  name?: string;
}

interface FileOperationsModalProps {
  visible: boolean;
  operation: FileOperation | null;
  onClose: () => void;
  onConfirm: (operation: FileOperation, newName?: string) => void;
}

export const FileOperationsModal: React.FC<FileOperationsModalProps> = ({
  visible,
  operation,
  onClose,
  onConfirm,
}) => {
  const { currentTheme } = useThemeStore();
  const [inputValue, setInputValue] = useState('');

  const getTitle = () => {
    switch (operation?.type) {
      case 'create-file':
        return 'New File';
      case 'create-folder':
        return 'New Folder';
      case 'rename':
        return 'Rename';
      case 'delete':
        return 'Delete';
      default:
        return '';
    }
  };

  const getPlaceholder = () => {
    switch (operation?.type) {
      case 'create-file':
        return 'File name';
      case 'create-folder':
        return 'Folder name';
      case 'rename':
        return operation?.name || 'New name';
      default:
        return '';
    }
  };

  const handleConfirm = () => {
    if (!operation) return;

    if (operation.type === 'delete') {
      onConfirm(operation);
    } else if (inputValue.trim()) {
      onConfirm(operation, inputValue.trim());
    }
    setInputValue('');
    onClose();
  };

  const handleClose = () => {
    setInputValue('');
    onClose();
  };

  if (!operation) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={handleClose}
      >
        <View
          style={[styles.container, { backgroundColor: currentTheme.ui.background, borderColor: currentTheme.ui.border }]}
          onStartShouldSetResponder={() => true}
        >
          {/* Header */}
          <View style={[styles.header, { borderBottomColor: currentTheme.ui.border }]}>
            <Text style={[styles.title, { color: currentTheme.ui.foreground }]}>
              {getTitle()}
            </Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {operation.type === 'delete' ? (
              <View>
                <Text style={[styles.message, { color: currentTheme.ui.foreground }]}>
                  Are you sure you want to delete "{operation.name}"?
                </Text>
                <Text style={[styles.warning, { color: currentTheme.git.deleted }]}>
                  This action cannot be undone.
                </Text>
              </View>
            ) : (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: currentTheme.editor.background,
                    color: currentTheme.editor.foreground,
                    borderColor: currentTheme.ui.border,
                  },
                ]}
                placeholder={getPlaceholder()}
                placeholderTextColor={currentTheme.ui.foreground + '80'}
                value={inputValue}
                onChangeText={setInputValue}
                autoFocus
                onSubmitEditing={handleConfirm}
              />
            )}
          </View>

          {/* Actions */}
          <View style={[styles.actions, { borderTopColor: currentTheme.ui.border }]}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: currentTheme.ui.toolWindowBackground }]}
              onPress={handleClose}
            >
              <Text style={[styles.buttonText, { color: currentTheme.ui.foreground }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: operation.type === 'delete' 
                    ? currentTheme.git.deleted 
                    : currentTheme.editor.keyword,
                },
              ]}
              onPress={handleConfirm}
            >
              <Text style={[styles.buttonText, { color: '#fff' }]}>
                {operation.type === 'delete' ? 'Delete' : 'Create'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

interface FileContextMenuProps {
  visible: boolean;
  position: { x: number; y: number };
  fileName: string;
  isDirectory: boolean;
  onClose: () => void;
  onSelect: (action: 'create-file' | 'create-folder' | 'rename' | 'delete' | 'copy-path') => void;
}

export const FileContextMenu: React.FC<FileContextMenuProps> = ({
  visible,
  position,
  fileName,
  isDirectory,
  onClose,
  onSelect,
}) => {
  const { currentTheme } = useThemeStore();

  const menuItems = [
    ...(isDirectory ? [
      { id: 'create-file', icon: 'file-plus', label: 'New File' },
      { id: 'create-folder', icon: 'folder-plus', label: 'New Folder' },
    ] : []),
    { id: 'rename', icon: 'pencil', label: 'Rename' },
    { id: 'delete', icon: 'delete', label: 'Delete', color: currentTheme.git.deleted },
    { id: 'copy-path', icon: 'content-copy', label: 'Copy Path' },
  ];

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.contextOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[
            styles.contextMenu,
            {
              backgroundColor: currentTheme.ui.background,
              borderColor: currentTheme.ui.border,
              top: position.y,
              left: position.x,
            },
          ]}
          onStartShouldSetResponder={() => true}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index < menuItems.length - 1 && { borderBottomColor: currentTheme.ui.border, borderBottomWidth: 1 },
              ]}
              onPress={() => {
                onSelect(item.id as any);
                onClose();
              }}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={18}
                color={item.color || currentTheme.ui.foreground}
              />
              <Text style={[styles.menuItemText, { color: item.color || currentTheme.ui.foreground }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 320,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  message: {
    fontSize: 14,
    marginBottom: 8,
  },
  warning: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  input: {
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  contextOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  contextMenu: {
    position: 'absolute',
    minWidth: 180,
    borderRadius: 6,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
