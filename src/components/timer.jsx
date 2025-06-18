import { useEffect, useState } from "react";
import { useQuestionStore } from "../store";
import "../App.css";

function parseDuration(duration) {
  return duration.includes("분")
    ? parseInt(duration) * 60
    : parseInt(duration);
}

export default function Timer({ onComplete }) {
  const timeOptions = useQuestionStore((s) => s.timeOptions);
  const timeIndex = useQuestionStore((s) => s.timeIndex);
  const duration = timeOptions[timeIndex];

  const seconds = parseDuration(duration);

  const [remaining, setRemaining] = useState(seconds);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);

    const { setCurrentId, setTimerId } = useQuestionStore.getState();
    const timerId = setTimeout(() => {
      setCurrentId("q100");
    }, seconds * 1000);
    setTimerId(timerId);
  }, [seconds]);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, seconds, onComplete]);

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes > 0 ? `${minutes}분 ` : ""}${seconds}초`;
  }

  return (
    <div className="font-onul font-[900] text-[10px] leading-none">
      남은 시간 : {formatTime(remaining)}
    </div>
  );
}