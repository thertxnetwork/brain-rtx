// Syntax highlighting utilities

export interface Token {
  type: string;
  value: string;
  start: number;
  end: number;
}

export class SyntaxHighlighter {
  /**
   * Tokenize code based on language
   */
  static tokenize(code: string, language: string): Token[] {
    switch (language) {
      case 'javascript':
      case 'typescript':
        return this.tokenizeJavaScript(code);
      case 'python':
        return this.tokenizePython(code);
      default:
        return this.tokenizeGeneric(code);
    }
  }

  private static tokenizeJavaScript(code: string): Token[] {
    const tokens: Token[] = [];
    const keywords = [
      'const', 'let', 'var', 'function', 'class', 'import', 'export',
      'from', 'return', 'if', 'else', 'for', 'while', 'do', 'switch',
      'case', 'break', 'continue', 'async', 'await', 'try', 'catch',
      'finally', 'throw', 'new', 'typeof', 'instanceof',
    ];

    const patterns = [
      { type: 'comment', regex: /\/\/.*$/gm },
      { type: 'comment', regex: /\/\*[\s\S]*?\*\//g },
      { type: 'string', regex: /"(?:[^"\\]|\\.)*"/g },
      { type: 'string', regex: /'(?:[^'\\]|\\.)*'/g },
      { type: 'string', regex: /`(?:[^`\\]|\\.)*`/g },
      { type: 'number', regex: /\b\d+\.?\d*\b/g },
      { type: 'keyword', regex: new RegExp(`\\b(${keywords.join('|')})\\b`, 'g') },
      { type: 'function', regex: /\b([a-zA-Z_]\w*)\s*\(/g },
    ];

    // Simple tokenization (placeholder for real implementation)
    return tokens;
  }

  private static tokenizePython(code: string): Token[] {
    const tokens: Token[] = [];
    // Python tokenization logic
    return tokens;
  }

  private static tokenizeGeneric(code: string): Token[] {
    const tokens: Token[] = [];
    // Generic tokenization logic
    return tokens;
  }

  /**
   * Get color for token type based on theme
   */
  static getTokenColor(tokenType: string, theme: any): string {
    const colorMap: { [key: string]: keyof typeof theme.editor } = {
      comment: 'comment',
      keyword: 'keyword',
      string: 'string',
      number: 'number',
      function: 'function',
      variable: 'variable',
      operator: 'operator',
      punctuation: 'punctuation',
    };

    const colorKey = colorMap[tokenType];
    return colorKey ? theme.editor[colorKey] : theme.editor.foreground;
  }
}

/**
 * Simple code formatter utilities
 */
export class CodeFormatter {
  /**
   * Format code based on language
   */
  static format(code: string, language: string): string {
    // Placeholder - real implementation would use prettier or similar
    return code;
  }

  /**
   * Auto-indent code
   */
  static autoIndent(code: string, language: string): string {
    const lines = code.split('\n');
    let indentLevel = 0;
    const indentSize = 2;

    return lines
      .map((line) => {
        const trimmed = line.trim();
        
        // Decrease indent for closing braces
        if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        const indented = ' '.repeat(indentLevel * indentSize) + trimmed;

        // Increase indent for opening braces
        if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
          indentLevel++;
        }

        return indented;
      })
      .join('\n');
  }
}
