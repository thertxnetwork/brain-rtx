// Keyboard shortcuts utilities for the IDE

export interface Shortcut {
  key: string;
  modifiers?: Array<'ctrl' | 'shift' | 'alt' | 'meta'>;
  description: string;
  action: () => void;
}

export class KeyboardShortcutManager {
  private shortcuts: Map<string, Shortcut> = new Map();

  /**
   * Register a keyboard shortcut
   */
  register(id: string, shortcut: Shortcut): void {
    this.shortcuts.set(id, shortcut);
  }

  /**
   * Unregister a keyboard shortcut
   */
  unregister(id: string): void {
    this.shortcuts.delete(id);
  }

  /**
   * Get all registered shortcuts
   */
  getAll(): Map<string, Shortcut> {
    return this.shortcuts;
  }

  /**
   * Get shortcut display string
   */
  getDisplayString(shortcut: Shortcut): string {
    const modifiers = shortcut.modifiers || [];
    const parts = [...modifiers.map(m => this.getModifierSymbol(m)), shortcut.key];
    return parts.join(' + ');
  }

  private getModifierSymbol(modifier: string): string {
    const symbols: { [key: string]: string } = {
      ctrl: '⌃',
      shift: '⇧',
      alt: '⌥',
      meta: '⌘',
    };
    return symbols[modifier] || modifier;
  }
}

// Default IDE shortcuts
export const defaultShortcuts: { [key: string]: Shortcut } = {
  save: {
    key: 'S',
    modifiers: ['ctrl'],
    description: 'Save current file',
    action: () => console.log('Save'),
  },
  find: {
    key: 'F',
    modifiers: ['ctrl'],
    description: 'Find in file',
    action: () => console.log('Find'),
  },
  replace: {
    key: 'H',
    modifiers: ['ctrl'],
    description: 'Replace in file',
    action: () => console.log('Replace'),
  },
  goToLine: {
    key: 'G',
    modifiers: ['ctrl'],
    description: 'Go to line',
    action: () => console.log('Go to line'),
  },
  commandPalette: {
    key: 'P',
    modifiers: ['ctrl', 'shift'],
    description: 'Command palette',
    action: () => console.log('Command palette'),
  },
  closeTab: {
    key: 'W',
    modifiers: ['ctrl'],
    description: 'Close current tab',
    action: () => console.log('Close tab'),
  },
  newFile: {
    key: 'N',
    modifiers: ['ctrl'],
    description: 'New file',
    action: () => console.log('New file'),
  },
  openFile: {
    key: 'O',
    modifiers: ['ctrl'],
    description: 'Open file',
    action: () => console.log('Open file'),
  },
  undo: {
    key: 'Z',
    modifiers: ['ctrl'],
    description: 'Undo',
    action: () => console.log('Undo'),
  },
  redo: {
    key: 'Y',
    modifiers: ['ctrl'],
    description: 'Redo',
    action: () => console.log('Redo'),
  },
};
