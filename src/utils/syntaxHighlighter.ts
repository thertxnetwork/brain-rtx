import { Theme } from '../types/theme';

export interface HighlightedToken {
  text: string;
  color: string;
  type: 'keyword' | 'string' | 'comment' | 'number' | 'function' | 'operator' | 'variable' | 'type' | 'constant' | 'default';
}

export interface LanguageSyntax {
  keywords: string[];
  types?: string[];
  builtinFunctions?: string[];
  constants?: string[];
  singleLineComment?: string;
  multiLineCommentStart?: string;
  multiLineCommentEnd?: string;
  stringDelimiters?: string[];
}

const LANGUAGES: { [key: string]: LanguageSyntax } = {
  javascript: {
    keywords: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'class', 'extends', 'import', 'export', 'from', 'default', 'async', 'await', 'yield', 'static', 'get', 'set'],
    types: ['String', 'Number', 'Boolean', 'Array', 'Object', 'Function', 'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet'],
    builtinFunctions: ['console', 'Math', 'JSON', 'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval'],
    constants: ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],
    singleLineComment: '//',
    multiLineCommentStart: '/*',
    multiLineCommentEnd: '*/',
    stringDelimiters: ['"', "'", '`'],
  },
  typescript: {
    keywords: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'class', 'extends', 'implements', 'interface', 'type', 'enum', 'namespace', 'import', 'export', 'from', 'default', 'async', 'await', 'yield', 'static', 'get', 'set', 'public', 'private', 'protected', 'readonly', 'abstract'],
    types: ['string', 'number', 'boolean', 'any', 'void', 'never', 'unknown', 'String', 'Number', 'Boolean', 'Array', 'Object', 'Function', 'Promise', 'Map', 'Set'],
    builtinFunctions: ['console', 'Math', 'JSON', 'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval'],
    constants: ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],
    singleLineComment: '//',
    multiLineCommentStart: '/*',
    multiLineCommentEnd: '*/',
    stringDelimiters: ['"', "'", '`'],
  },
  python: {
    keywords: ['def', 'class', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue', 'return', 'try', 'except', 'finally', 'raise', 'import', 'from', 'as', 'with', 'lambda', 'yield', 'pass', 'del', 'global', 'nonlocal', 'assert', 'async', 'await'],
    types: ['int', 'float', 'str', 'bool', 'list', 'dict', 'tuple', 'set', 'frozenset', 'bytes', 'bytearray'],
    builtinFunctions: ['print', 'len', 'range', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'sum', 'max', 'min', 'abs', 'round', 'isinstance', 'type', 'open'],
    constants: ['True', 'False', 'None'],
    singleLineComment: '#',
    stringDelimiters: ['"', "'"],
  },
  java: {
    keywords: ['public', 'private', 'protected', 'static', 'final', 'abstract', 'class', 'interface', 'extends', 'implements', 'new', 'this', 'super', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'throws', 'import', 'package', 'void', 'synchronized', 'volatile', 'transient'],
    types: ['int', 'long', 'short', 'byte', 'float', 'double', 'boolean', 'char', 'String', 'Integer', 'Long', 'Short', 'Byte', 'Float', 'Double', 'Boolean', 'Character', 'Object', 'List', 'Map', 'Set'],
    builtinFunctions: ['System', 'Math', 'Arrays', 'Collections'],
    constants: ['true', 'false', 'null'],
    singleLineComment: '//',
    multiLineCommentStart: '/*',
    multiLineCommentEnd: '*/',
    stringDelimiters: ['"'],
  },
  go: {
    keywords: ['func', 'package', 'import', 'var', 'const', 'type', 'struct', 'interface', 'if', 'else', 'for', 'range', 'switch', 'case', 'default', 'break', 'continue', 'return', 'go', 'defer', 'select', 'chan', 'map', 'make', 'new'],
    types: ['int', 'int8', 'int16', 'int32', 'int64', 'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'float32', 'float64', 'complex64', 'complex128', 'byte', 'rune', 'string', 'bool', 'error'],
    builtinFunctions: ['fmt', 'len', 'cap', 'append', 'copy', 'delete', 'panic', 'recover', 'close'],
    constants: ['true', 'false', 'nil', 'iota'],
    singleLineComment: '//',
    multiLineCommentStart: '/*',
    multiLineCommentEnd: '*/',
    stringDelimiters: ['"', '`'],
  },
};

export const highlightCode = (code: string, language: string, theme: Theme): HighlightedToken[][] => {
  const syntax = LANGUAGES[language.toLowerCase()];
  if (!syntax) {
    // Return plain text for unsupported languages
    return code.split('\n').map(line => [{
      text: line || ' ',
      color: theme.editor.foreground,
      type: 'default',
    }]);
  }

  const lines = code.split('\n');
  const highlightedLines: HighlightedToken[][] = [];
  let inMultiLineComment = false;

  for (const line of lines) {
    const tokens: HighlightedToken[] = [];
    let i = 0;

    while (i < line.length) {
      // Check for multi-line comment
      if (syntax.multiLineCommentStart && syntax.multiLineCommentEnd) {
        if (!inMultiLineComment && line.substring(i).startsWith(syntax.multiLineCommentStart)) {
          inMultiLineComment = true;
          const endIndex = line.indexOf(syntax.multiLineCommentEnd, i + syntax.multiLineCommentStart.length);
          if (endIndex !== -1) {
            tokens.push({
              text: line.substring(i, endIndex + syntax.multiLineCommentEnd.length),
              color: theme.editor.comment,
              type: 'comment',
            });
            i = endIndex + syntax.multiLineCommentEnd.length;
            inMultiLineComment = false;
            continue;
          } else {
            tokens.push({
              text: line.substring(i),
              color: theme.editor.comment,
              type: 'comment',
            });
            break;
          }
        }
        
        if (inMultiLineComment) {
          const endIndex = line.indexOf(syntax.multiLineCommentEnd, i);
          if (endIndex !== -1) {
            tokens.push({
              text: line.substring(i, endIndex + syntax.multiLineCommentEnd.length),
              color: theme.editor.comment,
              type: 'comment',
            });
            i = endIndex + syntax.multiLineCommentEnd.length;
            inMultiLineComment = false;
            continue;
          } else {
            tokens.push({
              text: line.substring(i),
              color: theme.editor.comment,
              type: 'comment',
            });
            break;
          }
        }
      }

      // Check for single-line comment
      if (syntax.singleLineComment && line.substring(i).startsWith(syntax.singleLineComment)) {
        tokens.push({
          text: line.substring(i),
          color: theme.editor.comment,
          type: 'comment',
        });
        break;
      }

      // Check for strings
      let foundString = false;
      if (syntax.stringDelimiters) {
        for (const delimiter of syntax.stringDelimiters) {
          if (line[i] === delimiter) {
            let endIndex = i + 1;
            let escaped = false;
            while (endIndex < line.length) {
              if (line[endIndex] === '\\' && !escaped) {
                escaped = true;
              } else if (line[endIndex] === delimiter && !escaped) {
                break;
              } else {
                escaped = false;
              }
              endIndex++;
            }
            tokens.push({
              text: line.substring(i, endIndex + 1),
              color: theme.editor.string,
              type: 'string',
            });
            i = endIndex + 1;
            foundString = true;
            break;
          }
        }
      }
      if (foundString) continue;

      // Check for numbers
      if (/\d/.test(line[i])) {
        let endIndex = i;
        while (endIndex < line.length && /[\d.]/.test(line[endIndex])) {
          endIndex++;
        }
        tokens.push({
          text: line.substring(i, endIndex),
          color: theme.editor.number,
          type: 'number',
        });
        i = endIndex;
        continue;
      }

      // Check for words (keywords, types, functions, etc.)
      if (/[a-zA-Z_]/.test(line[i])) {
        let endIndex = i;
        while (endIndex < line.length && /[a-zA-Z0-9_]/.test(line[endIndex])) {
          endIndex++;
        }
        const word = line.substring(i, endIndex);
        
        let tokenType: HighlightedToken['type'] = 'default';
        let color = theme.editor.foreground;

        if (syntax.keywords.includes(word)) {
          tokenType = 'keyword';
          color = theme.editor.keyword;
        } else if (syntax.types && syntax.types.includes(word)) {
          tokenType = 'type';
          color = theme.editor.type;
        } else if (syntax.builtinFunctions && syntax.builtinFunctions.includes(word)) {
          tokenType = 'function';
          color = theme.editor.function;
        } else if (syntax.constants && syntax.constants.includes(word)) {
          tokenType = 'constant';
          color = theme.editor.constant;
        } else if (endIndex < line.length && line[endIndex] === '(') {
          // Likely a function call
          tokenType = 'function';
          color = theme.editor.function;
        }

        tokens.push({
          text: word,
          color,
          type: tokenType,
        });
        i = endIndex;
        continue;
      }

      // Check for operators
      if (/[+\-*/%=<>!&|^~?:;,.]/.test(line[i])) {
        tokens.push({
          text: line[i],
          color: theme.editor.operator,
          type: 'operator',
        });
        i++;
        continue;
      }

      // Default - whitespace or other characters
      tokens.push({
        text: line[i],
        color: theme.editor.foreground,
        type: 'default',
      });
      i++;
    }

    if (tokens.length === 0) {
      tokens.push({
        text: ' ',
        color: theme.editor.foreground,
        type: 'default',
      });
    }

    highlightedLines.push(tokens);
  }

  return highlightedLines;
};

export const getSupportedLanguages = (): string[] => {
  return Object.keys(LANGUAGES);
};
