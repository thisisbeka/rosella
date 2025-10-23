import { useEffect, useState } from 'react';

interface HandwritingTextProps {
  text: string;
  className?: string;
}

export default function HandwritingText({ text, className = '' }: HandwritingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const letters = text.split('');

    const intervalId = setInterval(() => {
      if (currentIndex < letters.length) {
        setDisplayedText(prev => prev + letters[currentIndex]);
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(intervalId);
      }
    }, 80);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div className={`handwriting-container ${className}`}>
      <span className="handwriting-text">
        {displayedText}
        {!isComplete && <span className="handwriting-cursor">|</span>}
      </span>
    </div>
  );
}
