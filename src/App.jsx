import React, { useRef } from "react";
import Field from "./field.jsx";
import BackgroundLines from "./components/BackgroundLines";
import BgSpreadLines from "./components/BgSpreadLines.jsx"
import PathLines from "./components/PathLines";
import Timer from "./components/timer.jsx";
import { useQuestionStore } from "./store";
import './index.css';
import './App.css';
import Calculation from "./components/Calculation.jsx";
import Guide from "./components/guide.jsx";
import { useKeySequenceReload } from "./components/useKeySequenceReload.jsx";
import Caption from "./components/caption.jsx";



function App() {
  useKeySequenceReload();
  const elRefs = useRef({});
  const showTimer = useQuestionStore((s) => s.showTimer);
  const timerDuration = useQuestionStore((s) => s.timerDuration);
  const visited = useQuestionStore(s => s.visitedPath);
  const current = visited[visited.length - 1] || {};
  const inputText = localStorage.getItem("introText");
  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        <div
          className="absolute inset-0 flex justify-center"
          style={{ transformOrigin: "top center" }}
        >
            <BgSpreadLines />
            <BackgroundLines />
            <PathLines elRefs={elRefs.current} />
            <Field elRefs={elRefs} />

        </div>
      </div>
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 flex flex-row">
        <div className="mx-1 px-0.5 pb-[1px] -mb-[1px] border border-[#272727] bg-beige text-center">
          <p className="font-onul font-[900] text-[10px] leading-none">점검 명제</p>
        </div>
        <div className="px-0.5 pb-[1px] -mb-[1px] border border-[#272727] bg-beige text-center">
          <p className="font-onul font-[900] text-[10px] leading-none">"{inputText}"</p>
        </div>
      </div>
      
      {showTimer && (
        <div className="absolute top-1/2 -translate-y-1/2 right-10 z-50 mx-1 px-0.5 pb-[1px] -mb-[1px] border border-[#272727] bg-beige text-center">
          <Timer duration={timerDuration} />
        </div>
      )}
      <Calculation time={current.time || 0} k={current.k || 0} />
      <Guide />
      <Caption />
    </>
    
  );
}

export default App;