import React from 'react';
import { useQuestionStore } from '../store';

function BackgroundLines() {
  const { scale, dx } = useQuestionStore((s) => s.transform);
  const x = (window.innerWidth / 2) * scale + dx;
  const height = window.innerHeight;
  const width = window.innerWidth;



  return (
    <svg className="absolute w-full h-full top-0 left-0 pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke="#272727"
        strokeWidth="1"
      />
      <line
        x1={0}
        y1="24%"
        x2={width}
        y2="24%"
        stroke="red"
        strokeWidth="1"
      />
      <line
        x1={0}
        y1="69%"
        x2={width}
        y2="69%"
        stroke="red"
        strokeWidth="1"
      />
      <line
        x1={0}
        y1="78%"
        x2={width}
        y2="78%"
        stroke="red"
        strokeWidth="1"
      />


    </svg>
  );
}

export default BackgroundLines;