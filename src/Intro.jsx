import React, { useState } from "react";
import App from "./App";
import Caption from "./components/caption";

const colorOptions = ['#e2d9d7', '#87c7c7', '#db9d9d', '#afdf82', '#676f97', '#9f5a7c', '#5ed7cd', '#8B4513', '#f26849', '#e13851'];

/**
 * Intro
 *
 * Renders the intro screen and transitions to the main App on button click.
 */
export default function Intro() {
  const [started, setStarted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        localStorage.setItem("introText", inputText);
        localStorage.setItem("selectedColor", selectedColor);
        setStarted(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputText, selectedColor]);

  if (started) {
    return <App />;
  }

  return (
    
    <div className="px-20 w-screen h-screen flex flex-col items-center justify-center bg-beige">
      <div className="w-2/3 flex flex-row mb-40" >
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
        className="border border-[#272727] bg-beige font-onul px-2 py-1 w-2/3 "
        type="text"
        placeholder="점검 필요 명제..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="flex flex-col w-1/3">
      <div className="flex flex-row w-full mb-2 mx-2 gap-[12px]">
        {colorOptions.map((color) => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-6 h-6 ${selectedColor === color ? 'p-1 border border-beige ring-1 ring-black' : 'border-transparent'}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <button
        className="border border-[#272727] font-onul font-[900] mx-2 w-full text-center
        bg-beige hover:bg-[#272727] hover:text-beige"
        onClick={() => {
          localStorage.setItem("introText", inputText);
          localStorage.setItem("selectedColor", selectedColor);
          setStarted(true);
        }}
      >
        점검장치 가동
      </button>

      </div>


      </div>
          
    <Caption />
    </div>
  );
}