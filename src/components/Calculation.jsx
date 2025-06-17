import React from 'react';

/**
 * Calculation
 *
 * Displays the curvature calculation formulas in the bottom-right corner.
 */
export default function Calculation({ time, k }) {
  return (
    <div className="absolute bottom-0 right-0 m-6 p-2 flex flex-col whitespace-nowrap">
      <div className="relative -mb-[1px] leading-[8px] pb-[2px] px-0.5 w-max border border-[#272727] text-[8px] font-onul">
        <p className="font-onul ">곡률 계산식</p>
      </div>
    <div className="relative leading-[8px] pb-[4px] pt-[1px] px-0.5  border border-[#272727] text-[8px] font-onul">
      
      <p className="font-onul underline">시간 → 곡률 k 매핑</p>
      <pre className="font-onul">
{`time: ${time} ms
k: ${k}`}
      </pre>
      <p className="font-onul underline mt-2">제어점 계산</p>
      <pre className="font-onul">
{`mx = (x1 + x2) / 2
my = (y1 + y2) / 2

dx = x2 - x1
dy = y2 - y1
len = sqrt(dx*dx + dy*dy)

ux = -dy / len
uy = dx / len

cx = mx + ux * len * k
cy = my + uy * len * k`}
      </pre>
    </div>
  </div>
  );
}
