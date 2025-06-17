import React from 'react';
import { useQuestionStore } from '../store';

/**
 * Calculates the control point for a quadratic Bézier based on fixed curvature k.
 */
const calcControl = (x1, y1, x2, y2, k) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = -dy / len;
  const uy = dx / len;
  const cx = mx + ux * len * k;
  const cy = my + uy * len * k;
  return { cx, cy };
};

function PathLines({ elRefs }) {
  const visitedPath = useQuestionStore((s) => s.visitedPath);

  // Build segments: each with from-id, to-id, and curvature k
  const segments = visitedPath.slice(1).map((cur, i) => {
    const prev = visitedPath[i];
    return { from: prev.id, to: cur.id, k: cur.k };
  });

  return (
    <svg className="absolute inset-0 pointer-events-none w-full h-full z-10 transition-all">
      {segments.map(({ from, to, k }, idx) => {
        const el1 = elRefs[from];
        const el2 = elRefs[to];
        if (!el1 || !el2) return null;
        const r1 = el1.getBoundingClientRect();
        const r2 = el2.getBoundingClientRect();
        const x1 = r1.left + r1.width / 2;
        const y1 = r1.top + r1.height / 2;
        const x2 = r2.left + r2.width / 2;
        const y2 = r2.top + r2.height / 2;
        // ensure k is a valid number
        const safeK = typeof k === 'number' && !isNaN(k) ? k : 0;
        const { cx, cy } = calcControl(x1, y1, x2, y2, safeK);
        return (
          <g key={idx}>
            <path
              d={`M${x1},${y1} Q${cx},${cy} ${x2},${y2}`}
              stroke="red"
              fill="none"
              strokeWidth="1"
            />
            {/* 시작점과 끝점에 원 추가 */}
            <circle cx={x1} cy={y1} r={3} fill="red" />
            <circle cx={x2} cy={y2} r={3} fill="red" />
          </g>
        );
      })}
    </svg>
  );
}

export default PathLines;