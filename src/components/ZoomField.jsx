import React, { useEffect, useRef } from 'react';
import { useQuestionStore } from '../store';

function ZoomField({ children }) {
  const containerRef = useRef();
  const currentId = useQuestionStore((s) => s.currentId);
  // import setter for transform
  const setTransform = useQuestionStore((s) => s.setTransform);

  useEffect(() => {
    if (!currentId) return;

    const el = document.getElementById(currentId);
    const container = containerRef.current;

    if (el && container) {
      const scale = 1.6;

      const dx = window.innerWidth / 2 - el.offsetLeft * scale;
      const dy = window.innerHeight / 2 - el.offsetTop * scale;

      // update store with current transform
      setTransform({ scale, dx, dy });

      container.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;
      container.style.transformOrigin = "top left";
      container.style.transition = "transform 0.3s ease-out";
    }
  }, [currentId, setTransform]);

  return (
    <div ref={containerRef} className="w-full h-full">
      {children}
    </div>
  );
}

export default ZoomField;