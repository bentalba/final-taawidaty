import React from 'react';

interface FormattedTextProps {
  children: string;
  className?: string;
}

/**
 * Component to format text with **bold** markers
 * Renders text between ** ** as bold and underlined
 */
export function FormattedText({ children, className = '' }: FormattedTextProps) {
  if (!children) return null;

  // Split by **text** patterns
  const parts = children.split(/(\*\*[^*]+\*\*)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Check if this part is wrapped in **
        if (part.startsWith('**') && part.endsWith('**')) {
          const text = part.slice(2, -2); // Remove ** from both ends
          return (
            <strong key={index} className="font-bold underline decoration-2 underline-offset-2">
              {text}
            </strong>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}

/**
 * Component to format multiline content with **bold** markers and proper line breaks
 */
export function FormattedContent({ children, className = '' }: FormattedTextProps) {
  if (!children) return null;

  // Split by newlines first
  const lines = children.split('\n');

  return (
    <div className={className}>
      {lines.map((line, lineIndex) => {
        // Split each line by **text** patterns
        const parts = line.split(/(\*\*[^*]+\*\*)/g);

        return (
          <p key={lineIndex} className={lineIndex > 0 ? 'mt-2' : ''}>
            {parts.map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                const text = part.slice(2, -2);
                return (
                  <strong key={partIndex} className="font-bold underline decoration-2 underline-offset-2">
                    {text}
                  </strong>
                );
              }
              return <React.Fragment key={partIndex}>{part}</React.Fragment>;
            })}
          </p>
        );
      })}
    </div>
  );
}
