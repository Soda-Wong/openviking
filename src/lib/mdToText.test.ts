
import { describe, it, expect } from 'vitest';
import { mdToPlainText } from './mdToText';

describe('mdToPlainText', () => {
  it('should convert markdown to plain text', () => {
    const markdown = '# Hello World\n\nThis is a **bold** text.';
    const expected = 'Hello World This is a bold text.';
    // Note: the implementation replaces newlines/spaces with single space and trims.
    
    const result = mdToPlainText(markdown);
    expect(result).toBe(expected);
  });

  it('should handle empty string', () => {
    expect(mdToPlainText('')).toBe('');
  });

  it('should handle complex markdown', () => {
    const markdown = `
# Title

- List item 1
- List item 2

[Link](http://example.com)
    `;
    // Expected behavior depends on stripHtml and replacement logic.
    // Usually lists might be just text concatenated.
    const result = mdToPlainText(markdown);
    expect(result).toContain('Title');
    expect(result).toContain('List item 1');
    expect(result).toContain('Link');
  });
});
