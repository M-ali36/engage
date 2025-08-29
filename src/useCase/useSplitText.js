import React, { useMemo } from 'react';

/**
 * Custom hook to split text for animation purposes.
 * @param {string} text - The text to split.
 * @param {object} options - Options for splitting.
 * @param {"char" | "word"} options.type - Split by character or word.
 * @param {string} options.className - Class name to apply to each span.
 * @returns {JSX.Element} - A JSX element with split text wrapped in spans.
 * 
 * import { useSplitText } from './useSplitText';
 * const animatedHTML = useSplitText('Hello World!', {
    type: 'char', // or 'word'
    className: 'fade-in' // optional animation class
  });
 */
export const useSplitText = (text, { type = 'char', className = '' } = {}) => {
  const splitText = useMemo(() => {
    const parts = type === 'word' ? text.split(' ') : [...text];

    return parts.map((part, index) => {
        const key = `${type}-${index}`;
        const delay = `${index * 0.02}s`; // 0.2s per part
      
        return (
          <span
            key={key}
            data-char
            style={{ transitionDelay: delay, whiteSpace: 'break-spaces' }}
          >
            {part}
            {type === 'word' ? ' ' : ''}
          </span>
        );
      });      
  }, [text, type, className]);

  return <>{splitText}</>;
};
