import { useState, useEffect } from "react";

export const useTypeWriter = (text: string, speed: number = 100, pauseTime: number = 1500) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
        timeout = setTimeout(type, speed);
      } else {
        setIsTyping(false);
        // Pause before deleting
        timeout = setTimeout(() => {
          erase();
        }, pauseTime);
      }
    };

    const erase = () => {
      if (index > 0) {
        setDisplayText(text.substring(0, index - 1));
        index--;
        setIsTyping(true);
        timeout = setTimeout(erase, speed / 2);
      } else {
        setIsTyping(true);
        timeout = setTimeout(type, speed);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [text, speed, pauseTime]);

  return { displayText, isTyping };
};
