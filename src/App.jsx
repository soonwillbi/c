import React, { useRef } from "react";
import Field from "./field.jsx";
import BackgroundLines from "./components/BackgroundLines";
import BgSpreadLines from "./components/BgSpreadLines.jsx"
import PathLines from "./components/PathLines";
import ZoomField from "./components/ZoomField.jsx";
import Timer from "./components/timer.jsx";
import { useQuestionStore } from "./store";
import './index.css';
import './App.css';
import Calculation from "./components/Calculation.jsx";



function App() {
  const elRefs = useRef({});
  const showTimer = useQuestionStore((s) => s.showTimer);
  const timerDuration = useQuestionStore((s) => s.timerDuration);
  const percentage = useQuestionStore((s) => s.getScore().percentage);

  const visited = useQuestionStore(s => s.visitedPath);
  const current = visited[visited.length - 1] || {};

  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        <div
          className="absolute inset-0 flex justify-center"
          style={{ transformOrigin: "top center" }}
        >
          <ZoomField>
            <BgSpreadLines />
            <BackgroundLines />
            <PathLines elRefs={elRefs.current} />
            <Field elRefs={elRefs} />
          </ZoomField>
        </div>
      </div>
      <div className="score absolute top-4 right-4 z-100 h-[20px] font-onul font-[900]">
        {`점수: ${percentage}%`}
      </div>
      {showTimer && (
        <div className="score absolute top-1/2 -translate-y-1/2 right-4 z-100 h-[20px] font-onul font-[900]">
          <Timer duration={timerDuration} />
        </div>
      )}
      <Calculation time={current.time || 0} k={current.k || 0} />
    </>
  );
}

export default App;