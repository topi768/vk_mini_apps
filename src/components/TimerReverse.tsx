import { useState, useEffect } from "react";

import "../App.css";

interface TimerProps {
  isPause: boolean;
  startTime: number;
  onEnd: () => void;
}

export const TimerReverse: React.FC<TimerProps> = ({
  isPause,
  startTime,
  onEnd,
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
      <p className="font-inter italic font-bold text-9xl leading-12 text-center text-white z-2">
        {secondsRemaining}
      </p>
    </>

    //
  );
};
