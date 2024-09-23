import { useState, useEffect } from "react";
import IconTimer from "@/assets/icons/timer.svg";

interface TimerProps {
  isPause: boolean;
  startTime: number;
  onEnd: () => void;
  className?: string;
}

export const TimerReverse: React.FC<TimerProps> = ({
  isPause,
  startTime,
  onEnd,
  className = "",
}) => {
  // const [isPause, setIsPause]= useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(startTime);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined = undefined;

    const startTimer = (isPause?: boolean) => {
      intervalId = setInterval(() => {
        if (secondsRemaining <= 0 && !isPause) {
          onEnd();
        }

        if (isPause || secondsRemaining <= 0) {
          clearInterval(intervalId);

          return;
        }

        setSecondsRemaining((prevSeconds: number) => prevSeconds - 1);
      }, 1000);
    };

    if (!isPause) {
      startTimer();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPause, onEnd, secondsRemaining]);

  return (
    <>
      <div className={`timer-container ${className}`}>
        <div className="flex justify-center items-center gap-2.5 py-2 px-5 w-[9.625rem] rounded-full bg-[#8484f0]">
          <IconTimer />
          <div className="__label text-white font-['NauryzRedKeds'] text-2xl font-bold leading-[100%]">
            00:
            {secondsRemaining.toString().length > 1
              ? secondsRemaining
              : `0${secondsRemaining}`}
          </div>
        </div>
      </div>
    </>

    //
  );
};
