import { useState, useEffect } from 'react'
import React from 'react'

import '../App.css'

export const TimerReverse = ({
  isPause,
  startTime,
  onEnd,
}: {
  isPause: boolean
  startTime: number
  onEnd: () => void
}) => {
  // const [isPause, setIsPause]= useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(startTime)

  useEffect(() => {
    let intervalId: number | undefined

    const startTimer = (isPause?: boolean) => {
      intervalId = setInterval(() => {
        if (secondsRemaining <= 0 && !isPause) {
          onEnd()
        }
        if (isPause || secondsRemaining <= 0) {
          clearInterval(intervalId)
          return
        }

        setSecondsRemaining((prevSeconds: number) => prevSeconds - 1)
      }, 1000)
    }

    if (!isPause) {
      startTimer()
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isPause, secondsRemaining])

  return (
    <>
      <p className="font-inter italic font-bold text-9xl leading-12 text-center text-white z-2">
        {secondsRemaining}
      </p>
    </>

    //
  )
}
