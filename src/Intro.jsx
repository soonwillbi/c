import React, { useState } from "react";
import App from "./App";
import Caption from "./components/caption";

/**
 * Intro
 *
 * Renders the intro screen and transitions to the main App on button click.
 */
export default function Intro() {
  const [started, setStarted] = useState(false);
  const [inputText, setInputText] = useState("");

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        localStorage.setItem("introText", inputText);
        setStarted(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputText]);

  if (started) {
    return <App />;
  }

  return (
    
    <div className="px-20 w-screen h-screen flex flex-col items-center justify-center bg-beige">
      <div className="w-2/3 flex flex-row  mb-40" >
<h1 className="whitespace-pre-line text-4xl font-onul font-[900] w-3/4 leading-[45px]">
       {`점프대는 언제나 점검중인 상태로 동결이다. 
        동시에 확실로 치닫는 아침 해를 희망한다.`}</h1>
        <div className="whitespace-pre-line text-[14px] font-onul font-[700] w-1/4 pt-1">
          {`점프는 자신의 세계를 확장해줄 텐데
영원히 다리를 두드려보다 끝나곤 합니다.
어떤 나를 만드는 분기는 선택에서 생기지요.

이 점검장치는 확실로 향하는 것을 돕습니다. 
아래에 점검하고자 하는 선택지를 입력하거나, 
그냥 가동해 보세요.`}
        </div>
      </div>
      
      <div className="flex flex-row w-2/3">
      <input
        className="border border-[#272727] bg-beige font-onul px-2 py-1 w-3/4 "
        type="text"
        placeholder="점검 필요 명제..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className="border border-[#272727] font-onul font-[900] mx-1 w-1/4 text-center
        bg-beige hover:bg-[#272727] hover:text-beige"
        onClick={() => {
          localStorage.setItem("introText", inputText);
          setStarted(true);
        }}
      >
        점검장치 가동
      </button>
      </div>
          
    <Caption />
    </div>
  );
}