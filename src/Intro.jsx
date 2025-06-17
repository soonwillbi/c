import React, { useState } from "react";
import App from "./App";

/**
 * Intro
 *
 * Renders the intro screen and transitions to the main App on button click.
 */
export default function Intro() {
  const [started, setStarted] = useState(false);

  if (started) {
    return <App />;
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#fffef5]">
      <h1 className="text-4xl font-onul font-[900] mb-8">
        점프대는 언제나 점검중인 상태로 동결이다. 
        동시에 확실로 치닫는 아침 해를 희망한다.</h1>
      <button
        className="border border-[#272727] font-onul width-[20px] px-2 py-2 text-center bg-[#fffef5] hover:invert"
        onClick={() => setStarted(true)}
      >
        점검하기
      </button>
    </div>
  );
}