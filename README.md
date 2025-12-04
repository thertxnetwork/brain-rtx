# Brain RTX IDE

A professional-grade code editor for Android inspired by JetBrains IDEs, built with React Native Expo.

## 🚀 Features

### 🎨 15+ Professional Themes

**Dark Themes:**
- Darcula (Default JetBrains Dark)
- One Dark (Atom-inspired)
- Monokai Pro
- Dracula
- Night Owl
- Material Theme Ocean
- Solarized Dark
- Gruvbox Dark
- GitHub Dark Dimmed
- Nord
- Tokyo Night
- Ayu Dark
- Cobalt2

**Light Themes:**
- IntelliJ Light (Default JetBrains Light)
- High Contrast Light
- Solarized Light
- GitHub Light

### 🏗️ JetBrains-Inspired UI/UX

- **Navigation Bar**: Project name, Run/Debug buttons, VCS status, Settings
- **Tool Windows System**: 
  - Project Explorer with file tree and icons
  - Integrated terminal (planned)
  - Git tool window (planned)
  - Problems/Console window (planned)
- **Editor Area**: 
  - Tab-based interface with close buttons
  - Line numbers in gutter
  - Syntax highlighting
  - Multi-file editing
- **Status Bar**: Line:Column indicator, file encoding, language, Git branch

### 📁 Project Management

- Welcome screen with recent projects
- File tree with directory navigation
- File type icons
- Git status indicators in file tree
- Multi-tab editor support

### 🎯 Code Editor Features

- Line numbers
- Syntax-aware file type detection
- Tab management
- Dirty file indicators (unsaved changes)
- Multiple files open simultaneously

### 🔧 Customization

- Theme switcher with live preview
- Color preview for each theme
- Easy theme switching from any screen
- Theme persistence (planned)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Expo CLI
- Android Studio (for Android development)
- iOS development environment (for iOS, macOS only)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/thertxnetwork/brain-rtx.git
cd brain-rtx
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on Android:
```bash
npm run android
```

5. Run on iOS (macOS only):
```bash
npm run ios
```

6. Run on Web:
```bash
npm run web
```

## 🏗️ Architecture

```
src/
├── components/
│   ├── editor/
│   │   ├── CodeEditor.tsx      # Main code editor component
│   │   ├── TabBar.tsx          # Editor tabs
│   │   └── Breadcrumb.tsx      # (Planned) Breadcrumb navigation
│   ├── toolwindows/
│   │   ├── ProjectTree.tsx     # File tree explorer
│   │   ├── Terminal.tsx        # (Planned) Integrated terminal
│   │   └── Problems.tsx        # (Planned) Problems panel
│   └── ui/
│       ├── StatusBar.tsx       # Bottom status bar
│       ├── NavigationBar.tsx   # Top navigation bar
│       └── ThemeSwitcher.tsx   # Theme selection modal
├── services/
│   ├── lsp/                    # (Planned) Language Server Protocol
│   ├── ai/                     # (Planned) AI Assistant
│   ├── git/                    # (Planned) Git integration
│   └── filesystem/             # (Planned) File system operations
├── store/
│   ├── themeStore.ts           # Theme state management
│   └── projectStore.ts         # Project state management
├── themes/
│   ├── darcula.json            # Theme definitions
│   ├── intellij-light.json
│   └── ... (15+ themes)
├── types/
│   └── theme.ts                # TypeScript type definitions
└── screens/
    ├── WelcomeScreen.tsx       # Welcome screen with recent projects
    └── EditorScreen.tsx        # Main editor screen
```

## 🎨 Theme System

### Theme Structure

Each theme is defined as a JSON file with the following structure:

```json
{
  "id": "theme-id",
  "name": "Theme Name",
  "type": "dark" | "light",
  "author": "Author Name",
  "description": "Theme description",
  "editor": {
    "background": "#HEX",
    "foreground": "#HEX",
    // ... more editor colors
  },
  "ui": {
    "background": "#HEX",
    "foreground": "#HEX",
    // ... more UI colors
  },
  "git": {
    "added": "#HEX",
    "modified": "#HEX",
    // ... more git status colors
  }
}
```

### Creating Custom Themes

1. Copy an existing theme from `src/themes/`
2. Modify the colors as desired
3. Add the theme to `src/store/themeStore.ts`
4. Import and add to `BUILT_IN_THEMES` array

## 🚧 Roadmap

### Phase 1: Core Features ✅
- [x] Project structure setup
- [x] Theme system with 15+ themes
- [x] Basic code editor
- [x] File tree explorer
- [x] Tab management
- [x] Welcome screen

### Phase 2: Enhanced Editor (In Progress)
- [ ] Advanced syntax highlighting
- [ ] Code folding
- [ ] Bracket matching
- [ ] Search & replace
- [ ] Multi-cursor support
- [ ] Code completion

### Phase 3: LSP Integration
- [ ] LSP client implementation
- [ ] JavaScript/TypeScript support
- [ ] Python support
- [ ] Java support
- [ ] Multi-language support
- [ ] Diagnostics display
- [ ] Code actions

### Phase 4: Git Integration
- [ ] Git status in file tree
- [ ] Git diff viewer
- [ ] Commit dialog
- [ ] Branch management
- [ ] Blame annotations

### Phase 5: AI Integration
- [ ] AI Assistant panel
- [ ] Inline suggestions
- [ ] Code completion
- [ ] Code explanation
- [ ] Test generation

### Phase 6: Mobile Optimizations
- [ ] Touch gesture support
- [ ] Pinch to zoom
- [ ] Swipe between tabs
- [ ] Virtual keyboard optimization
- [ ] Landscape/portrait layouts

### Phase 7: Advanced Features
- [ ] Integrated terminal
- [ ] Run/Debug configurations
- [ ] Build tool integration
- [ ] Plugin system
- [ ] Settings/preferences

## 🛠️ Technology Stack

- **React Native Expo 54+** - Cross-platform mobile framework
- **TypeScript** - Type-safe development
- **Zustand** - Lightweight state management
- **React Navigation** - Navigation library
- **Expo File System** - File operations
- **React Native Gesture Handler** - Gesture support
- **React Native Reanimated** - Smooth animations

## 📱 Supported Platforms

- ✅ Android
- ✅ iOS
- ✅ Web (limited functionality)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by JetBrains IDEs (IntelliJ IDEA, WebStorm, PyCharm, Android Studio)
- Theme designs from various popular editor themes
- Icons and design patterns from the open-source community

## 📧 Contact

For questions, suggestions, or support:
- GitHub Issues: [https://github.com/thertxnetwork/brain-rtx/issues](https://github.com/thertxnetwork/brain-rtx/issues)

---

Made with ❤️ for developers who want a professional code editor on Android
