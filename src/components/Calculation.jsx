import React from 'react';

/**
 * Calculation
 *
 * Displays the curvature calculation formulas in the bottom-right corner.
 */
export default function Calculation({ time, k }) {
  return (
    <div className="absolute bottom-0 right-0 m-6 p-2 border border-[#272727] text-[8px] font-onul">
      <p className="font-onul mb-1">곡률 계산식</p>
      <p className="font-onul underline">시간 → 곡률 k 매핑</p>
      <pre className="font-onul">
{`현재 time: ${time} ms
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
  );
}
