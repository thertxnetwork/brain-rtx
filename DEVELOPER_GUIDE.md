# Developer Guide - Brain RTX IDE

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Architecture Overview](#architecture-overview)
4. [State Management](#state-management)
5. [Theme System](#theme-system)
6. [Adding New Features](#adding-new-features)
7. [Services](#services)
8. [Testing](#testing)
9. [Building & Deployment](#building--deployment)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Development Setup

```bash
# Clone the repository
git clone https://github.com/thertxnetwork/brain-rtx.git
cd brain-rtx

# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on Web
npm run web
```

## Project Structure

```
brain-rtx/
├── src/
│   ├── components/          # React components
│   │   ├── editor/         # Editor-related components
│   │   ├── toolwindows/    # Tool window components
│   │   └── ui/             # UI components
│   ├── services/           # Business logic services
│   │   ├── filesystem/     # File system operations
│   │   ├── git/           # Git integration
│   │   ├── lsp/           # Language Server Protocol
│   │   └── ai/            # AI assistant (planned)
│   ├── store/             # State management (Zustand)
│   ├── themes/            # Theme definitions (JSON)
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── navigation/        # Navigation setup
│   └── screens/           # Screen components
├── assets/                # Images, fonts, icons
├── App.tsx               # Root component
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

## Architecture Overview

### Component Hierarchy

```
App
├── WelcomeScreen (initial)
│   ├── Quick Actions
│   └── Recent Projects
└── EditorScreen (after project loaded)
    ├── NavigationBar
    ├── MainContent
    │   ├── ProjectTree (sidebar)
    │   └── EditorArea
    │       ├── TabBar
    │       └── CodeEditor
    ├── BottomPanel
    │   ├── Terminal
    │   ├── Problems
    │   └── GitPanel
    └── StatusBar
```

### Data Flow

1. **User Action** → Component
2. Component → **Store Action** (Zustand)
3. Store → **State Update**
4. State Update → **Component Re-render**

## State Management

We use Zustand for state management. It's lightweight and doesn't require boilerplate.

### Theme Store

```typescript
import { useThemeStore } from './store/themeStore';

// In your component
const { currentTheme, setTheme, getAllThemes } = useThemeStore();

// Change theme
setTheme(newTheme);

// Get all available themes
const allThemes = getAllThemes();
```

### Project Store

```typescript
import { useProjectStore } from './store/projectStore';

// In your component
const { 
  projectPath, 
  openFiles, 
  activeFileId, 
  openFile, 
  closeFile 
} = useProjectStore();

// Open a file
openFile({
  id: 'unique-id',
  path: '/path/to/file',
  name: 'file.ts',
  content: 'file content',
  language: 'typescript',
  isDirty: false,
  cursorPosition: { line: 1, column: 1 }
});

// Close a file
closeFile('file-id');
```

## Theme System

### Theme Structure

Each theme is a JSON file with the following structure:

```json
{
  "id": "unique-theme-id",
  "name": "Display Name",
  "type": "dark" | "light",
  "author": "Author Name",
  "description": "Theme description",
  "editor": {
    "background": "#HEX",
    "foreground": "#HEX",
    "selection": "#HEX",
    "comment": "#HEX",
    "keyword": "#HEX",
    "string": "#HEX",
    // ... more colors
  },
  "ui": {
    "background": "#HEX",
    "foreground": "#HEX",
    // ... more colors
  },
  "git": {
    "added": "#HEX",
    "modified": "#HEX",
    "deleted": "#HEX"
  },
  "fontFamily": "JetBrains Mono, monospace",
  "fontSize": 14,
  "lineHeight": 1.5
}
```

### Adding a New Theme

1. Create a new JSON file in `src/themes/`:

```bash
touch src/themes/my-theme.json
```

2. Define your theme colors (use existing themes as templates)

3. Import and add to the theme store:

```typescript
// src/store/themeStore.ts
import myTheme from '../themes/my-theme.json';

export const BUILT_IN_THEMES: Theme[] = [
  // ... existing themes
  myTheme as Theme,
];
```

### Using Theme Colors in Components

```typescript
import { useThemeStore } from '../store/themeStore';

const MyComponent = () => {
  const { currentTheme } = useThemeStore();
  
  return (
    <View style={{ backgroundColor: currentTheme.ui.background }}>
      <Text style={{ color: currentTheme.ui.foreground }}>
        Themed text
      </Text>
    </View>
  );
};
```

## Adding New Features

### Adding a New Tool Window

1. Create component in `src/components/toolwindows/`:

```typescript
// src/components/toolwindows/MyToolWindow.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '../../store/themeStore';

export const MyToolWindow: React.FC = () => {
  const { currentTheme } = useThemeStore();
  
  return (
    <View style={[styles.container, { 
      backgroundColor: currentTheme.ui.toolWindowBackground 
    }]}>
      <Text style={{ color: currentTheme.ui.foreground }}>
        My Tool Window
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

2. Add to EditorScreen layout

### Adding a New Service

1. Create service file in `src/services/`:

```typescript
// src/services/myservice/MyService.ts
export class MyService {
  static async doSomething(): Promise<void> {
    // Implementation
  }
}
```

2. Use in components:

```typescript
import { MyService } from '../services/myservice/MyService';

const handleAction = async () => {
  await MyService.doSomething();
};
```

## Services

### FileSystemService

Handles file operations:

```typescript
import { FileSystemService } from '../services/filesystem/FileSystemService';

// Read file
const content = await FileSystemService.readFile(path);

// Write file
await FileSystemService.writeFile(path, content);

// List directory
const files = await FileSystemService.listDirectory(path);

// Get language from file
const language = FileSystemService.getLanguageFromExtension('file.ts');
```

### GitService

Handles Git operations (placeholder):

```typescript
import { GitService } from '../services/git/GitService';

// Get status
const status = await GitService.getStatus(repoPath);

// Get branches
const branches = await GitService.getBranches(repoPath);

// Commit
await GitService.commit(repoPath, 'Commit message');
```

### LSPClient

Language Server Protocol integration (placeholder):

```typescript
import { LSPClient, LSPClientFactory } from '../services/lsp/LSPClient';

// Get client for a language
const client = LSPClientFactory.getClient('typescript');

// Initialize
await client.initialize(projectPath);

// Get completions
const completions = await client.getCompletions(uri, line, character);
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

Example test for a component:

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyComponent />);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('handles button press', () => {
    const onPress = jest.fn();
    const { getByText } = render(<MyComponent onPress={onPress} />);
    
    fireEvent.press(getByText('Button'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

## Building & Deployment

### Android Build

```bash
# Development build
npm run android

# Production build
eas build --platform android

# Create APK
eas build --platform android --profile preview
```

### iOS Build

```bash
# Development build (macOS only)
npm run ios

# Production build (macOS only)
eas build --platform ios
```

### Web Build

```bash
# Development
npm run web

# Production build
npm run build:web
```

## Code Style

We use TypeScript with strict mode and ESLint for code quality.

### TypeScript Guidelines

- Use explicit types for function parameters and return values
- Avoid `any` type - use `unknown` if type is truly unknown
- Use interfaces for object shapes
- Use type aliases for unions and primitives

### Component Guidelines

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types with TypeScript interfaces

Example:

```typescript
interface MyComponentProps {
  title: string;
  onPress: () => void;
  isVisible?: boolean;
}

export const MyComponent: React.FC<MyComponentProps> = ({ 
  title, 
  onPress, 
  isVisible = true 
}) => {
  // Implementation
};
```

## Performance Tips

1. **Use React.memo for expensive components**
2. **Avoid inline functions in render** - use useCallback
3. **Use FlatList for long lists** instead of ScrollView
4. **Lazy load large files** - don't load entire file content at once
5. **Debounce expensive operations** like search and auto-save

## Contributing

See the main README.md for contribution guidelines.

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

For questions and issues:
- GitHub Issues: https://github.com/thertxnetwork/brain-rtx/issues
- Discussions: https://github.com/thertxnetwork/brain-rtx/discussions
