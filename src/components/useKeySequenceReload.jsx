import { useEffect, useRef } from "react";

export function useKeySequenceReload() {
  const keySequence = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const sequence = keySequence.current;
      sequence.push(e.key);
      if (sequence.length > 3) sequence.shift();

      if (sequence.join() === ['ArrowLeft', 'ArrowDown', 'ArrowRight'].join()) {
        window.location.reload();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}