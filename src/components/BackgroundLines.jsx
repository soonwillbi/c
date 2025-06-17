import React from 'react';

function BackgroundLines() {
  const height = window.innerHeight;
  const width = window.innerWidth;



  return (
    <svg className="absolute w-full h-full top-0 left-0 pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
      <line
        x1="50%"
        y1={0}
        x2="50%"
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