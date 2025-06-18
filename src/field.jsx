import React, { useEffect, useCallback } from "react";
import { questions } from "./data";
import { useQuestionStore } from './store';

function Field({ elRefs }) {
  
  const currentId = useQuestionStore((s) => s.currentId);
  const setCurrentId = useQuestionStore((s) => s.setCurrentId);
  const toggleSubMenu = useQuestionStore((s) => s.toggleSubMenu);
  const isSubMenuOpen = useQuestionStore((s) => s.isSubMenuOpen);

  const increaseTime = useQuestionStore((s) => s.increaseTime);
  const decreaseTime = useQuestionStore((s) => s.decreaseTime);

  const timeOptions = useQuestionStore((s) => s.timeOptions);
  const timeIndex = useQuestionStore((s) => s.timeIndex);
  const currentLabel = timeOptions[timeIndex];

  const showTimer = useQuestionStore((s) => s.showTimer);
  const setShowTimer = useQuestionStore((s) => s.setShowTimer);
  const setTimerDuration = useQuestionStore((s) => s.setTimerDuration);

  const percentage = useQuestionStore((s) => s.getScore().percentage);

  const handleAnswer = useCallback((questionId, answer) => {
    const category = questionId.slice(0, 2);
    const level = questionId.endsWith("m") ? "main" : "sub";
    useQuestionStore.getState().setCategoryAnswer(category, level, questionId, answer);
  }, []);

  const addToPath = useQuestionStore((s) => s.addToPath);
  const lastRenderTime = useQuestionStore((s) => s.lastRenderTime);
  const setRenderTime = useQuestionStore((s) => s.setRenderTime);

  useEffect(() => {
    setRenderTime(Date.now());
  }, [currentId, setRenderTime]);

  const handleButtonClick = useCallback((id, label, next) => {
    // only O and X labels trigger answer handling
    if (["O", "X"].includes(label)) {
      handleAnswer(id, label);
    }
    setCurrentId(next);
    // skip adding path for "-" label
    if (label !== "-") {
      const now = Date.now();
      const delta = now - lastRenderTime;
      // record start point
      addToPath(id, delta);
      // also record destination to draw final segment
      addToPath(next, 0);
    }
  }, [handleAnswer, setCurrentId, lastRenderTime, addToPath]);

    useEffect(() => {
      const handleKeyDown = (e) => {
        const q = questions[currentId];
        if (!q?.options) return;
        const opts = Object.entries(q.options); // include 'menu'
        let idx;
        if (e.key === 'ArrowLeft') idx = 0;
        else if (e.key === 'ArrowDown') idx = 1;
        else if (e.key === 'ArrowRight') idx = 2;
        else return;

        const [optKey, optVal] = opts[idx] || [];

        // If the selected item is menu, always trigger menu toggle
        if (optKey === "menu") {
          toggleSubMenu();
          e.preventDefault();
          return;
        }

        // Handle submenu children when open
        if (isSubMenuOpen) {
          const submenuEntries = Object.entries(q.options.menu?.children || {});
          const submenuIdx = idx === 0 ? 0 : idx === 2 ? 1 : -1;
          const [subKey, subVal] = submenuEntries[submenuIdx] || [];
          if (subKey) {
            const next = typeof subVal === 'object' ? subVal.next : subVal;
            handleButtonClick(currentId, subKey, next);
            e.preventDefault();
            return;
          }
        }

        if (!optKey) return;
        const label = typeof optVal === 'object' ? optVal.label : optKey;
        const next = typeof optVal === 'object' ? optVal.next : optVal;
        handleButtonClick(currentId, label, next);
        e.preventDefault();
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentId, handleButtonClick, isSubMenuOpen, toggleSubMenu]);

  return (
    <div className="field relative w-screen h-screen overflow-hidden">
      <div className="absolute bg-cover inset-0 opacity-100 -z-50 pointer-events-none bg-beige">
      </div> 
      {Object.entries(questions).map(([id, q]) => {
  // Determine result text based on percentage
  let resultText;
  if (percentage < 20) {
    resultText = '적절하지 않은';
  } else if (percentage < 40) {
    resultText = '덜 적절한';
  } else if (percentage < 60) {
    resultText = '보통 수준인';
  } else if (percentage < 80) {
    resultText = '적절한';
  } else {
    resultText = '매우 적절한';
  }

  // Compute lines array with placeholders replaced
  const src = Array.isArray(q.text) ? q.text : [q.text];
  const renderedLines = src.map(line =>
    line
      .replace('[score]', percentage)
      .replace('[result]', resultText)
  );
  return (
        <div
          key={id}
          id={id}
          style={{
            top: q.y || "0%",
            left: q.x || "0%",
          }}
          className={
            `absolute flex flex-col items-start transition-transform origin-center transform -translate-x-1/2 -translate-y-1/2 ` +
            (currentId === id ? "scale-[2] z-50" : "")
          }
        >
          {q.options ? (
            <>
              {q.explanation && (
                Array.isArray(q.explanation)
                  ? q.explanation.map((line, index) => (
                      <div key={index} className="px-0.5 pb-[1px] -mb-[1px] border border-[#272727] bg-beige text-center">
                        <p className="font-onul text-[7.3px] leading-none">{line}</p>
                      </div>
                    ))
                  : (
                    <div className="px-0.5 pb-[1px] -mb-[1px] border border-[#272727] bg-beige text-center">
                      <p className="font-onul text-[7.3px] leading-none">{q.explanation}</p>
                    </div>
                  )
              )}
            </>
          ) : (
            renderedLines.map((line, index) => (
              <div key={index} className="px-0.5 pb-[0.8px] -mb-[1px] border border-[#272727] bg-beige text-left">
                <p className="text-[10px] leading-tight font-onul">{line}</p>
              </div>
            ))
          )}
          {q.options && (
            <div
              className={
                `h-[14px] flex max-w-fit items-center transition-all ` +
                (currentId === id ? "z-10" : "opacity-90")}
            >
              <div
                ref={el => elRefs.current[id] = el}
                className="flex flex-col items-center relative"
              >
                {renderedLines.map((line, idx) => (
                  <div key={idx} className="px-0.5 pb-[0.8px] -mb-[1px] border border-[#272727] bg-beige text-center">
                    <p className="text-[10px] leading-tight font-onul font-[900]">{line}</p>
                  </div>
                ))}
                {currentId === id && q.options && (
                  <div className="absolute left-1/2 top-full mt-1 flex z-10 -translate-x-1/2 justify-center">
                    {Object.entries(q.options).map(([key, val]) => {
                      const label = typeof val === "object" ? val.label : key;
                      const next = typeof val === "object" ? val.next : val;

                      if (key === "menu") {
                        return (
                          <button key="menu" onClick={toggleSubMenu} className="btn">
                            <img src={`/png/btn_menu.png`} alt="☰" />
                          </button>
                        );
                      }

                      if (["O", "X"].includes(label)) {
                        const subKey = label === "O" ? "..." : "-";
                        const subVal = q.options.menu?.children?.[subKey];

                        return (
                          <div key={key} className="relative">
                            <button onClick={() => handleButtonClick(id, label, next)} className="btn">
                              <img src={`/png/btn_${label}.png`} alt={label} />
                            </button>
                            {isSubMenuOpen && subVal && (
                              <button
                                onClick={() => handleButtonClick(id, subKey, subVal.next || subVal)}
                                className="btn absolute top-0 left-0 translate-y-[-100%]"
                              >
                                <img src={`/png/btn_${subVal.label || subKey}.png`} alt={subVal.label || subKey} />
                              </button>
                            )}
                          </div>
                        );
                      }

                      if (key === "current") {
                        return (
                          <div className="btn-text-double" key="current">
                            {!showTimer && (
                              <button
                                className="btn btn-text"
                                onClick={() => {
                                  // handle navigation and path timing
                                  handleButtonClick(id, "current", next);
                                  // then start timer
                                  const duration = timeOptions[timeIndex];
                                  setTimerDuration(duration);
                                  setShowTimer(true);
                                }}
                              >
                                {currentLabel}
                              </button>
                            )}
                          </div>
                        );
                      }

                      if (key === "l") {
                        return (
                          <button key="l" onClick={decreaseTime} className="btn">
                            <img src={`/png/btn_l.png`} alt="left" />
                          </button>
                        );
                      }

                      if (key === "r") {
                        return (
                          <button key="r" onClick={increaseTime} className="btn">
                            <img src={`/png/btn_r.png`} alt="right" />
                          </button>
                        );
                      }

                      return (
                        <button key={key} onClick={() => handleButtonClick(id, label, next)} className="btn">
                          {["O", "X", "...", "-"].includes(label) ? (
                            <img src={`/png/btn_${label}.png`} alt={label} />
                          ) : (
                            label
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
      })}
    </div>
  );
}

export default Field;